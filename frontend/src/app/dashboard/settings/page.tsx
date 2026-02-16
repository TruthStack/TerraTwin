"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Database, Cpu, Activity, Zap, Radio, Globe } from "lucide-react";

const NodeTopology = () => {
    return (
        <div className="relative w-full h-64 glass-panel rounded-3xl border-white/5 overflow-hidden bg-black/40">
            <svg className="w-full h-full opacity-20">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Animated Nodes */}
            {[
                { x: "20%", y: "30%", id: "NODE_01" },
                { x: "50%", y: "50%", id: "HUB_PRIMARY" },
                { x: "80%", y: "20%", id: "NODE_03" },
                { x: "70%", y: "70%", id: "NODE_04" },
                { x: "30%", y: "80%", id: "NODE_05" },
            ].map((node, i) => (
                <motion.div
                    key={node.id}
                    className="absolute group cursor-pointer"
                    style={{ left: node.x, top: node.y }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <div className="relative">
                        <div className="w-3 h-3 bg-bio-green rounded-full shadow-[0_0_15px_#00FF94] animate-pulse" />
                        <div className="absolute -top-1 -left-1 w-5 h-5 border border-bio-green/40 rounded-full animate-ping" />
                    </div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <div className="glass-panel px-2 py-1 text-[8px] font-mono text-bio-green uppercase">
                            {node.id}: ONLINE
                        </div>
                    </div>
                </motion.div>
            ))}

            <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <Radio size={12} className="text-bio-green animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Mesh_Network_Active</span>
            </div>
        </div>
    );
};

export default function SettingsPage() {
    const [shielding, setShielding] = useState(true);
    const [neuralV3, setNeuralV3] = useState(false);

    return (
        <div className="space-y-8 max-w-4xl pb-12">
            <div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Node_Terminal</h2>
                <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40">Configuration_Level_01 // Secure_Sync</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 space-y-6">
                    <NodeTopology />
                </div>

                <div className="lg:col-span-7 space-y-6">
                    <div className="glass-panel p-8 rounded-3xl border-white/5 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 text-bio-green">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <p className="font-black italic uppercase text-white">Autonomous_Shielding</p>
                                    <p className="text-[10px] text-white/40 uppercase font-mono">Auto-broadcast alert to neighbors</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShielding(!shielding)}
                                className={`w-14 h-7 rounded-full p-1 transition-colors ${shielding ? 'bg-bio-green' : 'bg-white/10'}`}
                            >
                                <motion.div
                                    animate={{ x: shielding ? 28 : 0 }}
                                    className="w-5 h-5 bg-white rounded-full shadow-lg"
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 text-purple-400">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <p className="font-black italic uppercase text-white">Neural_Engine_V3_Bypass</p>
                                    <p className="text-[10px] text-white/40 uppercase font-mono">Experimental multi-modal weights</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNeuralV3(!neuralV3)}
                                className={`w-14 h-7 rounded-full p-1 transition-colors ${neuralV3 ? 'bg-purple-500' : 'bg-white/10'}`}
                            >
                                <motion.div
                                    animate={{ x: neuralV3 ? 28 : 0 }}
                                    className="w-5 h-5 bg-white rounded-full shadow-lg"
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 text-blue-400">
                                    <Database size={24} />
                                </div>
                                <div>
                                    <p className="font-black italic uppercase text-white">NASA_Geo_Sync</p>
                                    <p className="text-[10px] text-white/40 uppercase font-mono">Last Sync: 12m ago</p>
                                </div>
                            </div>
                            <button className="px-6 py-2 glass-panel rounded-xl text-[10px] font-black uppercase text-bio-green border-bio-green/20 hover:bg-bio-green/10 transition-colors">Force_Sync</button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <div className="glass-panel p-8 rounded-3xl border-white/5 bg-bio-mist flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 rounded-full border-2 border-bio-green/20 flex items-center justify-center relative">
                            <div className="absolute inset-0 rounded-full border border-bio-green/40 animate-ping" />
                            <Activity size={48} className="text-bio-green animate-pulse" />
                        </div>
                        <div>
                            <h4 className="font-black italic text-xl text-white uppercase tracking-tighter">Terminal_Health</h4>
                            <p className="text-[10px] text-white/40 uppercase font-mono mt-1">Status: OPTIMAL [99.9%]</p>
                        </div>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase">
                                <span>Memory_Usage</span>
                                <span>428MB / 1024MB</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-bio-green"
                                    initial={{ width: 0 }}
                                    animate={{ width: "42%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
