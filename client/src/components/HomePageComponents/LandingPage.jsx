import React from "react";
import { landingPageImage } from "../../assets/images";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="container-upper">
        <h1>The Best Online Handcrafted Collection</h1>
        <p className="website-description">
          Discover our vibrant marketplace for exquisite hand crafts and art,
          connecting talented artisans with art enthusiasts. Hack Your Shop
          believes in the transformative power of art, showcasing incredible
          talents worldwide. Each piece tells a story of rich heritage and
          craftsmanship.
        </p>
      </div>

      <div className="Landing-Image">
        <img src={landingPageImage} alt="" />
      </div>
    </div>
  );
};

export default LandingPage;
