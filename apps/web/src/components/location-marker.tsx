import { LocationWithUsers } from "@/db/locations";
import { EditIcon, TrashIcon } from "lucide-react";
import { Marker, Popup } from "react-leaflet";
import { BlueMarker, YellowMarker } from "./custom-markers";
import { Button } from "./ui/button";

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
    >
      <Popup>
        <div className="p-0">
          <h2 id="marker-title" className="text-lg font-semibold">
            {location.title}
          </h2>
          <p className="text-sm whitespace-pre-line">{location.note}</p>
          <p className="text-xs italic text-gray-500">
            Last modified by {location.modifiedBy?.name ?? "unknown"} on{" "}
            {new Date(location.lastModified).toISOString().split("T")[0]}
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <Button variant="ghost" size="icon">
              <EditIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
