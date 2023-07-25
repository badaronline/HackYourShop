import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ShippingMethod.css";

const ShippingMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("express");

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("shippingMethod", JSON.stringify(selectedMethod));
  }, [selectedMethod]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="generalContainerMethod">
      <div className="ShippingMethodContainer">
        <h2 className="ShippingMethodTitle">Shipping Method</h2>
        <div className="section-headings">
          <span>Address</span> --------{" "}
          <span className="highlighted-address">Shipping</span> --------{" "}
          <span>Payment</span>
        </div>
        <form onSubmit={handleSubmit} className="formContainer">
          <div className="containerPostnl">
            <div className="radio-option">
              <input
                type="radio"
                id="standard-shipping"
                name="shipping-method"
                value="standard"
                checked={selectedMethod === "standard"}
                onChange={handleMethodChange}
              />
              <label htmlFor="standard-shipping" className="radio-label">
                <div className="radio-button"></div>
                Postnl
              </label>
            </div>
          </div>
          <div className="containerDHL">
            <div className="radio-option">
              <input
                type="radio"
                id="express-shipping"
                name="shipping-method"
                value="express"
                checked={selectedMethod === "express"}
                onChange={handleMethodChange}
              />
              <label htmlFor="express-shipping" className="radio-label">
                <div className="radio-button"></div>
                DHL
              </label>
            </div>
          </div>
          <div className="containerUPS">
            <div className="radio-option">
              <input
                type="radio"
                id="overnight-shipping"
                name="shipping-method"
                value="overnight"
                checked={selectedMethod === "overnight"}
                onChange={handleMethodChange}
              />
              <label htmlFor="overnight-shipping" className="radio-label">
                <div className="radio-button"></div>
                UPS
              </label>
            </div>
          </div>
          <Link to="/payment">
            <button type="submit">Continue to payment</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ShippingMethod;
