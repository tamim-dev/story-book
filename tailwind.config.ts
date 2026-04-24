import type { Config } from "tailwindcss";
import { radius, spacing, typography } from "./design-system/tokens";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "focus-ring": "var(--color-focus-ring)",
      },
      spacing,
      borderRadius: radius,
      boxShadow: {
        md: "var(--global-effect-dropdown-shadow)",
        focus:
          "0 0 0 3px color-mix(in srgb, var(--color-focus-ring) 45%, transparent)",
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      maxWidth: {
        card: "24rem",
      },
    },
  },
};

export default config;
