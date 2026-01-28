import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { createUser, getUserByEmail } from '@/lib/db';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me'; // In production, use environment variable
const key = new TextEncoder().encode(SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, mobileNo, birthDate, username, password, plan } = body;

        // Basic validation (can be expanded)
        if (!email || !password || !username) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = createUser({
            firstName,
            lastName,
            email,
            mobileNo,
            birthDate,
            username,
            password: hashedPassword,
            plan: plan || 'Silver',
            seniorId: body.seniorId || null,
            termsAccepted: body.termsAccepted ? 1 : 0
        });

        // ---------------------------------------------------------
        // AUTO LOGIN LOGIC (Same as Login Route)
        // ---------------------------------------------------------

        // Generate JWT
        const alg = 'HS256';
        const jwt = await new SignJWT({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('7d') // 7 days expiration for persistent login
            .sign(key);

        // Set Cookie
        const response = NextResponse.json({ success: true, user: newUser }, { status: 201 });

        (await cookies()).set('auth_token', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
