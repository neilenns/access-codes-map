import { Hono } from "hono";
import { getUserById } from "./db/queries/users.js";

interface Bindings {
  ACCESS_CODES_DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  const user = await getUserById(c.env.ACCESS_CODES_DB, "u1");

  console.log(user);
  return c.text("Hello Hono!");
});

export default app;
