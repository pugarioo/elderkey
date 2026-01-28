"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
library.add(faKey);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white">
            <div className="flex flex-col items-center justify-center pt-[40px] pb-[40px] px-4">
                <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon
                        icon="fa-solid fa-key"
                        className="text-slate-500 text-[22px] transform -rotate-[10deg]"
                        aria-hidden="true"
                    />
                    <span className="text-[20px] font-serif font-semibold text-slate-500 tracking-tight">
                        ElderKey
                    </span>
                </div>

                <div className="text-center">
                    <p className="text-[12px] text-slate-400 font-normal tracking-wide">
                        © {currentYear} ElderKey. Secure. Private. Essential.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
