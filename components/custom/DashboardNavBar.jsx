"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/icons/logo";
import FontIcon from "@/components/icons/FontIcon";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export default function DashboardNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useUser();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const isActive = (path) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname?.startsWith(path)) return true;
        return false;
    };

    const handleLinkClick = (e, link) => {
        if (link.name === "My ID Card" && user?.plan === "Bronze") {
            e.preventDefault();
            toast.error("Upgrade to Silver or Gold to unlock your Digital ID!", {
                action: {
                    label: "Upgrade",
                    onClick: () => router.push("/dashboard/settings/subscription")
                }
            });
            if (isMenuOpen) setIsMenuOpen(false);
            return;
        }

        if (isMenuOpen) setIsMenuOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/dashboard" },
        { name: "Directory", href: "/dashboard/partners" },
        { name: "My ID Card", href: "/dashboard?showId=true" },
    ];

    return (
        <nav className="h-16 bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm font-sans">
            <div className="w-full px-4 md:px-40 h-full flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-12">
                    {/* Mobile Menu Button - Left Side for Dashboard */}
                    <button
                        className="md:hidden text-[#023047] text-xl focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FontIcon icon={isMenuOpen ? "fa-xmark" : "fa-bars"} />
                    </button>

                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
                        <span className="font-serif font-bold text-xl text-[#023047] tracking-tight hidden sm:inline-block">ElderKey</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link)}
                                className={`font-bold text-sm transition-colors ${isActive(link.href)
                                    ? "text-[#52796F]"
                                    : "text-gray-400 hover:text-[#023047]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Side: User Profile & Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4 md:gap-6">
                    {!loading && user ? (
                        <div className="text-right hidden lg:block">
                            <div className="font-serif font-black text-[#023047] leading-tight">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#52796F]">
                                {user.plan || 'MEMBER'} Member
                            </div>
                        </div>
                    ) : (
                        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse hidden lg:block"></div>
                    )}

                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/settings"
                            className="w-10 h-10 rounded-full bg-[#0000000D] text-gray-400 hover:bg-gray-100 hover:text-[#023047] flex items-center justify-center transition-all"
                            title="Settings"
                        >
                            <FontIcon icon="fa-solid fa-gear" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-10 h-10 rounded-full bg-red-50 text-red-300 hover:bg-red-100 hover:text-red-500 flex items-center justify-center cursor-pointer transition-all"
                            title="Log Out"
                        >
                            <FontIcon icon="fa-solid fa-arrow-right-from-bracket" />
                        </button>
                    </div>
                </div>

                {/* Mobile: Avatar / Profile Link (Optional, allows quick access to profile without menu) */}
                <div className="md:hidden flex items-center">
                    {/* We can put something here if needed, or just leave it clean. using empty fragment for now if not needed */}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 z-50 bg-white/95 backdrop-blur-md p-6 animate-in slide-in-from-top-10 duration-200 border-t border-gray-100 flex flex-col gap-6 overflow-y-auto">

                    {/* User Info in Menu */}
                    {!loading && user && (
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-[#023047] text-white flex items-center justify-center font-serif text-xl font-bold">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <div>
                                <div className="font-serif font-bold text-xl text-[#023047]">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-[#52796F]">
                                    {user.plan || 'MEMBER'} Member
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link)}
                                className={`text-lg font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between ${isActive(link.href)
                                    ? "bg-[#52796F]/10 text-[#52796F]"
                                    : "text-[#023047] hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                                <FontIcon icon="fa-chevron-right" className="text-xs opacity-30" />
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                        <Link
                            href="/dashboard/settings"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-bold py-3 px-4 rounded-xl text-[#023047] hover:bg-gray-50 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <FontIcon icon="fa-gear" className="text-sm" />
                            </div>
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-lg font-bold py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 flex items-center gap-3 w-full text-left"
                        >
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-400">
                                <FontIcon icon="fa-arrow-right-from-bracket" className="text-sm" />
                            </div>
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
