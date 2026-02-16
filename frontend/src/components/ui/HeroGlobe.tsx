"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.002;
        }
    });

    return (
        <Sphere args={[1, 64, 64]} ref={meshRef}>
            <MeshDistortMaterial
                color="#00FF94"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0}
                emissive="#054A29"
                emissiveIntensity={0.5}
            />
        </Sphere>
    );
}

export default function HeroGlobe() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FF94" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#054A29" />
                <Globe />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>

            {/* Overlay Hotspots */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="flex gap-2 mb-4">
                    {['India', 'Sub-saharan Africa', 'Brazil'].map(loc => (
                        <span key={loc} className="px-3 py-1 bg-bio-green/20 border border-bio-green/50 rounded-full text-[10px] text-bio-green animate-pulse">
                            LIVE: {loc} At Risk
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
