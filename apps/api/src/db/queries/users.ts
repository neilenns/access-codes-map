export async function getUserById(database: D1Database, id: string) {
  const { results } = await database
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .all();

  return results[0] ?? undefined;
}

export async function createUser(database: D1Database, name: string) {
  const id = crypto.randomUUID();
  await database
    .prepare("INSERT INTO users (id, name) VALUES (?, ?)")
    .bind(id, name)
    .run();
  return id;
}
