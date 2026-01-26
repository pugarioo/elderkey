import Link from 'next/link';
import FontIcon from "@/components/icons/FontIcon";
import DottedBG from "@/components/custom/dottedBg";

export default function SettingsPayment() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10">
                <div className="mb-10">
                    <Link href="/settings" className="text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest mb-3 inline-block transition-colors">
                        <FontIcon icon="fa-solid fa-chevron-left" style="mr-1" /> Settings
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-dark mb-2">Payment Methods</h1>
                    <p className="text-lg text-gray-400">Manage how you pay for your subscription.</p>
                </div>
                {/* Section: Saved Methods */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Saved Cards & Wallets</h2>
                <div className="space-y-4">
                    {/* GCash (Default) */}
                    <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card flex flex-col md:flex-row items-center justify-between gap-4 group hover:shadow-glow transition-all">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                                <FontIcon icon="fa-solid fa-wallet" />
                            </div>
                            <div>
                                <div className="font-bold text-dark text-lg">GCash</div>
                                <div className="text-gray-400 font-mono">0917 ••• ••••</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Default</span>
                            <button
                                className="w-10 h-10 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex items-center justify-center"
                                aria-label="Remove payment method">
                                <FontIcon icon="fa-solid fa-trash-can" />
                            </button>
                        </div>
                    </div>
                    {/* Visa */}
                    <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card flex flex-col md:flex-row items-center justify-between gap-4 group hover:shadow-glow transition-all">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center text-2xl">
                                <FontIcon icon="fa-brands fa-cc-visa" />
                            </div>
                            <div>
                                <div className="font-bold text-dark text-lg">Visa Ending in 4242</div>
                                <div className="text-gray-400 text-sm">Expires 12/28</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <button className="text-gray-400 hover:text-dark font-bold text-sm px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors mr-2">Set Default</button>
                            <button
                                className="w-10 h-10 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex items-center justify-center"
                                aria-label="Remove payment method">
                                <FontIcon icon="fa-solid fa-trash-can" />
                            </button>
                        </div>
                    </div>
                    {/* Maya */}
                    <div className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card flex flex-col md:flex-row items-center justify-between gap-4 group hover:shadow-glow transition-all">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-14 h-14 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-2xl">
                                <FontIcon icon="fa-solid fa-qrcode" />
                            </div>
                            <div>
                                <div className="font-bold text-dark text-lg">Maya Wallet</div>
                                <div className="text-gray-400 font-mono">0917 ••• ••••</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <button className="text-gray-400 hover:text-dark font-bold text-sm px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors mr-2">Set Default</button>
                            <button
                                className="w-10 h-10 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex items-center justify-center"
                                aria-label="Remove payment method">
                                <FontIcon icon="fa-solid fa-trash-can" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Add New */}
                <button className="w-full py-5 mt-6 rounded-2xl border-2 bg-white border-dashed border-gray-300 text-gray-400 font-bold hover:border-primary hover:text-primary hover:bg-orange  transition-all flex items-center justify-center gap-3 text-lg">
                    <FontIcon icon="fa-solid fa-plus-circle" /> Add Payment Method
                </button>
                {/* Security Note */}
                <div className="mt-12 bg-white border border-blue-100 p-6 rounded-2xl flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <FontIcon icon="fa-solid fa-shield-cat" />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900 mb-1">Secure & Encrypted</h3>
                        <p className="text-sm text-blue-800/80 leading-relaxed">
                            Your payment information is tokenized and encrypted. We do not store your full card details on our
                            servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}