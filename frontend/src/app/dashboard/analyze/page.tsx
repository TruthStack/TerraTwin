"use client";

import { useState, useEffect } from "react";
import { Upload, ScanLine, Loader2, Download, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeImage } from "@/lib/api";
import DrGreen from "@/components/ui/DrGreen";
import DrGreenChat from "@/components/chat/DrGreenChat";

const FLASHING_TEXTS = [
    "Loading PyTorch Model...",
    "Detecting Edges...",
    "Classifying Lesions...",
    "Syncing NASA Geo-Grids...",
    "Running Inference...",
    "Analyzing Moisture Vectors..."
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
            }, 3000); // 3 seconds for better tech-flex duration

        } catch (error) {
            console.error("Analysis failed:", error);
            setScanning(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-bio-green to-blue-400 italic uppercase">
                    Neural Scan Terminal
                </h2>
                <p className="text-white/40 tracking-widest text-xs uppercase">Vision System [v2.4.0] Online</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Upload/Visual Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div
                        className={`
              relative h-[600px] rounded-2xl border border-white/10 transition-all overflow-hidden bg-black
              ${preview ? 'shadow-[0_0_50px_rgba(0,255,148,0.1)]' : 'hover:bg-white/5'}
            `}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                        />

                        {preview ? (
                            <div className="relative w-full h-full group">
                                <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-80" />

                                {/* Visual Overlays */}
                                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/80 ring-1 ring-bio-green/20" />

                                {/* Crosshair Decor */}
                                <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-bio-green opacity-50" />
                                <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-bio-green opacity-50" />
                                <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-bio-green opacity-50" />
                                <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-bio-green opacity-50" />

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
                                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                            />
                                            {/* Tech Grid */}
                                            <div className="absolute inset-0 bg-[url('/grid.png')] bg-repeat opacity-20" />

                                            {/* Flashing Text Overlay */}
                                            <div className="absolute bottom-12 left-12 p-4 glass-panel bg-black/60 border border-bio-green/30 min-w-[300px]">
                                                <p className="text-bio-green font-mono text-sm animate-pulse">
                                                    &gt; {FLASHING_TEXTS[currentFlash]}
                                                </p>
                                                <div className="w-full bg-white/10 h-1 mt-2">
                                                    <motion.div
                                                        className="h-full bg-bio-green"
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
                                            className="absolute inset-0 z-10 p-20"
                                        >
                                            {/* Bounding Box on Blight */}
                                            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-red-500 rounded-sm">
                                                <span className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter">
                                                    Confidence: 98.4% - Early Blight
                                                </span>
                                                {/* Box Corners */}
                                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500" />
                                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500" />
                                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500" />
                                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 p-12 text-center">
                                <div className="w-24 h-24 mb-6 rounded-full bg-bio-green/5 border border-bio-green/10 flex items-center justify-center">
                                    <Upload size={48} className="text-bio-green" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Secure Sample Terminal</h3>
                                <p className="text-sm max-w-sm opacity-60">Initialize link to mobile field agent. Drag & drop or click to upload crop specimen data.</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || scanning}
                        className={`
              w-full py-5 rounded-xl font-black text-lg uppercase tracking-widest transition-all
              ${!file
                                ? 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                                : 'bg-bio-green text-black hover:bg-white shadow-[0_0_50px_rgba(0,255,148,0.3)]'
                            }
            `}
                    >
                        {scanning ? "Processing Neural Layers..." : "Execute Analysis"}
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
                                        className="px-6 py-4 glass-panel rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition border-white/20"
                                    >
                                        <Download size={16} /> Export Dossier
                                    </button>
                                    <button className="px-6 py-4 glass-panel rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition border-white/20">
                                        Global Context
                                    </button>
                                </div>

                                <DrGreenChat />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[700px] flex flex-col items-center justify-center glass-panel rounded-2xl bg-bio-mist border border-white/10"
                            >
                                <div className="text-center p-12 space-y-6">
                                    <div className="relative mx-auto w-24 h-24">
                                        <div className="absolute inset-0 rounded-full border border-bio-green/20 animate-ping" />
                                        <div className="relative w-full h-full rounded-full bg-white/5 flex items-center justify-center text-bio-green">
                                            <Bot size={48} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-white font-black uppercase tracking-widest">Awaiting Neural Link</h4>
                                        <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed">
                                            Upload a field sample to activate Dr. Green&apos;s multi-modal intelligence engine.
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
