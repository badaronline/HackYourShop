/* eslint-disable no-console */
import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { UserContext } from "./UserContext";

export const WishListContext = createContext();

export function WishListProvider({ children }) {
  const { userToken, userId } = useContext(UserContext);
  const [wishList, setWishList] = useState(null);
  const wishListProducts = wishList ? wishList.products : [];

  const fetchGetWishList = useFetch(
    `/user/${userId}/wishlist`,
    (response) => {
      setWishList(response.wishlist);
    },
    userToken
  );
  const fetchReplaceWishList = useFetch(
    `/user/${userId}/wishlist`,
    (response) => {
      setWishList(response.wishlist);
    },
    userToken
  );

  useEffect(() => {
    if (userId) {
      fetchGetWishList.performFetch();
    }

    return () => {
      fetchGetWishList.cancelFetch();
    };
  }, []);
  const replaceWishList = (newWishList) => {
    if (userToken) {
      fetchReplaceWishList.performFetch({
        method: "PUT",
        body: JSON.stringify(newWishList),
      });
    }
  };

  const addToWishList = (product, currentWishList) => {
    if (!userId) {
      alert("Please login to add the product in your wishlist");
    }
    const currentWishListProducts = currentWishList
      ? currentWishList.products
      : [];
    const newWishListProducts = [...currentWishListProducts, product._id];
    replaceWishList(
      !currentWishList
        ? { user: userId, products: newWishListProducts }
        : { ...currentWishList, products: newWishListProducts }
    );
  };

  const removeFromWishList = (product, currentWishList) => {
    const currentWishListProducts = currentWishList
      ? currentWishList.products
      : [];
    const newWishListProducts = currentWishListProducts.filter(
      (wishListProduct) => wishListProduct._id !== product._id
    );
    replaceWishList(
      !currentWishList
        ? { user: userId, products: newWishListProducts }
        : { ...currentWishList, products: newWishListProducts }
    );
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addToWishList,
        removeFromWishList,
        wishListProducts,
        isLoading: fetchGetWishList.isLoading,
        error: fetchGetWishList.error,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

WishListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
