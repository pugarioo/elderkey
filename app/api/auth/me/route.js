import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
        const { payload } = await jwtVerify(token.value, key);

        // Fetch fresh user data from DB
        const { getUserByEmail } = await import('@/lib/db');
        const user = getUserByEmail(payload.email);

        if (!user) {
            return NextResponse.json({ user: null }, { status: 404 });
        }

        // Remove sensitive data
        const { password, ...safeUser } = user;

        return NextResponse.json({ user: safeUser }, { status: 200 });
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
