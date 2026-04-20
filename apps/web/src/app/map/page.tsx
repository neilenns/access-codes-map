import { getAllLocations } from "@/db/locations";
import ClientSection from "./client-section";

export default async function MapPage() {
  let locations;

  try {
    locations = await getAllLocations();
  } catch {
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

  return <ClientSection locations={locations} />;
}
