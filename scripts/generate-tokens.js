import fs from "fs";
import path from "path";

const globalTokensPath = path.resolve("tokens/global.json");
const componentTokensPath = path.resolve("design-system/component.json");
const tokensOutputPath = path.resolve("design-system/tokens/tokens.css");
const componentOutputPath = path.resolve(
  "design-system/tokens/component-tokens.css",
);

const globalTokens = JSON.parse(fs.readFileSync(globalTokensPath, "utf8"));
const componentTokens = JSON.parse(
  fs.readFileSync(componentTokensPath, "utf8"),
);

const categoryPrefixMap = {
  Gray: "color",
  Primary: "color",
  Secondary: "color",
  Success: "color",
  Warning: "color",
  Danger: "color",
  "Dropdown Shadow": "effect",
  fontFamilies: "font-family",
  lineHeights: "line-height",
  fontWeights: "font-weight",
  fontSize: "font-size",
  letterSpacing: "letter-spacing",
  paragraphSpacing: "paragraph-spacing",
  paragraphIndent: "paragraph-indent",
  textCase: "text-case",
  textDecoration: "text-decoration",
  Display: "typography",
  Heading: "typography",
  Label: "typography",
  Body: "typography",
};
const includeCategoryInName = new Set([
  "Gray",
  "Primary",
  "Secondary",
  "Success",
  "Warning",
  "Danger",
  "Dropdown Shadow",
]);

const pxTypes = new Set([
  "fontSize",
  "fontSizes",
  "lineHeights",
  "paragraphSpacing",
  "dimension",
]);

const toKebabCase = (value) =>
  value
    .toString()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/,/g, "")
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

const resolveReference = (value, tree = globalTokens) => {
  if (
    typeof value !== "string" ||
    !value.startsWith("{") ||
    !value.endsWith("}")
  ) {
    return value;
  }

  const tokenPath = value.slice(1, -1).split(".");
  let current = tree;
  for (const segment of tokenPath) {
    current = current?.[segment];
  }

  if (current && typeof current === "object" && "$value" in current) {
    return normalizeValue(current.$value, current.$type);
  }

  return current ?? value;
};

const normalizeValue = (tokenValue, tokenType) => {
  if (tokenType === "boxShadow" && typeof tokenValue === "object") {
    const { x, y, blur, spread, color } = tokenValue;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  if (tokenType === "typography" && typeof tokenValue === "object") {
    return tokenValue;
  }

  const resolved = resolveReference(tokenValue);

  if (typeof resolved === "number" && pxTypes.has(tokenType)) {
    return `${resolved}px`;
  }

  return resolved;
};

const globalDeclarations = [];
const emitGlobalVariables = (token, pathParts = []) => {
  if (!token || typeof token !== "object") return;

  if ("$value" in token) {
    const tokenType = token.$type;
    const normalized = normalizeValue(token.$value, tokenType);
    const [rootCategory, ...rest] = pathParts;
    const categoryPrefix = categoryPrefixMap[rootCategory] ?? "token";
    const nameParts = includeCategoryInName.has(rootCategory)
      ? [rootCategory, ...rest]
      : rest;
    const baseName = toKebabCase(nameParts.join("-"));

    if (tokenType === "typography" && typeof normalized === "object") {
      Object.entries(normalized).forEach(([subKey, subValue]) => {
        const resolved = resolveReference(subValue);
        const finalValue =
          typeof resolved === "number" ? `${resolved}px` : resolved;
        const variableName = `--global-${categoryPrefix}-${baseName}-${toKebabCase(subKey)}`;
        globalDeclarations.push(`  ${variableName}: ${finalValue};`);
      });
      return;
    }

    const variableName = `--global-${categoryPrefix}-${baseName}`;
    globalDeclarations.push(`  ${variableName}: ${normalized};`);
    return;
  }

  Object.entries(token).forEach(([nextKey, nextToken]) => {
    emitGlobalVariables(nextToken, [...pathParts, nextKey]);
  });
};

Object.entries(globalTokens).forEach(([category, group]) => {
  emitGlobalVariables(group, [category]);
});

const componentDeclarations = [];
const emitComponentVariables = (token, pathParts = []) => {
  if (!token || typeof token !== "object") return;

  Object.entries(token).forEach(([key, value]) => {
    const nextParts = [...pathParts, key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      emitComponentVariables(value, nextParts);
      return;
    }

    const name = `--${nextParts.map(toKebabCase).join("-")}`;
    componentDeclarations.push(`  ${name}: ${value};`);
  });
};

emitComponentVariables(componentTokens, []);

const tokensCss = `:root {\n${globalDeclarations.join("\n")}\n}\n`;
const componentCss = `:root {\n${componentDeclarations.join("\n")}\n}\n`;

const outputDir = path.resolve("design-system/tokens");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(tokensOutputPath, tokensCss);
fs.writeFileSync(componentOutputPath, componentCss);

console.log("Global tokens generated at design-system/tokens/tokens.css");
console.log(
  "Component tokens generated at design-system/tokens/component-tokens.css",
);

// to run the script: node scripts/generate-tokens.js
