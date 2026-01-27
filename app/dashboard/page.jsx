"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import DottedBg from '@/components/custom/dottedBg';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FontIcon from '@/components/icons/FontIcon';
import Link from 'next/link';

const Page = () => {
  // 1. Modal & View State Logic
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [idCardView, setIdCardView] = useState('front'); // 'front' or 'back'

  // 2. Ref for the PNG capture
  const idCardRef = useRef(null);

  // 3. Dynamic Data State
  const [userData, setUserData] = useState({
    name: "John Smith",
    plan: "Silver",
    idNumber: "1239-8472-ELDR",
    validUntil: "DEC 2028",
    emergencyContact: "(555) 0123-4567"
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserData(prev => ({
              ...prev,
              name: data.user.firstName ? `${data.user.firstName} ${data.user.lastName}` : (data.user.name || "John Smith"),
              plan: data.user.plan || "Bronze",
              // Keep mock data for fields not in API yet
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUser();
  }, []);

  const [uiScale] = useState(1);

  const planStyles = {
    Bronze: { text: "text-[#CD7F32]", label: "BRONZE MEMBER", crown: "text-[#CD7F32]" },
    Silver: { text: "text-[#FB8500]", label: "SILVER MEMBER", crown: "text-[#8ECAE6]" },
    Gold: { text: "text-[#FFB703]", label: "GOLD MEMBER", crown: "text-[#FFB703]" },
  };

  // 4. Function to handle PNG Download
  const downloadPng = useCallback(async () => {
    if (idCardRef.current === null) return;

    try {
      const dataUrl = await toPng(idCardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#023047',
        filter: (node) => {
          if (node?.tagName === 'SCRIPT') return false;
          return true;
        },
      });

      const link = document.createElement('a');
      link.download = `ElderKey-ID-${userData.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Capture failed:', err);
      alert("Something went wrong with the image generation. Please try again.");
    }
  }, [userData.name]);

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden pl-40 pr-40 pt-16">
      <DottedBg className="fixed inset-0 z-0" />

      {/* Main content section */}
      <section className="relative z-10 py-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-1">
            <h1 className="font-serif font-black text-4xl md:text-5xl tracking-tight text-[#023047]">
              Good Morning, {userData.name.split(' ')[0]}
            </h1>
            <p className="font-sans text-lg text-[#52796F]">
              Concierge updates & benefits summary.
            </p>
          </div>

          <div
            className="bg-[#023047] rounded-[1.25rem] flex items-center shadow-lg transition-all duration-500 hover:brightness-110 hover:shadow-2xl cursor-default"
            style={{
              padding: `${0.7 * uiScale}rem ${1.5 * uiScale}rem`,
              transform: `scale(${uiScale})`
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shadow-inner">
                <FontIcon
                  icon="fa-solid fa-crown"
                  style={`${planStyles[userData.plan].crown} text-xl`}
                />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] text-gray-400 font-sans font-bold tracking-widest uppercase">
                  Current Plan
                </span>
                <span className="text-white font-serif text-xl font-bold leading-tight">
                  {userData.plan} Member
                </span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/20 mx-6 opacity-50"></div>
            <Button asChild className="text-[#FFB703] bg-transparent hover:bg-transparent hover:text-[#FB8500] font-sans font-black text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
              <Link href="/dashboard/settings/subscription">Upgrade</Link>
            </Button>
          </div>
        </header>

        {/* FUNCTIONAL CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/dashboard/partners" className="cursor-pointer">
            <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div>
                <div className="w-12 h-12 bg-[#FB8500] rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <FontIcon icon="fa-solid fa-store" style="text-white text-lg" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Directory</h3>
                <p className="font-sans text-sm opacity-70 leading-relaxed">
                  Browse curated partners and exclusive local offers.
                </p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-[#FB8500] text-sm font-bold group-hover:gap-3 transition-all">
                Explore <FontIcon icon="fa-solid fa-arrow-right" className="" />
              </button>
            </Card>
          </Link>

          <Card
            onClick={() => setIsIdCardOpen(true)}
            className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 bg-[#FFB703] rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FontIcon icon="fa-solid fa-id-card" style="text-[#001D3D]" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">My ID Card</h3>
              <p className="font-sans text-sm opacity-70 leading-relaxed">
                Your secure pass for checkups and pharmacies.
              </p>
            </div>
            <button className="mt-6 flex items-center gap-2 text-[#FB8500] text-sm font-bold group-hover:gap-3 transition-all">
              View Card <FontIcon icon="fa-solid fa-eye" className="" />
            </button>
          </Card>

          <Link href="/dashboard/settings" className="cursor-pointer">
            <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div>
                <div className="w-12 h-12 bg-[#023047] rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <FontIcon icon="fa-solid fa-user-gear" style="text-white text-lg" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">Settings</h3>
                <p className="font-sans text-sm opacity-70 leading-relaxed">
                  Manage your profile, security, and preferences.
                </p>
              </div>
              <button className="mt-6 flex items-center gap-2 text-[#023047] text-sm font-bold group-hover:gap-3 transition-all">
                Manage <FontIcon icon="fa-solid fa-chevron-right" className="" />
              </button>
            </Card>
          </Link>
        </div>
      </section>

      {/* --- ID POPUP PANEL --- */}
      {isIdCardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#023047]/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg h-fit max-h-screen overflow-y-auto no-scrollbar flex flex-col items-center justify-center zoom-in duration-300">

            <div className="text-center mb-6 flex-shrink-0">
              <h1 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">
                My Digital ID
              </h1>
              <p className="font-sans text-white/70 text-sm italic leading-tight">
                "Present this card to claim your benefits."
              </p>
            </div>

            <div className="flex bg-black/30 p-1 rounded-full border border-white/10 mb-8 flex-shrink-0">
              <button
                onClick={() => setIdCardView('front')}
                className={`px-8 py-2 rounded-full text-[10px] cursor-pointer md:text-xs font-black tracking-widest uppercase transition-all ${idCardView === 'front' ? 'bg-[#FFB703] text-[#023047] shadow-lg' : 'text-white/50 hover:bg-white/5'
                  }`}
              >
                Front View
              </button>
              <button
                onClick={() => setIdCardView('back')}
                className={`px-8 py-2 rounded-full text-[10px] cursor-pointer md:text-xs font-black tracking-widest uppercase transition-all ${idCardView === 'back' ? 'bg-[#FFB703] text-[#023047] shadow-lg' : 'text-white/50 hover:bg-white/5'
                  }`}
              >
                Back View
              </button>
            </div>

            {/* The Digital ID Card wrapper with Ref for Capture */}
            <div className="w-full relative flex-shrink-0 mb-8 shadow-2xl" ref={idCardRef}>
              <Card className="relative overflow-hidden aspect-[1.586/1] w-full rounded-[1.5rem] md:rounded-[2.5rem] border-none bg-gradient-to-br from-[#023047] via-[#004b52] to-[#001D3D] p-6 md:p-8 text-white">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {idCardView === 'front' ? (
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

                    {/* Member Details Section (Image removed) */}
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

            <div className="grid grid-cols-2 gap-4 w-full mb-4 flex-shrink-0">
              <Button className="bg-[#3e4e5e80]/80 hover:bg-[#023047] text-white rounded-xl cursor-pointer py-6 border border-white/10 flex gap-2 text-xs md:text-sm">
                <FontIcon icon="fa-solid fa-file-pdf" style="text-red-500" /> Save as PDF
              </Button>
              <Button
                onClick={downloadPng}
                className="bg-[#3e4e5e80]/80 hover:bg-[#023047] text-white rounded-xl cursor-pointer py-6 border border-white/10 flex gap-2 text-xs md:text-sm"
              >
                <FontIcon icon="fa-solid fa-image" style="text-blue-400" /> Save as PNG
              </Button>
            </div>

            <Button
              onClick={() => setIsIdCardOpen(false)}
              className="w-full bg-[#023047] hover:bg-black text-white cursor-pointer py-8 text-lg font-bold rounded-2xl shadow-xl transition-all flex-shrink-0"
            >
              Close Panel
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;