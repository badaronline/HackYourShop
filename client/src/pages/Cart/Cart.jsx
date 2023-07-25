import "./my-cart.css";
import PropTypes from "prop-types";

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  calculateTotal,
  syncCartStorage,
  removeCartItem,
  getCartFromStorage,
} from "./cartUtils";

import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";

const Cart = ({ route }) => {
  const { updateCartData, setTotal, total } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = getCartFromStorage();
    if (cartItems) {
      setCartData(cartItems);
      setTotal(calculateTotal(cartItems));
    }
  }, []);

  const handleRemoveCartItem = (_id) => {
    const newCartItems = removeCartItem(cartData, _id);
    setCartData(newCartItems);
    updateCartData(newCartItems);
    setTotal(calculateTotal(newCartItems));
    syncCartStorage(newCartItems);
  };

  const handleUpdateQuantity = (_id, quantity) => {
    const updatedCartItems = cartData.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity,
        };
      }
      return item;
    });
    setCartData(updatedCartItems);
    updateCartData(updatedCartItems);
    setTotal(calculateTotal(updatedCartItems));
    syncCartStorage(updatedCartItems);
  };

  const isCartEmpty = cartData.length === 0;
  const showContinueToCheckoutButton = !isCartEmpty && route !== "/checkout";

  const handleProceedToCheckout = () => {
    if (userToken) {
      navigate("/checkout");
    } else {
      // Handle when user is not logged in
      // Redirect to login page with a message
      navigate("/login", { state: { from: "/checkout" } });
      alert("Please login to proceed with the checkout");
    }
  };

  return (
    <div
      className={
        route === "/checkout" ? "cart_container-checkout" : "cart_container"
      }
    >
      <div
        className={
          route === "/checkout" ? "cart-details-checkout" : "cart_details"
        }
      >
        <h1>Your Cart</h1>
        <div
          className={
            route === "/checkout"
              ? "continueShopping-checkout"
              : "continueShopping"
          }
        >
          <p>
            Not ready to checkout?{" "}
            <Link to="/products/shop">Continue shopping</Link>
          </p>
        </div>
        {isCartEmpty ? (
          <span className="empty-cart">Your cart is empty</span>
        ) : (
          cartData.map((item) => (
            <div className="item" key={item._id}>
              <img src={item.images[0]} alt={item.productName} />
              <div className="desc_container">
                <h3>{item.productName}</h3>
                <div className="quantity_container">
                  <p className="quantity_title">Quantity</p>
                  <div className="quantity_buttons">
                    <p
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity === 0) {
                          handleRemoveCartItem(item._id);
                        } else {
                          handleUpdateQuantity(item._id, newQuantity);
                        }
                      }}
                    >
                      -
                    </p>
                    <p className="quantity">{item.quantity}</p>
                    <p
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </p>
                  </div>
                </div>
                <div className="price-display">
                  <p>€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="remove_item">
                <span onClick={() => handleRemoveCartItem(item._id)}>
                  Remove
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="order_summary">
        <h1>Order Summary</h1>

        <div className="sub_total">
          <p>Subtotal</p>
          <p className="the-total">€{total}</p>
        </div>
        <div className="shipping">
          <p>Shipping</p>
          <p>Calculated at the next step</p>
        </div>
        <hr className="line" />
        <div className="total-and-price">
          <p>Total</p>
          <p>€{total}</p>
        </div>
        {showContinueToCheckoutButton && (
          <button onClick={handleProceedToCheckout}>
            Continue to checkout
          </button>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  route: PropTypes.string,
};

export default Cart;
