import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b93a26",    // CPA Learning Red
        accent: "#e0533c",     // Orange-Red
        gold: "#c9a054",       // Gold / Accent
        darkBg: "#111827",     // 2x2 card bg
        siteBg: "#f8fafc"
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};
export default config;