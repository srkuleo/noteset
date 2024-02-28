import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        manrope: ["var(--font-manrope)"],
      },
      gridTemplateColumns: {
        exercise: "2fr 1fr 2fr 2fr",
      },
      borderRadius: {
        modal: "10px",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
        18: "4.5rem",
        38: "9.5rem",
      },
      animation: {
        "overlay-show": "overlay-show 400ms cubic-bezier(0.36, 0.66, 0.04, 1)",

        "overlay-hide":
          "overlay-hide 300ms cubic-bezier(0.36, 0.66, 0.04, 1) 100ms",

        "content-show": "content-show 400ms cubic-bezier(0.36, 0.66, 0.04, 1)",

        "content-hide":
          "content-hide 300ms cubic-bezier(0.36, 0.66, 0.04, 1) 100ms",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const scrollbarUtils = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(scrollbarUtils);
    }),
  ],
};

export default config;
