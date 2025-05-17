import { Hono } from "hono";
import { createDatabase } from "./db/index.ts";
import { CloudflareEnvironment } from "./types/cloudflare.ts";
const app = new Hono<CloudflareEnvironment>();

app.get("/", async (c) => {
  const database = createDatabase(c.env);

  // Fetch all records from the locations table with related users
  const result = await database.query.locations.findMany({
    with: {
      createdBy: true,
      modifiedBy: true,
    },
  });

  return c.json(result);
});

// Add worker event handling
export default {
  fetch: app.fetch,
};
