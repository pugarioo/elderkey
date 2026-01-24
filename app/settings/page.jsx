import React from 'react';
import DottedBg from '@/components/custom/dottedBg';
import FontIcon from '@/components/icons/FontIcon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Icons imported as objects to maintain library compatibility
import { 
  faCrown, 
  faCamera, 
  faUser, 
  faCreditCard, 
  faShieldHalved, 
  faBell, 
  faLifeRing, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

export default function AccountSettings({ 
  user = {
    name: "John Smith",
    tier: "SILVER MEMBER",
    joinYear: "2024",
    avatarUrl: null 
  } 
}) {
  
  const settingsOptions = [
    { title: "Membership Plan", description: "Manage your subscription tier", icon: faCrown, iconBg: "bg-[#8ECAE6]/10", iconColor: "text-[#8ECAE6]", badge: user.tier },
    { title: "Payment Methods", description: "Update your card details", icon: faCreditCard, iconBg: "bg-[#FFB703]/10", iconColor: "text-[#FB8500]" },
    { title: "Privacy & Security", description: "Control your personal data", icon: faShieldHalved, iconBg: "bg-[#8ECAE6]/10", iconColor: "text-[#023047]" },
    { title: "Notifications", description: "Choose what updates you get", icon: faBell, iconBg: "bg-purple-50", iconColor: "text-purple-500" },
    { title: "Help & Support", description: "Get concierge assistance 24/7", icon: faLifeRing, iconBg: "bg-red-50", iconColor: "text-red-500" },
  ];

  return (
    <div className="relative min-h-screen font-sans bg-[#F8F9FA] pb-20 text-[#023047]">
      <DottedBg />

      <div className="relative z-10 max-w-[650px] mx-auto px-6 pt-16">
        <h1 className="text-3xl font-serif font-bold text-[#023047] mb-8">
          Account Settings
        </h1>

        {/* Profile Hero Card */}
        <Card className="relative border border-[#FFB703] p-6 mb-8 bg-white rounded-[24px] shadow-sm">
          <div className="flex items-center gap-6">
            
            {/* Avatar Group */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center border border-gray-50 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <FontIcon icon={faUser} style="text-gray-300 text-5xl" />
                )}
              </div>
              <button className="absolute bottom-1 right-1 w-7 h-7 bg-[#023047] rounded-full text-white flex items-center justify-center border-2 border-white cursor-pointer hover:bg-[#FB8500] transition-all active:scale-90">
                <FontIcon icon={faCamera} style="text-[10px]" />
              </button>
            </div>

            {/* User Info & FIXED Action Buttons */}
            <div className="flex-1">
              <h2 className="text-2xl font-serif font-bold text-[#023047] leading-none">{user.name}</h2>
              
              <div className="inline-flex items-center gap-1.5 bg-[#FFF8E6] px-3 py-1 rounded-full mt-2 border border-[#FFB703]/20">
                <FontIcon icon={faCrown} style="text-[#FB8500] text-[10px]" />
                <span className="text-[#FB8500] text-[10px] font-black uppercase tracking-wider">
                  {user.tier}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mt-2 font-medium">
                Member since {user.joinYear}
              </p>
              
              {/* FIXED HOVER STATES: Smooth transition from outline to solid navy */}
              <div className="flex gap-3 mt-4">
                <Button 
                  variant="outline" 
                  className="rounded-full px-5 h-8 border-[#023047] text-[#023047] text-xs font-bold cursor-pointer hover:bg-[#023047] hover:text-white transition-all duration-200"
                >
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full px-5 h-8 border-[#023047] text-[#023047] text-xs font-bold cursor-pointer hover:bg-[#023047] hover:text-white transition-all duration-200"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* List Navigation Buttons */}
        <div className="space-y-4">
          {settingsOptions.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full h-auto p-4 bg-white border border-gray-100 flex items-center justify-between rounded-2xl shadow-sm cursor-pointer hover:border-[#8ECAE6] hover:shadow-md group transition-all"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <FontIcon icon={item.icon} style={`${item.iconColor} text-lg`} />
                </div>
                
                <div className="text-left">
                  <span className="font-bold text-[#023047] text-base block leading-tight">
                    {item.title}
                  </span>
                  <span className="text-gray-400 text-xs font-normal mt-0.5 block">
                    {item.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {item.badge && (
                  <span className="text-[#FB8500] font-black text-[10px] tracking-widest uppercase">
                    {item.badge}
                  </span>
                )}
                <FontIcon icon={faChevronRight} style="text-gray-300 group-hover:text-[#023047] transition-colors" />
              </div>
            </Button>
          ))}
        </div>

        {/* Footer with High-Visibility Log Out */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <Button 
            variant="outline" 
            className="w-full max-w-[200px] rounded-full border border-gray-200 text-[#52796F] font-bold text-sm py-6 cursor-pointer hover:bg-[#023047] hover:text-white hover:border-[#023047] transition-all shadow-sm"
          >
            Log Out
          </Button>
          <p className="text-gray-400 text-[11px] font-medium tracking-wide">
            ElderKey Version 2.0.0 (Premium)
          </p>
        </div>
      </div>
    </div>
  );
}