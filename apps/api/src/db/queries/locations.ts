export async function getAllLocations(database: D1Database) {
  const { results } = await database.prepare("SELECT * FROM locations").all();
  return results;
}

export async function createLocation(
  database: D1Database,
  {
    title,
    latitude,
    longitude,
    note,
    createdBy,
    hasToilet,
  }: {
    title: string;
    latitude: number;
    longitude: number;
    note: string;
    createdBy: string;
    hasToilet: boolean;
  },
) {
  await database
    .prepare(
      `INSERT INTO locations 
        (id, title, latitude, longitude, note, createdBy, created, hasToilet) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      title,
      latitude,
      longitude,
      note,
      createdBy,
      new Date().toISOString(),
      hasToilet ? 1 : 0,
    )
    .run();
}
