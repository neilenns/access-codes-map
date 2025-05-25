DELETE FROM locations;
DELETE FROM users;

INSERT INTO users (id, name) VALUES ('auth0|65c6b856d26e9173bdabdb2e', 'Neil'), ('64ab22222a18e125c232ba01', 'Blair');

INSERT INTO locations (
  title, latitude, longitude, note, createdById, modifiedById, hasToilet, views
) VALUES
  ('Green Lake Park', 47.6797, -122.3415, 'Great for walking dogs.
  
This park has a beautiful lake and plenty of open space for activities.', 'auth0|65c6b856d26e9173bdabdb2e', 'auth0|65c6b856d26e9173bdabdb2e', 1, 0),
  ('Discovery Park', 47.6591, -122.4156, 'Nice view of the Sound', '64ab22222a18e125c232ba01', '64ab22222a18e125c232ba01', 0, 0),
  ('Gas Works Park', 47.6456, -122.3344, 'Cool industrial vibe', 'auth0|65c6b856d26e9173bdabdb2e', 'auth0|65c6b856d26e9173bdabdb2e', 1, 0),
  ('Carkeek Park', 47.7115, -122.3769, 'Quiet and shaded', '64ab22222a18e125c232ba01', 'auth0|65c6b856d26e9173bdabdb2e', 0, 0),
  ('Volunteer Park', 47.6303, -122.3149, 'Right by the conservatory', '64ab22222a18e125c232ba01', '64ab22222a18e125c232ba01', 1, 0);