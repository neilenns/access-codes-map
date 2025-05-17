import { LocationsWithUsers } from "@/db/locations";

export interface MapProperties {
  locations: LocationsWithUsers;
}

export default function LocationsMap({ locations }: MapProperties) {
  return (
    <div>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>{location.title}</li>
        ))}
      </ul>
    </div>
  );
}
