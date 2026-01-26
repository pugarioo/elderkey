"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DottedBg from "@/components/custom/dottedBg";
import FontIcon from "@/components/icons/FontIcon";

// --- SUB-COMPONENTS ---

const StepIndicator = ({ step }) => (
  <div className="w-full py-12 flex items-center justify-center border-b border-gray-50 bg-white">
    <div className="flex items-center gap-1">
      <StepNode step={step} targetStep={1} label="Profile" />
      <StepConnector step={step} targetStep={1} />
      <StepNode step={step} targetStep={2} label="Verify" />
      <StepConnector step={step} targetStep={2} />
      <StepNode step={step} targetStep={3} label="Plan" />
    </div>
  </div>
);

const StepNode = ({ step, targetStep, label }) => {
  const isCompleted = step > targetStep;
  const isCurrent = step === targetStep;
  const isFuture = step < targetStep;

  let bgClass = isFuture ? 'bg-[#BCC1C8]' : isCurrent ? 'bg-[#FFB703]' : 'bg-green-500';
  let textClass = isFuture ? 'text-white' : 'text-white';
  let shadowClass = isCurrent ? 'shadow-lg shadow-[#FFB703]/30' : isCompleted ? 'shadow-lg' : '';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${bgClass} ${textClass} ${shadowClass}`}>
        {isCompleted ? <FontIcon icon="fa-check" /> : targetStep}
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-widest ${isCompleted ? 'text-green-500' : isCurrent ? 'text-[#FFB703]' : 'text-[#9CA3AF]'}`}>{label}</span>
    </div>
  );
};

const StepConnector = ({ step, targetStep }) => (
  <div className="flex gap-4 px-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${step > targetStep ? 'bg-green-500' : targetStep === 1 ? 'bg-[#FFB703]' : 'bg-[#BCC1C8]'}`} />
    ))}
  </div>
);


const StandardProfileForm = ({ formData, handleInputChange, fileInputRef, handleFileChange, idPreview, setIdPreview, agreed, setAgreed, isProfileValid, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
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
            <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
              {field.label} {field.name !== 'email' && <span className="text-red-500 font-bold">*</span>}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon={field.icon} /></span>
              <Input name={field.name} type={field.type || "text"} value={formData[field.name]} onChange={handleInputChange} className="pl-12 border-gray-200 rounded-xl h-14" placeholder={field.placeholder} />
            </div>
          </div>
        ))}

        {/* Passwords */}
        <PasswordField label="PASSWORD" name="password" value={formData.password} onChange={handleInputChange} show={showPassword} toggle={() => setShowPassword(!showPassword)} />
        <PasswordField label="CONFIRM PASSWORD" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} />
      </div>

      <IDUploadSection fileInputRef={fileInputRef} handleFileChange={handleFileChange} idPreview={idPreview} setIdPreview={setIdPreview} />

      <TermsCheckbox agreed={agreed} setAgreed={setAgreed} />

      <Button onClick={onNext} disabled={!isProfileValid} className={`w-full h-16 rounded-2xl font-bold text-xl transition-all cursor-pointer ${isProfileValid ? 'bg-[#FFB703] hover:bg-[#FB8500] text-white shadow-lg shadow-[#FFB703]/30' : 'bg-gray-200 text-gray-400'}`}>Continue</Button>
    </form>
  );
};


