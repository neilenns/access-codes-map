DELETE FROM users;
INSERT INTO users (id, name) VALUES ('u1', 'Neil'), ('u2', 'Alice');

DELETE FROM locations;
INSERT INTO locations (
  id, title, latitude, longitude, note, createdBy, created, hasToilet
) VALUES
  ('loc1', 'Green Lake Park', 47.6797, -122.3415, 'Great for walking dogs', 'u1', '2025-05-15T12:00:00Z', 1),
  ('loc2', 'Discovery Park', 47.6591, -122.4156, 'Nice view of the Sound', 'u2', '2025-05-14T10:30:00Z', 0),
  ('loc3', 'Gas Works Park', 47.6456, -122.3344, 'Cool industrial vibe', 'u1', '2025-05-13T09:15:00Z', 1),
  ('loc4', 'Carkeek Park', 47.7115, -122.3769, 'Quiet and shaded', 'u2', '2025-05-12T08:45:00Z', 0),
  ('loc5', 'Volunteer Park', 47.6303, -122.3149, 'Right by the conservatory', 'u2', '2025-05-11T14:20:00Z', 1);
