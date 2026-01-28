"use client";

import React, { useState } from 'react';
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
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await refreshUser();
                router.refresh(); // Refresh to update server components/cookies
                router.push('/dashboard'); // Redirect to dashboard
            } else {
                const data = await res.json();
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4">
            <DottedBG />
            <div className="w-full pl-30 pr-30 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
                {/* Left Column: Login Form */}
                <div className="w-full md:w-1/2 max-w-lg bg-white/80 backdrop-blur-sm p-8 rounded-2xl  border-white/50">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-serif font-bold text-deep-navy mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Enter your details to access your account.</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="identifier"
                                value={formData.identifier}
                                onChange={handleInputChange}
                                placeholder="Username, Email, or Mobile Number"
                                className="h-12 bg-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className="h-12 bg-white"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 mt-2"
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
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
                                <Button variant="outline" className="h-10 border-primary text-primary hover:bg-primary/5 font-bold">
                                    Create new account
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right Column: Digital ID Card */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="transform md:scale-90 lg:scale-100 transition-transform duration-500 hover:scale-[1.02]">
                        <div className="relative">
                            {/* Warm Glow Effect matching landing page */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-orange-200/40 via-transparent to-transparent blur-3xl rounded-full -z-10"></div>
                            <DigitalIdCard />
                        </div>
                        <div className="mt-8 text-center md:text-left max-w-md mx-auto">
                            <h2 className="text-2xl font-serif font-bold text-deep-navy mb-2">Your Key to Benefits</h2>
                            <p className="text-gray-500">Access discounts, priority lines, and health records with a single secure ID.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
