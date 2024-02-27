import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        opacity: {
          '0%': { visibility: 'hidden', transform: 'translateY(-1%)', opacity: '0' },
          '100%': { visibility: 'visible', transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        opacity: 'opacity 1s',
      }
    },
  },
  plugins: [],
};
export default config;
