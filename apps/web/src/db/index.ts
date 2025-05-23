import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema/schema";

export const getDatabase = cache(() => {
  const { env } = getCloudflareContext();
  if (Object.keys(env).length === 0) {
    throw new Error("Environment variables are missing or empty.");
  }
  return drizzle(env.ACCESS_CODES_DB, { schema });
});

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDatabaseAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });

  if (Object.keys(env).length === 0) {
    throw new Error("Unable to obtain a Cloudflare context.");
  }

  return drizzle(env.ACCESS_CODES_DB, { schema });
});
