import path from "node:path";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "node:url";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
    ),

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-namespace": "off",
    },
  },
]);
