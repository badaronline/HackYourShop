import React, { useState } from "react";
import PersonalInformationForm from "../../components/CheckoutPage/PersonalInformationForm";
import ShippingMethod from "../../components/CheckoutPage/ShippingMethod";
import Cart from "../Cart/Cart";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";
import { useEffect } from "react";

const CheckoutPage = () => {
  const route = useLocation();
  const [personalInfoFilled, setPersonalInfoFilled] = useState(false);

  const handlePersonalInfoFilled = (isFilled) => {
    setPersonalInfoFilled(isFilled);
  };

  useEffect(() => {
    if (!personalInfoFilled) {
      window.scrollTo(0, 0);
    }
  }, [personalInfoFilled]);

  return (
    <div className="checkoutContainer">
      <div className="form">
        <PersonalInformationForm
          onPersonalInfoFilled={handlePersonalInfoFilled}
        />
        {personalInfoFilled && <ShippingMethod />}
      </div>
      <div className="cart">
        <Cart route={route.pathname} />
      </div>
    </div>
  );
};

export default CheckoutPage;
