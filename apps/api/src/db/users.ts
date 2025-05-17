import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
});
