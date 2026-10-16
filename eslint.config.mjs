import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next.js + React + React Hooks rules, with Core Web Vitals issues (e.g. <img> instead of next/image) as
// errors, plus typescript-eslint. Formatting is left to oxfmt (`pnpm format`), so no stylistic rules here.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
