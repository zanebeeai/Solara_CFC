import React, { useEffect } from "react";
import { Loading } from "@/components/Loading";
import Image from "next/image";

const Home = ({ mapUrls }: { mapUrls: string[] }) => {
  useEffect(() => {
    const handleWheelEvent = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", handleWheelEvent, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  return (
    <div className="relative grid grid-cols-8">
      <Loading isLoading={mapUrls.length === 65} />

      {mapUrls.map((src, index) => (
        <Image
          key={index}
          src={src}
          width={256}
          height={256}
          alt={`Map Image ${index}`}
          draggable={false}
        />
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const gridSize = 8;

  const mapUrls = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    return `https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=3?SERVICE=WMS&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&VERSION=1.1.1&HEIGHT=256&WIDTH=256&SRS=EPSG%3A3857&BBOX=-5009377.085697311,-5009377.085697311,0,0`;
  });

  return {
    props: { mapUrls },
  };
}

export default Home;
