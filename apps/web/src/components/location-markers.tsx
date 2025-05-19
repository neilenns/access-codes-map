import { LocationsWithUsers } from "@/db/locations";
import LocationMarker from "./location-marker";

export interface LocationMarkersProperties {
  locations: LocationsWithUsers;
}

export default function LocationMarkers({
  locations,
}: LocationMarkersProperties) {
  return (
    <>
      {locations.map((location) => (
        <LocationMarker location={location} key={location.id} />
      ))}
    </>
  );
}
