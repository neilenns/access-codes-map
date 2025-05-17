import { config } from "@workspace/eslint-config/base";

export default [
  ...config,
  {
    ignorePatterns: ["src/types/*.d.ts"], // Exclude declaration files from linting
  },
];
