import FontIcon from "@/components/icons/FontIcon";
import Link from "next/link";
import DottedBG from "@/components/custom/dottedBg";

export default function SettingsPage() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
                <h1 className="text-3xl md:text-4xl font-serif font-black mb-8 text-dark">
                    Account Settings
                </h1>
                {/* Profile Header (Floating Card) */}
                <div className="bg-white p-8 rounded-3xl yellow-glow mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="relative">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white shadow-lg overflow-hidden">
                            <FontIcon icon="fa-solid fa-user" style="text-5xl" />
                        </div>
                        <button
                            className="absolute bottom-0 right-0 w-10 h-10 bg-dark text-white rounded-full border-4 border-white flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
                            aria-label="Edit photo"
                        >
                            <FontIcon icon="fa-solid fa-camera" style="text-sm" />
                        </button>
                    </div>
                    <div className="text-center md:text-left flex-grow space-y-2 pt-2 relative z-10">
                        <h2 className="text-3xl font-serif font-bold text-dark">
                            John Smith
                        </h2>
                        <div className="inline-flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
                            <FontIcon icon="fa-solid fa-crown" style="text-secondary text-sm" />
                            <span className="text-secondary text-sm font-bold uppercase tracking-widest">
                                Silver Member
                            </span>
                        </div>
                        <p className="text-gray-500 text-lg mt-1">Member since 2024</p>
                        <div className="flex flex-col md:flex-row gap-3 mt-6">
                            <button className="bg-white border border-gray-200 text-dark font-bold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-all shadow-sm">
                                Edit Profile
                            </button>
                            <button className="bg-white border border-gray-200 text-dark font-bold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-all shadow-sm">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
                {/* Settings List (Cards instead of lines) */}
                <div className="space-y-4">
                    {/* Membership Item */}
                    <Link
                        href="/settings/membership"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-accent/20 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-crown" style="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Membership Plan
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Manage your subscription tier
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-secondary/10 rounded-lg text-sm font-bold uppercase tracking-wider text-secondary">
                                <FontIcon icon="fa-solid fa-crown" style="text-secondary" />Silver Member
                            </span>
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Payment Methods */}
                    <Link
                        href="/settings/payments"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-credit-card" style="text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Payment Methods
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Update your card details
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Privacy */}
                    <Link
                        href="/settings/privacy"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-shield-halved" style="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Privacy & Security
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Control your personal data
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Notifications */}
                    <Link
                        href="/settings/notifications"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-bell" style="text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Notifications
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Choose what updates you get
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <i className="fa-solid fa-chevron-right text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                        </div>
                    </Link>
                    {/* Help */}
                    <Link
                        href="/settings/help"
                        className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-card hover:shadow-glow hover:-translate-y-1 transition-all group border border-orange-900/5 cursor-pointer"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                <FontIcon icon="fa-solid fa-life-ring" style="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-dark group-hover:text-primary transition-colors">
                                    Help & Support
                                </h3>
                                <p className="text-gray-500 text-lg">
                                    Get concierge assistance 24/7
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FontIcon icon="fa-solid fa-chevron-right" style="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>
                {/* Logout Area */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block w-full md:w-auto min-w-[300px] bg-white border border-red-500 text-red-500 font-bold py-4 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                    >
                        Log Out
                    </Link>
                    <p className="mt-8 text-gray-400 text-sm font-medium">
                        ElderKey Version 2.0.0 (Premium)
                    </p>
                </div>
            </div>
        </div>
    );
}
