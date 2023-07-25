import React from "react";

import "./Nav.css";
import { Categories } from "./Categories";
import NavBrand from "./NavBrand";
import SearchBar from "./SearchBar";
import ShopDetails from "./ShopDetails";
import { MobileNav } from "./MobileNav";

const Nav = () => {
  return (
    <div className="navbar-component">
      <MobileNav />
      <div className="full-page-navbar-container">
        <div className="navbar-container">
          <NavBrand />
          <SearchBar />
          <ShopDetails />
        </div>
        <Categories />
      </div>
    </div>
  );
};

export default Nav;
