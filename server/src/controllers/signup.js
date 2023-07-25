import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { logError } from "../util/logging.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({
        message:
          "User already registered. Please use another Email address or Login",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: "Signup successful, Please Login now" });
    }
  } catch (error) {
    logError("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default createUser;
