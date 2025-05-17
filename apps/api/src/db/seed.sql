DELETE FROM locations;
DELETE FROM users;

INSERT INTO users (id, name) VALUES ('u1', 'Neil'), ('u2', 'Alice');

INSERT INTO locations (
  title, latitude, longitude, note, createdById, modifiedById, hasToilet
) VALUES
  ('Green Lake Park', 47.6797, -122.3415, 'Great for walking dogs', 'u1', 'u1', 1),
  ('Discovery Park', 47.6591, -122.4156, 'Nice view of the Sound', 'u2', 'u2', 0),
  ('Gas Works Park', 47.6456, -122.3344, 'Cool industrial vibe', 'u1', 'u1', 1),
  ('Carkeek Park', 47.7115, -122.3769, 'Quiet and shaded', 'u2', 'u1', 0),
  ('Volunteer Park', 47.6303, -122.3149, 'Right by the conservatory', 'u2', 'u2', 1);