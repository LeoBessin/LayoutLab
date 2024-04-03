import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-100': '#666666',
        'accent-200': '#f7f7f7',
        'accent-glow-100': '#f24e1e',
        'accent-glow-200': '#ff7262',
        'accent-glow-300': '#a259ff',
        'accent-glow-400': '#1abcfe',
        'accent-glow-500': '#0acf83',
        'bg-100': '#1a1a1a',
        'bg-200': '#292929',
        'bg-300': '#404040',
        'primary-100': '#333333',
        'primary-200': '#5c5c5c',
        'primary-300': '#b9b9b9',
        'text-100': '#ffffff',
        'text-200': '#e0e0e0',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        DmSans: ["DmSans", "sans-serif"],
        RobotoMono: ["RobotoMono", "sans-serif"],
        Synonym: ["Synonym", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
