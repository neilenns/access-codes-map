// This is the original code from the react-leaflet library, modified to include a new property `markerId` that
// gets passed to the LeafletMarker instance. This allows for unique identification of markers.
// It's crazy this isn't something that's already built into the library.
import {
  type EventedProps,
  createElementObject,
  createLayerComponent,
  extendContext,
} from "@react-leaflet/core";
import {
  type LatLngExpression,
  Marker as LeafletMarker,
  type MarkerOptions,
} from "leaflet";
import type { ReactNode } from "react";

// Extend MarkerOptions to include the new property
declare module "leaflet" {
  interface MarkerOptions {
    markerId: number;
  }
}

export interface MarkerProperties extends MarkerOptions, EventedProps {
  children?: ReactNode;
  position: LatLngExpression;
}

export const Marker = createLayerComponent<LeafletMarker, MarkerProperties>(
  function createMarker({ position, markerId, ...options }, context) {
    const marker = new LeafletMarker(position, { ...options, markerId }); // Pass the new property to LeafletMarker
    return createElementObject(
      marker,
      extendContext(context, { overlayContainer: marker }),
    );
  },
  function updateMarker(marker, properties, previousProperties) {
    if (properties.position !== previousProperties.position) {
      marker.setLatLng(properties.position);
    }
    if (
      // eslint-disable-next-line unicorn/no-null
      properties.icon != null &&
      properties.icon !== previousProperties.icon
    ) {
      marker.setIcon(properties.icon);
    }
    if (
      properties.zIndexOffset != undefined &&
      properties.zIndexOffset !== previousProperties.zIndexOffset
    ) {
      marker.setZIndexOffset(properties.zIndexOffset);
    }
    if (
      properties.opacity != undefined &&
      properties.opacity !== previousProperties.opacity
    ) {
      marker.setOpacity(properties.opacity);
    }
    if (
      marker.dragging != undefined &&
      properties.draggable !== previousProperties.draggable
    ) {
      if (properties.draggable === true) {
        marker.dragging.enable();
      } else {
        marker.dragging.disable();
      }
    }
  },
);
