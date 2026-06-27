import React from "react";
import Banner from "@/components/home/Banner";
import FeaturedMotion from "@/components/home/FeaturedMotion";
import TopArtists from "@/components/home/TopArtists";
import ArtCategories from "@/components/home/ArtCategories";

const Homepage = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedMotion></FeaturedMotion>
      <TopArtists></TopArtists>
      <ArtCategories></ArtCategories>
    </div>
  );
};

export default Homepage;
