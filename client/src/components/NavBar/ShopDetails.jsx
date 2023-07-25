import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import { getCartFromStorage } from "../../pages/Cart/cartUtils";
import { calculateTotalQuantity } from "./navUtils";
import UserDropdown from "./UserDropdown";

const ShopDetails = () => {
  const { cartData } = useContext(CartContext);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    const cartItems = getCartFromStorage();
    if (cartItems) {
      const totalQuantity = calculateTotalQuantity(cartItems);
      if (cartData.length > 0) {
        setTotalProductsInCart(totalQuantity);
      } else {
        setTotalProductsInCart(0);
      }
    }
  }, [cartData]);
  const handleWishlistClick = (e) => {
    if (!userToken) {
      e.preventDefault(); // Prevent default navigation if user is not logged in
      const confirmLogin = window.confirm("Please login to see your wishlist");
      if (confirmLogin) {
        window.location.href = "/login";
      }
    }
  };
  return (
    <div className="navbar-shop-details">
      <Link to="/products/shop" className="shop-detail-icon search-bar-shop">
        <div>Shop</div>
      </Link>
      <Link
        onClick={handleWishlistClick}
        to="/wishlist"
        className="shop-detail-icon"
      >
        {" "}
        <FontAwesomeIcon icon={faHeart} />
      </Link>
      <Link to="/cart" className="shop-detail-icon">
        <FontAwesomeIcon icon={faShoppingBag} />
        <span className="cart-count">{totalProductsInCart}</span>
      </Link>
      {userToken ? ( // If the user is logged in, display Logout button
        <UserDropdown />
      ) : (
        // If the user is not logged in, display Login button
        <Link to="/login">
          <p className="login-button">Login</p>
        </Link>
      )}
    </div>
  );
};

export default ShopDetails;
