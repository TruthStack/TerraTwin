"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, TrendingUp, AlertCircle, X, ChevronRight, Dna, Activity, Droplets } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const MOCK_GROWTH_DATA = [
    { day: "Day 1", yield: 20, moisture: 40 },
    { day: "Day 10", yield: 45, moisture: 38 },
    { day: "Day 20", yield: 65, moisture: 42 },
    { day: "Day 30", yield: 82, moisture: 45 },
    { day: "Day 40", yield: 92, moisture: 40 },
];

const cropData = [
    {
        id: "TX-001",
        name: "Tomato (Sector Alpha)",
        status: "Healthy",
        yield: "92%",
        color: "text-bio-green",
        border: "border-bio-green/20",
        bg: "bg-bio-green/5",
        stats: { nitrogen: "4.2", moisture: "42%", light: "18 MJ" }
    },
    {
        id: "TX-002",
        name: "Potato (Sector Beta)",
        status: "At Risk",
        yield: "64%",
        color: "text-yellow-400",
        border: "border-yellow-400/20",
        bg: "bg-yellow-400/5",
        stats: { nitrogen: "2.8", moisture: "31%", light: "12 MJ" }
    },
];

export default function CropsPage() {
    const [selectedCrop, setSelectedCrop] = useState<any | null>(null);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Genetic_Repository</h2>
                    <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40">Inventory_Control // Node_V3.0</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2 glass-panel rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition border-white/10">Filter_Sectors</button>
                    <button className="px-6 py-2 bg-bio-green text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,148,0.2)]">Register_New_Specimen</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cropData.map((crop, i) => (
                    <motion.div
                        key={crop.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedCrop(crop)}
                        className={`glass-panel p-8 rounded-3xl border ${crop.border} ${crop.bg} cursor-pointer group relative overflow-hidden`}
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Dna size={120} />
                        </div>

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${crop.color} animate-pulse`} />
                                    <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">{crop.id}</span>
                                </div>
                                <h3 className="font-black text-2xl italic uppercase text-white tracking-tighter">{crop.name}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl bg-white/5 ${crop.color}`}>
                                <Sprout size={28} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8 relative z-10">
                            <div className="h-24">
                                <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono mb-2">Growth_Velocity</p>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_GROWTH_DATA}>
                                        <defs>
                                            <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={i === 0 ? "#00FF94" : "#FACC15"} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={i === 0 ? "#00FF94" : "#FACC15"} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="yield" stroke={i === 0 ? "#00FF94" : "#FACC15"} fillOpacity={1} fill={`url(#grad-${i})`} strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-col justify-end text-right">
                                <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono mb-1">Health_Index</p>
                                <p className={`text-4xl font-black italic tracking-tighter ${crop.color}`}>{crop.yield}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[9px] text-white/60 font-mono">
                                    <Droplets size={12} className="text-blue-400" /> {crop.stats.moisture}
                                </div>
                                <div className="flex items-center gap-2 text-[9px] text-white/60 font-mono">
                                    <Activity size={12} className="text-bio-green" /> {crop.stats.nitrogen}N
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-bio-green group-hover:translate-x-1 transition-transform">
                                Open_Dossier <ChevronRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Genetic Dossier Modal */}
            <AnimatePresence>
                {selectedCrop && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-bio-mist border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl bg-white/5 ${selectedCrop.color}`}>
                                        <Dna size={32} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-bio-green font-mono uppercase tracking-[0.4em] mb-1">Genetic_Dossier_ID_{selectedCrop.id}</div>
                                        <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">{selectedCrop.name}</h3>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCrop(null)} className="p-3 hover:bg-white/5 rounded-full transition text-white/40 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="glass-panel p-6 rounded-2xl border-white/5">
                                        <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Nitrogen_Content</p>
                                        <div className="text-3xl font-black italic text-bio-green">{selectedCrop.stats.nitrogen}<span className="text-xs ml-1 opacity-50">g/mol</span></div>
                                    </div>
                                    <div className="glass-panel p-6 rounded-2xl border-white/5">
                                        <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Moisture_Saturation</p>
                                        <div className="text-3xl font-black italic text-blue-400">{selectedCrop.stats.moisture}</div>
                                    </div>
                                    <div className="glass-panel p-6 rounded-2xl border-white/5">
                                        <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Daily_Light_Intake</p>
                                        <div className="text-3xl font-black italic text-yellow-500">{selectedCrop.stats.light}</div>
                                    </div>
                                </div>

                                <div className="glass-panel p-8 rounded-3xl border-white/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
                                        <TrendingUp size={14} className="text-bio-green" /> Growth_Projection_Neural_Model
                                    </h4>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={MOCK_GROWTH_DATA}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                <XAxis dataKey="day" stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
                                                <YAxis stroke="#ffffff40" fontSize={10} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#054A29', border: '1px solid #00FF94', borderRadius: '12px', color: '#fff' }}
                                                    itemStyle={{ color: '#00FF94' }}
                                                />
                                                <Line type="monotone" dataKey="yield" stroke="#00FF94" strokeWidth={4} dot={{ fill: '#00FF94', r: 6 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
                                                <Line type="monotone" dataKey="moisture" stroke="#60A5FA" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                <div className="flex gap-6">
                                    <span className="text-white/40">Encryption: <span className="text-bio-green">AES-256</span></span>
                                    <span className="text-white/40">Sync_Status: <span className="text-bio-green">NOMINAL</span></span>
                                </div>
                                <button className="px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition border border-white/10 text-white font-black italic">DOWNLOAD_FULL_GENOME_RECORD</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
