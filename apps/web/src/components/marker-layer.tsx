import { LocationsWithUsers } from "@/db/locations";
import LocationMarker from "./location-marker";

export interface MarkerLayerProperties {
  locations: LocationsWithUsers;
}

export default function MarkerLayer({ locations }: MarkerLayerProperties) {
  return (
    <>
      {locations.length > 0
        ? locations.map((location) => (
            <LocationMarker location={location} key={location.id} />
          ))
        : undefined}
    </>
  );
}
