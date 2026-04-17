import fs from "fs";
import tokens from "../tokens/global.json" with { type: "json" };

let css = ":root {\n";

const tokenCategories = [
  "Primary",
  "Secondary",
  "Gray",
  "Success",
  "Warning",
  "Danger",
  "Test",
  "Dropdown Shadow",
  "Font Families",
  "font-sizes",
  "Letter Spacing",
  "Paragraph Spacing",
  "Display",
  "Heading",
  "Label",
  "body",
  "Text Case",
  "Text Decoration",
  "Paragraph Indent",
];
const colorCategories = new Set([
  "primary",
  "secondary",
  "gray",
  "success",
  "warning",
  "danger",
  "test",
]);

const toKebabCase = (value) =>
  value
    .toString()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/,/g, "")
    .replace(/\/+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();

const getReferenceToken = (value) => {
  if (typeof value !== "string") return value;
  if (!value.startsWith("{") || !value.endsWith("}")) return value;

  const path = value.slice(1, -1).split(".");
  let current = tokens;
  for (const segment of path) {
    current = current?.[segment];
  }

  return current ?? value;
};

const getReferenceValue = (value) => {
  const token = getReferenceToken(value);
  if (token && typeof token === "object" && "$value" in token) {
    return normalizeValue(token.$value, token.$type);
  }

  return token;
};

const normalizeValue = (tokenValue, tokenType) => {
  if (tokenType === "boxShadow" && typeof tokenValue === "object") {
    const color = tokenValue.color ?? "transparent";
    const x = tokenValue.x ?? 0;
    const y = tokenValue.y ?? 0;
    const blur = tokenValue.blur ?? 0;
    const spread = tokenValue.spread ?? 0;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  if (tokenType === "typography" && typeof tokenValue === "object") {
    const flatParts = Object.entries(tokenValue).map(([key, value]) => {
      const resolved = getReferenceValue(value);
      return `${toKebabCase(key)}=${resolved}`;
    });
    return flatParts.join(" | ");
  }

  const resolved = getReferenceValue(tokenValue);
  if (typeof resolved === "number") {
    if (
      tokenType === "font-sizes" ||
      tokenType === "font-size" ||
      tokenType === "line-heights" ||
      tokenType === "line-height" ||
      tokenType === "paragraph-spacing" ||
      tokenType === "dimension" ||
      tokenType === "font-weights" ||
      tokenType === "letter-spacing"
    ) {
      return `${resolved}px`;
    }
  }

  return resolved;
};

const emitTokenVariables = (token, pathParts) => {
  if (!token || typeof token !== "object") return;

  if ("$value" in token) {
    const tokenType = token.$type;
    const value = normalizeValue(token.$value, tokenType);
    const kebabParts = pathParts.map(toKebabCase);
    const varName = colorCategories.has(pathParts[0])
      ? `--color-${kebabParts.join("-")}`
      : `--${kebabParts.join("-")}`;
    css += `  ${varName}: ${value};\n`;
    return;
  }

  Object.entries(token).forEach(([nextKey, nextToken]) => {
    emitTokenVariables(nextToken, [...pathParts, nextKey]);
  });
};

tokenCategories.forEach((category) => {
  const group = tokens[category];
  if (!group) return;
  emitTokenVariables(group, [category]);
});

css += "}\n";

// write file
fs.writeFileSync("design-system/tokens/tokens.css", css);

console.log("✅ Tokens generated successfully");