const WizardProfileForm = ({ formData, handleInputChange, fileInputRef, handleFileChange, idPreview, setIdPreview, agreed, setAgreed, isProfileValid, onNext }) => {
  const [wizardStep, setWizardStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nextStep = () => {
    if (wizardStep < 6) setWizardStep(prev => prev + 1);
    else if (isProfileValid) onNext();
  };

  const prevStep = () => setWizardStep(prev => prev - 1);

  const isStepValid = () => {
    switch (wizardStep) {
      case 1: return formData.firstName && formData.lastName;
      case 2: return formData.email;
      case 3: return formData.birthDate;
      case 4: return formData.mobileNo;
      case 5: return formData.password && formData.confirmPassword;
      case 6: return formData.username && idPreview && agreed;
      default: return false;
    }
  };

  const titles = [
    "What is your name?",
    "What is your email address?",
    "When is your birthday?",
    "What is your mobile number?",
    "Create a secure password.",
    "Upload your ID."
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h3 className="text-[#023047] font-serif font-bold text-2xl mb-1">
          STEP <span className="text-[#FFB703]">{wizardStep}</span> OF 6
        </h3>
        <h2 className="text-[#52796F] text-xl md:text-2xl">{titles[wizardStep - 1]}</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full space-y-6">
        {wizardStep === 1 && (
          <>
            <InputField label="FIRST NAME" name="firstName" icon="fa-user" value={formData.firstName} onChange={handleInputChange} placeholder="e.g. Martha" autoFocus />
            <InputField label="LAST NAME" name="lastName" icon="fa-user" value={formData.lastName} onChange={handleInputChange} placeholder="e.g. Stewart" />
          </>
        )}
        {wizardStep === 2 && <InputField label="EMAIL ADDRESS" name="email" icon="fa-envelope" value={formData.email} onChange={handleInputChange} placeholder="e.g. email@test.com" autoFocus />}
        {wizardStep === 3 && (
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">BIRTH DATE</label>
            <Input name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} className="pl-4 border-gray-200 rounded-xl h-16 text-lg w-full" autoFocus />
          </div>
        )}
        {wizardStep === 4 && <InputField label="MOBILE NO." name="mobileNo" icon="fa-phone" value={formData.mobileNo} onChange={handleInputChange} placeholder="e.g. 975..." autoFocus />}
        {wizardStep === 5 && (
          <>
            <PasswordField label="PASSWORD" name="password" value={formData.password} onChange={handleInputChange} show={showPassword} toggle={() => setShowPassword(!showPassword)} size="lg" autoFocus />
            <PasswordField label="CONFIRM PASSWORD" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} show={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} size="lg" />
          </>
        )}
        {wizardStep === 6 && (
          <>
            <InputField label="USERNAME" name="username" icon="fa-at" value={formData.username} onChange={handleInputChange} placeholder="e.g. martha_s" autoFocus />
            <IDUploadSection fileInputRef={fileInputRef} handleFileChange={handleFileChange} idPreview={idPreview} setIdPreview={setIdPreview} small />
            <TermsCheckbox agreed={agreed} setAgreed={setAgreed} />
          </>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4 pt-6">
        <Button onClick={nextStep} disabled={!isStepValid()} className="w-full max-w-sm h-16 bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FFB703]/30 cursor-pointer flex items-center justify-center gap-2">
          {wizardStep === 6 ? "Finish & Verify" : "Next"} <FontIcon icon="fa-chevron-right" />
        </Button>
        {wizardStep > 1 && (
          <button onClick={prevStep} className="text-[#023047] font-bold text-sm hover:underline flex items-center gap-2">
            <FontIcon icon="fa-arrow-left" /> Back to Previous Step
          </button>
        )}
        <div className="text-center mt-2">
          <span className="text-gray-400">Already have an account? </span>
          <span className="text-[#FFB703] font-bold cursor-pointer hover:underline">Log in.</span>
        </div>
      </div>
    </div>
  );
};


const VerificationStep = ({ formData, otp, handleOtpChange, onNext }) => (
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
    <Button onClick={onNext} className="w-full h-16 bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FFB703]/30 cursor-pointer max-w-md">Verify & Continue</Button>
    <p className="text-sm text-gray-500">Didn't receive the code? <span className="text-[#52796F] font-bold cursor-pointer hover:underline">Resend code</span></p>
  </div>
);


const PlanSelectionStep = ({ plans, selectedPlan, setSelectedPlan, setShowModal }) => (
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
            <Button onClick={(e) => { e.stopPropagation(); if (isSelected) setShowModal(true); else setSelectedPlan(plan.name); }} className={`w-full h-12 rounded-xl font-bold transition-all cursor-pointer ${isSelected ? 'bg-[#FFB703] hover:bg-[#FB8500] text-white' : 'bg-white border border-gray-200 text-[#023047]'}`}>Select</Button>
          </div>
        );
      })}
    </div>
  </div>
);


const ConfirmationModal = ({ onClose, formData, selectedPlan, plans }) => (
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
        <Button onClick={onClose} className="flex-1 h-14 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold transition-all cursor-pointer">Back</Button>
        <Button className="flex-[2] h-14 bg-[#FFB703] hover:bg-[#FB8500] text-[#023047] rounded-2xl font-black text-lg shadow-lg cursor-pointer">Confirm & Join</Button>
      </div>
    </Card>
  </div>
);

