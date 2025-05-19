import { LocationWithUsers } from "@/db/locations";
import { Marker } from "react-leaflet";
import { BlueMarker, YellowMarker } from "./custom-markers";

export interface LocationMarkerProperties {
  location: LocationWithUsers;
}

export default function LocationMarkers({
  location,
}: LocationMarkerProperties) {
  return (
    <Marker
      position={[location.latitude, location.longitude]}
      key={location.id}
      icon={location.hasToilet ? YellowMarker : BlueMarker}
    ></Marker>
  );
}
