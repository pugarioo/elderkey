import React from 'react';
import { getPartner } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faLocationDot,
    faPhone,
    faClock,
    faInfoCircle,
    faArrowLeft,
    faPrescriptionBottleMedical,
    faShoppingBasket,
    faUtensils,
    faBolt,
    faPlane,
    faStore
} from '@fortawesome/free-solid-svg-icons';
import DottedBG from '@/components/custom/dottedBg';

// Icon Map (mirrors PartnersView)
const iconMap = {
    'Health & Pharmacy': faPrescriptionBottleMedical,
    'Shopping': faShoppingBasket,
    'Dining': faUtensils,
    'Services': faBolt,
    'Travel': faPlane
};

// Helper to determine gradient based on category (optional dynamic flair)
const getGradient = (field) => {
    // Darker gradient as requested: Dark Blue -> Black/Deep Navy
    return "bg-gradient-to-r from-[var(--dark)] to-black";
};

export default async function PartnerDetailPage({ params }) {
    // 1. Fetch Data
    const { id } = await params;
    const partner = getPartner(id);

    if (!partner) {
        notFound();
    }

    // Mock Rating (not in DB)
    const rating = 4.8;
    const backgroundIcon = iconMap[partner.field] || faStore;

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <DottedBG />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
                {/* Header Link */}
                <div className="flex justify-end mb-6">
                    <Link href="/partners" className="flex items-center gap-2 text-sm font-bold text-[#023047] hover:underline">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back to Directory
                    </Link>
                </div>

                {/* Hero Section */}
                <div className={`rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl mb-12 ${getGradient(partner.field)}`}>
                    {/* Background Icon Watermark */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white opacity-10 text-9xl pointer-events-none transform scale-150">
                        <FontAwesomeIcon icon={backgroundIcon} />
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider uppercase mb-4 text-[#FFB703]">
                            {partner.field}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{partner.name}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-slate-300">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faLocationDot} className="text-[#FFB703]" />
                                <span>{partner.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faStar} className="text-[#FFB703]" />
                                <span>{rating} Rating</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content & Sidebar Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Benefit Card */}
                        <div className="bg-[#FFF8F0] border border-[#ffecce] rounded-3xl p-8 relative overflow-hidden">
                            {/* Decorative Tag Icon */}
                            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#FB8500]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32">
                                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="relative z-10">
                                <p className="text-[#FB8500] text-xs font-bold tracking-widest uppercase mb-2">Your {partner.tier} Member Benefit</p>
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
                                    <h2 className="text-4xl font-serif font-bold text-[#023047]">{partner.headline}</h2>
                                    <span className="text-[#023047] font-medium text-lg">{partner.scope}</span>
                                </div>
                                <div className="flex items-start gap-2 text-slate-600 text-sm">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mt-1 text-[#FB8500]" />
                                    <p>{partner.terms}</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-[#023047] mb-4">About Partner</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {partner.description}
                            </p>
                        </div>

                        {/* How to Redeem */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-[#023047] mb-6">How to Redeem</h3>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                <div className="space-y-8 relative">
                                    {/* Connecting Line */}
                                    <div className="absolute left-[1.15rem] top-2 bottom-12 w-0.5 bg-slate-100"></div>

                                    {/* Steps */}
                                    {[
                                        { title: partner.step_1_title, text: partner.step_1_instruction, step: 1 },
                                        { title: partner.step_2_title, text: partner.step_2_instruction, step: 2 },
                                        { title: partner.step_3_title, text: partner.step_3_instruction, step: 3 }
                                    ].map((step) => (
                                        <div key={step.step} className="flex gap-6 relative">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold text-sm shadow-md z-10 border-4 border-white">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#023047] mb-1">{step.title}</h4>
                                                <p className="text-slate-500">{step.text}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pl-16 pt-2">
                                        <button className="bg-[#FFB703] hover:bg-[#ffa700] text-[#023047] font-bold py-3 px-8 rounded-xl transition-all shadow-sm flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                            </svg>
                                            {partner.button_text || 'View ID'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        {/* Location */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-[#FB8500]">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span className="text-[#023047] font-bold text-xs tracking-widest uppercase">Location</span>
                            </div>
                            <address className="not-italic text-slate-600 mb-4 block">
                                <p className="font-semibold text-[#023047] mb-1">Store Address</p>
                                {partner.address}<br />
                                {partner.zip_code}
                            </address>
                            <a href="#" className="text-[#FB8500] font-bold text-sm hover:underline flex items-center gap-1">
                                Get Directions <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                        </div>

                        {/* Contact */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-[#FB8500]">
                                <FontAwesomeIcon icon={faPhone} />
                                <span className="text-[#023047] font-bold text-xs tracking-widest uppercase">Contact</span>
                            </div>
                            <p className="text-2xl font-bold text-[#023047]">{partner.phone}</p>
                        </div>

                        {/* Hours */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-[#FB8500]">
                                <FontAwesomeIcon icon={faClock} />
                                <span className="text-[#023047] font-bold text-xs tracking-widest uppercase">Hours</span>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between pb-2 border-b border-slate-50">
                                    <span className="text-slate-500">Mon-Fri</span>
                                    <span className="font-bold text-[#023047]">{partner.hours_mon_fri}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-slate-50">
                                    <span className="text-slate-500">Sat</span>
                                    <span className="font-bold text-[#023047]">{partner.hours_sat}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Sun</span>
                                    <span className="font-bold text-[#023047]">{partner.hours_sun}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-[#023047] hover:bg-[#0f4c6e] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/10">
                            Visit Website
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}
