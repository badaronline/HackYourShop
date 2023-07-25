import React from "react";
import LandingPage from "../../components/HomePageComponents/LandingPage";
import LatestArrivals from "../../components/HomePageComponents/LatestArrivals";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <LandingPage />
      <LatestArrivals />
    </div>
  );
};

export default Home;
