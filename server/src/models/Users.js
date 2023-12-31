import mongoose from "mongoose";

// Define your user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlist",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
