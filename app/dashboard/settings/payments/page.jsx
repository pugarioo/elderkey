"use client";

import Link from 'next/link';
import FontIcon from "@/components/icons/FontIcon";
import DottedBG from "@/components/custom/dottedBg";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";

export default function SettingsPayment() {
    const router = useRouter();
    const [payments, setPayments] = useState([]); // Transaction history
    const [methods, setMethods] = useState([]);   // Payment methods
    const [loading, setLoading] = useState(true);
    const [loadingMethods, setLoadingMethods] = useState(true);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('card'); // 'card' or 'wallet'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        cardProvider: 'Visa',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        cardName: '',
        walletProvider: 'GCash',
        walletNumber: '',
        walletName: ''
    });

    const fetchMethods = async () => {
        try {
            const res = await fetch('/api/billing/payment-methods');
            if (res.ok) {
                const data = await res.json();
                setMethods(data.methods || []);
            }
        } catch (error) {
            console.error("Failed to fetch methods:", error);
        } finally {
            setLoadingMethods(false);
        }
    };

    const fetchPayments = async () => {
        try {
            const res = await fetch('/api/billing/payments');
            if (res.ok) {
                const data = await res.json();
                setPayments(data.payments || []);
            }
        } catch (error) {
            console.error("Failed to fetch payments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMethods();
        fetchPayments();
    }, []);

    const handleDeleteMethod = async (id) => {
        if (!confirm('Are you sure you want to remove this payment method?')) return;
        try {
            const res = await fetch(`/api/billing/payment-methods?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchMethods();
            }
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            const res = await fetch('/api/billing/payment-methods', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                fetchMethods();
            }
        } catch (error) {
            console.error("Failed to set default:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveMethod = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare info based on active tab
        const payload = activeTab === 'card' ? {
            type: 'card',
            provider: formData.cardProvider,
            last4: formData.cardNumber.slice(-4) || '0000',
            expiryDate: formData.cardExpiry,
            isDefault: false
        } : {
            type: 'wallet',
            provider: formData.walletProvider,
            accountNumber: formData.walletNumber,
            isDefault: false
        };

        try {
            const res = await fetch('/api/billing/payment-methods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowModal(false);
                setFormData({
                    cardProvider: 'Visa',
                    cardNumber: '',
                    cardExpiry: '',
                    cardCVC: '',
                    cardName: '',
                    walletProvider: 'GCash',
                    walletNumber: '',
                    walletName: ''
                });
                fetchMethods();
            }
        } catch (error) {
            console.error("Failed to save method:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getProviderIcon = (provider) => {
        switch (provider?.toLowerCase()) {
            case 'visa': return 'fa-brands fa-cc-visa';
            case 'mastercard': return 'fa-brands fa-cc-mastercard';
            case 'gcash': return 'fa-solid fa-wallet'; // Generic wallet icon or specific if available
            case 'maya': return 'fa-solid fa-qrcode';
            default: return 'fa-solid fa-credit-card';
        }
    };

    const getProviderColor = (provider) => {
        switch (provider?.toLowerCase()) {
            case 'visa': return 'bg-indigo-50 text-indigo-800';
            case 'mastercard': return 'bg-orange-50 text-orange-800';
            case 'gcash': return 'bg-blue-50 text-blue-600';
            case 'maya': return 'bg-green-50 text-green-600';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <DottedBG />
            <div className="container mx-auto px-6 py-12 max-w-3xl relative z-10 w-full">
                <div className="mb-10">
                    <Link href="/dashboard/settings" className="text-gray-400 hover:text-dark font-bold text-xs uppercase tracking-widest mb-3 inline-block transition-colors">
                        <FontIcon icon="fa-solid fa-chevron-left" style="mr-1" /> Settings
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-dark mb-2">Payment Methods</h1>
                    <p className="text-lg text-gray-400">Manage how you pay for your subscription.</p>
                </div>

                {/* Section: Saved Methods */}
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Saved Cards & Wallets</h2>
                <div className="space-y-4">
                    {loadingMethods ? (
                        <div className="text-center p-6 text-gray-400">Loading methods...</div>
                    ) : methods.length > 0 ? (
                        methods.map((method) => (
                            <div key={method.id} className="bg-white rounded-2xl p-6 border border-orange-900/5 shadow-card flex flex-col md:flex-row items-center justify-between gap-4 group hover:shadow-glow transition-all">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${getProviderColor(method.provider)}`}>
                                        <FontIcon icon={getProviderIcon(method.provider)} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-dark text-lg">
                                            {method.provider} {method.type === 'card' ? `Ending in ${method.last4}` : 'Wallet'}
                                        </div>
                                        <div className="text-gray-400 font-mono text-sm">
                                            {method.type === 'card' ? `Expires ${method.expiryDate}` : method.accountNumber}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                    {Boolean(method.isDefault) && (
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Default</span>
                                    )}
                                    {!Boolean(method.isDefault) && (
                                        <button
                                            onClick={() => handleSetDefault(method.id)}
                                            className="text-gray-400 hover:text-dark font-bold text-sm px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors mr-2"
                                        >
                                            Set Default
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteMethod(method.id)}
                                        className="w-10 h-10 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex items-center justify-center"
                                        aria-label="Remove payment method">
                                        <FontIcon icon="fa-solid fa-trash-can" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-8 bg-white rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-400">No payment methods saved.</p>
                        </div>
                    )}
                </div>

                {/* Add New Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-5 mt-6 rounded-2xl border-2 bg-white border-dashed border-gray-300 text-gray-400 font-bold hover:border-primary hover:text-primary hover:bg-orange  transition-all flex items-center justify-center gap-3 text-lg"
                >
                    <FontIcon icon="fa-solid fa-plus-circle" /> Add Payment Method
                </button>


                {/* Section: Transaction History */}
                <div className="mt-12">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Transaction History</h2>
                    <div className="bg-white rounded-2xl border border-orange-900/5 shadow-card overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-gray-400">Loading transactions...</div>
                        ) : payments.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {payments.map((payment) => (
                                    <div key={payment.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl">
                                                <FontIcon icon="fa-solid fa-file-invoice-dollar" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-dark text-lg">
                                                    {payment.plan} Subscription
                                                </div>
                                                <div className="text-gray-400 text-sm">
                                                    {formatDate(payment.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${payment.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {payment.status}
                                            </span>
                                            <div className="font-serif font-bold text-dark text-xl">
                                                {formatCurrency(payment.amount, payment.currency)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                                    <FontIcon icon="fa-solid fa-receipt" />
                                </div>
                                <h3 className="text-dark font-bold text-lg mb-1">No Transactions Yet</h3>
                                <p className="text-gray-400">Your payment history will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>

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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-2xl font-serif font-bold text-dark">Add Payment Method</h3>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                                <FontIcon icon="fa-solid fa-xmark" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Tabs */}
                            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                                <button
                                    onClick={() => setActiveTab('card')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'card' ? 'bg-white text-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <FontIcon icon="fa-regular fa-credit-card" style="mr-2" /> Credit Card
                                </button>
                                <button
                                    onClick={() => setActiveTab('wallet')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'wallet' ? 'bg-white text-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <FontIcon icon="fa-solid fa-wallet" style="mr-2" /> E-Wallet
                                </button>
                            </div>

                            <form onSubmit={handleSaveMethod} className="space-y-4">
                                {activeTab === 'card' ? (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Name on Card</label>
                                            <Input
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Juan Dela Cruz"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Card Network</label>
                                            <select
                                                name="cardProvider"
                                                value={formData.cardProvider}
                                                onChange={handleInputChange}
                                                className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            >
                                                <option value="Visa">Visa</option>
                                                <option value="Mastercard">Mastercard</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Card Number</label>
                                            <Input
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="0000 0000 0000 0000"
                                                required
                                                maxLength={19}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Expiry</label>
                                                <Input
                                                    name="cardExpiry"
                                                    value={formData.cardExpiry}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    required
                                                    maxLength={5}
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">CVV</label>
                                                <Input
                                                    name="cardCVC"
                                                    value={formData.cardCVC}
                                                    onChange={handleInputChange}
                                                    placeholder="123"
                                                    required
                                                    maxLength={4}
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Wallet Provider</label>
                                            <select
                                                name="walletProvider"
                                                value={formData.walletProvider}
                                                onChange={handleInputChange}
                                                className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            >
                                                <option value="GCash">GCash</option>
                                                <option value="Maya">Maya</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Account Name</label>
                                            <Input
                                                name="walletName"
                                                value={formData.walletName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Juan Dela Cruz"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Mobile Number</label>
                                            <Input
                                                name="walletNumber"
                                                value={formData.walletNumber}
                                                onChange={handleInputChange}
                                                placeholder="0917 123 4567"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 rounded-xl bg-[#023047] text-white font-bold hover:bg-[#023047]/90 transition-colors disabled:opacity-70"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Method'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}