import Order from "../models/Order.js";
// import { logError } from "../util/logging.js";

const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export default createOrder;
