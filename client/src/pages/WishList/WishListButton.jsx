/* eslint-disable no-console */
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { WishListContext } from "../../contexts/WishListContext";
import PropTypes from "prop-types";

const WishListButton = ({ product }) => {
  const { addToWishList, wishListProducts, removeFromWishList, wishList } =
    useContext(WishListContext);
  const isFavourite = wishListProducts.some(
    (wishListProduct) => wishListProduct._id === product._id
  );

  function handleAddToWishList() {
    addToWishList(product, wishList);
  }
  function handleRemoveToWishList() {
    removeFromWishList(product, wishList);
  }
  return (
    <button
      className="wishlist-buttons"
      onClick={isFavourite ? handleRemoveToWishList : handleAddToWishList}
    >
      <FontAwesomeIcon
        icon={isFavourite ? solidHeart : regularHeart}
        alt="wishlist icon"
      />
    </button>
  );
};

WishListButton.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default WishListButton;
