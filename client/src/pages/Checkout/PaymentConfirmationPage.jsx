import "./paymentConfirmationPage.css";
import React, { useState, useContext, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext";
import { CARD_OPTIONS } from "./CARD_OPTIONS";
import "./paymentConfirmationPage.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PaymentConfirmationPage = () => {
  const { total, updateCartData } = useContext(CartContext);
  const [success, setSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const shippingFee = total >= 50 ? 0 : 3.99;
  const totalWithShipping = (Number(total) + Number(shippingFee)).toFixed(2);

  useEffect(() => {
    localStorage.setItem("shippingFee", JSON.stringify(shippingFee));
  }, [shippingFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    if (!stripe || !cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const port = process.env.BASE_SERVER_URL;
        const response = await axios.post(`${port}/api/payment`, {
          amount: total * 100,
          id,
        });
        if (response.data.success) {
          const token = localStorage.getItem("token");

          if (token) {
            const cartData = localStorage.getItem("cart");
            const personInfoData = localStorage.getItem("personalInfo");
            const shippingMethodData = localStorage.getItem("shippingMethod");
            const paymentMethodData = localStorage.getItem("paymentMethod");
            const shippingFee = localStorage.getItem("shippingFee");

            const decodedToken = jwt_decode(token);
            const order = {
              userId: decodedToken.userId,
              cartItems: JSON.parse(cartData),
              personalInfo: JSON.parse(personInfoData),
              shippingMethod: JSON.parse(shippingMethodData),
              paymentMethod: JSON.parse(paymentMethodData),
              shippingFee: JSON.parse(shippingFee),
            };
            await axios.post(`${port}/api/order`, order);
          }

          updateCartData([]);
          setSuccess(true);
          localStorage.removeItem("cart");
          localStorage.removeItem("personalInfo");
          localStorage.removeItem("shippingMethod");
          localStorage.removeItem("paymentMethod");
          setConfirmationCode(response.data.confirmationCode);
        }
      } catch (error) {
        setPaymentError(true);
      }
    }
  };

  return (
    <div className="payment-confirmation-page">
      <div className="section-heading">
        <span>Address</span> -------- <span>Shipping</span> --------{" "}
        <span className="highlighted">Payment</span>
      </div>
      {!success ? (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="payment-form-group">
            <h2 className="payment-heading">Payment Details</h2>
            <CardElement options={CARD_OPTIONS} />
          </div>
          <div className="order-review">
            <h2 className="payment-heading">Order Summary</h2>
            <p className="order-summary-item">Total Amount: €{total}</p>
            {total < 50 && (
              <p className="order-summary-item">Shipping Fee: €3.99</p>
            )}
            <p className="order-summary-item">
              Total with Shipping: €{totalWithShipping}
            </p>
          </div>
          <button type="submit" className="pay-button">
            Pay Now
          </button>
        </form>
      ) : (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <p>The total paid amount is €{totalWithShipping}</p>
          <p>Confirmation Code: {confirmationCode}</p>
          <p>Thank you for your purchase!</p>
          <Link to={"/products/shop"}>
            <button className="continue-shopping-button">
              Continue shopping
            </button>
          </Link>
        </div>
      )}

      {paymentError && (
        <p>
          Please <a href="/checkout">try again</a>.
        </p>
      )}
    </div>
  );
};

export default PaymentConfirmationPage;
