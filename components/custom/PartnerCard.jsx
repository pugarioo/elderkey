import React from 'react';
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faTag } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

/**
 * PartnerCard Component
 * 
 * @param {Object} props
 * @param {string} [props.id] - Partner ID for linking.
 * @param {'active' | 'locked'} [props.variant='active'] - The visual style of the card.
 * @param {string} props.title - The main name (e.g., "Mercury Drug").
 * @param {string} props.subtitle - The category label (e.g., "PHARMACY").
 * @param {string} props.description - Helper text.
 * @param {Object} props.icon - FontAwesome icon for background watermark.
 * @param {string} [props.logoImg] - URL for the logo image in the circle.
 * @param {React.ReactNode} [props.actionIcon] - Fallback icon if no logo.
 * @param {string} [props.promoTag] - Optional promotional tag text.
 * @param {string} [props.className] - Additional classes.
 */
const PartnerCard = ({
    id,
    variant = 'active',
    title,
    subtitle,
    description,
    icon,
    logoImg,
    actionIcon,
    promoTag,
    className,
}) => {
    const isLocked = variant === 'locked';

    const CardContent = (
        <div
            className={cn(
                "relative flex flex-col w-full rounded-[2rem] overflow-hidden border transition-all duration-300",
                "border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01]",
                isLocked && "grayscale-[0.8] opacity-90",
                className
            )}
        >
            {/* Top Section (Color Background & Watermark) */}
            <div
                className={cn(
                    "relative h-40 w-full flex items-center justify-center overflow-hidden",
                    variant === 'active' ? "bg-[#FFF6E9]" : "bg-slate-100"
                )}
            >
                {/* Watermark Icon */}
                <div className={cn(
                    "absolute opacity-10 transform scale-[4]", // Adjusted scale and opacity
                    variant === 'active' ? "text-[#FFB703]" : "text-slate-400"
                )}>
                    {icon && <FontAwesomeIcon icon={icon} className="h-16 w-16" />}
                </div>

                {/* Promo Tag */}
                {promoTag && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10">
                        <FontAwesomeIcon icon={faTag} className="w-3 h-3 text-[#FB8500]" />
                        <span className="text-[0.65rem] font-bold tracking-wide text-[#023047]">{promoTag}</span>
                    </div>
                )}
            </div>

            {/* Overlapping Circle Icon / Logo - Moved outside to avoid clipping */}
            <div className="absolute top-32 left-8 z-20">
                <div className={cn(
                    "h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden",
                    isLocked ? "text-slate-300" : "text-[#FB8500]"
                )}>
                    {isLocked ? (
                        <div className="flex flex-col items-center justify-center gap-0.5">
                            <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
                            <span className="text-[0.5rem] font-bold tracking-wider uppercase text-slate-300">Locked</span>
                        </div>
                    ) : (
                        logoImg ? (
                            <div className="relative w-10 h-10">
                                <Image
                                    src={logoImg}
                                    alt={title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            actionIcon
                        )
                    )}
                </div>
            </div>

            {/* Bottom Section (Content) */}
            <div className="bg-white px-8 pt-12 pb-8 flex flex-col gap-2 min-h-[180px]">
                {/* Subtitle (Category) */}
                <h3 className={cn(
                    "text-xs font-bold tracking-widest uppercase",
                    variant === 'active' ? "text-[#FB8500]" : "text-slate-400"
                )}>
                    {subtitle}
                </h3>

                {/* Title */}
                <h2 className={cn(
                    "text-2xl font-serif font-bold",
                    variant === 'active' ? "text-[#023047]" : "text-slate-400"
                )}>
                    {title}
                </h2>

                {/* Description */}
                <p className={cn(
                    "text-sm leading-relaxed",
                    variant === 'active' ? "text-slate-500" : "text-slate-300"
                )}>
                    {description}
                </p>
            </div>
        </div>
    );

    if (id && !isLocked) {
        return <Link href={`/partners/${id}`} className="block w-full">{CardContent}</Link>;
    }

    return CardContent;
};

export default PartnerCard;
