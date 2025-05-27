import isCI from "is-ci";
import z from "zod";
import { auth0url } from "./auth0-url";

const environmentSchema = z
  .object({
    LOCAL_DB_PATH: z.string().optional(),
    APP_BASE_URL: z.string().url().optional(),
    // The default here isn't strictly necessary, NextJS automatically sets NODE_ENV to development
    // when running `next dev` and production when running all other `next` commands.
    // See https://nextjs.org/docs/pages/guides/environment-variables#good-to-know.
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("production")
      .optional(),
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
      .default(false)
      .optional(),
  })
  .superRefine((environment, context) => {
    if (environment.LOCAL_DB_PATH) {
      // If LOCAL_DB_PATH is set, nothing else matters
      return;
    }

    if (environment.DISABLE_AUTH && environment.NODE_ENV === "production") {
      context.addIssue({
        path: ["DISABLE_AUTH"],
        code: z.ZodIssueCode.custom,
        message: "DISABLE_AUTH cannot be true in production environment.",
      });
    }

    if (environment.DISABLE_AUTH && environment.NODE_ENV === "development") {
      console.warn("DISABLE_AUTH is true, authentication is disabled.");
    }

    // Check for required keys in production.
    const requiredCloudflareKeys = [
      "APP_BASE_URL",
      "CLOUDFLARE_ACCOUNT_ID",
      "CLOUDFLARE_DATABASE_ID",
      "CLOUDFLARE_D1_TOKEN",
      "AUTH0_DOMAIN",
      "AUTH0_AUDIENCE",
      "AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET",
      "AUTH0_SECRET",
    ];

    // If running in CI, skip the checks for CloudFlare and Auth0 variables.
    // NextJS issue: https://github.com/vercel/next.js/issues/65531
    if (isCI) {
      console.log(
        "Running in CI, skipping environment variable checks for CloudFlare and Auth0 variables.",
      );
    }

    if (environment.NODE_ENV === "production" && !isCI) {
      for (const key of requiredCloudflareKeys) {
        const value = environment[key as keyof typeof environment];
        if (value === undefined || value === "") {
          context.addIssue({
            path: [key],
            code: z.ZodIssueCode.custom,
            message: `${key} is required in production deployments.`,
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
    result.data.DISABLE_AUTH && result.data.NODE_ENV === "development",
};
