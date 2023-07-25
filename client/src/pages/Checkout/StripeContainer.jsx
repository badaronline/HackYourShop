import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentConfirmationPage from "./PaymentConfirmationPage";
const PUBLIC_KEY =
  "pk_test_51MlC9xAn2qyLfqoBG2eCTxXVEIz63uWJuzYfRdvl92ySLoFMiEL9KPEGoPYRgRZhsBSquJ7Xonc9qI8V8oBiu8er00YlPB0xN6";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentConfirmationPage />
    </Elements>
  );
}
