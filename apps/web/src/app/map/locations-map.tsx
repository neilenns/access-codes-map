import LocationMarkers from "@/components/location-markers";
import { LocationsWithUsers } from "@/db/locations";
import * as L from "leaflet";
import { useEffect, useState } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

export interface MapProperties {
  locations: LocationsWithUsers;
  onSignOutClick?: React.MouseEventHandler;
}

export default function LocationsMap({ locations }: MapProperties) {
  // eslint-disable-next-line unicorn/no-null
  const [map, setMap] = useState<L.Map | null>(null);

  const storeMapReference = (reference: L.Map | null) => {
    if (reference) {
      setMap(reference);
    }
  };

  // Hide the zoom control on mobile devices. Code from
  // https://gis.stackexchange.com/a/259718.
  useEffect(() => {
    if (L.Browser.mobile && map) {
      map.removeControl(map.zoomControl);
    }
  }, [map]);

  return (
    <MapContainer
      className="w-full h-full"
      center={[47.654_961_858_209_56, -122.252_018_473_532_25]}
      zoom={11}
      scrollWheelZoom={true}
      ref={storeMapReference}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Roads">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
            url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <LocationMarkers locations={locations} />
    </MapContainer>
  );
}
