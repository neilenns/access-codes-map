import { LocationWithUsers } from "@/db/locations";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import NominatimReverseResponse from "@/types/nominatim-reverse-response";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { useMapEvent } from "react-leaflet";
import LocationMarker from "./location-marker";

export interface MarkerLayerProperties {
  locations: LocationWithUsers[];
}

/**
 * Helper function to reverse geocode a map location.
 * @param latlng - The latitude and longitude of the location to be reverse geocoded.
 * @returns {Promise<NominatimReverseResponse | undefined>} A promise that resolves to the reverse geocoded location.
 */
async function reverseGeocode(
  latlng: LatLng,
): Promise<NominatimReverseResponse | undefined> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat.toString()}&lon=${latlng.lng.toString()}&format=json`,
    );

    if (!response.ok) {
      console.error("Error during reverse geocoding:", response.statusText);
      return undefined;
    }

    return await response.json();
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return undefined;
  }
}

export default function MarkerLayer({ locations }: MarkerLayerProperties) {
  const { openDialog } = useEditLocationStore();

  // Adds a marker to the map when the user clicks on the map.
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  useMapEvent("contextmenu", async (event: LeafletMouseEvent) => {
    const geoDetails = await reverseGeocode(event.latlng);

    const newLocation = {
      title: geoDetails
        ? (geoDetails.address?.building ??
          `${geoDetails.address?.house_number ?? ""} ${
            geoDetails.address?.road ?? ""
          }`.trim())
        : "",
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
      note: "",
      hasToilet: false,
    };

    openDialog(newLocation);
  });

  return (
    <>
      {locations.map((location) => (
        <LocationMarker key={location.id} location={location} />
      ))}
    </>
  );
}
