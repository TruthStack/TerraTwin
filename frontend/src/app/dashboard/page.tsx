"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapLoader from "@/components/map/MapLoader";
import { Activity, Droplets, Sun, Wind, Bell, FileText, Share2, Radio, Zap, Terminal } from "lucide-react";

const stats = [
    { label: "HUMIDITY_INDEX", value: "42.5", suffix: "%", icon: Droplets, color: "text-blue-400" },
    { label: "SOLAR_RADIATION", value: "18.2", suffix: " MJ", icon: Sun, color: "text-yellow-400" },
    { label: "WIND_VECTORS", value: "12.0", suffix: " km/h", icon: Wind, color: "text-gray-400" },
    { label: "CROP_RESILIENCE", value: "88.4", suffix: " / 100", icon: Activity, color: "text-bio-green" },
];

const MOCK_LOGS = [
    "SYNCING_SATELLITE_LINK_NASA_1...",
    "ANOMALY_DETECTED_SECTOR_BETA",
    "COMMUNITY_SHIELD_V4_ONLINE",
    "NEURAL_EMISSION_STABLE",
    "MOISTURE_VECTOR_UPDATE: 42.5%",
    "SOLAR_FLARE_PROTECTION_ENABLED",
    "NODE_ID_8832_ACTIVE",
    "FERTILIZER_OPTIMIZATION_START",
    "WEATHER_DATA_INBOUND..."
];

export default function DashboardPage() {
    const [layer, setLayer] = useState("satellite");
    const [alertSent, setAlertSent] = useState(false);
    const [logs, setLogs] = useState<string[]>([MOCK_LOGS[0], MOCK_LOGS[1], MOCK_LOGS[2]]);
    const logScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const nextLog = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
                const newLogs = [...prev, nextLog].slice(-15);
                return newLogs;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logScrollRef.current) {
            logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
        }
    }, [logs]);

    const handleAlert = () => {
        setAlertSent(true);
        setTimeout(() => setAlertSent(false), 6000);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Command_Center</h2>
                    <div className="flex items-center gap-3 text-[10px] uppercase font-mono tracking-[0.3em] text-bio-green/40">
                        <span className="flex items-center gap-1"><Radio size={10} className="animate-pulse" /> Nodes_Online: 124</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Security_Level: RESILIENT</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAlert}
                        className="px-8 py-3 glass-panel border-red-500/30 text-red-500 font-black italic rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 group relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)]"
                    >
                        <div className="absolute inset-0 bg-red-500/10 group-hover:bg-transparent transition-colors" />
                        <Bell size={20} className="group-hover:animate-bounce" /> TRIGGER_COMMUNITY_SHIELD
                    </button>
                    <button className="px-8 py-3 bg-bio-green text-black font-black italic rounded-xl hover:bg-white transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(0,255,148,0.2)]">
                        <FileText size={20} /> GLOBAL_DOSSIER
                    </button>
                </div>
            </div>

            {/* Notification Toast for Demo */}
            <AnimatePresence>
                {alertSent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-10 right-10 z-[2000] glass-panel bg-red-600/90 border-none p-8 rounded-2xl shadow-[0_0_100px_rgba(239,68,68,0.6)] flex items-center gap-6 max-w-lg backdrop-blur-2xl"
                    >
                        <div className="bg-white p-4 rounded-2xl text-red-600 shadow-2xl animate-pulse">
                            <Radio size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="font-black text-white uppercase italic text-lg tracking-tighter">Community_Shield_Active</p>
                            <p className="text-sm text-white/80 font-medium leading-relaxed">
                                Emergency alert broadcasted to <span className="underline font-bold">12 neighboring farms</span> in Sector Beta. Neural networks syncing defense protocols.
                            </p>
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
                        className="glass-panel p-5 rounded-2xl flex items-center gap-5 border-white/10 hover:border-bio-green/40 transition-all cursor-pointer group hover:shadow-[0_0_40px_rgba(0,255,148,0.05)]"
                    >
                        <div className={`p-4 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-mono mb-1">{stat.label}</p>
                            <p className="text-2xl font-black font-mono tracking-tighter text-white">
                                {stat.value}<span className="text-xs opacity-40 ml-1">{stat.suffix}</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Area with Map and Sidebar Logs */}
            <div className="flex-1 flex gap-6 min-h-[500px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-[3] relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_80px_100px_rgba(0,0,0,0.5)]"
                >
                    <MapLoader />

                    {/* Map Overlay Controls */}
                    <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
                        <button
                            onClick={() => setLayer("satellite")}
                            className={`glass-panel px-6 py-3 text-[10px] font-black italic transition uppercase tracking-[0.2em] rounded-xl ${layer === 'satellite' ? 'bg-bio-green text-black' : 'hover:bg-white/10'}`}
                        >
                            Satellite_Base_v.1
                        </button>
                        <button
                            onClick={() => setLayer("ndvi")}
                            className={`glass-panel px-6 py-3 text-[10px] font-black italic transition uppercase tracking-[0.2em] rounded-xl ${layer === 'ndvi' ? 'bg-blue-500 text-white' : 'hover:bg-white/10'}`}
                        >
                            NDVI_Spectral_Shift
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-10 z-[1000] glass-panel px-6 py-3 border-bio-green/30 rounded-xl flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-bio-green animate-pulse shadow-[0_0_15px_#00FF94]" />
                            <span className="text-xs uppercase font-black italic tracking-widest text-white">SYSTEM_STATUS: NOMINAL</span>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <span className="text-[10px] font-mono text-white/40">LAT: 37.7749 / LON: -122.4194</span>
                    </div>
                </motion.div>

                {/* Live Neural Feed Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex-1 glass-panel rounded-3xl border border-white/10 p-4 flex flex-col gap-4 overflow-hidden"
                >
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <Terminal size={14} className="text-bio-green" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Neural_Feed_V3</span>
                    </div>
                    <div
                        ref={logScrollRef}
                        className="flex-1 overflow-y-auto space-y-2 font-mono scrollbar-hide"
                    >
                        <AnimatePresence initial={false}>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={`${log}-${i}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[9px] text-bio-green/70 leading-relaxed flex gap-2"
                                >
                                    <span className="text-white/20">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                                    <span>&gt; {log}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center text-[8px] font-mono uppercase text-white/30">
                            <span>Baud_Rate: 115200</span>
                            <span className="text-bio-green font-bold animate-pulse">CONNECTED</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
