"use server";

import { incrementViews } from "@/db/locations";

export const handleIncrementViews = async (id: number): Promise<boolean> => {
  try {
    await incrementViews(id);
    return true;
  } catch (error) {
    console.error("Error incrementing views:", error);
    return false;
  }
};
