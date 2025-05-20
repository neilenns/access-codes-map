// This method of making custom markers is a combination of
// https://stackoverflow.com/a/65749459/9206264 and images from
// https://github.com/pointhi/leaflet-color-markers/tree/master/img
import L from "leaflet";

const createMarkerIcon = (color: string) =>
  new L.Icon({
    iconUrl: `/marker-icon-${color}.png`,
    iconRetinaUrl: `/marker-icon-2x-${color}.png`,
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

export const YellowMarker = createMarkerIcon("gold");
export const BlueMarker = createMarkerIcon("blue");
