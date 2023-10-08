import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function Leaflet() {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      attributionControl={false}
      zoomControl={false}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
    </MapContainer>
  );
}

export default Leaflet;
