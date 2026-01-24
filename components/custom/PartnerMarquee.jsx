import React from 'react';
import Image from 'next/image';
import { getPartners } from '@/lib/db';

const PartnerMarquee = () => {

    const partners = getPartners();

    return (
        <div className="w-full bg-white py-10 overflow-hidden relative z-20 border-y border-gray-100">
            <div className="text-center mb-8">
                <p className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">Trusted By</p>
                <h2 className="text-3xl font-serif font-extrabold text-deep-navy">Our Partners</h2>
            </div>
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {/* First set of logos */}
                <div className="flex gap-16 mx-8 items-center">
                    {partners.map((partner, index) => (
                        <div key={`logo-1-${index}`} className="relative h-12 w-32 transition-all duration-300">
                            <Image
                                src={`/logos/${partner.logo}`}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
                {/* Second set of logos for seamless loop */}
                <div className="flex gap-16 mx-8 items-center">
                    {partners.map((partner, index) => (
                        <div key={`logo-2-${index}`} className="relative h-12 w-32 hover:scale-110 transition-all duration-300">
                            <Image
                                src={`/logos/${partner.logo}`}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerMarquee;
