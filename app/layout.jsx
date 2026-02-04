import { Geist, Geist_Mono, Merriweather, Open_Sans } from "next/font/google";
import NavBar from "@/components/custom/navBar";
import Footer from "@/components/custom/Footer";
import "./globals.css";
import { FrictionProvider } from "@/context/FrictionContext";
import { UserProvider } from "@/context/UserContext";
import Logo from "@/components/icons/logo";
import { Toaster } from 'sonner';

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

export const metadata = {
    title: "ElderKey",
    description: "Adaptive UI for aging populations",
    icons: {
        icon: "/icon.svg", // This looks inside your 'public' folder
    },
};

// Variable font (no weight needed)
const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-opensans",
});

// Static font (weights required)
const merriweather = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    variable: "--font-merriweather",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${openSans.variable} ${merriweather.variable} antialiased`}
            >
                <FrictionProvider>
                    <UserProvider>
                        <NavBar />
                        {children}
                        <Toaster position="top-center" richColors />
                        <Footer />
                    </UserProvider>
                </FrictionProvider>
            </body>
        </html >
    );
}
