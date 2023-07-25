/* eslint-disable no-console */
import React, { useContext } from "react";
import { WishListContext } from "../../contexts/WishListContext";
import ProductList from "../Product/ProductList";
import "./WishList.css";
import { ProductContext } from "../../contexts/ProductContext";

const WishList = () => {
  const { wishListProducts } = useContext(WishListContext);

  const { setProductDetails } = useContext(ProductContext);

  const renderWishListContent = () => {
    if (wishListProducts.length > 0) {
      return (
        <>
          <div>
            <div className="product-title">
              <h1>Your Wishlist:</h1>
            </div>
            <ProductList
              products={wishListProducts}
              setProductDetails={setProductDetails}
            />
          </div>
        </>
      );
    } else {
      return <h2>Your wishlist is empty</h2>;
    }
  };

  return <div className="wishlist">{renderWishListContent()}</div>;
};

export default WishList;
