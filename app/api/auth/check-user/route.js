import { NextResponse } from 'next/server';
import { getUserByEmail, getUserByUsername } from '@/lib/db';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username } = body;

        if (email) {
            const existingEmail = getUserByEmail(email);
            if (existingEmail) {
                return NextResponse.json({
                    error: "Email is already registered",
                    field: "email"
                }, { status: 409 });
            }
        }

        if (username) {
            const existingUsername = getUserByUsername(username);
            if (existingUsername) {
                return NextResponse.json({
                    error: "Username is already taken",
                    field: "username"
                }, { status: 409 });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Check user error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
