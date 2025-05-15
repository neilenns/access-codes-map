import { type D1Database } from "@cloudflare/workers-types";

export async function getUserById(db: D1Database, id: string) {
  const { results } = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .all();
  return results?.[0] ?? null;
}

export async function createUser(db: D1Database, name: string) {
  const id = crypto.randomUUID();
  await db
    .prepare("INSERT INTO users (id, name) VALUES (?, ?)")
    .bind(id, name)
    .run();
  return id;
}
