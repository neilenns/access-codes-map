import { LocationWithUsers } from "@/db/locations";
import LocationMarker from "./location-marker";

export interface MarkerLayerProperties {
  locations: LocationWithUsers[];
}

export default function MarkerLayer({ locations }: MarkerLayerProperties) {
  return (
    <>
      {locations.map((location) => (
        <LocationMarker key={location.id} location={location} />
      ))}
    </>
  );
}
