'use client';
import { useState, useMemo, useEffect } from 'react';
import PartnerCard from '@/components/custom/PartnerCard';
import DottedBG from '@/components/custom/dottedBg';
import RescueBubble from '@/components/custom/RescueBubble';
import {
    faPrescriptionBottleMedical,
    faHospital,
    faStore,
    faUtensils,
    faBolt,
    faShoppingBasket,
    faBurger,
    faEye,
    faShop,
    faPlane,
    faSearch,
    faLifeRing,
    faList
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFriction } from '@/context/FrictionContext';

// Icon Map
const iconMap = {
    'Health & Pharmacy': faPrescriptionBottleMedical,
    'Shopping': faShoppingBasket,
    'Dining': faUtensils,
    'Services': faBolt,
    'Travel': faPlane
};

export default function PartnersView({ partners }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Partners');
    const [rescueMode, setRescueMode] = useState(false);
    const { stressScore } = useFriction();

    // User Plan State
    const [userPlan, setUserPlan] = useState('Bronze');
    const [loadingPlan, setLoadingPlan] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUserPlan(data.user.plan || 'Bronze');
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user plan", error);
            } finally {
                setLoadingPlan(false);
            }
        };
        fetchUser();
    }, []);

    const tierLevels = {
        'Bronze': 1,
        'Silver': 2,
        'Gold': 3
    };

    // 1. Accessibility Filter (Tier / Rescue Mode) - BASE for everything in Rescue Mode
    const accessiblePartners = useMemo(() => {
        return partners.filter(partner => {
            // In normal mode, everyone is accessible for the sidebar calculation (unless we want to hide locked there too? User said 'in rescue mode... hide empty'. So normal mode likely shows all categories)
            if (!rescueMode) return true;

            const pTier = partner.tier ? partner.tier.charAt(0).toUpperCase() + partner.tier.slice(1).toLowerCase() : 'Bronze';
            const uPlan = userPlan ? userPlan.charAt(0).toUpperCase() + userPlan.slice(1).toLowerCase() : 'Bronze';

            const partnerLevel = tierLevels[pTier] || 1;
            const userLevel = tierLevels[uPlan] || 1;

            return partnerLevel <= userLevel;
        });
    }, [rescueMode, partners, userPlan]);


    // 2. Display Filter (Applied on top of Accessible Partners)
    const displayPartners = useMemo(() => {
        return accessiblePartners.filter(partner => {
            // Search Filter
            const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category Filter
            let matchesCategory = true;
            if (selectedCategory !== 'All Partners') {
                matchesCategory = partner.field === selectedCategory;
            }

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, accessiblePartners]);


    // 3. Category Source (Sidebar) - Should be based on WHAT IS AVAILABLE, not what is selected
    const categories = useMemo(() => {
        // If Rescue Mode: Use accessiblePartners (Tier filtered only)
        // If Normal Mode: Use all partners
        const source = rescueMode ? accessiblePartners : partners;
        return ['All Partners', ...new Set(source.map(p => p.field))];
    }, [rescueMode, accessiblePartners, partners]);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 pl-40 pr-40 relative overflow-hidden">
            <DottedBG />
            <div className="relative z-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-[#023047] mb-2">Partner Directory</h1>
                    <p className="text-slate-500 text-lg">Browse community partners. Upgrade to claim Gold benefits.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar (Filters) */}
                    <aside className="w-full lg:w-1/4 shrink-0 space-y-8">
                        {/* Search */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-sm font-bold text-[#023047] uppercase tracking-wider mb-4">Search</h3>
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Find partner..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB703] transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-sm font-bold text-[#023047] uppercase tracking-wider mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(cat => {
                                    const isSelected = selectedCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex justify-between items-center ${isSelected
                                                ? 'bg-[#FFB703] text-[#023047] shadow-sm'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-[#023047]'
                                                }`}
                                        >
                                            <span>{cat}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <main className="w-full lg:w-3/4">
                        {rescueMode && (
                            <div className="mb-6 bg-[#FFFBEB] border border-[#FFB703] text-[#023047] p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                                <FontAwesomeIcon icon={faLifeRing} className="text-[#FB8500] text-xl" />
                                <div>
                                    <p className="font-bold text-lg leading-tight">Rescue Mode Active</p>
                                    <p className="text-sm opacity-80">Showing only available partners in a simplified list.</p>
                                </div>
                            </div>
                        )}

                        {displayPartners.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-slate-300 text-6xl mb-4">?</div>
                                <h3 className="text-xl font-bold text-slate-400">No partners found</h3>
                                <p className="text-slate-400">Try adjusting your search or category.</p>
                            </div>
                        ) : (
                            <>
                                {rescueMode ? (
                                    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                                        {displayPartners.map(partner => (
                                            <div key={partner.id} className="bg-white p-6 rounded-2xl shadow-md border-l-8 border-[#FFB703] flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer">
                                                <div>
                                                    <h3 className="font-serif text-2xl font-bold text-[#023047] mb-1">{partner.name}</h3>
                                                    <p className="text-[#52796F] font-bold uppercase tracking-wider text-sm">{partner.field}</p>
                                                </div>
                                                <button className="bg-[#023047] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#FB8500] transition-colors">
                                                    View
                                                </button>
                                            </div>
                                        ))}
                                        {displayPartners.length === 0 && (
                                            <div className="text-center py-10 opacity-50">
                                                <p>No available partners match your current plan and search.</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {displayPartners.map((partner) => {
                                            const partnerLevel = tierLevels[partner.tier] || 1;
                                            const userLevel = tierLevels[userPlan] || 1;
                                            const isLocked = partnerLevel > userLevel;

                                            // Mock Promo Tags
                                            let promoTag = null;
                                            if (partner.field === 'Health & Pharmacy' || partner.field === 'Dining') promoTag = '5% OFF';
                                            if (partner.name.includes('Jollibee')) promoTag = 'Free Pie'; // Specific usage
                                            if (partner.name.includes('Airlines')) promoTag = null;

                                            return (
                                                <PartnerCard
                                                    key={partner.id}
                                                    id={partner.id}
                                                    variant={isLocked ? 'locked' : 'active'}
                                                    title={partner.name}
                                                    subtitle={partner.field}
                                                    description={partner.description}
                                                    icon={iconMap[partner.field] || faStore}
                                                    logoImg={partner.logo ? `/logos/${partner.logo}` : null}
                                                    promoTag={promoTag}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </main>

                    {/* Rescue Mode Toggle */}
                    <div className="fixed bottom-8 right-8 z-[99999] group">
                        {/* Suggestion Bubble - Anchored */}
                        {(!rescueMode && stressScore > 80) && (
                            <div className="absolute bottom-20 right-0 w-max pointer-events-none">
                                <RescueBubble />
                            </div>
                        )}

                        <button
                            onClick={() => setRescueMode(!rescueMode)}
                            className="w-16 h-16 bg-[#023047] hover:bg-[#FFB703] text-white hover:text-[#023047] rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 group cursor-pointer"
                            title={rescueMode ? "Back to Grid" : "Rescue Mode"}
                        >
                            <FontAwesomeIcon
                                icon={rescueMode ? faList : faLifeRing}
                                className="group-hover:rotate-12 transition-transform"
                            />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
