import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { users } from "./users.ts";

export const locations = sqliteTable(
  "locations",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    latitude: real().notNull(),
    longitude: real().notNull(),
    note: text(),
    created: text()
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    hasToilet: integer({ mode: "boolean" }).notNull(),
    createdById: text().references(() => users.id),
    modifiedById: text().references(() => users.id),
    lastModified: text()
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => [
    index("createdById_idx").on(table.createdById),
    index("modifiedById_idx").on(table.modifiedById),
  ],
);

export const locationsRelations = relations(locations, ({ one }) => ({
  createdBy: one(users, {
    fields: [locations.createdById],
    references: [users.id],
  }),
  modifiedBy: one(users, {
    fields: [locations.modifiedById],
    references: [users.id],
  }),
}));
