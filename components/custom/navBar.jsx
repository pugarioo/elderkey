"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <div className="flex items-center justify-between h-16 p-4 pl-40 pr-40 shadow-lg bg-white sticky top-0 z-50 w-full font-sans">
            <Link
                href="/"
                className="flex items-center justify-center gap-2 cursor-pointer"
            >
                <Logo />
                <p className="font-serif font-bold text-deep-navy text-xl">ElderKey</p>
            </Link>
            <div className="flex items-center justify-center gap-2">
                <Button asChild variant="ghost" className={"text-black cursor-pointer font-bold"}>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6 bg-primary text-white font-bold cursor-pointer hover:bg-orange hover:text-white transition-colors">
                    <Link href="/register">Get Digital Key</Link>
                </Button>
            </div>
        </div>
    );
}
