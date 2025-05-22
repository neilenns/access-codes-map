import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import { LocateControl, LocateOptions } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

interface LocateControlProperties extends L.ControlOptions {
  position?: L.ControlPosition;
  options?: LocateOptions;
}

function createLocateInstance(properties: LocateControlProperties) {
  const instance = new LocateControl({
    position: properties.position,
    initialZoomLevel: 16,
    keepCurrentZoomLevel: true,
    showPopup: false,
    ...properties.options,
  });

  return instance;
}

export const CustomLocateControl = createControlComponent(createLocateInstance);
