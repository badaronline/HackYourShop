import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { logError } from "../util/logging.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    if (name && password) {
      res
        .status(200)
        .json({ message: "Name and Password updated successfully" });
    } else if (name) {
      res.status(200).json({ message: "Name updated successfully" });
    } else if (password) {
      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    logError("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default updateUser;
