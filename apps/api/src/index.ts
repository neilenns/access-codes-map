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
    const database = createDatabase(c.env);

    const result = await database.select().from(userTable).all();

    c.json(result);
  });

export default app;
