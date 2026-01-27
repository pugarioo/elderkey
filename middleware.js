import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(request) {
    const token = request.cookies.get('auth_token')?.value;
    const { pathname } = request.nextUrl;

    let isAuthenticated = false;

    if (token) {
        try {
            await jwtVerify(token, key);
            isAuthenticated = true;
        } catch (error) {
            console.error('Middleware token verification failedin:', error);
            // Token invalid (expired or tampered)
        }
    }

    // 1. Unauthenticated users trying to access dashboard -> Redirect to Login
    if (pathname.startsWith('/dashboard') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. Authenticated users trying to access login, register, or root -> Redirect to Dashboard
    if ((pathname === '/login' || pathname === '/register' || pathname === '/') && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login', '/register'],
};
