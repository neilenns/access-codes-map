# Converts an exported Mongodb dump of the locations to SQL insert statements that can
# be used to seed a wrangler D1 database.
import json

INPUT_JSON = "access-code-map.locations.json"
OUTPUT_SQL = "seed.sql"
BATCH_SIZE = 100

USER_ID_MAP = {
    # Blair's old site account value
    "64ab22222a18e125c232ba01": "64ab22222a18e125c232ba01",
    "64a8b83ddf22186d20cfa388": "auth0|65c6b856d26e9173bdabdb2e",  # Neil's dev Auth0
}


def parse_oid(oid_obj):
    return oid_obj["$oid"]


def parse_date(date_obj):
    return date_obj["$date"]


with open(INPUT_JSON, "r") as f:
    data = json.load(f)

rows = []
for entry in data:
    title = entry.get("title", "").replace("'", "''")
    note = entry.get("note", "").replace("'", "''")
    latitude = entry["latitude"]
    longitude = entry["longitude"]
    created = parse_date(entry["created"])
    last_modified = parse_date(entry["lastModified"])
    has_toilet = int(entry.get("hasToilet", False))
    created_by_oid = parse_oid(entry["createdBy"])
    modified_by_oid = parse_oid(entry["modifiedBy"])
    created_by = USER_ID_MAP.get(created_by_oid, "unknown")
    modified_by = USER_ID_MAP.get(modified_by_oid, "unknown")

    row = f"('{title}', {latitude}, {longitude}, '{note}', '{created}', {has_toilet}, '{created_by}', '{modified_by}', '{last_modified}')"
    rows.append(row)

with open(OUTPUT_SQL, "w") as f:
    for i in range(0, len(rows), BATCH_SIZE):
        batch = rows[i:i+BATCH_SIZE]
        f.write("INSERT INTO locations (\n")
        f.write("  title, latitude, longitude, note, created, hasToilet, createdById, modifiedById, lastModified\n")
        f.write(") VALUES\n")
        f.write(",\n".join(batch))
        f.write(";\n\n")
