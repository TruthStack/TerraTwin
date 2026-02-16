"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroGlobe from "@/components/ui/HeroGlobe";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-bio-gradient overflow-hidden flex flex-col">
            {/* Navbar */}
            <nav className="p-6 flex justify-between items-center z-50">
                <h1 className="text-2xl font-bold text-bio-green tracking-tighter">TerraTwin</h1>
                <Link href="/dashboard" className="px-6 py-2 glass-panel rounded-full hover:bg-bio-green hover:text-black transition-all">
                    Enter Platform
                </Link>
            </nav>

            {/* Hero Content */}
            <section className="flex-1 flex flex-col items-center justify-center px-4 relative">
                <div className="z-10 text-center space-y-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                            SECURE THE <br />
                            <span className="text-bio-green">FOOD FUTURE</span>
                        </h2>
                        <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
                            Precision Agriculture meets Satellite Intelligence. Scan crops, monitor fields,
                            and fight food insecurity with AI-powered agronomy.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4 justify-center"
                    >
                        <Link href="/dashboard" className="px-8 py-4 bg-bio-green text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform group">
                            Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="px-8 py-4 glass-panel font-bold rounded-xl hover:bg-white/5 transition-colors">
                            View Global Map
                        </button>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-col items-center gap-2">
                            <ShieldCheck className="text-bio-green" size={32} />
                            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Resilience</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Zap className="text-bio-green" size={32} />
                            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Real-time</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Globe className="text-bio-green" size={32} />
                            <span className="text-xs uppercase tracking-widest text-white/40 font-bold">Global Impact</span>
                        </div>
                    </div>
                </div>

                {/* 3D Globe Positioned behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl opacity-30 z-0">
                    <HeroGlobe />
                </div>
            </section>

            {/* Background Decor */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-bio-green/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        </main>
    );
}
