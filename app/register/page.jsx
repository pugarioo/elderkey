"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FontIcon from "@/components/icons/FontIcon";
import DottedBG from "@/components/custom/dottedBg";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        mobileNumber: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
            newErrors.email = "Invalid email format";

        const phoneRegex = /^(09|\+639)\d{9}$|^09\d{2}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Use format 0917-XXX-XXXX";
        }

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) newErrors[key] = "This field is required";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Registration Successful:", formData);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-12 font-sans text-[#023047]">
            <DottedBG />

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Header Section - Floating above the card */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 mb-6 bg-white border border-gray-100 px-6 py-2 rounded-full shadow-sm">
                        <FontIcon icon="key" style="text-[#FFB703] text-sm" />
                        <span className="text-base font-black font-serif tracking-tight text-[#023047]">
                            ElderKey
                        </span>
                    </div>
                    <h1 className="text-5xl font-black font-serif text-[#023047] leading-tight mb-3">
                        Join The Community
                    </h1>
                    <p className="text-[#52796F] text-lg font-semibold opacity-75">
                        Secure your digital membership in 3 simple steps.
                    </p>
                </div>

                {/* Registration Card - Precise sizing and padding */}
                <div className="w-full max-w-[860px] bg-white rounded-[2.5rem] shadow-[0_15px_45px_-10px_rgba(2,48,71,0.08)] border border-[#001D3D]/5 p-20">
                    {/* Stepper */}
                    <div className="flex justify-between items-center px-28 mb-16 relative">
                        <div className="flex flex-col items-center z-10">
                            <div className="w-12 h-12 rounded-full bg-[#FFB703] text-white flex items-center justify-center text-xl font-bold shadow-[0_10px_40px_-10px_rgba(255,183,3,0.3)]">
                                1
                            </div>
                            <span className="text-[11px] font-bold font-sans text-[#FFB703] mt-4 tracking-[0.2em] uppercase">
                                PROFILE
                            </span>
                        </div>
                        <div className="absolute top-6 left-0 w-full h-[1px] bg-gray-100 -z-0"></div>
                        <div className="flex flex-col items-center z-10 opacity-30">
                            <div className="w-12 h-12 rounded-full bg-white text-gray-400 flex items-center justify-center text-xl font-bold border border-gray-200">
                                2
                            </div>
                            <span className="text-[11px] font-bold font-sans text-gray-400 mt-4 tracking-[0.2em] uppercase">
                                VERIFY
                            </span>
                        </div>
                        <div className="flex flex-col items-center z-10 opacity-30">
                            <div className="w-12 h-12 rounded-full bg-white text-gray-400 flex items-center justify-center text-xl font-bold border border-gray-200">
                                3
                            </div>
                            <span className="text-[11px] font-bold font-sans text-gray-400 mt-4 tracking-[0.2em] uppercase">
                                PLAN
                            </span>
                        </div>
                    </div>

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-12">
                            {/* First Name */}
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                    FIRST NAME
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-6 z-20 pointer-events-none opacity-40">
                                        <FontIcon
                                            icon="user"
                                            style="text-[#023047] text-base"
                                        />
                                    </span>
                                    <Input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="e.g. Martha"
                                        className={`bg-[#F8F9FA] border-none h-16 rounded-xl pl-16 pr-6 text-lg font-normal placeholder:text-gray-300 ${errors.firstName ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs ml-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                    LAST NAME
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-6 z-20 pointer-events-none opacity-40">
                                        <FontIcon
                                            icon="user"
                                            style="text-[#023047] text-base"
                                        />
                                    </span>
                                    <Input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="e.g. Stewart"
                                        className={`bg-[#F8F9FA] border-none h-16 rounded-xl pl-16 pr-6 text-lg font-normal placeholder:text-gray-300 ${errors.lastName ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs ml-1">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-4">
                            <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                EMAIL ADDRESS
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-6 z-20 pointer-events-none opacity-40">
                                    <FontIcon
                                        icon="envelope"
                                        style="text-[#023047] text-base"
                                    />
                                </span>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className={`bg-[#F8F9FA] border-none h-16 rounded-xl pl-16 pr-6 text-lg font-normal placeholder:text-gray-300 ${errors.email ? "ring-2 ring-red-400" : ""}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs ml-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            {/* Birth Date */}
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                    BIRTH DATE
                                </label>
                                <div className="relative flex items-center">
                                    <Input
                                        name="birthDate"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className={`bg-[#F8F9FA] border-none h-16 rounded-xl px-6 text-lg font-normal text-[#023047]/60 ${errors.birthDate ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                {errors.birthDate && (
                                    <p className="text-red-500 text-xs ml-1">
                                        {errors.birthDate}
                                    </p>
                                )}
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-4">
                                <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                    MOBILE NUMBER
                                </label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-6 z-20 pointer-events-none opacity-40">
                                        <FontIcon
                                            icon="phone"
                                            style="text-[#023047] text-base"
                                        />
                                    </span>
                                    <Input
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="0917-XXX-XXXX"
                                        className={`bg-[#F8F9FA] border-none h-16 rounded-xl pl-16 pr-6 text-lg font-normal placeholder:text-gray-300 ${errors.mobileNumber ? "ring-2 ring-red-400" : ""}`}
                                    />
                                </div>
                                {errors.mobileNumber && (
                                    <p className="text-red-500 text-xs ml-1">
                                        {errors.mobileNumber}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="space-y-4 pt-2">
                            <label className="text-[13px] font-bold font-sans text-[#023047] tracking-[0.15em] uppercase ml-1">
                                SENIOR CITIZEN ID (OPTIONAL)
                            </label>
                            <div className="border-2 border-dashed border-[#FFB703]/30 bg-[#FFFBEB]/40 rounded-[2.5rem] py-16 flex flex-col items-center justify-center cursor-pointer hover:bg-[#FFFBEB] transition-all">
                                <div className="bg-[#FFB703] w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-[0_10px_30px_-5px_rgba(255,183,3,0.4)]">
                                    <FontIcon
                                        icon="cloud-arrow-up"
                                        style="text-white text-2xl"
                                    />
                                </div>
                                <p className="text-[#FB8500] font-bold font-sans text-xl">
                                    Click to Upload Photo
                                </p>
                                <p className="text-[#52796F] text-sm mt-1 font-semibold opacity-50 uppercase tracking-[0.1em]">
                                    JPG or PNG. Max 5MB.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 text-center">
                            <Button
                                type="submit"
                                className="w-full bg-[#FFB703] hover:bg-[#FB8500] text-white py-10 rounded-2xl text-xl font-black font-sans flex items-center justify-center gap-3 transition-all cursor-pointer shadow-[0_12px_45px_-10px_rgba(255,183,3,0.5)] active:scale-[0.99]"
                            >
                                Continue{" "}
                                <FontIcon
                                    icon="arrow-right"
                                    style="text-white text-xl"
                                />
                            </Button>
                            <p className="mt-8 text-base text-[#52796F] font-bold font-sans">
                                Already have an account?{" "}
                                <span className="text-[#FFB703] underline cursor-pointer ml-1">
                                    Log In
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
