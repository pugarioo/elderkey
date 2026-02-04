"use client";

import React, { useState, useEffect } from "react";
import DottedBg from "@/components/custom/dottedBg";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FontIcon from "@/components/icons/FontIcon";
import { useRouter } from "next/navigation";
import { useFriction } from "@/context/FrictionContext";
import RescueBubble from "@/components/custom/RescueBubble";
import { useUser } from "@/context/UserContext";

const page = () => {
    const router = useRouter();
    const { user, refreshUser } = useUser(); // Context hook
    const [currentPlan, setCurrentPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [rescueMode, setRescueMode] = useState(false); // Toggle State
    const { stressScore } = useFriction();

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [userData, setUserData] = useState({
        name: "Martha Stewart",
        email: "martha.stewart@test.com",
        mobile: "097599984111"
    });

    useEffect(() => {
        if (user) {
            setCurrentPlan(user.plan || "Bronze");
            setUserData({
                name: (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name) || "Your Name",
                email: user.email || "Your Email",
                mobile: user.mobileNo || "Your Mobile"
            });
            setInitialLoading(false);
        }
    }, [user]);

    const openConfirmation = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleConfirmUpdate = async () => {
        if (!selectedPlan || selectedPlan.name === currentPlan) return;

        setIsModalOpen(false);
        setLoading(true);
        try {
            const res = await fetch("/api/billing/plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: selectedPlan.name }),
            });

            if (res.ok) {
                setCurrentPlan(selectedPlan.name);
                await refreshUser(); // Update context immediately
                // router.refresh(); // Not strictly needed for navbar now, but keeps server components fresh if any
            } else {
                const errData = await res.json();
                console.error("Failed to update plan:", errData);
            }
        } catch (error) {
            console.error("Update error", error);
        } finally {
            setLoading(false);
        }
    };

    const tiers = [
        { name: "Bronze", price: "0", color: "text-[#023047]", discountColor: "text-[#023047]", needs: "I JUST NEED MEDICINE DISCOUNTS", icon: "fa-capsules" },
        { name: "Silver", price: "15", color: "text-[#FB8500]", discountColor: "text-[#FB8500]", isRecommended: true, needs: "I NEED CHECKUPS + MEDICINE", icon: "fa-stethoscope" },
        { name: "Gold", price: "29", color: "text-[#8ECAE6]", discountColor: "text-[#8ECAE6]", needs: "I NEED TRAVEL + HOSPITAL + EVERYTHING", icon: "fa-plane-up" },
    ];

    const features = [
        { label: "Partner Directory", bronze: true, silver: true, gold: true },
        { label: "Digital ID Card", bronze: false, silver: true, gold: true },
        { label: "Discount Rate", bronze: "Up to 5%", silver: "Up to 15%", gold: "20%+" },
        { label: "Generic Pharmacy Access", bronze: true, silver: true, gold: true },
        { label: "Priority Hospital Queue", bronze: false, silver: true, gold: true },
        { label: "Annual Checkup", bronze: false, silver: true, gold: true },
        { label: "Dining Perks", bronze: false, silver: true, gold: true },
        { label: "Travel Insurance", bronze: false, silver: false, gold: true },
        { label: "Concierge Support", bronze: false, silver: false, gold: true },
    ];

    return (
        <div className="relative min-h-screen font-sans bg-[#F8F9FA] pb-20">
            <DottedBg />

            {/* Rescue Mode Toggle Button */}
            {/* Rescue Mode Toggle Button */}
            <div className="fixed bottom-8 right-8 z-[99999] group">
                {(!rescueMode && stressScore > 80) && (
                    <div className="absolute bottom-20 right-0 w-max pointer-events-none">
                        <RescueBubble />
                    </div>
                )}
                <button
                    onClick={() => setRescueMode(!rescueMode)}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-[#023047] hover:bg-[#FFB703] text-white hover:text-[#023047] rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 z-50 group cursor-pointer"
                    title={rescueMode ? "Back to Table" : "Rescue Mode"}
                >
                    <FontIcon
                        icon={rescueMode ? "fa-table-list" : "fa-life-ring"}
                        className="group-hover:rotate-12 transition-transform"
                    />
                </button>

            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 flex flex-col items-center">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-[#023047] text-5xl font-black mb-4 tracking-tight">
                        Select Membership Tier
                    </h1>
                    <p className="text-[#52796F] text-lg font-medium">
                        Compare features and benefits across our concierge plans.
                    </p>
                    {rescueMode && (
                        <h2 className="text-[#52796F] text-2xl font-semibold mt-6 animate-pulse">
                            Feeling Overwhelmed? Choose what matters most!
                        </h2>
                    )}
                </div>

                {!rescueMode ? (
                    <>
                        {/* Desktop Table Layout */}
                        <div className="hidden md:block w-full bg-white rounded-[2rem] shadow-card overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Table className="w-full border-collapse">
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="w-1/4 p-10 pt-20 border-r border-gray-100">
                                            <span className="text-[#023047]/60 font-bold uppercase tracking-widest text-[16px]">
                                                Plan Features
                                            </span>
                                        </TableHead>
                                        {tiers.map((tier) => (
                                            <TableHead
                                                key={tier.name}
                                                className={`w-1/4 p-10 pt-16 text-center relative border-r last:border-r-0 border-gray-100 ${tier.name === currentPlan ? "bg-[#FFB703]/5 border-t-[5px] border-t-[#FFB703]" : ""}`}
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <h3 className={`text-3xl font-serif mb-1 ${tier.color}`}>{tier.name}</h3>
                                                    <div className="text-[#023047] text-5xl font-bold flex items-baseline justify-center">
                                                        <span className="text-4xl">$</span>{tier.price}
                                                        <span className="text-sm font-semibold text-gray-400 ml-1">/mo</span>
                                                    </div>
                                                    {tier.isRecommended && (
                                                        <div className="mt-3 bg-[#FFB703] text-[#023047] text-[12px] font-black px-4 py-1 rounded-full uppercase tracking-tighter">
                                                            Recommended
                                                        </div>
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {features.map((feature, idx) => (
                                        <TableRow key={idx} className="border-t border-gray-100 hover:bg-transparent">
                                            <TableCell className="p-6 pl-10 font-bold text-[#023047] text-[15px] border-r border-gray-100">
                                                {feature.label}
                                            </TableCell>
                                            {[
                                                { val: feature.bronze, color: tiers[0].discountColor },
                                                { val: feature.silver, color: tiers[1].discountColor },
                                                { val: feature.gold, color: tiers[2].discountColor }
                                            ].map((cell, i) => (
                                                <TableCell key={i} className={`text-center p-6 border-r last:border-r-0 border-gray-100 ${tiers[i].name === currentPlan ? "bg-[#FFB703]/5" : ""}`}>
                                                    {typeof cell.val === "boolean" ? (
                                                        cell.val ? (
                                                            <FontIcon icon="fa-check" style="text-[#FB8500] text-xl" />
                                                        ) : (
                                                            <FontIcon icon="fa-xmark" style="text-[#8ECAE6] text-xl" />
                                                        )
                                                    ) : (
                                                        <span className={`font-bold text-lg ${cell.color}`}>{cell.val}</span>
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t border-gray-100 hover:bg-transparent">
                                        <TableCell className="border-r border-gray-100" />
                                        {tiers.map((tier) => {
                                            const isCurrent = currentPlan === tier.name;
                                            return (
                                                <TableCell key={tier.name} className={`p-10 text-center border-r last:border-r-0 border-gray-100 ${isCurrent ? "bg-[#FFB703]/5" : ""}`}>
                                                    {isCurrent ? (
                                                        <Button disabled className="w-full rounded-xl py-6 bg-[#FFB703]/20 text-[#FB8500] border-none font-black uppercase text-xs tracking-widest cursor-default">
                                                            Current Plan
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() => openConfirmation(tier)}
                                                            disabled={loading}
                                                            className={`w-full rounded-xl py-6 ${tier.name === "Gold" ? "bg-[#8ECAE6] text-white" : "border border-gray-200 text-gray-100"} font-bold transition-all duration-300 cursor-pointer uppercase text-xs tracking-widest`}
                                                        >
                                                            {loading ? "..." : `Select ${tier.name}`}
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Card Layout */}
                        <div className="md:hidden w-full space-y-6">
                            {tiers.map((tier, index) => {
                                const isCurrent = currentPlan === tier.name;
                                return (
                                    <div key={tier.name} className={`relative bg-white rounded-[2rem] p-6 shadow-sm border-2 ${isCurrent ? 'border-[#FFB703]' : 'border-transparent'}`}>
                                        {isCurrent && (
                                            <div className="absolute top-0 right-0 bg-[#FFB703] text-[#023047] text-[10px] font-black px-4 py-2 rounded-bl-2xl rounded-tr-2xl uppercase tracking-widest">
                                                Current Plan
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className={`text-3xl font-serif font-black mb-2 ${tier.color}`}>{tier.name}</h3>
                                            <div className="text-[#023047] text-4xl font-bold flex items-baseline justify-center">
                                                <span className="text-2xl">$</span>{tier.price}
                                                <span className="text-sm font-semibold text-gray-400 ml-1">/mo</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">{tier.needs}</p>
                                        </div>

                                        <div className="space-y-3 mb-8">
                                            {features.map((feature, idx) => {
                                                const val = feature[tier.name.toLowerCase()];
                                                const isCheck = typeof val === 'boolean' && val === true;
                                                const isText = typeof val !== 'boolean';

                                                if (!val && val !== 0) return null; // Skip false items to be cleaner? Or show X? Let's show checkmarks and text values, maybe skip false for cleaner mobile view.

                                                return (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-6 flex justify-center">
                                                            {isCheck ? (
                                                                <FontIcon icon="fa-check" style="text-[#FB8500]" />
                                                            ) : isText ? (
                                                                <div className="w-1.5 h-1.5 bg-[#FFB703] rounded-full"></div>
                                                            ) : (
                                                                <FontIcon icon="fa-xmark" style="text-gray-200" />
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-[#023047] font-medium flex-1">
                                                            {feature.label}
                                                            {isText && <span className={`ml-2 font-bold ${tier.discountColor}`}>{val}</span>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {isCurrent ? (
                                            <Button disabled className="w-full rounded-xl py-6 bg-[#FFB703]/20 text-[#FB8500] border-none font-black uppercase text-xs tracking-widest">
                                                Current Plan
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => openConfirmation(tier)}
                                                disabled={loading}
                                                className={`w-full rounded-xl py-6 ${tier.name === "Gold" ? "bg-[#8ECAE6] text-white" : "bg-[#023047] text-white"} font-bold shadow-lg uppercase text-xs tracking-widest`}
                                            >
                                                {loading ? "..." : `Select ${tier.name}`}
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    /* Rescue Mode - Simplified Layout */
                    <div className="w-full max-w-4xl space-y-6 animate-in slide-in-from-right-10 duration-500">
                        {tiers.map((tier) => {
                            const isCurrent = currentPlan === tier.name;
                            return (
                                <div
                                    key={tier.name}
                                    onClick={() => !isCurrent && openConfirmation(tier)}
                                    className={`group relative flex items-center p-5 md:p-10 rounded-[2rem] shadow-card cursor-pointer transition-all duration-300 border-2
                                        ${isCurrent ? "bg-[#F3F4F6] border-[#FFB703]" : "bg-[#FFFCEB] border-transparent hover:border-[#FFB703]/30 hover:shadow-xl"}
                                    `}
                                >
                                    {isCurrent && (
                                        <div className="absolute top-4 right-6 bg-[#FFB703] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">
                                            Current Plan
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-4xl mr-4 md:mr-10 transition-transform group-hover:scale-110 shrink-0
                                        ${tier.name === "Bronze" ? "bg-[#FFD7BA] text-[#FB8500]" : tier.name === "Silver" ? "bg-gray-200 text-gray-500" : "bg-[#FFFCEB] text-[#D4A373]"}
                                    `}>
                                        <FontIcon icon={tier.icon} />
                                    </div>
                                    <div className="flex-1 pr-2">
                                        <h3 className={`text-sm md:text-2xl font-black uppercase tracking-tight leading-tight
                                            ${tier.name === "Bronze" ? "text-[#7F7F7F]" : tier.name === "Silver" ? "text-[#333333]" : "text-[#D4A373]"}
                                        `}>
                                            {tier.needs}
                                        </h3>
                                    </div>
                                    <div className={`text-lg md:text-2xl font-black shrink-0 ${tier.color}`}>
                                        ${tier.price}/mo
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
                    <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="bg-[#FFFCEB] pt-10 pb-6 flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                                <FontIcon icon="fa-check" className="text-white text-2xl" />
                            </div>
                            <h2 className="font-serif text-[#023047] text-2xl font-bold">Confirm Plan Change</h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <div className="bg-[#F8F9FA] rounded-[1.5rem] p-6 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Name</span>
                                    <span className="text-[#023047] font-bold">{userData.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Email</span>
                                    <span className="text-[#023047] font-bold">{userData.email}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Mobile</span>
                                    <span className="text-[#023047] font-bold">{userData.mobile}</span>
                                </div>
                            </div>
                            <div className="bg-[#FFFCEB] rounded-[1.5rem] p-6 border border-[#FFB703]/20">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Your New Plan</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#023047] text-3xl font-black">{selectedPlan?.name}</span>
                                    <span className="text-[#FB8500] text-2xl font-black">${selectedPlan?.price}/mo</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 pt-0 flex gap-4">
                            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex-1 rounded-2xl py-7 border-gray-200 text-gray-400 font-bold uppercase cursor-pointer text-xs tracking-widest hover:bg-gray-50">Back</Button>
                            <Button onClick={handleConfirmUpdate} className="flex-1 rounded-2xl py-7 bg-[#FFB703] hover:bg-[#FB8500] text-[#023047] font-black uppercase cursor-pointer text-xs tracking-widest shadow-lg">Update Now</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;