import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      boxShadow: {
        "autofill-light": "0 0 0px 1000px #FFFFFF inset",
        "autofill-dark": "0 0 0px 1000px #0f172a inset",
        "exercise-field-light": "0 0 0px 1000px #dcfce7 inset",
        "exercise-field-dark": "0 0 0px 1000px #2e1065 inset",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        manrope: ["var(--font-manrope)"],
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
          "overlay-hide 200ms cubic-bezier(0.36, 0.66, 0.04, 1) 50ms",
        "dropdown-menu-scale-up":
          "dropdown-menu-scale-up 400ms cubic-bezier(0.36, 0.66, 0.04, 1)",
        "dropdown-menu-scale-down":
          "dropdown-menu-scale-down 200ms cubic-bezier(0.36, 0.66, 0.04, 1) 50ms",

        // Currently not used
        // "modal-slide-up":
        //   "modal-slide-up 400ms cubic-bezier(0.36, 0.66, 0.04, 1)",
        // "modal-slide-down":
        //   "modal-slide-down 300ms cubic-bezier(0.36, 0.66, 0.04, 1) 50ms",
        // "modal-scale-up":
        //   "modal-scale-up 400ms cubic-bezier(0.36, 0.66, 0.04, 1)",
        // "modal-scale-down":
        //   "modal-scale-down 300ms cubic-bezier(0.36, 0.66, 0.04, 1) 50ms",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-text-fill"),
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
