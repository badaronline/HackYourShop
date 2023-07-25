import React from "react";
import PropTypes from "prop-types";

const ProductSort = ({ selectedPrice, handlePriceChange, productCount }) => {
  return (
    <div className="sort-container">
      <div className="sort-item">
        <p>Sort By:</p>

        <div className="sort">
          <select
            name="price"
            id="price"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <option value="lowest">Lowest price</option>
            <option value="highest">Highest price</option>
          </select>
        </div>
      </div>
      <p className="product-count">Showing ({productCount}) products</p>
    </div>
  );
};

ProductSort.propTypes = {
  selectedPrice: PropTypes.string,
  handlePriceChange: PropTypes.func,
  productCount: PropTypes.number.isRequired,
};

export default ProductSort;
