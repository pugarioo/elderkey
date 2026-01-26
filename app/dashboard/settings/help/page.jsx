import FontIcon from '@/components/icons/FontIcon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DottedBG from "@/components/custom/dottedBg";

export default function SettingsHelp() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10">
                <div className="mb-10">
                    <Link href="/settings" className="text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest mb-3 inline-block transition-colors">
                        <FontIcon icon="fa-solid fa-chevron-left" style="mr-1" /> Settings
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-dark mb-2">Help & Support</h1>
                    <p className="text-lg text-gray-400">We are here to help you 24/7.</p>
                </div>
                {/* Contact Grid */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Us</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {/* Chat */}
                    <button className="bg-white rounded-2xl p-6 text-center shadow-card hover:-translate-y-1 transition-all border border-teal-50 hover:border-teal-200 group">
                        <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-500 mx-auto flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            <FontIcon icon="fa-solid fa-comments" />
                        </div>
                        <div className="font-bold text-dark text-lg">Live Chat</div>
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Instant</div>
                    </button>
                    {/* Email */}
                    <button className="bg-white rounded-2xl p-6 text-center shadow-card hover:-translate-y-1 transition-all border border-teal-50 hover:border-teal-200 group">
                        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 mx-auto flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            <FontIcon icon="fa-solid fa-envelope" />
                        </div>
                        <div className="font-bold text-dark text-lg">Email Us</div>
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Replies in 24h</div>
                    </button>
                    {/* Call */}
                    <button className="bg-white rounded-2xl p-6 text-center shadow-card hover:-translate-y-1 transition-all border border-teal-50 hover:border-teal-200 group">
                        <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 mx-auto flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                            <FontIcon icon="fa-solid fa-phone" />
                        </div>
                        <div className="font-bold text-dark text-lg">Hotline</div>
                        <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">1-800-ELDER</div>
                    </button>
                </div>
                {/* FAQ */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4 mb-8">
                    <details className="bg-white rounded-2xl border border-orange-900/5 shadow-card group overflow-hidden">
                        <summary className="font-bold text-dark cursor-pointer list-none flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors">
                            <span>How do I use my digital ID?</span>
                            <FontIcon icon="fa-solid fa-chevron-down" style="group-open:rotate-180 transition-transform text-primary" />
                        </summary>
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm bg-white">
                            Simply tap "View Card" on your dashboard to see your ID. Show this screen to our partners
                            (pharmacies, clinics, restaurants) to claim your discounts. You don't need to print it, but you can
                            if you prefer.
                        </div>
                    </details>
                    <details className="bg-white rounded-2xl border border-orange-900/5 shadow-card group overflow-hidden">
                        <summary className="font-bold text-dark cursor-pointer list-none flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors">
                            <span>How do I renew my subscription?</span>
                            <FontIcon icon="fa-solid fa-chevron-down" style="group-open:rotate-180 transition-transform text-primary" />
                        </summary>
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm bg-white">
                            Your subscription renews automatically. If you need to update your payment method, go to Settings &gt;
                            Payment Methods. We will send you a reminder 3 days before renewal.
                        </div>
                    </details>
                    <details className="bg-white rounded-2xl border border-orange-900/5 shadow-card group overflow-hidden">
                        <summary className="font-bold text-dark cursor-pointer list-none flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors">
                            <span>Is my personal data safe?</span>
                            <FontIcon icon="fa-solid fa-chevron-down" style="group-open:rotate-180 transition-transform text-primary" />
                        </summary>
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm bg-white">
                            Yes. We use bank-grade encryption to protect your data. We never share your medical or financial
                            information with third parties without your explicit permission.
                        </div>
                    </details>
                    <details className="bg-white rounded-2xl border border-orange-900/5 shadow-card group overflow-hidden">
                        <summary className="font-bold text-dark cursor-pointer list-none flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors">
                            <span>What if I lose my phone?</span>
                            <FontIcon icon="fa-solid fa-chevron-down" style="group-open:rotate-180 transition-transform text-primary" />
                        </summary>
                        <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm bg-white">
                            You can log in to ElderKey from any other device (computer or tablet) to access your ID. We
                            recommend changing your password immediately if your device is lost.
                        </div>
                    </details>
                </div>
                {/* Ticket Form Optional */}
                <div className="mt-8 text-center pt-8 border-t border-gray-200">
                    <p className="text-gray-400 mb-4">Still need help? Send us a message.</p>
                    <Button className="bg-white border border-gray-300 text-dark font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors">
                        Submit a Support Ticket
                    </Button>
                </div>
            </div>
        </div>
    );
}