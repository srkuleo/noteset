import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
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
  plugins: [],
};

export default config;
