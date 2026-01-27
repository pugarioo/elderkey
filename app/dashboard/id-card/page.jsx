"use client";

import React from 'react';
import DottedBg from '@/components/custom/dottedBg';
import DigitalIdCard from '@/components/custom/DigitalIdCard';
import FontIcon from '@/components/icons/FontIcon';
import Link from 'next/link';

export default function IDCardPage() {
    return (
        <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden flex flex-col items-center justify-center p-6">
            <DottedBg className="fixed inset-0 z-0" />

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8 animate-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <h1 className="font-serif font-black text-3xl md:text-5xl text-[#023047]">My Digital ID</h1>
                    <p className="text-[#52796F] font-bold">Present this card at partner establishments.</p>
                </div>

                <div className="relative w-full flex justify-center transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#FFB703]/20 blur-3xl rounded-full -z-10"></div>
                    <DigitalIdCard />
                </div>

                <Link href="/dashboard">
                    <button className="flex items-center gap-2 text-[#023047] font-bold hover:text-[#FFB703] transition-colors bg-white px-6 py-3 rounded-xl shadow-md cursor-pointer">
                        <FontIcon icon="fa-arrow-left" /> Back to Dashboard
                    </button>
                </Link>
            </div>
        </main>
    );
}
