import express from "express";
import dotenv from "dotenv";
dotenv.config();
const paymentRouter = express.Router();
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_PRIVATE_KEY);

paymentRouter.post("/", async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message: "Payment successful",
      success: true,
      confirmationCode: payment.id,
    });
  } catch (error) {
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

export default paymentRouter;
