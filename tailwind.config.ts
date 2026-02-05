import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  darkMode: "class",
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
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
        "lg+": "10px",
        "4xl": "28px",
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
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-text-fill"),
    plugin(({ addUtilities }) => {
      const scrollbarUtils = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      }

      addUtilities(scrollbarUtils)
    }),
  ],
}

export default config
