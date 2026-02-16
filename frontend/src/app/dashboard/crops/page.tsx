"use client";

import { motion } from "framer-motion";
import { Sprout, TrendingUp, AlertCircle } from "lucide-react";

const cropData = [
    { name: "Tomato (Sector Alpha)", status: "Healthy", yield: "92%", color: "text-bio-green" },
    { name: "Potato (Sector Beta)", status: "At Risk", yield: "64%", color: "text-yellow-400" },
];

export default function CropsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold italic tracking-tighter">My Crops</h2>
                <p className="text-white/50">Active inventory and health monitoring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cropData.map((crop, i) => (
                    <motion.div
                        key={crop.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-6 rounded-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{crop.name}</h3>
                                <p className="text-xs text-white/40 uppercase tracking-widest">Global ID #TX-00{i + 1}</p>
                            </div>
                            <Sprout className={crop.color} />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-white/50 mb-1">Health Index</p>
                                <p className={`text-2xl font-black ${crop.color}`}>{crop.status}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-white/50 mb-1">Est. Yield</p>
                                <p className="text-xl font-mono">{crop.yield}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
