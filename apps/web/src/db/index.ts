import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema/schema";

export const getDatabase = cache(() => {
  const { env } = getCloudflareContext();
  return drizzle(env.ACCESS_CODES_DB, { schema });
});

// This is the one to use for static routes (i.e. ISR/SSG)
export const getDatabaseAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.ACCESS_CODES_DB, { schema });
});
