"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DigitalIdCard from "@/components/custom/DigitalIdCard";
import DottedBG from "@/components/custom/dottedBg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUser } from "@/context/UserContext";

export default function LoginPage() {
    const router = useRouter();
    const { refreshUser } = useUser();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                await refreshUser();
                toast.success('Login successful! Redirecting...');
                router.refresh();
                router.push('/dashboard');
            } else {
                toast.error(result.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4">
            <DottedBG />
            <div className="w-full px-4 md:px-40 flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 py-10">
                {/* Left Column: Login Form */}
                <div className="w-full md:w-1/2 max-w-lg bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl  border-white/50 shadow-sm mx-auto md:mx-0">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-serif font-bold text-deep-navy mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Enter your details to access your account.</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Input
                                {...register('identifier')}
                                placeholder="Username, Email, or Mobile Number"
                                className={`h-12 bg-white ${errors.identifier ? 'border-red-500' : ''}`}
                            />
                            {errors.identifier && (
                                <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                                className={`h-12 bg-white ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 text-lg font-bold bg-primary cursor-pointer hover:bg-primary/90 mt-2"
                        >
                            {isSubmitting ? 'Logging In...' : 'Log In'}
                        </Button>

                        <div className="text-center mt-2">
                            <Link href="#" className="text-primary hover:underline text-sm font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <div className="my-4 flex items-center gap-4">
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <span className="text-gray-400 text-sm">or</span>
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        <div className="text-center">
                            <Link href="/register">
                                <Button variant="outline" className="h-10 border-primary cursor-pointer text-primary hover:bg-primary/5 font-bold">
                                    Create new account
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right Column: Digital ID Card */}
                <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end mb-8 md:mb-0">
                    <div className="transform scale-90 md:scale-95 lg:scale-100 transition-transform duration-500 hover:scale-[1.02]">
                        <div className="relative">
                            {/* Warm Glow Effect matching landing page */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-orange-200/40 via-transparent to-transparent blur-3xl rounded-full -z-10"></div>
                            <DigitalIdCard />
                        </div>
                        <div className="mt-8 text-center md:text-left max-w-md mx-auto hidden md:block">
                            <h2 className="text-2xl font-serif font-bold text-deep-navy mb-2">Your Key to Benefits</h2>
                            <p className="text-gray-500">Access discounts, priority lines, and health records with a single secure ID.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
