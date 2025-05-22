import { InferInsertModel } from "drizzle-orm";
import { getDatabaseAsync } from ".";
import { users } from "./schema/schema";

export const addUser = async ({ id, name }: InferInsertModel<typeof users>) => {
  try {
    const database = await getDatabaseAsync();

    return await database
      .insert(users)
      .values({
        id,
        name,
      })
      .onConflictDoNothing();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Rethrow the error to handle it in the calling functions
  }
};
