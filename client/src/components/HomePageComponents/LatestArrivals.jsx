import React from "react";
import { Link } from "react-router-dom";

import "./LatestArrivals.css";
import { productsList } from "../../constants/productsList.js";

const LatestArrivals = () => {
  return (
    <div className="latest-arrivals-container">
      <div className="latest-arrivals-content">
        <h1>Our latest arrivals</h1>
        <p>
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </p>
        <Link to="/products/shop">
          <button className="shop-all-btn">Shop all</button>
        </Link>
      </div>
      <div className="latest-arrivals-images">
        <img className="one" src={productsList[1].productImage} alt="" />
        <img className="two" src={productsList[3].productImage} alt="" />
        <img className="three" src={productsList[4].productImage} alt="" />
      </div>
    </div>
  );
};

export default LatestArrivals;
