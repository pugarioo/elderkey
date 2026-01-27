"use client";

import Link from "next/link";
import Logo from "@/components/icons/logo";
import FontIcon from "@/components/icons/FontIcon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardNavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

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

    const navLinks = [
        { name: "Home", href: "/dashboard" },
        { name: "Directory", href: "/dashboard/partners" },
        { name: "My ID Card", href: "/dashboard/id-card" },
    ];

    return (
        <nav className="h-16 bg-white border-b border-gray-100 px-40 sticky top-0 z-40 flex items-center justify-between shadow-sm font-sans">
            <div className="flex items-center gap-12">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2 group">
                    <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
                    <span className="font-serif font-bold text-xl text-[#023047] tracking-tight">ElderKey</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
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

            {/* Right Side: User Profile */}
            <div className="flex items-center gap-6">
                {!loading && user ? (
                    <div className="text-right hidden sm:block">
                        <div className="font-serif font-black text-[#023047] leading-tight">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#52796F]">
                            {user.plan || 'MEMBER'} Member
                        </div>
                    </div>
                ) : (
                    <div className="h-8 w-32 bg-gray-100 rounded animate-pulse hidden sm:block"></div>
                )}

                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/settings"
                        className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#023047] flex items-center justify-center transition-all bg-[#0000000D]"
                        title="Settings"
                    >
                        <FontIcon icon="fa-solid fa-gear" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-full bg-red-50 text-red-300 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-all"
                        title="Log Out"
                    >
                        <FontIcon icon="fa-solid fa-arrow-right-from-bracket" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
