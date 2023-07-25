import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Categories = ({ handleCategoryClick }) => {
  const [allCategories, setAllCategories] = useState(null);
  const { performFetch, cancelFetch } = useFetch("/category", (response) => {
    setAllCategories(response.result);
  });

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  const handleClick = (category) => {
    handleCategoryClick(category);
  };

  return (
    <div className="menu-bar-container">
      <div className="menu-bar-wrapper">
        {allCategories &&
          allCategories.map((category) => (
            <Link
              to={`/products/${encodeURIComponent(category.category)}`}
              key={category._id}
              value={category.category}
              onClick={() => handleClick(category.category)}
            >
              <div className="menu-bar-title">{category.category}</div>
            </Link>
          ))}
      </div>
    </div>
  );
};
Categories.defaultProps = {
  handleCategoryClick: () => {},
};
Categories.propTypes = {
  handleCategoryClick: PropTypes.func, // eslint-disable-line react/prop-types
};
