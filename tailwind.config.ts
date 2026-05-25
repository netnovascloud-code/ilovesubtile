import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  // Tool-card tone classes are looked up dynamically from a Record, so ensure
  // the JIT always emits them even when it can't statically trace the key.
  safelist: [
    "bg-brand-50", "text-brand-600",
    "bg-indigo-50", "text-indigo-600",
    "bg-emerald-50", "text-emerald-600",
    "bg-amber-50", "text-amber-600", "text-amber-700",
    "bg-rose-50", "text-rose-500",
    "bg-violet-50", "text-violet-600",
    "bg-teal-50", "text-teal-600",
    "bg-slate-100", "text-slate-600",
  ],
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
        cardHover: "0 8px 24px -6px rgb(0 0 0 / 0.12), 0 2px 6px -2px rgb(0 0 0 / 0.08)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%, 100%": { borderColor: "rgb(45 107 228 / 0.9)" },
          "50%": { borderColor: "rgb(45 107 228 / 0.35)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-up-delay": "fade-up 0.5s ease-out 0.08s both",
        "fade-up-delay2": "fade-up 0.5s ease-out 0.16s both",
        "pulse-ring": "pulse-ring 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
