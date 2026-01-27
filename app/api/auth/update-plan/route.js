import { updateUserPlan, createPayment } from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key-change-me';
const key = new TextEncoder().encode(SECRET_KEY);

const PLAN_PRICES = {
    'Bronze': 0,
    'Silver': 15,
    'Gold': 29
};

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { payload } = await jwtVerify(token, key);
        const userEmail = payload.email;

        const { plan } = await req.json();

        if (!['Bronze', 'Silver', 'Gold'].includes(plan)) {
            return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400 });
        }

        const success = updateUserPlan(userEmail, plan);
        console.log(`[UpdatePlan] User: ${userEmail}, Plan: ${plan}, Success: ${success}`);

        if (success) {
            // Record the payment
            try {
                const amount = PLAN_PRICES[plan];
                createPayment({
                    userEmail: userEmail,
                    amount: amount,
                    plan: plan,
                    currency: 'USD',
                    status: 'SUCCESS'
                });
                console.log(`[UpdatePlan] Payment recorded for ${userEmail}: $${amount}`);
            } catch (paymentError) {
                console.error(`[UpdatePlan] Failed to record payment for ${userEmail}:`, paymentError);
                // We don't fail the request if payment recording fails, but we log it.
                // In a real system, we might want transactionality.
            }

            return new Response(JSON.stringify({ message: 'Plan updated successfully' }), { status: 200 });
        } else {
            console.error(`[UpdatePlan] Failed to update. User found? Email: ${userEmail}`);
            // Return specific error for debugging
            return new Response(JSON.stringify({
                error: 'Failed to update plan. User likely not found.',
                debug: { email: userEmail, plan }
            }), { status: 500 });
        }

    } catch (error) {
        console.error("Update plan error:", error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
