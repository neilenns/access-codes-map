import { drizzle } from "drizzle-orm/d1";
import { CloudflareEnvironment } from "../types/cloudflare.ts";
import * as schema from "./schema.ts";

export function createDatabase(environment: CloudflareEnvironment["Bindings"]) {
  const database = drizzle(environment.ACCESS_CODES_DB, { schema });
  return database;
}
