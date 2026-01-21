import DottedBG from "@/components/custom/dottedBg";
import FontIcon from "@/components/icons/FontIcon";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className=" pl-40 pr-40 pt-16 ">
            <div className="relative">
                <DottedBG />
                <div
                    id="hero-section"
                    className="relative z-10 flex items-center justify-between h-[calc(80vh-4rem)] w-full mt-0 "
                >
                    <div className="w-1/2 h-full flex flex-col justify-center items-start gap-8">
                        <div className="flex items-center justify-center gap-2 text-primary border w-fit p-0.5 pr-2 pl-2 rounded-3xl border-primary">
                            <FontIcon
                                icon="fa-solid fa-circle"
                                style="text-[6px]"
                            />
                            <p className="text-xs font-bold">
                                SIMPLE. SECURE. SMART.
                            </p>
                        </div>
                        <div className="text-5xl font-serif font-extrabold">
                            <p className="text-deep-navy">Unlock Your</p>
                            <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Senior Benefits
                            </p>
                        </div>
                        <p className="text-gray-500 w-3/4">
                            One digital key for all your discounts, priority access,
                            and healthcare needs. Designed for simplicity
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <Button className="h-auto w-auto rounded-4xl py-4 px-7! text-deep-navy font-bold cursor-pointer hover:bg-accent hover:text-white">
                                Create Free Account
                                <FontIcon icon="fa-solid fa-arrow-right" />
                            </Button>
                            <Button className="h-auto w-auto rounded-4xl py-4 px-7! cursor-pointer border-2 border-white text-deep-navy font-bold bg-whites hover:bg-white hover:border-primary">
                                <FontIcon
                                    icon="fa-solid fa-play"
                                    style="text-primary"
                                />
                                See How It Works
                            </Button>
                        </div>
                        <div className="flex justify-start items-center gap-1 font-bold">
                            <FontIcon
                                icon="fa-solid fa-shield-halved"
                                style={"text-primary text-xs"}
                            />
                            <p className="text-gray-500 text-xs">
                                Bank Grade Security
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center justify-center relative">
                        {/* Blue Shape Background */}
                        <div className="absolute top-1/2 left-1/2 w-[34rem] h-[20rem] bg-[#e0f1f4] rounded-[2rem] -translate-y-[45%] translate-x-[-42%] rotate-3 -z-20"></div>

                        {/* Warm Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[24rem] bg-gradient-to-br from-orange-200/60 via-transparent to-transparent blur-3xl rounded-full -z-10"></div>

                        {/* Main Card */}
                        <div className="bg-white rounded-[2rem] p-8 w-[34rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-10 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <FontIcon
                                            icon="fa-solid fa-user"
                                            style="text-gray-400 text-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-deep-navy font-bold text-lg leading-tight">
                                            John Smith
                                        </p>
                                        <p className="text-gray-400 text-xs font-bold">
                                            Silver Member
                                        </p>
                                    </div>
                                </div>
                                <FontIcon
                                    icon="fa-solid fa-qrcode"
                                    style="text-deep-navy text-3xl"
                                />
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 w-full mb-6"></div>

                            <div className="bg-gray-50 rounded-2xl p-4 mb-10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                    <FontIcon
                                        icon="fa-solid fa-pills"
                                        style="text-secondary text-sm"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-deep-navy font-bold text-sm">
                                        Mercury Drug
                                    </p>
                                    <p className="text-secondary text-[10px] font-extrabold tracking-wide uppercase">
                                        15% Discount Applied
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    Official Digital ID
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Why Section */}
            <div className="py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-extrabold text-deep-navy mb-4">
                        Why Choose ElderKey?
                    </h2>
                    <p className="text-gray-500">
                        We've removed the complexity from accessing your benefits.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-wallet"
                                style="text-secondary text-lg"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-lg mb-3">
                            All In One Place
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            No more digging through your wallet. Your ID and
                            discounts are always ready.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-star"
                                style="text-primary text-lg"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-lg mb-3">
                            Priority Access
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Skip the line at partner clinics and hospitals with
                            your Gold membership.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <FontIcon
                                icon="fa-solid fa-glasses"
                                style="text-blue-500 text-lg"
                            />
                        </div>
                        <h3 className="text-deep-navy font-serif font-bold text-lg mb-3">
                            Senior Friendly
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Large text, clear buttons, and a digital concierge
                            to help you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
