import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#2E7BFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A855F7",
          foreground: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#131313",
          bright: "#3a3939",
          dim: "#131313",
        },
        "surface-container": {
          lowest: "#0e0e0e",
          low: "#1c1b1b",
          DEFAULT: "#222121",
          high: "#282727",
          highest: "#333232",
        },
        "on-surface": "#FFFFFF",
        "on-surface-variant": "#A1A1AA",
        outline: "#27272A",
        "outline-variant": "#3F3F46",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        champagne: "#F7E7CE",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        unit: "4px",
        "stack-sm": "8px",
        "stack-lg": "32px",
        "stack-md": "16px",
        gutter: "24px",
        "section-gap": "80px",
        "container-padding": "40px"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        headline: ["var(--font-inter)", "sans-serif"],
        "label-caps": ["var(--font-jakarta)", "sans-serif"],
      },
      fontSize: {
        "body-md": ["15px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "display-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "800"}],
        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "700"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "700"}]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translate(-100%, -100%) rotate(45deg)" },
          "100%": { transform: "translate(100%, 100%) rotate(45deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
