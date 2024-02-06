import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "identity-primary": "#DC0A2D",
        grayscale: {
          dark: "#212121",
          medium: "#666666",
          background: "#EFEFEF",
        },
        "pokemon-type": {
          bug: "#A7B723",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const utilities = {
        ".tw-grid-list": {
          "container-type": "inline-size",
        },
      }

      addUtilities(utilities)
    },
  ],
}
export default config
