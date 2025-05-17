import { config } from "@dotenvx/dotenvx";
import z from "zod";

config({
  ignore: ["MISSING_ENV_FILE"],
});

const environmentSchema = z.union([
  // Local database configuration
  z.object({
    LOCAL_DB_PATH: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    CLOUDFLARE_DATABASE_ID: z.string().optional(),
    CLOUDFLARE_D1_TOKEN: z.string().optional(),
  }),
  // Cloudflare D1 configuration
  z.object({
    LOCAL_DB_PATH: z.undefined().optional(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_DATABASE_ID: z.string(),
    CLOUDFLARE_D1_TOKEN: z.string(),
  }),
]);

const result = environmentSchema.safeParse(process.env);
if (!result.success) {
  // Can't use logger.js here because it depends on ENV.
  console.error("Environment validation failed:", result.error.format());
  throw new Error("Environment validation failed");
}

export const ENV = result.data;
