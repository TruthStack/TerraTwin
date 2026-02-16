"use client";

import dynamic from "next/dynamic";

const FarmMap = dynamic(() => import("./FarmMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-bio-gray animate-pulse flex items-center justify-center">
            <div className="text-bio-green/50 animate-bounce">Loading Satellite Data...</div>
        </div>
    ),
});

export default FarmMap;
