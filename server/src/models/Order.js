import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  personalInfo: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  shippingMethod: { type: String, required: true },
  cartItems: { type: Array, required: true },
  shippingFee: { type: Object, required: true },
});

const Order = mongoose.model("order", OrderSchema);

export default Order;
