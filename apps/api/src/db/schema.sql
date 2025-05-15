DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  note TEXT,
  createdBy TEXT NOT NULL,
  created TEXT NOT NULL,
  hasToilet INTEGER NOT NULL,
  FOREIGN KEY (createdBy) REFERENCES users(id)
);
