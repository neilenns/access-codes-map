import z from "zod";
import { auth0url } from "./auth0-url";

// Schema when running Drizzle studio
const drizzleStudioSchema = z.object({
  LOCAL_DB_PATH: z.string(),
});

// Schema for all other situations
const cloudflareSchema = z.object({
  LOCAL_DB_PATH: z.undefined().optional(),
  APP_BASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  AUTH0_AUDIENCE: auth0url.optional(),
  AUTH0_CLIENT_SECRET: z.string().optional(),
  AUTH0_CLIENT_ID: z.string().optional(),
  AUTH0_DOMAIN: auth0url.optional(),
  AUTH0_SECRET: z.string().optional(), // To generate this use `openssl rand -hex 32`
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_DATABASE_ID: z.string().optional(),
  CLOUDFLARE_D1_TOKEN: z.string().optional(),
  DISABLE_AUTH: z
    .preprocess((value) => value === "true" || value === "1", z.boolean())
    .default(false),
});

const environmentSchema = z
  .union([drizzleStudioSchema, cloudflareSchema])
  .superRefine((environment, context) => {
    // This is when drizzle studio runs, and the rest of the stuff doesn't matter.
    if ("LOCAL_DB_PATH" in environment) {
      return;
    }

    if (environment.DISABLE_AUTH && environment.NODE_ENV === "production") {
      context.addIssue({
        path: ["DISABLE_AUTH"],
        code: z.ZodIssueCode.custom,
        message: "DISABLE_AUTH cannot be true in production environment",
      });
    }

    if (!environment.DISABLE_AUTH) {
      for (const key of [
        "AUTH0_DOMAIN",
        "AUTH0_AUDIENCE",
        "AUTH0_CLIENT_ID",
        "AUTH0_CLIENT_SECRET",
        "AUTH0_SECRET",
      ] as const) {
        // eslint-disable-next-line security/detect-object-injection
        if (!environment[key]) {
          context.addIssue({
            path: [key],
            code: z.ZodIssueCode.custom,
            message: `${key} is required when DISABLE_AUTH is false`,
          });
        }
      }
    }
  });

const result = environmentSchema.safeParse(process.env);
if (!result.success) {
  // Can't use logger.js here because it depends on ENV.
  console.error("Environment validation failed:", result.error.format());
  throw new Error("Environment validation failed");
}

export const ENV = {
  ...result.data,
  AUTH_DISABLED:
    "DISABLE_AUTH" in result.data &&
    "NODE_ENV" in result.data &&
    result.data.DISABLE_AUTH &&
    result.data.NODE_ENV === "development",
};
