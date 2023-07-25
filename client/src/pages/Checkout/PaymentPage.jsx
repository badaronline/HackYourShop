import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { method } = useParams();
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    setPaymentConfirmed(selectedMethod === "card");
  }, [selectedMethod]);

  const handlePayment = () => {
    if (selectedMethod === "card") {
      setPaymentConfirmed(true);
    } else {
      if (selectedMethod === undefined) {
        alert("Please select a payment method.");
      } else {
        alert("Please select the 'Credit/debit card' payment method.");
      }
    }
  };

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
    setPaymentConfirmed(false);
  };

  useEffect(() => {
    localStorage.setItem("paymentMethod", JSON.stringify(selectedMethod));
  }, [selectedMethod]);

  const renderPaymentMethodButton = (methodText) => (
    <div className="paymentMethod">
      <button
        className={selectedMethod === methodText ? "selected" : ""}
        onClick={() => handleMethodSelection(methodText)}
      >
        {methodText === "card" && <FontAwesomeIcon icon={faCreditCard} />}
        {methodText}
      </button>
    </div>
  );

  const confirmButton = (
    <button
      className="confirmButton"
      onClick={handlePayment}
      disabled={selectedMethod !== "card" && paymentConfirmed}
    >
      Confirm Payment
    </button>
  );

  return (
    <div className="paymentPage">
      <h2>Payment Page</h2>
      {renderPaymentMethodButton("card")}
      {paymentConfirmed ? (
        <Link to="/transaction">{confirmButton}</Link>
      ) : (
        confirmButton
      )}
    </div>
  );
};

export default PaymentPage;
