"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DottedBg from "@/components/custom/dottedBg";
import FontIcon from "@/components/icons/FontIcon";

export default function RegisterPage() {
  // State Management
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Silver");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  
  // File Preview State
  const [idPreview, setIdPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", birthDate: "", mobileNo: "",
    username: "", password: "", confirmPassword: "", email: ""
  });

  const plans = [
    { name: "Bronze", price: "0", titleColor: "text-[#023047]", features: ["Partner Directory", "Generic Pharmacy"] },
    { name: "Silver", price: "15", titleColor: "text-[#FFB703]", features: ["Digital ID Card", "15% Discounts", "Partner Directory", "Generic Pharmacy"], recommended: true },
    { name: "Gold", price: "29", titleColor: "text-[#8ECAE6]", features: ["Priority Queue", "Concierge Support", "Partner Directory", "Generic Pharmacy"] }
  ];

  const isProfileValid = formData.firstName && formData.lastName && formData.birthDate && formData.mobileNo && formData.username && formData.password && formData.confirmPassword && agreed;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => setIdPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);
    if (element.value !== "" && element.nextSibling) element.nextSibling.focus();
  };

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] relative flex flex-col items-center justify-center p-6 font-['Open_Sans'] overflow-hidden">
      <DottedBg />

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <h1 className="font-['Merriweather'] text-4xl md:text-5xl font-black text-[#023047] mb-2">Join the Community</h1>
        <p className="text-[#52796F] text-lg font-medium">Secure your digital membership in 3 simple steps.</p>
      </div>

      <Card className="w-full max-w-5xl bg-white shadow-card border-none rounded-[2.5rem] overflow-hidden z-10 min-h-[750px] flex flex-col transition-all duration-500">
        <CardContent className="p-0 flex flex-col h-full">
          
          {/* Stepper */}
          <div className="w-full py-12 flex items-center justify-center border-b border-gray-50 bg-white">
            <div className="flex items-center gap-1">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500
                    ${step > 1 ? 'bg-green-500 text-white shadow-lg' : 'bg-[#FFB703] text-white shadow-lg shadow-[#FFB703]/30'}`}>
                    {step > 1 ? <FontIcon icon="fa-check" /> : "1"}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${step > 1 ? 'text-green-500' : 'text-[#FFB703]'}`}>Profile</span>
                </div>
                <div className="flex gap-4 px-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${step > 1 ? 'bg-green-500' : 'bg-[#FFB703]'}`} />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500
                    ${step === 2 ? 'bg-[#FFB703] text-white shadow-lg shadow-[#FFB703]/30' : step > 2 ? 'bg-green-500 text-white shadow-lg' : 'bg-[#BCC1C8] text-white'}`}>
                    {step > 2 ? <FontIcon icon="fa-check" /> : "2"}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${step === 2 ? 'text-[#FFB703]' : step > 2 ? 'text-green-500' : 'text-[#9CA3AF]'}`}>Verify</span>
                </div>
                <div className="flex gap-4 px-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${step > 2 ? 'bg-green-500' : 'bg-[#BCC1C8]'}`} />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500
                    ${step === 3 ? 'bg-[#FFB703] text-white shadow-lg shadow-[#FFB703]/30' : 'bg-[#BCC1C8] text-white'}`}>3</div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${step === 3 ? 'text-[#FFB703]' : 'text-[#9CA3AF]'}`}>Plan</span>
                </div>
            </div>
          </div>

          <div className="p-8 md:p-12 flex-1">
            {step === 1 && (
              /* --- VIEW 1: PROFILE --- */
              <form className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: "FIRST NAME", name: "firstName", icon: "fa-user", placeholder: "e.g. Martha" },
                    { label: "LAST NAME", name: "lastName", icon: "fa-user", placeholder: "e.g. Stewart" },
                    { label: "BIRTH DATE", name: "birthDate", icon: "fa-calendar", type: "date" },
                    { label: "MOBILE NO.", name: "mobileNo", icon: "fa-phone", placeholder: "e.g. 97599984111" },
                    { label: "EMAIL ADDRESS", name: "email", icon: "fa-envelope", placeholder: "e.g. martha.stewart@test.com" },
                    { label: "USERNAME", name: "username", icon: "fa-at", placeholder: "e.g. martha_s" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">{field.label} {field.name !== 'email' && <span className="text-red-500 font-bold">*</span>}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon={field.icon} /></span>
                        <Input name={field.name} type={field.type || "text"} onChange={handleInputChange} className="pl-12 border-gray-200 rounded-xl h-14" placeholder={field.placeholder} />
                      </div>
                    </div>
                  ))}
                  {/* Password masking */}
                  <div className="space-y-2 relative">
                    <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">PASSWORD <span className="text-red-500 font-bold">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon="fa-lock" /></span>
                      <Input name="password" onChange={handleInputChange} type={showPassword ? "text" : "password"} className="px-12 border-gray-200 rounded-xl h-14" />
                      {!formData.password && <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-xl tracking-[0.2em] pointer-events-none">••••••••••••</span>}
                      <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"><FontIcon icon={showPassword ? "fa-eye-slash" : "fa-eye"} /></span>
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">CONFIRM PASSWORD <span className="text-red-500 font-bold">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon="fa-lock" /></span>
                      <Input name="confirmPassword" onChange={handleInputChange} type={showConfirmPassword ? "text" : "password"} className="px-12 border-gray-200 rounded-xl h-14" />
                      {!formData.confirmPassword && <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-xl tracking-[0.2em] pointer-events-none">••••••••••••</span>}
                      <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"><FontIcon icon={showConfirmPassword ? "fa-eye-slash" : "fa-eye"} /></span>
                    </div>
                  </div>
                </div>

                {/* Engaging ID Preview */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">SENIOR CITIZEN ID <span className="text-red-500 font-bold">*</span></label>
                  <input type="file" hidden ref={fileInputRef} accept="image/png, image/jpeg" onChange={handleFileChange} />
                  <div onClick={() => !idPreview && fileInputRef.current.click()} className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all min-h-[180px] ${idPreview ? 'border-green-500 bg-white' : 'border-[#FFB703] bg-[#FFFBEB] cursor-pointer hover:bg-[#FEF3C7]'}`}>
                    {idPreview ? (
                      <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">
                        <img src={idPreview} alt="Preview" className="h-32 rounded-lg shadow-md mb-3 object-cover" />
                        <button onClick={(e) => { e.stopPropagation(); setIdPreview(null); }} className="text-red-500 text-xs font-bold uppercase hover:underline">Remove Image</button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-[#FFB703] p-4 rounded-full mb-4 text-white"><FontIcon icon="fa-cloud-arrow-up" /></div>
                        <p className="text-[#FB8500] font-bold text-base">Click to Upload Photo</p>
                        <p className="text-gray-400 text-xs mt-1 font-semibold uppercase">JPG or PNG, Max 5MB.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Checkbox following specific phrasing */}
                <div className="flex items-center gap-3 pt-4">
                  <input type="checkbox" onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[#FB8500] cursor-pointer" id="terms" />
                  <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer font-medium leading-tight">
                    I acknowledge and expressly agree to the <span className="text-blue-600 font-bold hover:underline">Terms & Agreements</span> provided by ElderKey.
                  </label>
                </div>

                <Button onClick={() => setStep(2)} disabled={!isProfileValid} className={`w-full h-16 rounded-2xl font-bold text-xl transition-all cursor-pointer ${isProfileValid ? 'bg-[#FFB703] hover:bg-[#FB8500] text-white shadow-lg shadow-[#FFB703]/30' : 'bg-gray-200 text-gray-400'}`}>Continue</Button>
              </form>
            )}

            {step === 2 && (
              /* --- VIEW 2: VERIFICATION --- */
              <div className="flex flex-col items-center text-center space-y-8 animate-in slide-in-from-right duration-500 py-10">
                <div className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#34A853] text-4xl shadow-sm"><FontIcon icon="fa-shield-halved" /></div>
                <div className="space-y-2">
                  <h2 className="font-['Merriweather'] text-3xl font-bold text-[#023047]">Verify Your Mobile</h2>
                  <p className="text-[#52796F] max-w-sm mx-auto">We've sent a 6-digit verification code to your mobile ending in <span className="font-bold">***{formData.mobileNo.slice(-4) || '4111'}</span>.</p>
                </div>
                <div className="flex gap-4 justify-center py-4">
                  {otp.map((data, index) => (
                    <input key={index} type="text" maxLength="1" className="w-14 h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold text-[#023047] focus:border-[#FFB703] outline-none" value={data} onChange={e => handleOtpChange(e.target, index)} />
                  ))}
                </div>
                <Button onClick={() => setStep(3)} className="w-full h-16 bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FFB703]/30 cursor-pointer max-w-md">Verify & Continue</Button>
                <p className="text-sm text-gray-500">Didn't receive the code? <span className="text-[#52796F] font-bold cursor-pointer hover:underline">Resend code</span></p>
              </div>
            )}

            {step === 3 && (
              /* --- VIEW 3: PLAN SELECTION --- */
              <div className="flex flex-col items-center animate-in slide-in-from-bottom duration-500">
                <div className="text-center mb-10">
                  <h2 className="font-['Merriweather'] text-3xl font-bold text-[#023047] mb-2">Select Your Plan</h2>
                  <p className="text-[#52796F]">Choose the membership that fits your lifestyle</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
                  {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.name;
                    return (
                      <div key={plan.name} onClick={() => setSelectedPlan(plan.name)} className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer h-full ${isSelected ? 'border-[#FFB703] bg-white shadow-2xl scale-105 z-20' : 'border-gray-100 bg-white shadow-md hover:border-gray-300 opacity-95'}`}>
                        {plan.recommended && <div className="absolute -top-4 -right-2 bg-[#FFB703] text-white px-4 py-1 rounded-lg text-xs font-bold shadow-md z-30">Recommended</div>}
                        {isSelected && <div className="absolute -top-3 -left-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-in zoom-in"><FontIcon icon="fa-check" /></div>}
                        <div className="mb-6">
                          <h3 className={`text-sm font-bold uppercase tracking-widest mb-1 ${plan.titleColor}`}>{plan.name}</h3>
                          <div className="flex items-baseline text-[#023047]">
                            <span className="text-4xl font-black">${plan.price}</span>
                            <span className="text-gray-400 font-medium ml-1">/mo</span>
                          </div>
                        </div>
                        <div className="space-y-4 mb-8 flex-1">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="text-green-500 text-xs"><FontIcon icon="fa-check" /></div>
                              <span className="text-sm text-[#023047] font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button onClick={(e) => { e.stopPropagation(); if(isSelected) setShowModal(true); else setSelectedPlan(plan.name); }} className={`w-full h-12 rounded-xl font-bold transition-all cursor-pointer ${isSelected ? 'bg-[#FFB703] hover:bg-[#FB8500] text-white' : 'bg-white border border-gray-200 text-[#023047]'}`}>Select</Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-lg bg-[#FAF9F6] border-none rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300 relative">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl shadow-lg mb-4"><FontIcon icon="fa-check" /></div>
              <h2 className="font-['Merriweather'] text-2xl font-bold text-[#023047]">Confirm Registration</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-[#EEF6FC] border border-[#8ECAE6]/30 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#023047] uppercase tracking-wider mb-4">Profile Details</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <span className="text-gray-500 font-medium">Name:</span>
                  <span className="text-[#023047] font-bold text-right">{formData.firstName} {formData.lastName || 'Stewart'}</span>
                  <span className="text-gray-500 font-medium">Email:</span>
                  <span className="text-[#023047] font-bold text-right truncate pl-4">{formData.email || 'martha.stewart@test.com'}</span>
                  <span className="text-gray-500 font-medium">Mobile:</span>
                  <span className="text-[#023047] font-bold text-right">{formData.mobileNo || '097599984111'}</span>
                </div>
              </div>
              <div className="bg-[#FFFBEB] border border-[#FFB703]/20 rounded-2xl p-6 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Plan Name</span>
                  <span className="text-xl font-bold text-[#023047]">{selectedPlan}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</span>
                  <span className="text-xl font-bold text-[#FB8500]">${plans.find(p => p.name === selectedPlan)?.price}/mo</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <Button onClick={() => setShowModal(false)} className="flex-1 h-14 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold transition-all cursor-pointer">Back</Button>
              <Button className="flex-[2] h-14 bg-[#FFB703] hover:bg-[#FB8500] text-[#023047] rounded-2xl font-black text-lg shadow-lg cursor-pointer">Confirm & Join</Button>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}