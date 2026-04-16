import type { Config } from "tailwindcss";
import { colors, radius, shadows, spacing, typography } from "./design-system/tokens";

const cssVariableColors = Object.fromEntries(
  Object.keys(colors).map((token) => [token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`), `var(--color-${token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)})`]),
);

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: cssVariableColors,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
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
