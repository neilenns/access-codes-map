import { getDatabaseAsync } from ".";

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

export type LocationsWithUsers = Awaited<ReturnType<typeof getAllLocations>>;
export type LocationWithUsers = LocationsWithUsers[number];
