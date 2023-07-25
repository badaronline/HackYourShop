import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Categories } from "./Categories";
import NavBrand from "./NavBrand";
import ShopDetails from "./ShopDetails";
import SearchBar from "./SearchBar";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const hamburgerIcon = (
    <FontAwesomeIcon
      onClick={handleOpen}
      icon={faBars}
      className="hamburger-menu-icon"
    />
  );

  const closeIcon = (
    <FontAwesomeIcon
      onClick={handleOpen}
      icon={faXmark}
      className="hamburger-menu-icon"
    />
  );
  const handleCategoryClick = () => {
    setOpen(false);
  };

  return (
    <div className="mobile-navbar-container">
      <div className="mobile-navbar-top">
        <div className="mobile-navbar-left">
          <div className="hamburger-menu-container">
            {open ? closeIcon : hamburgerIcon}
            {open && <Categories handleCategoryClick={handleCategoryClick} />}
          </div>
          <NavBrand />
        </div>
        <ShopDetails />
      </div>
      <SearchBar />
    </div>
  );
};
