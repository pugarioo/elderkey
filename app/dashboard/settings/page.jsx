"use client";

import React, { useState, useEffect } from 'react';
import FontIcon from "@/components/icons/FontIcon";
import Link from "next/link";
import DottedBG from "@/components/custom/dottedBg";
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUserData({
                            ...data.user,
                            plan: data.user.plan || 'Bronze',
                            fullName: `${data.user.firstName} ${data.user.lastName}`
                        });
                    } else {
                        router.push('/login');
                    }
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const planStyles = {
        Bronze: {
            text: "text-[#CD7F32]",
            bg: "bg-[#CD7F32]/10",
            iconColor: "text-[#CD7F32]",
            label: "BRONZE MEMBER"
        },
        Silver: {
            text: "text-[#FB8500]",
            bg: "bg-[#FB8500]/10",
            iconColor: "text-[#FB8500]", // Or use the sky blue if preferred, but orange fits "Silver" in this theme often
            label: "SILVER MEMBER"
        },
        Gold: {
            text: "text-[#FFB703]",
            bg: "bg-[#FFB703]/10",
            iconColor: "text-[#FFB703]",
            label: "GOLD MEMBER"
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
                <DottedBG className="fixed inset-0 z-0" />
                <div className="z-10 text-[#023047] font-bold text-xl animate-pulse">Loading Settings...</div>
            </div>
        );
    }

    if (!userData) return null;

    const currentPlanStyle = planStyles[userData.plan] || planStyles.Bronze;

    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#52796F] font-bold mb-6 hover:text-[#023047] transition-colors">
                    <FontIcon icon="fa-arrow-left" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-black mb-8 text-dark">
                    Account Settings
                </h1>
                {/* Profile Header (Floating Card) */}
                <div className="bg-white p-8 rounded-3xl yellow-glow mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="relative">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white shadow-lg overflow-hidden">
                            <FontIcon icon="fa-solid fa-user" style="text-5xl" />
                        </div>
                        <button
                            className="absolute bottom-0 right-0 w-10 h-10 bg-dark text-white rounded-full border-4 border-white flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
                            aria-label="Edit photo"
                        >
                            <FontIcon icon="fa-solid fa-camera" style="text-sm" />
                        </button>
                    </div>
                    <div className="text-center md:text-left flex-grow space-y-2 pt-2 relative z-10">
                        <h2 className="text-3xl font-serif font-bold text-dark">
                            {userData.fullName}
                        </h2>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${currentPlanStyle.bg}`}>
                            <FontIcon icon="fa-solid fa-crown" style={`${currentPlanStyle.iconColor} text-sm`} />
                            <span className={`${currentPlanStyle.text} text-sm font-bold uppercase tracking-widest`}>
                                {userData.plan} Member
                            </span>
                        </div>
                        <p className="text-gray-500 text-lg mt-1">Member since {new Date(userData.createdAt).getFullYear() || '2024'}</p>

                    </div>
                </div>
                {/* Settings List (Cards instead of lines) */}
                <div className="space-y-4">
                    {/* Subscription Item */}
                    <Link
                        href="/dashboard/settings/subscription"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-accent/20 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-crown" style="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Subscription Plan
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Manage your subscription tier
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold uppercase tracking-wider ${currentPlanStyle.bg} ${currentPlanStyle.text}`}>
                                <FontIcon icon="fa-solid fa-crown" style={currentPlanStyle.iconColor} /> {userData.plan} Member
                            </span>
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Payment Methods */}
                    <Link
                        href="/dashboard/settings/payments"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-credit-card" style="text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Payment Methods
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Update your card details
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Privacy */}
                    <Link
                        href="/dashboard/settings/privacy"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-shield-halved" style="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Privacy & Security
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Control your personal data
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Notifications */}
                    <Link
                        href="/dashboard/settings/notifications"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-bell" style="text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Notifications
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Choose what updates you get
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Help */}
                    <Link
                        href="/dashboard/settings/help"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-life-ring" style="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Help & Support
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Get concierge assistance 24/7
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FontIcon icon="fa-solid fa-chevron-right" style="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>
                {/* Logout Area */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block w-full md:w-auto min-w-[300px] bg-white border border-red-500 text-red-500 font-bold py-4 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                    >
                        Log Out
                    </Link>
                    <p className="mt-8 text-gray-400 text-sm font-medium">
                        ElderKey Version 2.0.0 (Premium)
                    </p>
                </div>
            </div>
        </div>
    );
}
