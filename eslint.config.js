// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/shared/ui/primitives", "**/shared/ui/primitives/*"],
              message:
                "Use specialized components (for example `shared/ui/button/Button` or `shared/form/fields/FormTextField`) instead of base primitives directly.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/ui/**/*.ts", "src/shared/ui/**/*.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
]);
