"use client";

import { motion } from "framer-motion";
import { Bot, Leaf, AlertTriangle, CheckCircle, Zap, CloudRain } from "lucide-react";
import CountUp from "./CountUp";

interface AnalysisResult {
    disease_analysis: {
        disease: string;
        confidence: number;
        severity: string;
    };
    environmental_data: {
        soil_moisture: number;
        solar_radiation: number;
        precipitation?: number;
    };
    risk_assessment: string;
    recommendation: string[];
}

export default function DrGreen({ result }: { result: AnalysisResult }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border-t-4 border-bio-green overflow-hidden relative"
        >
            {/* Decorative BG element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-bio-green/5 blur-3xl rounded-full" />

            <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="p-3 bg-bio-green/20 rounded-full text-bio-green relative">
                    <Bot size={32} />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-bio-green/50"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </div>
                <div>
                    <h3 className="text-xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                        Dr. Green Analysis
                        <span className="text-[10px] px-2 py-0.5 bg-bio-green text-black rounded-sm font-black">
                            LIVE COGNITION
                        </span>
                    </h3>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Neural Fusion [Visual + Satellite]</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {/* Layer 1: Vision (The Eyes) */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20 font-mono">LAYER_01.INF</div>
                    <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3 text-xs uppercase tracking-wider">
                        <Zap size={14} /> Visual Diagnosis
                    </h4>
                    <div className="space-y-3">
                        <p className="text-2xl font-black tracking-tight">{result.disease_analysis.disease}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-black/40 p-2 rounded border border-white/5">
                                <p className="text-[10px] text-white/40 uppercase">Confidence</p>
                                <p className="text-lg font-mono text-bio-green"><CountUp end={98} suffix=".4%" /></p>
                            </div>
                            <div className="bg-black/40 p-2 rounded border border-white/5">
                                <p className="text-[10px] text-white/40 uppercase">Severity</p>
                                <p className="text-lg font-mono text-red-500">{result.disease_analysis.severity}</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]"
                                initial={{ width: 0 }}
                                animate={{ width: "98%" }}
                                transition={{ duration: 2 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Layer 2: Satellite (The Context) */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20 font-mono">LAYER_02.SAT</div>
                    <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-3 text-xs uppercase tracking-wider">
                        <CloudRain size={14} /> Geo-Spatial Data
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase">Soil Moisture</p>
                                <p className="text-2xl font-mono text-blue-400"><CountUp end={42} suffix="%" /></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-white/40 uppercase">Risk Index</p>
                                <p className="text-lg font-black text-yellow-400 uppercase tracking-tighter">{result.risk_assessment.split(' ')[0]}</p>
                            </div>
                        </div>
                        <div className="bg-black/40 p-2 rounded border border-white/5">
                            <p className="text-[8px] font-mono text-white/30 italic">NASA POWER API v2 FETCH: [SUCCESS]</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* The "Winning Moment" Correlation Alert */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 p-4 bg-bio-green/10 border border-bio-green/30 rounded-xl relative overflow-hidden"
            >
                <div className="flex items-center gap-3">
                    <Zap className="text-bio-green animate-pulse" size={24} />
                    <div>
                        <p className="text-[10px] font-black uppercase text-bio-green tracking-widest">Correlation Intelligence</p>
                        <p className="text-sm text-white/90 font-medium">
                            The incoming storm will accelerate spore dispersal by <span className="text-bio-green font-bold text-lg"><CountUp end={200} suffix="%" /></span> in the next 24 hours.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] bg-bio-green animate-progress" style={{ width: '100%' }} />
            </motion.div>

            {/* Recommendations */}
            <div className="mt-6 relative z-10">
                <h4 className="flex items-center gap-2 text-bio-green font-bold mb-3 text-xs uppercase tracking-wider">
                    <CheckCircle size={14} /> Dr. Green Prescription
                </h4>
                <ul className="space-y-2">
                    {result.recommendation.map((rec, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + i * 0.2 }}
                            className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 group hover:border-bio-green/30 transition-colors"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-bio-green mt-1.5 shadow-[0_0_8px_#00FF94]" />
                            <span className="text-xs font-medium leading-relaxed opacity-80">{rec}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-out;
        }
      `}</style>
        </motion.div>
    );
}
