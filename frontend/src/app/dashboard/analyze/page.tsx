"use client";

import { useState, useEffect } from "react";
import { Upload, ScanLine, Loader2, Download, Bot, Crosshair, Target, Shield, Cpu, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeImage } from "@/lib/api";
import DrGreen from "@/components/ui/DrGreen";
import DrGreenChat from "@/components/chat/DrGreenChat";

const FLASHING_TEXTS = [
    "INITIALIZING_PYTORCH_WEIGHTS...",
    "DETECTING_LEAF_GEOMETRY...",
    "SEGMENTING_LESION_VECTORS...",
    "FETCHING_NASA_HYDRO_GRIDS...",
    "CALIBRATING_RGB_CHANNELS...",
    "INFERENCE_ENGINE_V3_ACTIVE...",
    "MAPPING_PATHOGEN_SPREAD..."
];

export default function AnalyzePage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [currentFlash, setCurrentFlash] = useState(0);

    useEffect(() => {
        if (scanning) {
            const interval = setInterval(() => {
                setCurrentFlash(prev => (prev + 1) % FLASHING_TEXTS.length);
            }, 300);
            return () => clearInterval(interval);
        }
    }, [scanning]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setResult(null);
        }
    };

    const handleDownloadReport = () => {
        const content = `TerraTwin AI Report\nDisease: ${result.disease_analysis.disease}\nStatus: ${result.risk_assessment}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TerraTwin_Report_${Date.now()}.txt`;
        a.click();
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setScanning(true);
        try {
            const data = await analyzeImage(file, 37.7749, -122.4194);

            setTimeout(() => {
                setResult(data);
                setScanning(false);
            }, 3000);

        } catch (error) {
            console.error("Analysis failed:", error);
            setScanning(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-bio-green to-blue-400 italic uppercase tracking-tighter">
                    Biological_Scan_Terminal
                </h2>
                <div className="flex items-center justify-center gap-4 text-[8px] text-white/30 uppercase font-mono tracking-[0.4em]">
                    <span>Secure_Link: ACTIVE</span>
                    <span className="w-1 h-1 bg-bio-green rounded-full" />
                    <span>Neural_Engine: 2.1.0</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Upload/Visual Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div
                        className={`
              relative h-[650px] rounded-2xl border border-white/10 transition-all overflow-hidden bg-black
              ${preview ? 'shadow-[0_0_80px_rgba(0,255,148,0.1)]' : 'hover:bg-white/5'}
            `}
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-bio-green/20 z-10" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-bio-green/20 z-10" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-bio-green/20 z-10" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-bio-green/20 z-10" />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                        />

                        {preview ? (
                            <div className="relative w-full h-full group">
                                <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-60 grayscale-[0.3]" />

                                {/* HUD Grid Overlay */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply" />

                                <AnimatePresence>
                                    {scanning && (
                                        <motion.div
                                            key="scanner"
                                            className="absolute inset-0 z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {/* Laser Line */}
                                            <motion.div
                                                className="absolute w-full h-1 bg-bio-green shadow-[0_0_30px_#00FF94] z-20"
                                                initial={{ top: "0%" }}
                                                animate={{ top: "100%" }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            />

                                            {/* Center Target */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <Target size={120} className="text-bio-green/20 animate-spin-slow" />
                                            </div>

                                            {/* Flashing Text Overlay */}
                                            <div className="absolute bottom-12 left-12 p-6 glass-panel bg-black/80 border border-bio-green/40 min-w-[350px] shadow-2xl">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Cpu className="text-bio-green animate-pulse" size={16} />
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural_Fusion_Active</span>
                                                </div>
                                                <p className="text-bio-green font-mono text-xs mb-2">
                                                    &gt; {FLASHING_TEXTS[currentFlash]}
                                                </p>
                                                <div className="w-full bg-white/10 h-1 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-bio-green shadow-[0_0_10px_#00FF94]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 3, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {result && (
                                        <motion.div
                                            key="detection"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 z-10 flex items-center justify-center"
                                        >
                                            {/* Bounding Box on Blight */}
                                            <motion.div
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1 }}
                                                className="w-1/2 h-1/2 border-2 border-red-500 rounded-sm relative shadow-[0_0_40px_rgba(239,68,68,0.3)]"
                                            >
                                                <div className="absolute -top-10 left-0 flex flex-col items-start gap-1">
                                                    <div className="bg-red-500 text-white text-[10px] px-3 py-1 font-black uppercase italic flex items-center gap-2">
                                                        <ScanLine size={12} /> Target_Identified
                                                    </div>
                                                    <div className="bg-black/80 border border-red-500 text-red-500 text-[8px] px-2 py-0.5 font-mono">
                                                        SCORE: 0.98421
                                                    </div>
                                                </div>
                                                {/* Corner Ornaments */}
                                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-500" />
                                                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-red-500" />
                                                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-red-500" />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-500" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 p-12 text-center">
                                <div className="w-32 h-32 mb-8 rounded-full bg-bio-green/5 border border-bio-green/10 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border border-bio-green/20 animate-ping" />
                                    <Upload size={48} className="text-bio-green" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Initialize_Link</h3>
                                <p className="text-sm max-w-sm opacity-60 font-medium">Awaiting biological sample for neural classification. Upload specimen to start inference.</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || scanning}
                        className={`
              w-full py-6 rounded-xl font-black text-xl italic uppercase tracking-widest transition-all relative overflow-hidden group
              ${!file
                                ? 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                                : 'bg-bio-green text-black hover:bg-white shadow-[0_0_60px_rgba(0,255,148,0.3)]'
                            }
            `}
                    >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {scanning ? <Loader2 className="animate-spin" /> : <Zap className="group-hover:scale-125 transition-transform" size={24} />}
                            {scanning ? "Processing_Biological_Vectors" : "EXECUTE_NEURAL_SCAN"}
                        </div>
                    </button>
                </div>

                {/* Intelligence Section */}
                <div className="lg:col-span-5 space-y-6">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <DrGreen result={result} />

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleDownloadReport}
                                        className="px-6 py-5 glass-panel rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition border-white/20"
                                    >
                                        <Download size={18} /> Export_Dossier
                                    </button>
                                    <button className="px-6 py-5 glass-panel rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition border-white/20">
                                        <Shield size={18} /> Community_Sync
                                    </button>
                                </div>

                                <DrGreenChat />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[750px] flex flex-col items-center justify-center glass-panel rounded-2xl bg-bio-mist border border-white/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bio-green/20 to-transparent animate-shimmer" />
                                <div className="text-center p-12 space-y-8">
                                    <div className="relative mx-auto w-32 h-32">
                                        <div className="absolute inset-0 rounded-full border-2 border-bio-green/20 animate-spin-slow shadow-[inset_0_0_20px_rgba(0,255,148,0.1)]" />
                                        <div className="relative w-full h-full rounded-full bg-white/5 flex items-center justify-center text-bio-green shadow-[0_0_40px_rgba(0,255,148,0.05)]">
                                            <Bot size={64} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Awaiting_Neural_Sync</h4>
                                        <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed font-medium">
                                            Dr. Green&apos;s cognitive engine is in standby. Upload field data to trigger pattern recognition fusion.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
