import Link from 'next/link';
import FontIcon from '@/components/icons/FontIcon';
import DottedBG from "@/components/custom/dottedBg";

export default function SettingsPrivacy() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10">
                <div className="mb-10">
                    <Link href="/dashboard/settings" className="text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest mb-3 inline-block transition-colors">
                        <FontIcon icon="fa-solid fa-chevron-left" style="mr-1" /> Settings
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-dark mb-2">Privacy & Security</h1>
                    <p className="text-lg text-gray-400">Manage your credentials and data preferences.</p>
                </div>
                {/* Credentials Section */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Login & Access</h2>
                <div className="bg-white rounded-2xl border border-orange-900/5 shadow-card overflow-hidden mb-8">
                    <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <FontIcon icon="fa-solid fa-key" style="text-blue-500" />
                            </div>
                            <div>
                                <div className="font-bold text-dark group-hover:text-primary transition-colors">Change Password</div>
                                <div className="text-sm text-gray-400">Last changed 3 months ago</div>
                            </div>
                        </div>
                        <FontIcon icon="fa-solid fa-chevron-right" style="text-gray-300" />
                    </button>
                    <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                <FontIcon icon="fa-solid fa-lock" style="text-blue-500" />
                            </div>
                            <div>
                                <div className="font-bold text-dark group-hover:text-primary transition-colors">Change 6-Digit PIN</div>
                                <div className="text-sm text-gray-400">Used for quick transactions</div>
                            </div>
                        </div>
                        <FontIcon icon="fa-solid fa-chevron-right" style="text-gray-300" />
                    </button>
                </div>
                {/* 2FA Section */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Authentication</h2>
                <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                            <FontIcon icon="fa-solid fa-shield-halved" style="text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-dark mb-1">Two-Factor Authentication</h3>
                            <p className="text-gray-400 text-sm">Require OTP via SMS when logging in.</p>
                        </div>
                    </div>
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500">
                        </div>
                    </label>
                </div>
                {/* Device Management */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Active Sessions</h2>
                <div className="bg-white rounded-2xl border border-orange-900/5 shadow-card p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <FontIcon icon="fa-solid fa-mobile-screen-button" style="text-dark text-2xl" />
                            <div>
                                <div className="font-bold text-dark">iPhone 14 Pro (This Device)</div>
                                <div className="text-sm text-green-600 font-bold">Active Now • Manila, PH</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-4 opacity-70">
                            <FontIcon icon="fa-solid fa-desktop" style="text-dark text-2xl" />
                            <div>
                                <div className="font-bold text-dark">Windows PC</div>
                                <div className="text-sm text-gray-400">Last active yesterday</div>
                            </div>
                        </div>
                        <button className="text-red-500 font-bold text-sm hover:underline">Log Out</button>
                    </div>
                </div>
                {/* Data Privacy */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Data Privacy</h2>
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card">
                        <h3 className="font-bold text-dark mb-2">How we use your data</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            ElderKey collects only essential information to verify your identity and eligibility for senior
                            citizen benefits. We comply with the Data Privacy Act of 2012.
                        </p>
                        <Link href="#" className="text-primary font-bold text-sm hover:underline">Read full Privacy Policy</Link>
                    </div>
                    <button className="w-full py-4 text-center text-dark font-bold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        Request Account Data
                    </button>
                    <button className="w-full py-4 text-center text-red-500 font-bold bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-transparent">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}