import { getAllLocations } from "@/db/locations";
import ClientSection from "./client-section";

export default async function MapPage() {
  type LocationsResult =
    | { ok: true; locations: Awaited<ReturnType<typeof getAllLocations>> }
    | { ok: false };

  const locationsResult = await getAllLocations()
    .then((locations) => ({ ok: true, locations } as const))
    .catch(() => ({ ok: false } as const satisfies LocationsResult));

  if (!locationsResult.ok) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex items-center justify-center min-h-screen"
      >
        <p>Error loading locations. Please try again later.</p>
      </div>
    );
  }

  return <ClientSection locations={locationsResult.locations} />;
}
