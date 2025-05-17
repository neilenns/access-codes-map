import pluginNext from "@next/eslint-plugin-next";
import { config } from "@workspace/eslint-config/base";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * @type {import("eslint").FlatConfig[]}
 * */
export default [
  ...config,
  {
    ignores: [
      "dist/**",
      ".next/**",
      "src/components/ui/**", // shadcn components, I'm not fixing their linting issues
      "src/hooks/**", // shadcn hooks, I'm not fixing their linting issues
      "prettier.config.js",
      "src/types/*.d.ts",
    ],
  },
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  },
];
