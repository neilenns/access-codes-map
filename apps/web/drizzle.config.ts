import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/lib/environment";

export default ENV.LOCAL_DB_PATH
  ? defineConfig({
      schema: "./src/db/schema/schema.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: `./${ENV.LOCAL_DB_PATH}`,
      },
    })
  : defineConfig({
      schema: "./src/db/schema/schema.ts",
      dialect: "sqlite",
      out: "./drizzle/migrations",
      driver: "d1-http",
      dbCredentials: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accountId: ENV.CLOUDFLARE_ACCOUNT_ID!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        databaseId: ENV.CLOUDFLARE_DATABASE_ID!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        token: ENV.CLOUDFLARE_D1_TOKEN!,
      },
    });
