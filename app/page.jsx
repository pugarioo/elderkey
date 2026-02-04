import DottedBG from "@/components/custom/dottedBg";
import DigitalIdCard from "@/components/custom/DigitalIdCard";
import FontIcon from "@/components/icons/FontIcon";
import { Button } from "@/components/ui/button";
import PartnerMarquee from "@/components/custom/PartnerMarquee";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen">
            <DottedBG />
            <div className="w-full px-6 md:px-40 pt-6 relative z-10">
                <div
                    id="hero-section"
                    className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(95vh-4rem)] w-full mt-0 gap-12 lg:gap-0 pb-12 lg:pb-0"
                >
                    {/* ... hero content ... */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-6 lg:gap-8">
                        {/* ... */}
                        <div className="flex items-center justify-center gap-2 text-primary border w-fit p-0.5 pr-2 pl-2 rounded-3xl border-primary">
                            <FontIcon
                                icon="fa-solid fa-circle"
                                className="text-[6px]"
                            />
                            <p className="text-xs font-bold">
                                SIMPLE. SECURE. SMART.
                            </p>
                        </div>
                        <div className="text-4xl md:text-5xl font-serif font-extrabold leading-tight">
                            <p className="text-deep-navy">Unlock Your</p>
                            <p className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Senior Benefits
                            </p>
                        </div>
                        <p className="text-gray-500 w-full md:w-3/4 text-lg">
                            One digital key for all your discounts, priority access,
                            and healthcare needs. Designed for simplicity
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Button asChild className="h-auto w-full sm:w-auto rounded-4xl py-4 px-8 text-deep-navy font-bold cursor-pointer hover:bg-accent hover:text-white transition-all shadow-lg shadow-primary/20">
                                <Link href="/register" className="flex items-center justify-center gap-2">Create Free Account
                                    <FontIcon icon="fa-solid fa-arrow-right" /></Link>

                            </Button>
                            <Button asChild className="h-auto w-full sm:w-auto rounded-4xl py-4 px-8 cursor-pointer border-2 border-white text-deep-navy font-bold bg-white hover:bg-white hover:border-primary transition-all shadow-sm">
                                <Link href="/tutorials" className="flex items-center justify-center gap-2">
                                    <FontIcon
                                        icon="fa-solid fa-play"
                                        className="text-primary"
                                    />
                                    See How It Works
                                </Link>
                            </Button>
                        </div>
                        <div className="flex justify-start items-center gap-2 font-bold bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full">
                            <FontIcon
                                icon="fa-solid fa-shield-halved"
                                className="text-primary text-xs"
                            />
                            <p className="text-gray-500 text-xs">
                                Bank Grade Security
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 h-full flex items-center justify-center relative min-h-[400px]">
                        {/* Blue Shape Background */}
                        <div className="absolute top-1/2 left-1/2 w-[90%] md:w-[34rem] h-[20rem] bg-[#e0f1f4] rounded-[2rem] -translate-y-[45%] translate-x-[-42%] rotate-3 -z-20"></div>

                        {/* Warm Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[38rem] h-[24rem] bg-gradient-to-br from-orange-200/60 via-transparent to-transparent blur-3xl rounded-full -z-10"></div>

                        {/* Main Card */}
                        <DigitalIdCard className="z-10 relative scale-90 md:scale-100" />
                    </div>
                </div>
            </div>

            <PartnerMarquee />

            {/* Why Section */}
            <div className="py-24 bg-white relative z-10 w-full px-6 md:px-40">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-deep-navy mb-4">
                        Why Choose ElderKey?
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We&apos;ve removed the complexity from accessing your benefits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {/* Card 1 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-wallet"
                                className="text-secondary text-xl"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-xl mb-3">
                            All In One Place
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            No more digging through your wallet. Your ID and
                            discounts are always ready.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-star"
                                className="text-primary text-xl"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-xl mb-3">
                            Priority Access
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            Skip the line at partner clinics and hospitals with
                            your Gold membership.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-glasses"
                                className="text-blue-500 text-xl"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-xl mb-3">
                            Senior Friendly
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            Large text, clear buttons, and a digital concierge
                            to help you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
