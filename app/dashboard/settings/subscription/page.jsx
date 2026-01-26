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

const page = () => {
    const router = useRouter();
    const [currentPlan, setCurrentPlan] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setCurrentPlan(data.user.plan || "Bronze");
                        console.log("Current user:", data.user);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user plan", error);
            } finally {
                setInitialLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSelectPlan = async (planName) => {
        if (planName === currentPlan) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/update-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: planName }),
            });

            if (res.ok) {
                setCurrentPlan(planName);
                router.refresh();
                // Optional: Show success toast
            } else {
                const errData = await res.json();
                console.error("Failed to update plan. Server response:", errData);
            }
        } catch (error) {
            console.error("Update error", error);
        } finally {
            setLoading(false);
        }
    };

    const tiers = [
        {
            name: "Bronze",
            price: "0",
            color: "text-[#023047]",
            discountColor: "text-[#023047]",
        },
        {
            name: "Silver",
            price: "15",
            color: "text-[#FB8500]",
            discountColor: "text-[#FB8500]",
            isRecommended: true,
        },
        {
            name: "Gold",
            price: "29",
            color: "text-[#8ECAE6]",
            discountColor: "text-[#8ECAE6]",
        },
    ];

    const features = [
        { label: "Partner Directory", bronze: true, silver: true, gold: true },
        { label: "Digital ID Card", bronze: false, silver: true, gold: true },
        {
            label: "Discount Rate",
            bronze: "Up to 5%",
            silver: "Up to 15%",
            gold: "20%+",
        },
        {
            label: "Generic Pharmacy Access",
            bronze: true,
            silver: true,
            gold: true,
        },
        {
            label: "Priority Hospital Queue",
            bronze: false,
            silver: true,
            gold: true,
        },
        { label: "Annual Checkup", bronze: false, silver: true, gold: true },
        { label: "Dining Perks", bronze: false, silver: true, gold: true },
        { label: "Travel Insurance", bronze: false, silver: false, gold: true },
        {
            label: "Concierge Support",
            bronze: false,
            silver: false,
            gold: true,
        },
    ];

    return (
        <div className="relative min-h-screen font-sans bg-[#F8F9FA] pb-20">
            <DottedBg />

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-[#023047] text-5xl font-black mb-4 tracking-tight">
                        Select Subscription Tier
                    </h1>
                    <p className="text-[#52796F] text-lg font-medium">
                        Compare features and benefits across our concierge
                        plans.
                    </p>
                </div>

                {/* Pricing Table with Grid Lines */}
                <div className="w-full bg-white rounded-[2rem] shadow-card overflow-hidden border border-gray-200">
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
                                            <h3
                                                className={`text-3xl font-serif mb-1 ${tier.color}`}
                                            >
                                                {tier.name}
                                            </h3>
                                            <div className="text-[#023047] text-5xl font-bold flex items-baseline justify-center">
                                                <span className="text-4xl">
                                                    $
                                                </span>
                                                {tier.price}
                                                <span className="text-sm font-semibold text-gray-400 ml-1">
                                                    /mo
                                                </span>
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
                                <TableRow
                                    key={idx}
                                    className="border-t border-gray-100 hover:bg-transparent"
                                >
                                    <TableCell className="p-6 pl-10 font-bold text-[#023047] text-[15px] border-r border-gray-100">
                                        {feature.label}
                                    </TableCell>
                                    {[
                                        {
                                            val: feature.bronze,
                                            color: tiers[0].discountColor,
                                        },
                                        {
                                            val: feature.silver,
                                            color: tiers[1].discountColor,
                                        },
                                        {
                                            val: feature.gold,
                                            color: tiers[2].discountColor,
                                        },
                                    ].map((cell, i) => {
                                        const isCurrentColumn = tiers[i].name === currentPlan;
                                        return (
                                            <TableCell
                                                key={i}
                                                className={`text-center p-6 border-r last:border-r-0 border-gray-100 ${isCurrentColumn ? "bg-[#FFB703]/5" : ""}`}
                                            >
                                                {typeof cell.val === "boolean" ? (
                                                    cell.val ? (
                                                        <FontIcon
                                                            icon="fa-check"
                                                            style="text-[#FB8500] text-xl"
                                                        />
                                                    ) : (
                                                        <FontIcon
                                                            icon="fa-xmark"
                                                            style="text-[#8ECAE6] text-xl"
                                                        />
                                                    )
                                                ) : (
                                                    <span
                                                        className={`font-bold text-lg ${cell.color}`}
                                                    >
                                                        {cell.val}
                                                    </span>
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}

                            {/* Actions Footer */}
                            <TableRow className="border-t border-gray-100 hover:bg-transparent">
                                <TableCell className="border-r border-gray-100" />

                                {tiers.map((tier) => {
                                    const isCurrent = currentPlan === tier.name;
                                    return (
                                        <TableCell key={tier.name} className={`p-10 text-center border-r last:border-r-0 border-gray-100 ${isCurrent ? "bg-[#FFB703]/5" : ""}`}>
                                            {initialLoading ? (
                                                <div className="animate-pulse bg-gray-200 h-10 w-full rounded-xl"></div>
                                            ) : isCurrent ? (
                                                <Button
                                                    disabled
                                                    className="w-full rounded-xl py-6 bg-[#FFB703]/20 text-[#FB8500] border-none font-black uppercase text-xs tracking-widest cursor-default"
                                                >
                                                    Current Plan
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => handleSelectPlan(tier.name)}
                                                    disabled={loading}
                                                    variant={tier.name === "Gold" ? "default" : "outline"}
                                                    className={`w-full rounded-xl py-6 ${tier.name === "Gold"
                                                        ? "bg-[#8ECAE6] hover:bg-[#8ECAE6]/90 hover:shadow-lg text-white"
                                                        : "border-gray-100 text-gray-400 hover:bg-gray-50"
                                                        } font-bold transition-all duration-300 cursor-pointer uppercase text-xs tracking-widest`}
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

                {/* Security Info */}
                <div className="mt-10 flex items-center gap-2 text-[#023047]/40 text-[10px] font-black tracking-[0.15em] uppercase">
                    <FontIcon
                        icon="fa-shield-halved"
                        className="text-[#FFB703] text-sm"
                    />
                    <span>Secure SSL Payment</span>
                </div>
            </main>
        </div>
    );
};

export default page;
