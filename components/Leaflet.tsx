import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map } from "leaflet";
import HeatMapLayer from "./HeatmapLayer";
import { useState } from "react";
import { addressPoints } from "./addressPoints";

export interface LeafletData {
  threshold: number;
  type: string;
  points: number[][];
}

export type LeafletLayerDataTypes =
  | "cfu"
  | "cfc11"
  | "cfc12"
  | "cfc13"
  | "ozone"
  | "temperature";

function Leaflet({ data }: { data: LeafletData[] }) {
  const combinedPoints = ([] as number[][]).concat(
    ...addressPoints.map((item) => item.points)
  );

  return (
    <MapContainer
      center={[38.89511, -77.03637]}
      zoom={3}
      attributionControl={false}
      zoomControl={false}
      minZoom={window.innerHeight > 960 ? 3 : 2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
      <HeatMapLayer points={combinedPoints} options={{ radius: 25 }} />
    </MapContainer>
  );
}

export default Leaflet;
