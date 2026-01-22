import React from 'react';
import { getPartners } from '@/lib/db';
import PartnersView from '../../components/custom/PartnersView';

export default function PartnerDirectoryPage() {
    const allPartners = getPartners();

    return <PartnersView partners={allPartners} />;
}
