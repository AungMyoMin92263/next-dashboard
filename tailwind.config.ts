import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)", // Custom radius values
        md: "calc(var(--radius) - 2px)", // Slightly smaller radius
        sm: "calc(var(--radius) - 4px)", // Even smaller radius
      },
      colors: {
        background: "hsl(var(--background))", // Custom HSL background color
        foreground: "hsl(var(--foreground))", // Custom foreground color
        card: {
          DEFAULT: "hsl(var(--card))", // Card default color
          foreground: "hsl(var(--card-foreground))", // Card foreground color
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Popover default color
          foreground: "hsl(var(--popover-foreground))", // Popover foreground color
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Primary color
          foreground: "hsl(var(--primary-foreground))", // Primary foreground color
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Secondary color
          foreground: "hsl(var(--secondary-foreground))", // Secondary foreground color
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Muted color
          foreground: "hsl(var(--muted-foreground))", // Muted foreground color
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Accent color
          foreground: "hsl(var(--accent-foreground))", // Accent foreground color
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Destructive color
          foreground: "hsl(var(--destructive-foreground))", // Destructive foreground color
        },
        border: "hsl(var(--border))", // Border color
        input: "hsl(var(--input))", // Input field color
        ring: "hsl(var(--ring))", // Ring color for focus effects
        chart: {
          1: "hsl(var(--chart-1))", // Chart colors
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
