import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { logError } from "../util/logging.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    logError("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default loginUser;
