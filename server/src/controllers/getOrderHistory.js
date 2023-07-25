import Order from "../models/Order.js";
import jwt_decode from "jwt-decode";

const getOrderHistory = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export default getOrderHistory;
