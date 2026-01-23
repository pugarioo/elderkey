
import React from 'react';
import PartnerCard from '@/components/custom/PartnerCard';
import { getPartners } from '@/lib/db';
import {
    faPrescriptionBottleMedical,
    faHospital,
    faStore,
    faUtensils,
    faBolt,
    faShoppingBasket,
    faBurger,
    faEye,
    faShop
} from '@fortawesome/free-solid-svg-icons';

// Map fields to FontAwesome icons
const iconMap = {
    'Pharmacy': faPrescriptionBottleMedical,
    'Hospital': faHospital,
    'Grocery': faShoppingBasket,
    'Fast Food': faBurger,
    'Restaurant': faUtensils,
    'Food': faUtensils,
    'Utility': faBolt,
    'Retail': faStore,
    'Optical': faEye,
    'Convenience': faStore,
    'Market': faShop,
};

export default function TestCardsPage() {
    const partners = getPartners();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-wrap items-center justify-center gap-8 p-10">

            {partners.map((partner, index) => {
                // Simple logic for demo: First 2 active, rest locked? 
                // Or based on Tier? Let's say Tier 'Gold' is active.
                const isActive = true;
                const variant = isActive ? 'active' : 'locked';

                return (
                    <PartnerCard
                        key={partner.id}
                        variant={variant}
                        title={partner.name}
                        subtitle={partner.field}
                        description={partner.description}
                        icon={iconMap[partner.field] || faStore}
                        logoImg={`/logos/${partner.logo}`}
                    />
                );
            })}

        </div>
    );
}
