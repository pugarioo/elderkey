import React, { forwardRef } from 'react';
import FontIcon from "@/components/icons/FontIcon";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const DigitalIdCard = forwardRef(({ className, user, view = 'front' }, ref) => {
    // Default or fallback data
    const userData = {
        name: user?.name || "John Smith",
        plan: user?.plan || "Silver",
        idNumber: user?.idNumber || "1239-8472-ELDR",
        validUntil: user?.validUntil || "DEC 2028",
        emergencyContact: user?.emergencyContact || "(555) 0123-4567"
    };

    return (
        <div ref={ref} className={cn("w-full relative shadow-2xl", className)}>
            <Card className="relative overflow-hidden aspect-[1.586/1] w-full rounded-[1.5rem] md:rounded-[2.5rem] border-none bg-gradient-to-br from-[#023047] via-[#004b52] to-[#001D3D] p-6 md:p-8 text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {view === 'front' ? (
                    <div className="h-full flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <FontIcon icon="fa-solid fa-key" style="text-[#FFB703] text-lg" />
                                    <span className="font-serif text-xl font-extrabold tracking-tight">ElderKey</span>
                                </div>
                                <p className="text-[9px] md:text-[10px] text-[#FFB703] tracking-[0.2em] uppercase font-black">Official Member ID</p>
                            </div>
                            <div className="p-1.5 bg-white rounded-md shadow-lg">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-black flex items-center justify-center">
                                    <FontIcon icon="fa-solid fa-qrcode" className="text-white text-2xl md:text-3xl" />
                                </div>
                            </div>
                        </div>

                        {/* Member Details Section */}
                        <div className="flex flex-col mt-4">
                            <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight">
                                {userData.name}
                            </h2>
                            <div className="inline-block mt-2 w-fit bg-[#FFB703] text-[#023047] px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                {userData.plan} Member
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-auto">
                            <div>
                                <p className="text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-widest">ID Number</p>
                                <p className="font-mono text-[10px] md:text-sm tracking-widest">{userData.idNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] md:text-[9px] text-[#FFB703] font-bold uppercase tracking-widest">Valid Until</p>
                                <p className="font-mono text-[10px] md:text-sm tracking-widest">{userData.validUntil}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col justify-between text-xs relative z-10">
                        <div>
                            <p className="text-[#FFB703] font-bold uppercase tracking-widest mb-2">Security & Info</p>
                            <p className="text-white/70 italic leading-relaxed text-[10px] md:text-xs">
                                This card remains property of ElderKey. Scanning the QR code verifies authenticity.
                            </p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <p className="text-white/50 uppercase text-[9px] mb-1 font-bold">Emergency Contact</p>
                            <p className="font-sans font-semibold text-lg md:text-xl">{userData.emergencyContact}</p>
                        </div>
                        <div className="w-full h-8 bg-white/20 rounded relative overflow-hidden mt-4">
                            <div className="absolute inset-0 flex justify-around items-center px-4">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="bg-white h-full w-[1.5px]" style={{ opacity: Math.random() * 0.5 + 0.3 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
});

DigitalIdCard.displayName = "DigitalIdCard";

export default DigitalIdCard;
