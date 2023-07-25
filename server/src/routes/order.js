import express from "express";
import createOrder from "../controllers/order.js";
import getOrderHistory from "../controllers/getOrderHistory.js";

const orderRouter = express.Router();

orderRouter.get("/history", getOrderHistory);
orderRouter.post("/", createOrder);

export default orderRouter;
