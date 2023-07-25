import express from "express";
import {
  authenticateUser,
  createUser,
  getUsers,
  getWishList,
  replaceWishList,
} from "../controllers/user.js";

const userRouter = express.Router();
userRouter.use(authenticateUser);
userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.put("/:userId/wishlist", replaceWishList);
userRouter.get("/:userId/wishlist", getWishList);

export default userRouter;
