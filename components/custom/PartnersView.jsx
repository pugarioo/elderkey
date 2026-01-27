'use client';
import { useState, useMemo } from 'react';
import PartnerCard from '@/components/custom/PartnerCard';
import DottedBG from '@/components/custom/dottedBg';
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
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    // Filter Logic
    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            // Search Filter
            const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                partner.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category Filter
            let matchesCategory = true;
            if (selectedCategory !== 'All Partners') {
                // Direct match since DB is normalized
                matchesCategory = partner.field === selectedCategory;
            }

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, partners]);

    // Dynamically derive categories from data
    const categories = ['All Partners', ...new Set(partners.map(p => p.field))];

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
                        {filteredPartners.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-slate-300 text-6xl mb-4">?</div>
                                <h3 className="text-xl font-bold text-slate-400">No partners found</h3>
                                <p className="text-slate-400">Try adjusting your search or category.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPartners.map((partner) => {
                                    const isActive = true; // defaulting to active

                                    // Mock Promo Tags
                                    let promoTag = null;
                                    if (partner.field === 'Health & Pharmacy' || partner.field === 'Dining') promoTag = '5% OFF';
                                    if (partner.name.includes('Jollibee')) promoTag = 'Free Pie'; // Specific usage
                                    if (partner.name.includes('Airlines')) promoTag = null;

                                    return (
                                        <PartnerCard
                                            key={partner.id}
                                            id={partner.id}
                                            variant={isActive ? 'active' : 'locked'}
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
                    </main>

                </div>
            </div>
        </div>
    );
}
