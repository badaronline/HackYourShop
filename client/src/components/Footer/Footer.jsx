import React, { useState, useEffect } from "react";
import "./Footer.css";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [allCategories, setAllCategories] = useState(null);
  const { performFetch, cancelFetch } = useFetch("/category", (response) => {
    setAllCategories(response.result);
  });

  useEffect(() => {
    performFetch();
    return cancelFetch;
  }, []);

  return (
    <div className="footer-container">
      <div className="footer-main">
        <div className="footer-brand">
          <div>
            <h1>Hack Your Shop</h1>
            <p>
              Be the first to know about our special offers, new product
              launches, and events.
            </p>
          </div>
        </div>
        <div className="footer-list-container">
          <h4>Catagories</h4>
          <ul className="footer-list">
            <li>
              {allCategories &&
                allCategories.map((category) => (
                  <Link
                    to={`/products/${encodeURIComponent(category.category)}`}
                    key={category._id}
                    value={category.category}
                  >
                    <div className="footer-list-item">{category.category}</div>
                  </Link>
                ))}
            </li>
          </ul>
        </div>
        <div className="footer-list-container">
          <h4>Help</h4>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a href="/">Help Center</a>
            </li>
            <li className="footer-list-item">
              <a href="/">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-list-container">
          <h4>About</h4>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a href="/">Who are we?</a>
            </li>
            <li className="footer-list-item">
              <a href="/">Our Mission</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        ©{new Date().getFullYear()} HYS | All Copyrights Reserved.
      </div>
    </div>
  );
};
