"use server";

import { deleteLocation } from "@/db/locations";
import { revalidatePath } from "next/cache";

export const handleDeleteLocation = async (id?: number): Promise<boolean> => {
  if (!id) {
    console.error("No ID provided for deletion.");
    return false;
  }

  try {
    await deleteLocation(id);
    revalidatePath("/map");
    return true;
  } catch (error) {
    console.error("Error deleting location:", error);
    return false;
  }
};
