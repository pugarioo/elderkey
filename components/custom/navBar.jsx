"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FontIcon from "@/components/icons/FontIcon";

export default function NavBar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <div className="bg-white shadow-lg sticky top-0 z-50 w-full font-sans">
            <div className="w-full px-6 md:px-40 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 cursor-pointer z-50"
                >
                    <Logo />
                    <p className="font-serif font-bold text-deep-navy text-xl">ElderKey</p>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 p-2 text-deep-navy"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FontIcon icon={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} className="text-xl" />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center gap-3">
                    <Button asChild variant="ghost" className={"text-black cursor-pointer font-bold hover:bg-gray-100"}>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="rounded-full px-6 bg-primary text-white font-bold cursor-pointer hover:bg-orange hover:text-white transition-colors shadow-md">
                        <Link href="/register">Get Digital Key</Link>
                    </Button>
                </div>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                        <Button asChild variant="ghost" className="text-xl font-bold w-full max-w-xs h-14" onClick={() => setIsMenuOpen(false)}>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild className="text-xl font-bold w-full max-w-xs h-14 rounded-full bg-primary text-white shadow-lg" onClick={() => setIsMenuOpen(false)}>
                            <Link href="/register">Get Digital Key</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
