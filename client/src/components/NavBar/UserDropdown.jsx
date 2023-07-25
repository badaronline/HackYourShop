// UserDropdown.js

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { UserContext } from "../../contexts/UserContext";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userToken, logout } = useContext(UserContext);
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (userToken) {
      const decodedToken = jwt_decode(userToken);
      setUsername(decodedToken.userName);
    } else {
      setUsername(""); // Reset username if userToken is empty
    }
  }, [userToken]);
  const handleLogout = () => {
    logout(); // Call the logout function from UserContext
    window.location.replace("/");
  };
  return (
    <div
      className={`dropdown ${
        isDropdownOpen ? "dropdownOpen" : ""
      } shop-detail-icon`}
      onMouseLeave={handleDropdownClose}
    >
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
        {username && username}
      </button>
      <div className="dropdown-menu">
        <Link to="/profile">
          <p className="" onClick={handleDropdownToggle}>
            Profile
          </p>
        </Link>
        <Link to="/orders">
          <p className="" onClick={handleDropdownToggle}>
            Orders
          </p>
        </Link>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
};

export default UserDropdown;
