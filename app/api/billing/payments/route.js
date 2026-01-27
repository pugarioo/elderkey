import { NextResponse } from 'next/server';
import { getPaymentsByUser } from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export async function GET(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const payments = getPaymentsByUser(userEmail);
        return NextResponse.json({ payments });
    } catch (error) {
        console.error("Fetch payments error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
