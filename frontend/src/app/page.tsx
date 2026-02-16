"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HeroGlobe from "@/components/ui/HeroGlobe";
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Radio, Network } from "lucide-react";

const BOOT_LOGS = [
    "INITIALIZING_CORE_V1.4.0...",
    "SYNCING_SATELLITE_LINK_NASA_1...",
    "LOADING_NEURAL_WEIGHTS_BYPASS_MODE...",
    "CALIBRATING_QUANTUM_AGRICULTURE_GRIDS...",
    "VERIFYING_COMMUNITY_SHIELD_PROTOCOLS...",
    "SECURE_ENVIRONMENT_ESTABLISHED.",
    "WELCOME_TO_TERRATWIN."
];

export default function Home() {
    const [booting, setBooting] = useState(true);
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        if (booting) {
            const timer = setInterval(() => {
                setLogIndex((prev) => {
                    if (prev === BOOT_LOGS.length - 1) {
                        clearInterval(timer);
                        setTimeout(() => setBooting(false), 800);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 400);
            return () => clearInterval(timer);
        }
    }, [booting]);

    return (
        <main className="min-h-screen bg-bio-gradient overflow-hidden flex flex-col relative">
            <AnimatePresence mode="wait">
                {booting ? (
                    <motion.div
                        key="boot"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        className="fixed inset-0 z-[100] bg-bio-black flex flex-col items-center justify-center p-6"
                    >
                        <div className="max-w-md w-full space-y-8">
                            <div className="flex flex-col items-center gap-4">
                                <Link href="/" className="text-4xl font-black text-bio-green tracking-tighter italic uppercase">
                                    TerraTwin
                                </Link>
                                <div className="h-1 w-full bg-white/5 relative overflow-hidden rounded-full">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-bio-green shadow-[0_0_20px_#00FF94]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: BOOT_LOGS.length * 0.4, ease: "linear" }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 font-mono text-[10px] text-bio-green/60 uppercase tracking-widest text-center">
                                {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={i === logIndex ? "text-white" : ""}
                                    >
                                        &gt; {log}
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Navbar */}
                        <nav className="p-6 flex justify-between items-center z-50">
                            <div className="flex items-center gap-2">
                                <Cpu className="text-bio-green animate-pulse" size={24} />
                                <h1 className="text-2xl font-bold text-bio-green tracking-tighter uppercase italic">TerraTwin</h1>
                            </div>
                            <Link href="/dashboard" className="px-6 py-2 glass-panel rounded-xl hover:bg-bio-green hover:text-black transition-all font-black text-xs uppercase tracking-widest border-bio-green/20">
                                Enter_Terminal
                            </Link>
                        </nav>

                        {/* Hero Content */}
                        <section className="flex-1 flex flex-col items-center justify-center px-4 relative">
                            <div className="z-10 text-center space-y-8 max-w-5xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <div className="inline-block px-4 py-1 glass-panel border-bio-green/30 rounded-full mb-6 text-[10px] font-black text-bio-green uppercase tracking-[0.3em] animate-pulse">
                                        V.1.4.0_Live_Neural_Network
                                    </div>
                                    <h2 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.85] italic uppercase text-white shadow-2xl">
                                        SECURE THE <br />
                                        <span className="text-bio-green shadow-[0_0_80px_rgba(0,255,148,0.2)]">FOOD FUTURE</span>
                                    </h2>
                                    <p className="mt-8 text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
                                        Precision Agriculture meets Satellite Intelligence. Scan crops, monitor fields,
                                        and fight food insecurity with our advanced <span className="text-bio-green">Neural Detection Engine</span>.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex gap-4 justify-center"
                                >
                                    <Link href="/dashboard" className="px-10 py-5 bg-bio-green text-black font-black uppercase italic rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform group shadow-[0_0_50px_rgba(0,255,148,0.3)]">
                                        Initialize_Platform <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                    <button className="px-10 py-5 glass-panel font-black uppercase italic rounded-2xl hover:bg-white/5 transition-all border-white/10 text-white/60">
                                        View_Global_Grid
                                    </button>
                                </motion.div>

                                <div className="grid grid-cols-3 gap-12 mt-16 pt-12 border-t border-white/5 max-w-3xl mx-auto">
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-bio-green/30 transition-colors">
                                            <Network className="text-bio-green" size={28} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Resilience</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-bio-green/30 transition-colors">
                                            <Radio className="text-bio-green" size={28} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Real-time</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 group">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-bio-green/30 transition-colors">
                                            <Globe className="text-bio-green" size={28} />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Global Impact</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3D Globe Positioned behind text */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl opacity-30 z-0 pointer-events-none">
                                <HeroGlobe />
                            </div>
                        </section>

                        {/* Background Decor */}
                        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-bio-green/10 rounded-full blur-[200px] pointer-events-none opacity-50" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[200px] pointer-events-none opacity-50" />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
