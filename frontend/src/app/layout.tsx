import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for sleek look
import "./globals.css";
// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TerraTwin - The AI Agronomist",
    description: "AI for Food Security",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
