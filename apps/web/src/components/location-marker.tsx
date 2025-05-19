import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LocationWithUsers } from "@/db/locations";
import { EditIcon, TrashIcon } from "lucide-react";
import { Marker, Popup } from "react-leaflet";
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
    >
      <Popup>
        <Card>
          <CardHeader>
            <CardTitle>{location.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{location.note}</p>
          </CardContent>
          <CardFooter className="flex space-y-2">
            <Button variant="ghost" size="icon">
              <TrashIcon />
            </Button>
            <Button variant="ghost" size="icon">
              <EditIcon />
            </Button>
          </CardFooter>
        </Card>
      </Popup>
    </Marker>
  );
}
