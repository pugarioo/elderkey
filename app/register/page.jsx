"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DottedBg from "@/components/custom/dottedBg";
import FontIcon from "@/components/icons/FontIcon";
import { useFriction } from "@/context/FrictionContext";
import RescueBubble from "@/components/custom/RescueBubble";
import { useUser } from "@/context/UserContext";

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

    let bgClass = isFuture
        ? "bg-[#BCC1C8]"
        : isCurrent
            ? "bg-[#FFB703]"
            : "bg-green-500";
    let textClass = isFuture ? "text-white" : "text-white";
    let shadowClass = isCurrent
        ? "shadow-lg shadow-[#FFB703]/30"
        : isCompleted
            ? "shadow-lg"
            : "";

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${bgClass} ${textClass} ${shadowClass}`}
            >
                {isCompleted ? <FontIcon icon="fa-check" /> : targetStep}
            </div>
            <span
                className={`text-[11px] font-bold uppercase tracking-widest ${isCompleted ? "text-green-500" : isCurrent ? "text-[#FFB703]" : "text-[#9CA3AF]"}`}
            >
                {label}
            </span>
        </div>
    );
};

const StepConnector = ({ step, targetStep }) => (
    <div className="flex gap-4 px-6">
        {[...Array(6)].map((_, i) => (
            <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${step > targetStep ? "bg-green-500" : targetStep === 1 ? "bg-[#FFB703]" : "bg-[#BCC1C8]"}`}
            />
        ))}
    </div>
);

const StandardProfileForm = ({
    register,
    errors,
    fileInputRef,
    handleFileChange,
    idPreview,
    setIdPreview,
    watch,
    setValue,
    isValid,
    onNext,
    onOpenTerms,
    touchedFields,
    dirtyFields,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const agreed = watch('termsAccepted');

    return (
        <form className="space-y-6 animate-in fade-in duration-500" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                    { label: "FIRST NAME", name: "firstName", icon: "fa-user", placeholder: "e.g. Martha" },
                    { label: "LAST NAME", name: "lastName", icon: "fa-user", placeholder: "e.g. Stewart" },
                    { label: "BIRTH DATE", name: "birthDate", icon: "fa-calendar", type: "date" },
                    { label: "MOBILE NO.", name: "mobileNo", icon: "fa-phone", placeholder: "e.g. 97599984111" },
                    { label: "EMAIL ADDRESS", name: "email", icon: "fa-envelope", placeholder: "e.g. martha.stewart@test.com" },
                    { label: "USERNAME", name: "username", icon: "fa-at", placeholder: "e.g. martha_s" },
                ].map((field) => (
                    <div key={field.name}>
                        {field.name === "birthDate" ? (
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
                                    {field.label} <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FontIcon icon={field.icon} />
                                    </span>
                                    <Input
                                        type="date"
                                        {...register(field.name)}
                                        className={`pl-12 rounded-xl h-14 border-2 transition-all duration-200
                                            ${errors[field.name]
                                                ? "border-red-500"
                                                : "border-gray-200"
                                            }`}
                                    />
                                </div>
                                {errors[field.name] && <p className="text-red-500 text-xs font-bold animate-in slide-in-from-left-1">{errors[field.name].message}</p>}
                            </div>
                        ) : (
                            <InputField
                                label={field.label}
                                name={field.name}
                                icon={field.icon}
                                register={register}
                                error={errors[field.name]}
                                placeholder={field.placeholder}
                            />
                        )}
                    </div>
                ))}

                <PasswordField
                    label="PASSWORD"
                    name="password"
                    register={register}
                    error={errors.password}
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                />
                <PasswordField
                    label="CONFIRM PASSWORD"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                    show={showConfirmPassword}
                    toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
            </div>

            <IDUploadSection
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                idPreview={idPreview}
                setIdPreview={setIdPreview}
            />

            <TermsCheckbox
                register={register}
                onOpenTerms={onOpenTerms}
                error={errors.termsAccepted}
            />

            <Button
                type="submit"
                disabled={!isValid || !idPreview}
                className={`w-full h-16 rounded-2xl font-bold text-xl transition-all cursor-pointer ${isValid && idPreview ? "bg-[#FFB703] hover:bg-[#FB8500] text-white shadow-lg shadow-[#FFB703]/30" : "bg-gray-200 text-gray-400"}`}
            >
                Continue
            </Button>
        </form >
    );
};

