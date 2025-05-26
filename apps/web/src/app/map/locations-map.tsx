"use client";

import { CustomLocateControl } from "@/components/custom-locate-control";
import DeleteLocationDialog from "@/components/delete-location-dialog";
import EditLocationDialog from "@/components/edit-location-dialog";
import { GeocodeControl } from "@/components/geocode-control";
import MarkerLayer from "@/components/marker-layer";
import OfflineBar from "@/components/offline-bar";
import { LocationsWithUsers } from "@/db/locations";
import { useDeleteLocationStore } from "@/hooks/use-delete-location-store";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import * as L from "leaflet";
import { useEffect, useRef } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

export interface MapProperties {
  locations: LocationsWithUsers;
}

// Seattle, WA
const DEFAULT_CENTER: L.LatLngExpression = [
  47.654_961_858_209_56,
  -122.252_018_473_532_25,
];

const DEFAULT_ZOOM = 11;

export default function LocationsMap({ locations }: MapProperties) {
  const isEditLocationDialogOpen = useEditLocationStore(
    (state) => state.isOpen,
  );
  const isDeleteLocationDialogOpen = useDeleteLocationStore(
    (state) => state.isOpen,
  );
  const mapReference = useRef<L.Map | null>(null);

  // Hide the zoom control on mobile devices. Code from
  // https://gis.stackexchange.com/a/259718.
  useEffect(() => {
    const map = mapReference.current;
    if (L.Browser.mobile && map) {
      map.removeControl(map.zoomControl);
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        className="h-full w-full"
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        ref={mapReference}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Roads">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              crossOrigin="anonymous"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
              url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
              crossOrigin="anonymous"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <MarkerLayer locations={locations} />
        <GeocodeControl />
        <CustomLocateControl
          position="topright"
          options={{
            setView: "always",
            // High accuracy causes the dot to jump around too much when using on a mobile
            // device so disable it. Leaving the code here with it as false so in the future I remember
            // how to turn it on if I want to.
            locateOptions: {
              enableHighAccuracy: false,
            },
          }}
        />
      </MapContainer>
      {/* The EditLocationDialog component is conditionally rendered based on whether the dialog is open. */}
      {/* This ensures it is unmounted when closed, resetting all of the dialog state between renders. */}
      {isEditLocationDialogOpen && <EditLocationDialog />}
      {isDeleteLocationDialogOpen && <DeleteLocationDialog />}
      <OfflineBar />
    </div>
  );
}
