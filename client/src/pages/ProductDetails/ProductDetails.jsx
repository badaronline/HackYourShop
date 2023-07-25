import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import WishListButton from "../WishList/WishListButton";
import { addToCart } from "../Cart/cartUtils";
import { Link } from "react-router-dom";
import "./productDetails.css";
import { CartContext } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const { productDetails } = useContext(ProductContext);
  const { updateCartData } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productDetails) {
      localStorage.setItem("product", JSON.stringify(productDetails));
      setProduct(productDetails);
    } else {
      setProduct(JSON.parse(localStorage.getItem("product")));
    }
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    addToCart(product, quantity);

    const products = JSON.parse(localStorage.getItem("product"));
    if (products && Array.isArray(products)) {
      const newCartData = [...products, product];
      updateCartData(newCartData);
    } else {
      updateCartData([product]);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="product_details_container">
      <Link to="/products/shop" className="back_shopping">
        <button>Back to Shopping</button>
      </Link>

      <div className="product_card_details">
        <div className="image-and-next-btn-container">
          {product && product.images && product.images.length > 0 && (
            <img
              className="product-img"
              src={product.images[currentImageIndex]}
              alt={product.productName}
            />
          )}
          <button className="next_image_button" onClick={handleNextImage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="product_details">
          <h3 className="product_name">{product.productName}</h3>
          <p className="product_price">€{product.price}</p>
          <p className="product_description">{product.description}</p>
          <div className="quantity_container">
            <p className="quantity_title">Quantity</p>

            <div className="quantity_buttons">
              <button
                className="quantity_button"
                onClick={() => {
                  if (quantity > 0) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                className="quantity_button"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="add_cart_button_container">
            <button
              className={`${added ? "added_to_cart" : "add_to_cart"}`}
              onClick={handleAddToCart}
            >
              {added ? "Added to cart" : "Add to Cart"} (€
              {quantity * product.price})
            </button>
            <Link to="/cart" className="buy_now_link">
              <button className="buy_now">Buy now</button>
            </Link>
          </div>
        </div>

        <div className="wishlist_button_container">
          {product?.id && <WishListButton productId={product._id} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
