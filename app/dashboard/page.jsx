"use client";

import React, { useState, useEffect } from 'react';
import DottedBg from '@/components/custom/dottedBg';
import { Card } from '@/components/ui/card';
import FontIcon from '@/components/icons/FontIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uiScale] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            // Ensure we have a valid plan, fallback to Bronze if not
            setUserData({
              ...data.user,
              plan: data.user.plan || 'Bronze',
              name: `${data.user.firstName} ${data.user.lastName}`
            });
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  /**
   * Plan styling configuration based on ElderKey Style Guide
   * Added 'crown' property to dynamically change icon color based on tier.
   */
  const planStyles = {
    Bronze: {
      text: "text-[#CD7F32]",
      label: "BRONZE MEMBER",
      crown: "text-[#CD7F32]" // Bronze metallic
    },
    Silver: {
      text: "text-[#FB8500]",
      label: "SILVER MEMBER",
      crown: "text-[#8ECAE6]" // Sky Blue accent
    },
    Gold: {
      text: "text-[#FFB703]",
      label: "GOLD MEMBER",
      crown: "text-[#FFB703]" // Sunlight Yellow
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <DottedBg className="fixed inset-0 z-0" />
        <div className="z-10 text-[#023047] font-bold text-xl animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  if (!userData) return null; // Should redirect

  // Safe access to plan style, default to Bronze if invalid plan
  const currentPlanStyle = planStyles[userData.plan] || planStyles.Bronze;

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] font-sans text-[#023047] overflow-x-hidden pl-40 pr-40 pt-16">
      <DottedBg className="fixed inset-0 z-0" />

      {/* Main content section */}
      <section className="relative z-10 py-10">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-1">
            <h1 className="font-serif font-black text-4xl md:text-5xl tracking-tight text-[#023047]">
              Good Morning, {userData.firstName}
            </h1>
            <p className="font-sans text-lg text-[#52796F]">
              Concierge updates & benefits summary.
            </p>
          </div>

          {/* DYNAMIC PLAN BADGE */}
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
                {/* DYNAMIC CROWN COLOR: Logic pulls from planStyles configuration */}
                <FontIcon
                  icon="fa-solid fa-crown"
                  style={`${currentPlanStyle.crown} text-xl`}
                />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] text-gray-400 font-sans font-bold tracking-widest uppercase">
                  Current Plan
                </span>
                <span className={`text-white font-serif text-xl font-bold leading-tight ${currentPlanStyle.text}`}>
                  {userData.plan} Member
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="h-10 w-px bg-white/20 mx-6 opacity-50"></div>

            {/* Interactive Zone (Right Zone) */}
            <Link href="/dashboard/settings/subscription">
              <button className="text-[#FFB703] hover:text-[#FB8500] font-sans font-black text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
                Upgrade
              </button>
            </Link>
          </div>
        </header>

        {/* FUNCTIONAL CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD A: DIRECTORY */}
          <Link href="/dashboard/partners">
            <Card className="h-full flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
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

          {/* CARD B: MY ID CARD */}
          <Link href="/dashboard/id-card">
            <Card className="h-full flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
              <div>
                <div className="w-12 h-12 bg-[#FFB703] rounded-xl flex items-center justify-center mb-6 shadow-md">
                  {/* Fixed Maastricht Blue string logic to match FontIcon needs */}
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
          </Link>

          {/* CARD C: SETTINGS */}
          <Link href="/dashboard/settings">
            <Card className="h-full flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-sm border-none min-h-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group">
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
    </main>
  );
};

export default page;