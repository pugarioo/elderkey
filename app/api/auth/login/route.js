import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { getUserByIdentifier } from '@/lib/db';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me'; // In production, use environment variable
const key = new TextEncoder().encode(SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { identifier, password } = body;

        if (!identifier || !password) {
            return NextResponse.json({ error: 'Username/Email/Mobile and password are required' }, { status: 400 });
        }

        const user = getUserByIdentifier(identifier);
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT
        const alg = 'HS256';
        const jwt = await new SignJWT({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('7d') // 7 days expiration for persistent login
            .sign(key);

        // Set Cookie
        const response = NextResponse.json({ success: true });

        // Wait for cookies() promise since we are in Next 15+ env potentially, but for now assuming standard usage
        (await cookies()).set('auth_token', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
