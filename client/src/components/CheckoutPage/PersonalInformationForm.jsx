import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./PersonalInformationForm.css";

const PersonalInformationForm = ({ onPersonalInfoFilled }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    houseNumber: "",
    zipcode: "",
    city: "",
    country: "",
  });

  const shippingSectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const inputContainer = e.target.closest(".input-container");
    if (inputContainer) {
      if (value.trim() !== "") {
        inputContainer.classList.add("filled");
      } else {
        inputContainer.classList.remove("filled");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all form fields are filled
    if (isFormValid()) {
      localStorage.setItem("personalInfo", JSON.stringify(formData));
      onPersonalInfoFilled(true);
      scrollToShipping();
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const scrollToShipping = () => {
    // Scroll to the shipping section
    if (shippingSectionRef.current) {
      shippingSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isFormValid()) {
      onPersonalInfoFilled(false);
    }
  }, [formData, onPersonalInfoFilled]);

  return (
    <div className="generalContainer">
      <div className="personalDetailContainer">
        <h2 className="checkoutTitle">Checkout</h2>
        <div className="checkoutPar">
          <div className="section-headings">
            <span className="highlighted-address">Address</span> --------{" "}
            <span>Shipping</span> -------- <span>Payment</span>
          </div>
          <h3>Shipping Information</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-container">
                <label htmlFor="name" className="label">
                  First Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="lastName" className="label">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="address" className="label">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="input"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="houseNumber" className="label">
                Apartment/House Number:
              </label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                className="input"
                value={formData.houseNumber}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="input-container">
                <label htmlFor="zipcode" className="label">
                  Postal Code:
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  className="input"
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="city" className="label">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="country" className="label">
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="input"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <button
            className="continue-to-shipping-btn"
            type="submit"
            disabled={!isFormValid()}
          >
            Continue to Shipping
          </button>
        </form>
        {!isFormValid() && (
          <p className="error-message">
            Please fill in your personal information to continue to shipping.
          </p>
        )}
      </div>
      <div ref={shippingSectionRef} id="shipping-method-section">
        {/* ShippingMethod component */}
        {/* ... */}
      </div>
    </div>
  );
};
PersonalInformationForm.propTypes = {
  onPersonalInfoFilled: PropTypes.func.isRequired,
};

export default PersonalInformationForm;
