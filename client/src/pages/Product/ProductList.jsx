import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductList = ({ products, setProductDetails }) => {
  return (
    <div className="products_container">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          setProductDetails={setProductDetails}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  setProductDetails: PropTypes.func.isRequired,
};

export default ProductList;
