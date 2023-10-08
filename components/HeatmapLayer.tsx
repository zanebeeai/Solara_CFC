import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { HeatMapOptions } from "leaflet";
import "leaflet.heat";

interface HeatMapLayerProps {
  points: any[];
  options: HeatMapOptions;
}

function HeatMapLayer({ points, options }: HeatMapLayerProps) {
  const currentMap = useMap();

  useEffect(() => {
    const heatMapLayer = L.heatLayer(points, options);

    if (heatMapLayer) {
      heatMapLayer.addTo(currentMap);
    }

    return () => {
      if (heatMapLayer) {
        currentMap.removeLayer(heatMapLayer);
      }
    };
  }, [currentMap, points, options]);

  return null;
}

HeatMapLayer.defaultProps = {
  options: {
    minOpacity: 0.05,
    maxZoom: 18,
    radius: 25,
    blur: 15,
    max: 1000.0,
  },
};

export default HeatMapLayer;
