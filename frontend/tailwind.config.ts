import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          dark: "#002B36",
          DEFAULT: "#14655B",
          light: "#A7FFEB",
        },
        background: "#002B36",
        foreground: "#ffffff",
        primary: "#14655B",
        secondary: "#A7FFEB",
      },
    },
  },
  plugins: [],
};

export default config;
