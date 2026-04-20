import type { Config } from "tailwindcss";
import { colors, radius, shadows, spacing, typography } from "./design-system/tokens";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
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
