/* eslint-disable no-console */
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import jwt from "jsonwebtoken";
import WishList from "../models/WishList.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);
      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

// Middleware to authenticate user with JWT
export const authenticateUser = (req, res, next) => {
  // Get the JWT from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  // Verify and decode the JWT using the JWT_SECRET environment variable
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach the user ID from the JWT to the request object
    req.userId = decoded.userId;
    next();
  });
};

export const replaceWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    const newWishlist = req.body;

    // Check if the authenticated user ID matches the provided user ID
    if (req.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let wishList = await WishList.findOneAndReplace(
      { user: userId },
      newWishlist,
      {
        returnDocument: "after",
      }
    );
    if (!wishList) {
      wishList = await WishList.create(newWishlist);
    }

    const wishListWithProducts = await wishList.populate("products");

    res.status(200).json({ success: true, wishlist: wishListWithProducts });
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get wishlist details
export const getWishList = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the authenticated user ID matches the provided user ID
    if (req.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const wishlist = await WishList.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishlist) {
      return res.json({ message: "No products in Wishlist" });
    }

    res.json({ success: true, wishlist: wishlist });
  } catch (error) {
    logError(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
