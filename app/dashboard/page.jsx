"use client";

import React, { useState } from 'react';
import DottedBg from '@/components/custom/dottedBg';
import NavBar from '@/components/custom/navBar';
import { Card } from '@/components/ui/card';
import FontIcon from '@/components/icons/FontIcon';

const page = () => {
  const [userData] = useState({
    name: "John Smith",
    plan: "Silver", 
  });

  const [uiScale] = useState(1); 

  const planStyles = {
    Bronze: { text: "text-[#CD7F32]", label: "BRONZE MEMBER" },
    Silver: { text: "text-[#FB8500]", label: "SILVER MEMBER" },
    Gold: { text: "text-[#FFB703]", label: "GOLD MEMBER" },
  };

  return (
    /* Match the top-level padding of your Home component */
    <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden pl-40 pr-40 pt-16">
      <DottedBg className="fixed inset-0 z-0" />

      {/* Content Section - Using the same alignment strategy as Home */}
      <section className="relative z-10 py-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="space-y-1">
            <h1 className="font-serif font-black text-4xl tracking-tight text-[#023047]">
              Good Morning, {userData.name.split(' ')[0]}
            </h1>
            <p className="font-sans text-lg text-[#52796F]">
              Concierge updates & benefits summary.
            </p>
          </div>

          <div 
            className="bg-[#001D3D] rounded-full flex items-center shadow-lg transition-all duration-500 hover:brightness-110 hover:shadow-2xl cursor-default"
            style={{ 
                padding: `${0.6 * uiScale}rem ${1.2 * uiScale}rem`,
                transform: `scale(${uiScale})` 
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-[#FFB703] text-lg">
                <FontIcon icon="fa-solid fa-crown" className="" />
              </div>
              <div className="flex flex-col pr-4">
                <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Current Plan</span>
                <span className="text-white font-serif text-base leading-tight">
                  {userData.plan} Member
                </span>
              </div>
            </div>
            <button className="bg-[#FFB703] hover:bg-[#FB8500] hover:scale-105 active:scale-95 text-[#023047] font-bold rounded-full px-5 py-1.5 text-xs cursor-pointer transition-all duration-300">
              UPGRADE
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
            <div>
              <div className="w-12 h-12 bg-[#FB8500] rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FontIcon icon="fa-solid fa-store" className="text-white" />
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

          <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
            <div>
              <div className="w-12 h-12 bg-[#FFB703] rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FontIcon icon="fa-solid fa-id-card" className="text-white" />
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

          <Card className="flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
            <div>
              <div className="w-12 h-12 bg-[#023047] rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FontIcon icon="fa-solid fa-sliders" className="text-white" />
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

export default page;