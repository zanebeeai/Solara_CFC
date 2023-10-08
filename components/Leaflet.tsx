import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function Leaflet() {
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
    </MapContainer>
  );
}

export default Leaflet;
