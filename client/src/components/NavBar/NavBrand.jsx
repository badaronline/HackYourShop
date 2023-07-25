import React from "react";
import { Link } from "react-router-dom";
import TEST_ID from "./Nav.testid";

const NavBrand = () => {
  return (
    <div className="brand-container">
      <Link to="/" data-testid={TEST_ID.linkToHome}>
        <h1>HYS</h1>
        <p>Hack Your Shop</p>
      </Link>
    </div>
  );
};

export default NavBrand;
