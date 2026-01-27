
import { getPaymentMethods, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

export async function GET(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const methods = getPaymentMethods(userEmail);

        return new Response(JSON.stringify({ methods }), { status: 200 });
    } catch (error) {
        console.error("Get payment methods error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const body = await req.json();
        // Validation could go here

        const newMethod = addPaymentMethod({ ...body, userEmail });

        return new Response(JSON.stringify({ method: newMethod }), { status: 201 });
    } catch (error) {
        console.error("Add payment method error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });
        }

        const success = deletePaymentMethod(id, userEmail);

        if (success) {
            return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete' }), { status: 404 });
        }

    } catch (error) {
        console.error("Delete payment method error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });
        }

        const success = setDefaultPaymentMethod(id, userEmail);

        if (success) {
            return new Response(JSON.stringify({ message: 'Updated default' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to update' }), { status: 404 });
        }

    } catch (error) {
        console.error("Update payment method error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
