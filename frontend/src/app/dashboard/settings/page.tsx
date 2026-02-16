"use client";

import { Settings as SettingsIcon, Bell, Shield, Database } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold italic tracking-tighter">Terminal Settings</h2>
                <p className="text-white/50">Configure your TerraTwin node</p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Bell className="text-bio-green" />
                        <div>
                            <p className="font-bold">Real-time Alerts</p>
                            <p className="text-xs text-white/40">Push notifications for disease detection</p>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-bio-green/20 rounded-full p-1 relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-bio-green rounded-full shadow-[0_0_10px_#00FF94]" />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Database className="text-bio-green" />
                        <div>
                            <p className="font-bold">NASA Sync Frequency</p>
                            <p className="text-xs text-white/40">Current: 1-hour interval</p>
                        </div>
                    </div>
                    <button className="text-xs text-bio-green font-bold px-3 py-1 border border-bio-green/30 rounded-lg">MODIFY</button>
                </div>
            </div>
        </div>
    );
}
