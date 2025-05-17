import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/lib/environment.ts";

console.log("LOCAL_DB_PATH", ENV.LOCAL_DB_PATH);

export default ENV.LOCAL_DB_PATH
  ? {
      schema: "./src/db/schema.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: `./${ENV.LOCAL_DB_PATH}`,
      },
    }
  : defineConfig({
      schema: "./src/db/schema.ts",
      dialect: "sqlite",
      out: "./drizzle/migrations",
      driver: "d1-http",
      dbCredentials: {
        accountId: ENV.CLOUDFLARE_ACCOUNT_ID ?? "",
        databaseId: ENV.CLOUDFLARE_DATABASE_ID ?? "",
        token: ENV.CLOUDFLARE_D1_TOKEN ?? "",
      },
    });
