import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleLinkClick = (e) => {
    if (!value) {
      e.preventDefault(); // Prevent the default link navigation
    } else {
      setValue(""); // Clear the search input after clicking the search button
    }
  };

  return (
    <div className="search-bar-container">
      <Link
        to={value ? `/search/${value}` : "/products/shop"}
        onClick={handleLinkClick}
      >
        <form className="search-bar-form">
          <button type="submit" className="search-bar-icon">
            <FontAwesomeIcon icon={faSearch} className="glass-icon" />
          </button>
          <input
            type="text"
            placeholder="Search.."
            value={value}
            onChange={onChange}
          />
        </form>
      </Link>
    </div>
  );
};

export default SearchBar;
