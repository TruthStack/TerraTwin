"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";

// This ensures Leaflet icons work correctly after dynamic import
if (typeof window !== "undefined") {
    require("leaflet-defaulticon-compatibility");
}

// Custom Marker Creators
const createRippleIcon = (color: string) => {
    if (typeof window === "undefined") return null;
    return new L.DivIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin" style="background: ${color}; box-shadow: 0 0 15px ${color}">
             <div class="ripple" style="border-color: ${color}"></div>
           </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

// Farm Locations (Mock Data)
const farms = [
    { id: 1, name: "Sector Alpha (You)", lat: 37.7749, lng: -122.4194, health: "Critical", alert: true, color: "#ef4444" },
    { id: 2, name: "Neighbor Farm A", lat: 37.7849, lng: -122.4094, health: "Risk", alert: false, color: "#eab308" },
    { id: 3, name: "Neighbor Farm B", lat: 37.7649, lng: -122.4294, health: "Good", alert: false, color: "#00FF94" },
];

export default function FarmMap() {
    return (
        <div className="w-full h-full relative">
            <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {farms.map((farm) => {
                    const icon = createRippleIcon(farm.color);
                    return icon ? (
                        <Marker key={farm.id} position={[farm.lat, farm.lng]} icon={icon}>
                            <Popup className="glass-popup">
                                <div className="text-black p-2 bg-white rounded-lg shadow-xl">
                                    <h3 className="font-black italic text-xs uppercase mb-1">{farm.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full`} style={{ background: farm.color }} />
                                        <p className="text-[10px] uppercase font-black tracking-tighter">Status: {farm.health}</p>
                                    </div>
                                    {farm.alert && (
                                        <div className="mt-2 pt-2 border-t border-gray-100 italic text-[8px] text-red-600 font-bold uppercase tracking-widest animate-pulse">
                                            Shield Dispatched
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ) : null;
                })}
            </MapContainer>
        </div>
    );
}
