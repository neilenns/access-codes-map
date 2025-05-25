import { LocationFormData } from "@/schema/location-form-data";
import { eq, sql } from "drizzle-orm";
import { getDatabaseAsync } from ".";
import { locations } from "./schema/schema";

export const getAllLocations = async () => {
  try {
    const database = await getDatabaseAsync();

    return await database.query.locations.findMany({
      with: { createdBy: true, modifiedBy: true },
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; // Rethrow the error to handle it in the calling functions
  }
};

export const deleteLocation = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    return await database.delete(locations).where(eq(locations.id, id));
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error; // Rethrow the error to handle it in the calling functions
  }
};

export const addLocation = async (data: LocationFormData) => {
  try {
    const database = await getDatabaseAsync();

    return await database.insert(locations).values({
      title: data.title,
      note: data.note,
      latitude: data.latitude,
      longitude: data.longitude,
      hasToilet: data.hasToilet,
      createdById: data.createdById,
      modifiedById: data.modifiedById,
      lastModified: sql`(CURRENT_TIMESTAMP)`,
      created: sql`(CURRENT_TIMESTAMP)`,
    });
  } catch (error) {
    console.error("Error adding location:", error);
    throw error; // Rethrow the error to handle it in the calling functions
  }
};

export const incrementViews = async (id: number) => {
  try {
    const database = await getDatabaseAsync();

    // Fetch the current value of views
    const location = await database.query.locations.findFirst({
      where: eq(locations.id, id),
      columns: { views: true },
    });

    if (!location) {
      throw new Error(`Location with ID ${id.toString()} not found`);
    }

    console.log("Current views:", location.views);

    const updatedViews = (location.views || 0) + 1;

    console.log("Updated views:", updatedViews);

    // Update the database with the new value
    return await database
      .update(locations)
      .set({
        views: updatedViews,
        lastViewed: sql`(CURRENT_TIMESTAMP)`,
      })
      .where(eq(locations.id, id));
  } catch (error) {
    console.error("Error incrementing views for location:", error);
    throw error;
  }
};

export const updateLocation = async (data: LocationFormData) => {
  if (!data.id) {
    throw new Error("Location ID is required for update");
  }

  try {
    const database = await getDatabaseAsync();

    return await database
      .update(locations)
      .set({
        title: data.title,
        note: data.note,
        latitude: data.latitude,
        longitude: data.longitude,
        hasToilet: data.hasToilet,
        modifiedById: data.modifiedById,
        lastModified: sql`(CURRENT_TIMESTAMP)`,
      })
      .where(eq(locations.id, data.id));
  } catch (error) {
    console.error("Error updating location:", error);
    throw error; // Rethrow the error to handle it in the calling functions
  }
};

export type LocationsWithUsers = Awaited<ReturnType<typeof getAllLocations>>;
export type LocationWithUsers = LocationsWithUsers[number];
