import React from 'react';
import FontIcon from "@/components/icons/FontIcon";
import { cn } from "@/lib/utils";

const DigitalIdCard = ({ className }) => {
    return (
        <div className={cn("bg-white rounded-[2rem] p-8 w-[34rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative", className)}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <FontIcon
                            icon="fa-solid fa-user"
                            style="text-gray-400 text-lg"
                        />
                    </div>
                    <div>
                        <p className="text-deep-navy font-bold text-lg leading-tight">
                            John Smith
                        </p>
                        <p className="text-gray-400 text-xs font-bold">
                            Silver Member
                        </p>
                    </div>
                </div>
                <FontIcon
                    icon="fa-solid fa-qrcode"
                    style="text-deep-navy text-3xl"
                />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 w-full mb-6"></div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-10 flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                    <FontIcon
                        icon="fa-solid fa-pills"
                        style="text-secondary text-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-deep-navy font-bold text-sm">
                        Mercury Drug
                    </p>
                    <p className="text-secondary text-[10px] font-extrabold tracking-wide uppercase">
                        15% Discount Applied
                    </p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Official Digital ID
                </p>
            </div>
        </div>
    );
};

export default DigitalIdCard;
