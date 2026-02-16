import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "bio-black": "#020402",
                "bio-gray": "#1A1D1A",
                "bio-green": "#00FF94", // Neon Lime
                "bio-emerald": "#054A29",
                "bio-mist": "rgba(255, 255, 255, 0.05)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "bio-gradient": "linear-gradient(180deg, #020402 0%, #051910 100%)",
            },
        },
    },
    plugins: [],
};
export default config;
