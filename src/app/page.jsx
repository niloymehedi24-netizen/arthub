import React from "react";
import Banner from "@/components/home/Banner";
import FeaturedMotion from "@/components/home/FeaturedMotion";
import TopArtists from "@/components/home/TopArtists";

const Homepage = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedMotion></FeaturedMotion>
      <TopArtists></TopArtists>
    </div>
  );
};

export default Homepage;
