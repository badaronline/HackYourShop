import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState("");

  return (
    <ProductContext.Provider value={{ productDetails, setProductDetails }}>
      {children}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
