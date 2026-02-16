"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ScanLine, Sprout, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ScanLine, label: "Analyze", href: "/dashboard/analyze" },
    { icon: Sprout, label: "Crops", href: "/dashboard/crops" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 z-50 flex flex-col"
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold text-bio-green tracking-tighter">
                    TerraTwin
                </h1>
                <p className="text-xs text-white/50">AI Agronomist v1.0</p>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-bio-green/10 text-bio-green shadow-[0_0_20px_rgba(0,255,148,0.2)]"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"
                                    }`}
                            />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-8 bg-bio-green rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl w-full transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </motion.aside>
    );
}
