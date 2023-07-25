import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import WishListButton from "../WishList/WishListButton";

const ProductCard = ({ product, setProductDetails }) => {
  return (
    <div className="product_card">
      <div className="wish-card-container">
        <div className="wish-button">
          <WishListButton product={product} />
        </div>
        <div className="image-container">
          <img src={product.images[0]} alt={product.productName} />
        </div>
      </div>
      <div className="product_info">
        <Link
          to={`/product/${product._id}`}
          onClick={() => setProductDetails(product)}
        >
          <p className="product-name">{product.productName}</p>
        </Link>
        <div className="products-price-and-icons">
          <p className="product-price">€{product.price}</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setProductDetails: PropTypes.func,
};

export default ProductCard;
