import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// This code is based on https://stackoverflow.com/a/75567918.
// Accessing the control is from https://github.com/perliedman/leaflet-control-geocoder/issues/260#issuecomment-1272343753

function createGeocodeInstance(properties: L.ControlOptions) {
  // Unfortunate to have to add this ignore but otherwise typescript doesn't like the control.
  // I found a sample on the leaflet-geosearch page that did this too so I guess
  // that's how it has to be done.
  // @ts-expect-error This is really dumb, and I have no idea why this throws a possible error, but it works fine.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const instance = new GeoSearchControl({
    provider: new OpenStreetMapProvider({
      params: {
        countrycodes: "us",
      },
    }),
    style: "bar",
    showMarker: true,
    autoClose: true,
    keepResult: true,
    ...properties,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return instance;
}

export const GeocodeControl = createControlComponent(createGeocodeInstance);
