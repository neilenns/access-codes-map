import { getAllLocations } from "@/db/locations";
import ClientSection from "./client-section";

export default async function MapPage() {
  try {
    const locations = await getAllLocations();

    return <ClientSection locations={locations} />;
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
}