const WizardProfileForm = ({
    register,
    errors,
    trigger,
    watch,
    setValue,
    fileInputRef,
    handleFileChange,
    idPreview,
    setIdPreview,
    onNext,
    onOpenTerms,
}) => {
    const [wizardStep, setWizardStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isValid = watch('isValid'); // Not really working like this, need to rely on trigger

    const nextStep = async () => {
        let fieldsToValidate = [];
        switch (wizardStep) {
            case 1: fieldsToValidate = ['firstName', 'lastName']; break;
            case 2: fieldsToValidate = ['email']; break;
            case 3: fieldsToValidate = ['birthDate']; break;
            case 4: fieldsToValidate = ['mobileNo']; break;
            case 5: fieldsToValidate = ['password', 'confirmPassword']; break;
            case 6: fieldsToValidate = ['username', 'termsAccepted']; break;
        }

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            if (wizardStep < 6) setWizardStep((prev) => prev + 1);
            else if (idPreview) onNext();
            else toast.error("Please upload your ID");
        }
    };

    const prevStep = () => setWizardStep((prev) => prev - 1);

    const titles = [
        "What is your name?",
        "What is your email address?",
        "When is your birthday?",
        "What is your mobile number?",
        "Create a secure password.",
        "Upload your ID.",
    ];

    return (
        <div className="flex flex-col h-full animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-8">
                <h3 className="text-[#023047] font-serif font-bold text-2xl mb-1">
                    STEP <span className="text-[#FFB703]">{wizardStep}</span> OF 6
                </h3>
                <h2 className="text-[#52796F] text-xl md:text-2xl">
                    {titles[wizardStep - 1]}
                </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full space-y-6">
                {wizardStep === 1 && (
                    <>
                        <InputField
                            label="FIRST NAME"
                            name="firstName"
                            icon="fa-user"
                            register={register}
                            error={errors.firstName}

                            placeholder="e.g. Martha"
                            autoFocus
                        />
                        <InputField
                            label="LAST NAME"
                            name="lastName"
                            icon="fa-user"
                            register={register}
                            error={errors.lastName}

                            placeholder="e.g. Stewart"
                        />
                    </>
                )}
                {wizardStep === 2 && (
                    <InputField
                        label="EMAIL ADDRESS"
                        name="email"
                        icon="fa-envelope"
                        register={register}
                        error={errors.email}

                        placeholder="e.g. email@test.com"
                        autoFocus
                    />
                )}
                {wizardStep === 3 && (
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
                            BIRTH DATE
                        </label>
                        <Input
                            type="date"
                            {...register('birthDate')}
                            className={`pl-4 border-gray-200 rounded-xl h-16 text-lg w-full ${errors.birthDate ? "border-red-500" : ""}`}
                            autoFocus
                        />
                        {errors.birthDate && <p className="text-red-500 text-xs font-bold">{errors.birthDate.message}</p>}
                    </div>
                )}
                {wizardStep === 4 && (
                    <InputField
                        label="MOBILE NO."
                        name="mobileNo"
                        icon="fa-phone"
                        register={register}
                        error={errors.mobileNo}

                        placeholder="e.g. 975..."
                        autoFocus
                    />
                )}
                {wizardStep === 5 && (
                    <>
                        <PasswordField
                            label="PASSWORD"
                            name="password"
                            register={register}
                            error={errors.password}

                            show={showPassword}
                            toggle={() => setShowPassword(!showPassword)}
                            size="lg"
                            autoFocus
                        />
                        <PasswordField
                            label="CONFIRM PASSWORD"
                            name="confirmPassword"
                            register={register}
                            error={errors.confirmPassword}

                            show={showConfirmPassword}
                            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            size="lg"
                        />
                    </>
                )}
                {wizardStep === 6 && (
                    <>
                        <InputField
                            label="USERNAME"
                            name="username"
                            icon="fa-at"
                            register={register}
                            error={errors.username}

                            placeholder="e.g. martha_s"
                            autoFocus
                        />
                        <IDUploadSection
                            fileInputRef={fileInputRef}
                            handleFileChange={handleFileChange}
                            idPreview={idPreview}
                            setIdPreview={setIdPreview}
                            small
                        />
                        <TermsCheckbox
                            register={register}
                            onOpenTerms={onOpenTerms}
                            error={errors.termsAccepted}
                        />
                    </>
                )}
            </div>

            <div className="flex flex-col items-center space-y-4 pt-6">
                <Button
                    onClick={nextStep}
                    className="w-full max-w-sm h-16 bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FFB703]/30 cursor-pointer flex items-center justify-center gap-2"
                >
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
        <div className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#34A853] text-4xl shadow-sm">
            <FontIcon icon="fa-shield-halved" />
        </div>
        <div className="space-y-2">
            <h2 className="font-['Merriweather'] text-3xl font-bold text-[#023047]">
                Verify Your Mobile
            </h2>
            <p className="text-[#52796F] max-w-sm mx-auto">
                We&apos;ve sent a 6-digit verification code to your mobile
                ending in{" "}
                <span className="font-bold">
                    ***{formData.mobileNo.slice(-4) || "4111"}
                </span>
                .
            </p>
        </div>
        <div className="flex gap-4 justify-center py-4">
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-14 h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold text-[#023047] focus:border-[#FFB703] outline-none"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                />
            ))}
        </div>
        <Button
            onClick={onNext}
            className="w-full h-16 bg-[#FFB703] hover:bg-[#FB8500] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#FFB703]/30 cursor-pointer max-w-md"
        >
            Verify & Continue
        </Button>
        <p className="text-sm text-gray-500">
            Didn&apos;t receive the code?{" "}
            <span className="text-[#52796F] font-bold cursor-pointer hover:underline">
                Resend code
            </span>
        </p>
    </div>
);

