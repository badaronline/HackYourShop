import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      const cartItems = JSON.parse(data);
      setCartData(cartItems);
    } else {
      setCartData([]);
    }
  }, []);

  const updateCartData = (newCartData) => {
    setCartData(newCartData);
  };

  return (
    <CartContext.Provider value={{ cartData, updateCartData, total, setTotal }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
