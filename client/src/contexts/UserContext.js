import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [userToken, setUserToken] = useState(storedToken);
  const [userId, setUserId] = useState(() => {
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      return decodedToken.userId;
    }
    return null;
  });

  const login = (token) => {
    setUserToken(token);
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("token");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userToken, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
