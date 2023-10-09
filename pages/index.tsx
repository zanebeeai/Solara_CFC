import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { LeafletData } from "../components/Leaflet";

const Leaflet = dynamic(() => import("../components/Leaflet"), {
  ssr: false,
});

const Home = ({ data }: { data: LeafletData[] }) => {
  console.log(data);

  return <Leaflet data={data} />;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await fetch(`http://127.0.0.1:5000/data?queryData=cfc13`).then(
//     (res) => res.json()
//   );

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default Home;
