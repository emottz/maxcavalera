import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: "#111111",
        secondary: "#666666",
        border: "#E8E8E8",
        bg: "#FFFFFF",
      },
      letterSpacing: {
        widest: "0.2em",
        wider: "0.1em",
      },
    },
  },
  plugins: [],
};
export default config;
