"use client";

import { LocationsWithUsers } from "@/db/locations";
import dynamic from "next/dynamic";

export interface ClientSectionProperties {
  locations: LocationsWithUsers;
}

const LocationsMap = dynamic(() => import("./locations-map"), {
  ssr: false,
});

export default function ClientSection({ locations }: ClientSectionProperties) {
  return <LocationsMap locations={locations} />;
}
