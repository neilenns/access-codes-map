"use client";

import { CustomLocateControl } from "@/components/custom-locate-control";
import EditLocationDialog from "@/components/edit-location-dialog";
import { GeocodeControl } from "@/components/geocode-control";
import MarkerLayer from "@/components/marker-layer";
import { LocationsWithUsers } from "@/db/locations";
import { useEditLocationStore } from "@/hooks/use-edit-location-store";
import * as L from "leaflet";
import { LocateControl } from "leaflet.locatecontrol";
import { useEffect, useRef, useState } from "react";
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
  const [autoLocate] = useState(() => {
    const storedValue = sessionStorage.getItem("autoLocate");
    return storedValue ? sessionStorage.getItem("autoLocate") === "true" : true;
  });
  const mapReference = useRef<L.Map | null>(null);

  // Hide the zoom control on mobile devices. Code from
  // https://gis.stackexchange.com/a/259718.
  useEffect(() => {
    const map = mapReference.current;
    if (L.Browser.mobile && map) {
      map.removeControl(map.zoomControl);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("autoLocate", autoLocate.toString());
  }, [autoLocate]);

  useEffect(() => {
    if (!mapReference.current) {
      return;
    }

    // Add listeners for the locateactivate and locatedeactivate events so we can
    // persist the setting in storage and restore it when the map is reloaded.
    // I'd normally use useMapEvents() for this but it isn't accessible at any
    // level other than *inside* the MapContainer.
    mapReference.current.addEventListener("locateactivate", (_event) => {
      sessionStorage.setItem("autoLocate", "true");
    });
    mapReference.current.addEventListener("locatedeactivate", (_event) => {
      sessionStorage.setItem("autoLocate", "false");
    });
  }, [mapReference]);

  // This receives the reference to the LocateControl after it is created, and enables
  // auto-locating if the autoLocate prop is true.
  const handleAutoLocateReference = (reference: LocateControl | null) => {
    if (autoLocate && reference) {
      reference.start();
    }
  };

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
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
              url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <MarkerLayer locations={locations} />
        <GeocodeControl />
        <CustomLocateControl
          ref={handleAutoLocateReference}
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
    </div>
  );
}
