import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EEF4FE",
          100: "#D9E5FC",
          200: "#B4CAF9",
          300: "#8EAEF6",
          400: "#5A8AEF",
          500: "#2D6BE4",
          600: "#1F54C2",
          700: "#19459C",
          800: "#143778",
          900: "#0F2A5C",
        },
        ink: {
          900: "#0B0F19",
          700: "#1F2937",
          500: "#4B5563",
          400: "#6B7280",
          300: "#9CA3AF",
          200: "#D1D5DB",
          100: "#E5E7EB",
          50: "#F3F4F6",
        },
        surface: "#F8F9FA",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
