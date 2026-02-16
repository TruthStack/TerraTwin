"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapLoader from "@/components/map/MapLoader";
import { Activity, Droplets, Sun, Wind, Bell, FileText, Share2 } from "lucide-react";

const stats = [
    { label: "Avg Moisture", value: "42%", icon: Droplets, color: "text-blue-400" },
    { label: "Solar Rad", value: "18 MJ", icon: Sun, color: "text-yellow-400" },
    { label: "Wind Speed", value: "12 km/h", icon: Wind, color: "text-gray-400" },
    { label: "Health Index", value: "88/100", icon: Activity, color: "text-bio-green" },
];

export default function DashboardPage() {
    const [layer, setLayer] = useState("satellite");
    const [alertSent, setAlertSent] = useState(false);

    const handleAlert = () => {
        setAlertSent(true);
        setTimeout(() => setAlertSent(false), 5000);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">Command Center</h2>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Active nodes: 124 | Status: <span className="text-bio-green font-bold">Resilient</span></p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAlert}
                        className="px-6 py-2 glass-panel border-red-500/30 text-red-500 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Bell size={18} /> Trigger Community Shield
                    </button>
                    <button className="px-6 py-2 bg-bio-green text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2">
                        <FileText size={18} /> Global Report
                    </button>
                </div>
            </div>

            {/* Notification Toast for Demo */}
            <AnimatePresence>
                {alertSent && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-10 right-10 z-[2000] glass-panel bg-red-600 border-none p-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-4"
                    >
                        <div className="bg-white/20 p-2 rounded-full"><Share2 size={24} /></div>
                        <div>
                            <p className="font-bold text-white uppercase text-xs">Community Shield Activated</p>
                            <p className="text-[10px] text-white/80">Alert dispatched to 12 neighboring farms in Sector Beta.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-4 rounded-xl flex items-center gap-4 border-white/10 hover:border-bio-green/30 transition-colors cursor-pointer group"
                    >
                        <div className={`p-3 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">{stat.label}</p>
                            <p className="text-xl font-bold font-mono tracking-tighter">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Map Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex-1 min-h-[500px] relative rounded-2xl overflow-hidden border border-white/10"
            >
                <MapLoader />

                {/* Map Overlay Controls */}
                <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                    <button
                        onClick={() => setLayer("satellite")}
                        className={`glass-panel px-4 py-2 text-xs font-bold transition uppercase tracking-widest ${layer === 'satellite' ? 'bg-bio-green text-black' : 'hover:bg-white/10'}`}
                    >
                        Satellite Base
                    </button>
                    <button
                        onClick={() => setLayer("ndvi")}
                        className={`glass-panel px-4 py-2 text-xs font-bold transition uppercase tracking-widest ${layer === 'ndvi' ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}
                    >
                        NDVI Layer
                    </button>
                </div>

                <div className="absolute bottom-6 left-6 z-[1000] glass-panel px-4 py-2 border-bio-green/20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-bio-green animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">System Status: Nominal</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
