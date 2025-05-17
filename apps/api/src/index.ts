import { Hono } from "hono";
import { createDatabase } from "./db/index.ts";
import { userTable } from "./db/users.ts";
import { CloudflareEnvironment } from "./types/cloudflare.ts";

const app = new Hono<CloudflareEnvironment>();

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/seed", async (c) => {
    try {
      const database = createDatabase(c.env);

      const user = await database
        .insert(userTable)
        .values({
          name: "John Doe",
          id: "123456",
        })
        .returning()
        .get();
      return c.json(user);
    } catch (error) {
      console.error("Error seeding database:", error);
      return c.text("Error seeding database", 500);
    }
  });

// Add worker event handling
export default {
  fetch: app.fetch,
};