// --- HELPERS ---

const InputField = ({ label, name, icon, value, onChange, placeholder, autoFocus }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">{label} <span className="text-red-500">*</span></label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon={icon} /></span>
      <Input name={name} value={value} onChange={onChange} className="pl-12 border-gray-200 rounded-xl h-16 text-lg" placeholder={placeholder} autoFocus={autoFocus} />
    </div>
  </div>
);

const PasswordField = ({ label, name, value, onChange, show, toggle, size = "md", autoFocus }) => (
  <div className="space-y-2 relative">
    <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">{label} <span className="text-red-500 font-bold">*</span></label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FontIcon icon="fa-lock" /></span>
      <Input name={name} onChange={onChange} value={value} type={show ? "text" : "password"} className={`px-12 border-gray-200 rounded-xl ${size === "lg" ? "h-16 text-lg" : "h-14"}`} autoFocus={autoFocus} />
      {!value && <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-xl tracking-[0.2em] pointer-events-none">••••••••••••</span>}
      <span onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"><FontIcon icon={show ? "fa-eye-slash" : "fa-eye"} /></span>
    </div>
  </div>
);

const IDUploadSection = ({ fileInputRef, handleFileChange, idPreview, setIdPreview, small }) => (
  <div className="space-y-2 pt-2">
    <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">SENIOR CITIZEN ID <span className="text-red-500 font-bold">*</span></label>
    <input type="file" hidden ref={fileInputRef} accept="image/png, image/jpeg" onChange={handleFileChange} />
    <div onClick={() => !idPreview && fileInputRef.current.click()} className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${small ? 'min-h-[160px]' : 'min-h-[180px]'} ${idPreview ? 'border-green-500 bg-white' : 'border-[#FFB703] bg-[#FFFBEB] cursor-pointer hover:bg-[#FEF3C7]'}`}>
      {idPreview ? (
        <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">
          <img src={idPreview} alt="Preview" className={`${small ? 'h-28' : 'h-32'} rounded-lg shadow-md mb-3 object-cover`} />
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
);

const TermsCheckbox = ({ agreed, setAgreed }) => (
  <div className="flex items-center gap-3 pt-4">
    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[#FB8500] cursor-pointer" id="terms" />
    <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer font-medium leading-tight">
      I acknowledge and expressly agree to the <span className="text-blue-600 font-bold hover:underline">Terms & Agreements</span> provided by ElderKey.
    </label>
  </div>
);


// --- MAIN COMPONENT ---

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Silver");
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isWizardMode, setIsWizardMode] = useState(false);
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
          <StepIndicator step={step} />

          <div className="p-8 md:p-12 flex-1">
            {step === 1 && (isWizardMode ? (
              <WizardProfileForm
                formData={formData}
                handleInputChange={handleInputChange}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                idPreview={idPreview}
                setIdPreview={setIdPreview}
                agreed={agreed}
                setAgreed={setAgreed}
                isProfileValid={isProfileValid}
                onNext={() => setStep(2)}
              />
            ) : (
              <StandardProfileForm
                formData={formData}
                handleInputChange={handleInputChange}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                idPreview={idPreview}
                setIdPreview={setIdPreview}
                agreed={agreed}
                setAgreed={setAgreed}
                isProfileValid={isProfileValid}
                onNext={() => setStep(2)}
              />
            ))}

            {step === 2 && (
              <VerificationStep
                formData={formData}
                otp={otp}
                handleOtpChange={handleOtpChange}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <PlanSelectionStep
                plans={plans}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wizard Mode Toggle */}
      <button
        onClick={() => setIsWizardMode(!isWizardMode)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#023047] hover:bg-[#FFB703] text-white hover:text-[#023047] rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 z-50 group cursor-pointer"
        title="Toggle Wizard Mode"
      >
        <FontIcon icon="fa-wand-magic-sparkles" className="group-hover:rotate-12 transition-transform" />
      </button>

      {showModal && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          formData={formData}
          selectedPlan={selectedPlan}
          plans={plans}
        />
      )}
    </main>
  );
}