const PlanSelectionStep = ({
    plans,
    selectedPlan,
    setSelectedPlan,
    setShowModal,
}) => (
    <div className="flex flex-col items-center animate-in slide-in-from-bottom duration-500">
        <div className="text-center mb-10">
            <h2 className="font-['Merriweather'] text-3xl font-bold text-[#023047] mb-2">
                Select Your Plan
            </h2>
            <p className="text-[#52796F]">
                Choose the membership that fits your lifestyle
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
            {plans.map((plan) => {
                const isSelected = selectedPlan === plan.name;
                return (
                    <div
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer h-full ${isSelected ? "border-[#FFB703] bg-white shadow-2xl scale-105 z-20" : "border-gray-100 bg-white shadow-md hover:border-gray-300 opacity-95"}`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 -right-2 bg-[#FFB703] text-white px-4 py-1 rounded-lg text-xs font-bold shadow-md z-30">
                                Recommended
                            </div>
                        )}
                        {isSelected && (
                            <div className="absolute -top-3 -left-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-in zoom-in">
                                <FontIcon icon="fa-check" />
                            </div>
                        )}
                        <div className="mb-6">
                            <h3
                                className={`text-sm font-bold uppercase tracking-widest mb-1 ${plan.titleColor}`}
                            >
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline text-[#023047]">
                                <span className="text-4xl font-black">
                                    ${plan.price}
                                </span>
                                <span className="text-gray-400 font-medium ml-1">
                                    /mo
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3"
                                >
                                    <div className="text-green-500 text-xs">
                                        <FontIcon icon="fa-check" />
                                    </div>
                                    <span className="text-sm text-[#023047] font-medium">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isSelected) setShowModal(true);
                                else setSelectedPlan(plan.name);
                            }}
                            className={`w-full h-12 rounded-xl font-bold transition-all cursor-pointer ${isSelected ? "bg-[#FFB703] hover:bg-[#FB8500] text-white" : "bg-white border border-gray-200 text-[#023047]"}`}
                        >
                            Select
                        </Button>
                    </div>
                );
            })}
        </div>
    </div>
);

const ConfirmationModal = ({ onClose, onConfirm, formData, selectedPlan, plans, isLoading }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-lg bg-[#FAF9F6] border-none rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300 relative">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl shadow-lg mb-4">
                        <FontIcon icon="fa-check" />
                    </div>
                    <h2 className="font-['Merriweather'] text-2xl font-bold text-[#023047]">
                        Confirm Registration
                    </h2>
                </div>
                <div className="space-y-6">
                    <div className="bg-[#EEF6FC] border border-[#8ECAE6]/30 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-[#023047] uppercase tracking-wider mb-4">
                            Profile Details
                        </h3>
                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <span className="text-gray-500 font-medium">Name:</span>
                            <span className="text-[#023047] font-bold text-right">
                                {formData.firstName} {formData.lastName}
                            </span>
                            <span className="text-gray-500 font-medium">Email:</span>
                            <span className="text-[#023047] font-bold text-right truncate pl-4">
                                {formData.email}
                            </span>
                            <span className="text-gray-500 font-medium">Mobile:</span>
                            <span className="text-[#023047] font-bold text-right">
                                {formData.mobileNo}
                            </span>
                        </div>
                    </div>
                    <div className="bg-[#FFFBEB] border border-[#FFB703]/20 rounded-2xl p-6 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Plan Name
                            </span>
                            <span className="text-xl font-bold text-[#023047]">
                                {selectedPlan}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</span>
                            <span className="text-xl font-bold text-[#FB8500]">
                                ${plans.find((p) => p.name === selectedPlan)?.price}/mo
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-10">
                    <Button onClick={onClose} className="flex-1 h-14 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold transition-all cursor-pointer" disabled={isLoading}>
                        Back
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} className="flex-[2] h-14 bg-[#FFB703] hover:bg-[#FB8500] text-[#023047] rounded-2xl font-black text-lg shadow-lg cursor-pointer">
                        {isLoading ? 'Creating Account...' : 'Confirm & Join'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

const TermsModal = ({ onClose }) => (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
        <Card className="w-full max-w-2xl bg-white border-none rounded-[2rem] shadow-2xl p-8 animate-in zoom-in duration-300 relative h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Merriweather'] text-2xl font-bold text-[#023047]">
                    Terms & Agreements
                </h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <FontIcon icon="fa-xmark" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 space-y-4 text-justify text-[#52796F] text-sm leading-relaxed custom-scrollbar">
                <p>Welcome to ElderKey. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>

                <h3 className="font-bold text-[#023047]">1. Service Description</h3>
                <p>ElderKey provides a digital concierge and benefits platform for senior citizens. Our services include digital ID management, partner directory access, and membership benefits.</p>

                <h3 className="font-bold text-[#023047]">2. User Responsibilities</h3>
                <p>You agree to provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                <h3 className="font-bold text-[#023047]">3. Privacy Policy</h3>
                <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our service, you agree to our data practices.</p>

                <h3 className="font-bold text-[#023047]">4. Membership Plans</h3>
                <p>Membership benefits vary by plan (Bronze, Silver, Gold). We reserve the right to modify plan features or pricing with reasonable notice.</p>

                <h3 className="font-bold text-[#023047]">5. Acceptable Use</h3>
                <p>You agree not to misuse our platform, including but not limited to attempted unauthorized access, data scraping, or using the service for illegal purposes.</p>

                <h3 className="font-bold text-[#023047]">6. Limitation of Liability</h3>
                <p>ElderKey is not liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the service.</p>

                <h3 className="font-bold text-[#023047]">7. Changes to Terms</h3>
                <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                <Button
                    onClick={onClose}
                    className="px-8 h-12 bg-[#FFB703] hover:bg-[#FB8500] text-[#023047] rounded-xl font-bold shadow-lg cursor-pointer"
                >
                    I Understand
                </Button>
            </div>
        </Card>
    </div>
);

// --- HELPERS ---

const InputField = ({ label, name, icon, register, error, placeholder, autoFocus }) => (
    <div className="space-y-2">
        <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
            {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FontIcon icon={icon} />
            </span>
            <Input
                {...register(name)}
                className={`pl-12 rounded-xl h-16 text-lg transition-all duration-200 border-2
                    ${error ? "border-red-500" : "border-gray-200"}`}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
        </div>
        {error && <p className="text-red-500 text-xs font-bold animate-in slide-in-from-left-1">{error.message}</p>}
    </div>
);

const PasswordField = ({ label, name, register, error, show, toggle, size = "md", autoFocus }) => (
    <div className="space-y-2 relative">
        <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
            {label} <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FontIcon icon="fa-lock" />
            </span>
            <Input
                type={show ? "text" : "password"}
                {...register(name)}
                className={`px-12 rounded-xl transition-all duration-200 border-2
                    ${size === "lg" ? "h-16 text-lg" : "h-14"} 
                    ${error ? "border-red-500" : "border-gray-200"}`}
                autoFocus={autoFocus}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span
                    onClick={toggle}
                    className="text-gray-400 cursor-pointer hover:text-[#023047] transition-colors"
                >
                    <FontIcon icon={show ? "fa-eye-slash" : "fa-eye"} />
                </span>
            </div>
        </div>
        {error && <p className="text-red-500 text-xs font-bold animate-in slide-in-from-left-1">{error.message}</p>}
    </div>
);

const IDUploadSection = ({
    fileInputRef,
    handleFileChange,
    idPreview,
    setIdPreview,
    small,
}) => (
    <div className="space-y-2 pt-2">
        <label className="text-[11px] font-bold text-[#023047] uppercase tracking-wide">
            SENIOR CITIZEN ID <span className="text-red-500 font-bold">*</span>
        </label>
        <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
        />
        <div
            onClick={() => !idPreview && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${small ? "min-h-[160px]" : "min-h-[180px]"} ${idPreview ? "border-green-500 bg-white" : "border-[#FFB703] bg-[#FFFBEB] cursor-pointer hover:bg-[#FEF3C7]"}`}
        >
            {idPreview ? (
                <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">
                    <img
                        src={idPreview}
                        alt="Preview"
                        className={`${small ? "h-28" : "h-32"} rounded-lg shadow-md mb-3 object-cover`}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIdPreview(null);
                        }}
                        className="text-red-500 text-xs font-bold uppercase hover:underline"
                    >
                        Remove Image
                    </button>
                </div>
            ) : (
                <>
                    <div className="bg-[#FFB703] p-4 rounded-full mb-4 text-white">
                        <FontIcon icon="fa-cloud-arrow-up" />
                    </div>
                    <p className="text-[#FB8500] font-bold text-base">
                        Click to Upload Photo
                    </p>
                    <p className="text-gray-400 text-xs mt-1 font-semibold uppercase">
                        JPG or PNG, Max 5MB.
                    </p>
                </>
            )}
        </div>
    </div>
);

const TermsCheckbox = ({ register, onOpenTerms, error }) => (
    <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                {...register("termsAccepted")}
                className="w-5 h-5 rounded border-gray-300 text-[#FB8500] cursor-pointer"
                id="terms"
            />
            <label
                htmlFor="terms"
                className="text-sm text-gray-500 cursor-pointer font-medium leading-tight"
            >
                I acknowledge and expressly agree to the{" "}
                <span
                    onClick={(e) => {
                        e.preventDefault();
                        onOpenTerms();
                    }}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                    Terms & Agreements
                </span>{" "}
                provided by ElderKey.
            </label>
        </div>
        {error && <p className="text-red-500 text-xs font-bold ml-8">{error.message}</p>}
    </div>
);

// --- MAIN COMPONENT ---

export default function RegisterPage() {
    const { refreshUser } = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState("Silver");
    const [showModal, setShowModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    // const [agreed, setAgreed] = useState(false); // Managed by RHF now
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isWizardMode, setIsWizardMode] = useState(false);
    const [idPreview, setIdPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { stressScore } = useFriction();

    const fileInputRef = useRef(null);

    const { register, trigger, watch, setValue, getValues, setError, formState: { errors, isValid, touchedFields, dirtyFields } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            birthDate: "",
            mobileNo: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            termsAccepted: false
        }
    });

    // Watch fields for legacy components if needed, or better, pass passing needed values
    const formData = watch(); // Retrieve all values to pass to VerificationStep and PlanSelection (which are display only or non-form)

    const plans = [
        {
            name: "Bronze",
            price: "0",
            titleColor: "text-[#023047]",
            features: ["Partner Directory", "Generic Pharmacy"],
        },
        {
            name: "Silver",
            price: "15",
            titleColor: "text-[#FFB703]",
            features: [
                "Digital ID Card",
                "15% Discounts",
                "Partner Directory",
                "Generic Pharmacy",
            ],
            recommended: true,
        },
        {
            name: "Gold",
            price: "29",
            titleColor: "text-[#8ECAE6]",
            features: [
                "Priority Queue",
                "Concierge Support",
                "Partner Directory",
                "Generic Pharmacy",
            ],
        },
    ];

    const handleNext = async () => {
        setIsLoading(true);
        const { email, username } = getValues();

        try {
            const res = await fetch('/api/auth/check-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username }),
            });

            const result = await res.json();

            if (res.ok) {
                setStep(2);
            } else {
                if (result.field === 'email') {
                    setError('email', { type: 'manual', message: result.error });
                } else if (result.field === 'username') {
                    setError('username', { type: 'manual', message: result.error });
                }
                toast.error(result.error || "Please fix the errors before continuing.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
        const newOtp = [
            ...otp.map((d, idx) => (idx === index ? element.value : d)),
        ];
        setOtp(newOtp);
        if (element.value !== "" && element.nextSibling)
            element.nextSibling.focus();
    };

    const handleConfirmRegistration = async () => {
        setIsLoading(true);
        const data = getValues();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, plan: selectedPlan, seniorId: idPreview }),
            });

            const result = await res.json();

            if (res.ok) {
                await refreshUser();
                toast.success('Account created successfully!');
                router.refresh();
                router.push('/dashboard');
            } else {
                toast.error(result.error || 'Registration failed');
                setShowModal(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full bg-[#F8F9FA] relative flex flex-col items-center justify-center p-6 font-['Open_Sans'] overflow-hidden">
            <DottedBg />

            {/* Header */}
            <div className="text-center mb-8 z-10">
                <h1 className="font-['Merriweather'] text-4xl md:text-5xl font-black text-[#023047] mb-2">
                    Join the Community
                </h1>
                <p className="text-[#52796F] text-lg font-medium">
                    Secure your digital membership in 3 simple steps.
                </p>
            </div>

            <Card className="w-full max-w-5xl bg-white shadow-card border-none rounded-[2.5rem] overflow-hidden z-10 min-h-[750px] flex flex-col transition-all duration-500">
                <CardContent className="p-0 flex flex-col h-full">
                    <StepIndicator step={step} />

                    <div className="p-8 md:p-12 flex-1">
                        {step === 1 &&
                            (isWizardMode ? (
                                <WizardProfileForm
                                    register={register}
                                    errors={errors}
                                    touchedFields={touchedFields}
                                    dirtyFields={dirtyFields}
                                    trigger={trigger}
                                    watch={watch}
                                    setValue={setValue}
                                    fileInputRef={fileInputRef}
                                    handleFileChange={handleFileChange}
                                    idPreview={idPreview}
                                    setIdPreview={setIdPreview}
                                    onNext={handleNext}
                                    onOpenTerms={() => setShowTermsModal(true)}
                                />
                            ) : (
                                <StandardProfileForm
                                    register={register}
                                    errors={errors}
                                    touchedFields={touchedFields}
                                    dirtyFields={dirtyFields}
                                    watch={watch}
                                    setValue={setValue}
                                    isValid={isValid}
                                    fileInputRef={fileInputRef}
                                    handleFileChange={handleFileChange}
                                    idPreview={idPreview}
                                    setIdPreview={setIdPreview}
                                    onNext={handleNext}
                                    onOpenTerms={() => setShowTermsModal(true)}
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
            <div className="fixed bottom-8 right-8 z-[99999] group">
                {(!isWizardMode && stressScore > 80) && (
                    <div className="absolute bottom-20 right-0 w-max pointer-events-none">
                        <RescueBubble text="Struggling? Try Wizard Mode" />
                    </div>
                )}
                <button
                    onClick={() => setIsWizardMode(!isWizardMode)}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-[#023047] hover:bg-[#FFB703] text-white hover:text-[#023047] rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 z-50 group cursor-pointer"
                    title="Toggle Wizard Mode"
                >
                    <FontIcon
                        icon="fa-wand-magic-sparkles"
                        className="group-hover:rotate-12 transition-transform"
                    />
                </button>
            </div>

            {showModal && (
                <ConfirmationModal
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmRegistration}
                    formData={formData}
                    selectedPlan={selectedPlan}
                    plans={plans}
                    isLoading={isLoading}
                />
            )}

            {showTermsModal && (
                <TermsModal onClose={() => setShowTermsModal(false)} />
            )}
        </main>
    );
}
