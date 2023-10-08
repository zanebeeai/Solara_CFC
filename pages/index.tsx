import dynamic from "next/dynamic";
import React from "react";

const Leaflet = dynamic(() => import("../components/Leaflet"), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
     <Leaflet />
    </div>
  );
};

export default Home;
