"use client";

import React from 'react';
import DottedBg from '@/components/custom/dottedBg';
import { Card } from '@/components/ui/card';
import FontIcon from '@/components/icons/FontIcon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TutorialsPage() {
    const steps = [
        {
            title: "Getting Started",
            description: "Explore the main dashboard where you can find quick access to all ElderKey features.",
            image: "/tutorials/dashboard.png"
        },
        {
            title: "Partner Directory",
            description: "Browse our list of trusted partners offering exclusive discounts to members.",
            image: "/tutorials/partners.png"
        },
        {
            title: "Partner Details",
            description: "View detailed information about each partner, including location and specific benefits.",
            image: "/tutorials/partner-details.png"
        },
        {
            title: "Your Digital ID",
            description: "Access your secure digital ID card anytime. You can view the front and back, or save it as an image.",
            image: "/tutorials/id.png"
        },
        {
            title: "Membership Upgrades",
            description: "Compare plans and upgrade your membership to unlock more premium benefits.",
            image: "/tutorials/membership.png"
        }
    ];

    return (
        <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden pt-10 pb-20">
            <DottedBg className="fixed inset-0 z-0" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[#52796F] font-bold hover:text-[#023047] mb-8 transition-colors">
                    <FontIcon icon="fa-arrow-left" /> Back to Home
                </Link>

                <div className="mb-12 text-center">
                    <h1 className="font-serif font-black text-4xl md:text-5xl tracking-tight text-[#023047] mb-4">
                        How to Use ElderKey
                    </h1>
                    <p className="font-sans text-lg text-[#52796F] max-w-2xl mx-auto">
                        Welcome to your guide on maximizing your membership benefits. Follow these simple steps to navigate the platform.
                    </p>
                </div>

                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Text Content */}
                            <div className="flex-1 space-y-4">
                                <div className="w-12 h-12 bg-[#FFB703] rounded-full flex items-center justify-center shadow-lg mb-4">
                                    <span className="font-serif font-bold text-xl text-white">{index + 1}</span>
                                </div>
                                <h2 className="font-serif font-bold text-3xl text-[#023047]">
                                    {step.title}
                                </h2>
                                <p className="font-sans text-lg text-[#52796F] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Image Card */}
                            <div className="flex-1 w-full">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-auto object-contain rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
                        <FontIcon icon="fa-circle-question" style="text-[#FFB703] text-4xl mb-4 inline-block" />
                        <h3 className="font-serif font-bold text-2xl text-[#023047] mb-2">Need more help?</h3>
                        <p className="text-[#52796F] mb-6">Our concierge support team is available to assist you with any questions.</p>
                        <Button asChild className="h-12 px-8 bg-[#023047] hover:bg-[#001D3D] text-white rounded-xl font-bold shadow-lg cursor-pointer">
                            <Link href="/dashboard/settings/help">Login to contact support</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
