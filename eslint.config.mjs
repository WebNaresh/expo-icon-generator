import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable 'any' type warnings globally
      "@typescript-eslint/no-explicit-any": "off",

      // Allow console statements (useful for debugging and logging)
      "no-console": "off",
    },
  },
];

export default eslintConfig;
