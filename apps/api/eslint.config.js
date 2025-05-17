import { config } from "@workspace/eslint-config/base";

export default [...config, { exclude: ["src/types/*.d.ts"] }];
