import React from 'react';

const RescueBubble = ({ text = "Struggling? Try Rescue Mode" }) => {
    return (
        <div className="bg-[#FF4444] text-white px-4 py-2 rounded-xl shadow-lg animate-pulse flex items-center gap-2 relative z-[100]">
            <span className="font-bold text-sm w-max">{text}</span>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#FF4444] rotate-45"></div>
        </div>
    );
};

export default RescueBubble;
