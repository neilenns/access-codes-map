import { Loading } from "@/components/loading";
import { getAllLocations } from "@/db/locations";
import { Suspense } from "react";
import Map from "./map";

export default async function Home() {
  try {
    const locations = await getAllLocations();

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Suspense fallback={<Loading />}>
            <Map locations={locations} />
          </Suspense>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error fetching locations:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error loading locations. Please try again later.</p>
      </div>
    );
  }
}
