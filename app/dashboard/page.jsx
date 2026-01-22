"use client";

import React, { useState } from 'react';
import DottedBg from '@/components/custom/dottedBg';
import NavBar from '@/components/custom/navBar';
import { Card } from '@/components/ui/card';
import FontIcon from '@/components/icons/FontIcon';

const Page = () => {
  // 1. Dynamic Data State
  const [userData] = useState({
    name: "John Smith",
    plan: "Silver", 
  });

  // 2. Dynamic UI Scaling State
  const [uiScale] = useState(1); 

  // Plan styling configuration based on ElderKey Style Guide
  const planStyles = {
    Bronze: { text: "text-[#CD7F32]", label: "BRONZE MEMBER" },
    Silver: { text: "text-[#FB8500]", label: "SILVER MEMBER" },
    Gold: { text: "text-[#FFB703]", label: "GOLD MEMBER" },
  };

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden pl-40 pr-40 pt-16">
      {/* BACKGROUND SYSTEM */}
      <DottedBg className="fixed inset-0 z-0" />

      {/* MAIN CONTENT AREA aligned to pl-40 pr-40 */}
      <section className="relative z-10 py-10">
        
        {/* HERO WELCOME & STATUS SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-1">
            <h1 className="font-serif font-black text-4xl md:text-5xl tracking-tight text-[#023047]">
              Good Morning, {userData.name.split(' ')[0]}
            </h1>
            <p className="font-sans text-lg text-[#52796F]">
              Concierge updates & benefits summary.
            </p>
          </div>

          {/* REFINED CURRENT PLAN COMPONENT
              Note: Changed from rounded-full to rounded-[1.25rem] to match design images.
          */}
          <div 
            className="bg-[#023047] rounded-[1.25rem] flex items-center shadow-lg transition-all duration-500 hover:brightness-110 hover:shadow-2xl cursor-default"
            style={{ 
                padding: `${0.7 * uiScale}rem ${1.5 * uiScale}rem`,
                transform: `scale(${uiScale})` 
            }}
          >
            {/* Status Indicator (Left Zone) */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shadow-inner">
                <FontIcon icon="fa-solid fa-crown" style="text-silver text-lg" />
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

            {/* Vertical Divider */}
            <div className="h-10 w-[1px] bg-white/20 mx-6 opacity-50"></div>

            {/* Interactive Zone (Right Zone) */}
            <button className="text-[#FFB703] hover:text-[#FB8500] font-sans font-black text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
              Upgrade
            </button>
          </div>
        </header>

        {/* FUNCTIONAL CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD A: DIRECTORY */}
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

          {/* CARD B: MY ID CARD */}
          <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
            <div>
              <div className="w-12 h-12 bg-[#FFB703] rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FontIcon icon="fa-solid fa-id-card" style="text-blue" />
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

          {/* CARD C: SETTINGS */}
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

        </div>
      </section>
    </main>
  );
};

export default Page;