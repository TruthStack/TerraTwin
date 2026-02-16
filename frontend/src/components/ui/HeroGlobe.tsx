"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars, Float, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function DataGlobe() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const gridRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            gridRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group>
            {/* Core Globe */}
            <Sphere args={[1.2, 64, 64]} ref={meshRef}>
                <MeshDistortMaterial
                    color="#00FF94"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0}
                    emissive="#054A29"
                    emissiveIntensity={1}
                />
            </Sphere>

            {/* Holographic Wireframe Grid */}
            <Sphere args={[1.25, 32, 32]} ref={gridRef}>
                <meshPhongMaterial
                    wireframe
                    color="#00FF94"
                    opacity={0.15}
                    transparent
                    emissive="#00FF94"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </group>
    );
}

const Hotspot = ({ position, label }: { position: [number, number, number], label: string }) => (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={position}>
            <Sphere args={[0.03, 16, 16]}>
                <meshBasicMaterial color="#ff0000" />
            </Sphere>
            <Text
                position={[0, 0.1, 0]}
                fontSize={0.06}
                color="#00FF94"
                font="/fonts/Inter-Bold.woff"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    </Float>
);

export default function HeroGlobe() {
    return (
        <div className="w-full h-[700px] relative">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FF94" />
                <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={2} color="#054A29" />

                <DataGlobe />

                <Hotspot position={[1, 0.5, 0.5]} label="ASIA_SECTOR_01" />
                <Hotspot position={[-1, -0.4, 0.8]} label="AFRICA_SECTOR_B" />
                <Hotspot position={[0.2, -1.2, 0.4]} label="LATAM_SEC" />

                <Stars radius={100} depth={50} count={6000} factor={4} saturation={1} fade speed={2} />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="text-[10px] font-mono text-bio-green/40 uppercase tracking-[0.3em]">System_Status</div>
                        <div className="text-sm font-black italic text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-bio-green animate-pulse" />
                            RESILIENT_NODE_ACTIVE
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <div className="text-[10px] font-mono text-bio-green/40 uppercase tracking-[0.3em]">Network_Load</div>
                        <div className="text-sm font-black text-white">0.024ms LATENCY</div>
                    </div>
                </div>

                <div className="flex justify-center items-end pb-12">
                    <div className="glass-panel px-6 py-2 border-bio-green/30 flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-[8px] text-white/40 uppercase font-mono">Sensors</div>
                            <div className="text-bio-green font-bold text-lg">12.4k</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="text-center">
                            <div className="text-[8px] text-white/40 uppercase font-mono">Shielding</div>
                            <div className="text-bio-green font-bold text-lg">99.8%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
