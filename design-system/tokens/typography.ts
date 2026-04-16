type FontSizeToken = [string, { lineHeight: string }];

export const typography: {
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, FontSizeToken>;
  fontWeight: Record<string, string>;
} = {
  fontFamily: {
    sans: ['"Inter"', "system-ui", "sans-serif"],
    mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
  },
  fontWeight: {
    medium: "500",
    semibold: "600",
  },
};
