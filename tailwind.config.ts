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
        ivory: {
          50: "#FCFBF9",
          100: "#F9F6F0",
          200: "#F3EDE2",
          300: "#ECE2D2",
          400: "#DECDB6",
          500: "#CDB597",
          600: "#B89B79",
        },
        gold: {
          50: "#FAF7EE",
          100: "#F4ECD5",
          200: "#E9D9AB",
          300: "#DEC581",
          400: "#D4AF37", // classic rich gold
          500: "#C5A880", // champagne gold
          600: "#B08E55",
          700: "#8C6E39",
          800: "#6B522A",
          900: "#4D3B1E",
        },
        onyx: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#5D5D5D",
          600: "#3F3F3F",
          700: "#2B2B2B",
          800: "#1A1A1A",
          900: "#111111",
          950: "#0A0A0A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(26, 26, 26, 0.07)",
        "luxury-lg": "0 25px 60px -15px rgba(197, 168, 128, 0.2)",
        "gold-glow": "0 0 30px rgba(197, 168, 128, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
