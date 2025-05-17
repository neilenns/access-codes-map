import { config } from "@workspace/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["src/types/*.d.ts"], // Exclude declaration files from linting
  },
];
