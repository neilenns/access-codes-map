import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./users.ts";

export const locationTable = sqliteTable("locations", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  latitude: real().notNull(),
  longitude: real().notNull(),
  note: text(),
  created: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  hasToilet: integer({ mode: "boolean" }).notNull(),
  createdById: text().references(() => userTable.id),
  modifiedById: text().references(() => userTable.id),
  lastModified: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const locationRelations = relations(locationTable, ({ one }) => ({
  createdBy: one(userTable, {
    fields: [locationTable.createdById],
    references: [userTable.id],
  }),
  modifiedBy: one(userTable, {
    fields: [locationTable.modifiedById],
    references: [userTable.id],
  }),
}));
