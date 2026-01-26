import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '@/lib/db';

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
            plan: plan || 'Silver'
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
