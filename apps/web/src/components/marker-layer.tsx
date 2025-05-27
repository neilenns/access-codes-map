import { LocationWithUsers } from "@/db/locations";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import { useOnlineStatus } from "@/hooks/use-online-status";
import NominatimReverseResponse from "@/types/nominatim-reverse-response";
import {
  LatLng,
  Marker as LeafletMarker,
  LeafletMouseEvent,
  Popup,
} from "leaflet";
import { useMapEvent } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import LocationMarker from "./location-marker";

export interface MarkerLayerProperties {
  locations: LocationWithUsers[];
}

interface PopupWithSource extends Popup {
  _source: LeafletMarker;
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
      {
        headers: {
          "User-Agent": "accesscodes.badcasserole.com",
        },
      },
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
  const isOnline = useOnlineStatus();

  // Adds a marker to the map when the user clicks on the map.
  const handleContextMenu = async (event: LeafletMouseEvent) => {
    try {
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
    } catch (error) {
      console.error("Reverse geocode failed:", error);
    }
  };

  useMapEvent("contextmenu", (event) => {
    void handleContextMenu(event);
  });

  useMapEvent("popupopen", (event) => {
    // Don't bother trying to save the view if the device is offline. This prevents
    // fetch errors in the console.
    if (!isOnline) {
      return;
    }

    const source = (event.popup as PopupWithSource)._source;

    // This is done with fetch instead of calling a server action to avoid page re-renders.
    fetch("/api/increment-views", {
      method: "POST",
      body: JSON.stringify({ markerId: source.options.markerId }),
      headers: { "Content-Type": "application/json" },
    }).catch((error: unknown) => {
      console.error("Failed to increment views:", error);
    });
  });

  return (
    <MarkerClusterGroup>
      {locations.map((location) => (
        <LocationMarker key={location.id} location={location} />
      ))}
    </MarkerClusterGroup>
  );
}
