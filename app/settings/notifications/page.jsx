import Link from 'next/link';
import FontIcon from '@/components/icons/FontIcon';
import DottedBG from "@/components/custom/dottedBg";

export default function SettingsNotifications() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10">
                <div className="mb-10">
                    <Link href="/settings" className="text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest mb-3 inline-block transition-colors">
                        <FontIcon icon="fa-solid fa-chevron-left" /> Settings
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-dark mb-2">Notifications</h1>
                    <p className="text-lg text-gray-400">Customize how and when we contact you.</p>
                </div>
                {/* Master Toggle */}
                <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                            <FontIcon icon="fa-solid fa-bell" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-dark mb-0">Allow Notifications</h2>
                            <p className="text-gray-400 text-sm">Turn all notifications on or off</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-500">
                        </div>
                    </label>
                </div>
                {/* Channels */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">How to notify me</h2>
                <div className="bg-white rounded-2xl px-6 py-2 border border-orange-900/5 shadow-card mb-8">
                    {/* Email */}
                    <label className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer">
                        <span className="font-bold text-dark flex items-center gap-3">
                            <FontIcon icon="fa-solid fa-envelope" /> Email
                        </span>
                        <input type="checkbox" defaultChecked className="w-6 h-6 text-primary rounded border-gray-300 focus:ring-primary" />
                    </label>
                    {/* SMS */}
                    <label className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer">
                        <span className="font-bold text-dark flex items-center gap-3">
                            <FontIcon icon="fa-solid fa-mobile-screen" /> SMS Text
                        </span>
                        <input type="checkbox" defaultChecked className="w-6 h-6 text-primary rounded border-gray-300 focus:ring-primary" />
                    </label>
                    {/* In-App */}
                    <label className="flex items-center justify-between py-4 cursor-pointer">
                        <span className="font-bold text-dark flex items-center gap-3">
                            <FontIcon icon="fa-solid fa-window-maximize" /> In-App Popups
                        </span>
                        <input type="checkbox" defaultChecked className="w-6 h-6 text-primary rounded border-gray-300 focus:ring-primary" />
                    </label>
                </div>
                {/* Types */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">What to notify about</h2>
                <div className="bg-white rounded-2xl px-6 py-2 border border-orange-900/5 shadow-card">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <div className="font-bold text-dark">Subscription Reminders</div>
                            <div className="text-xs text-muted">Renewals and billing updates</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500">
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <div className="font-bold text-dark">Payment Confirmations</div>
                            <div className="text-xs text-muted">Receipts for transactions</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500">
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <div className="font-bold text-dark">Security Alerts</div>
                            <div className="text-xs text-muted">Logins and account changes</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked disabled />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 opacity-60">
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <div className="font-bold text-dark">Announcements & Promos</div>
                            <div className="text-xs text-muted">Special offers for seniors</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}