import { getDatabaseAsync } from ".";

export const getAllLocations = async () => {
  const database = await getDatabaseAsync();

  return await database.query.locations.findMany({
    with: { createdBy: true, modifiedBy: true },
  });
};

export type LocationsWithUsers = Awaited<ReturnType<typeof getAllLocations>>;
