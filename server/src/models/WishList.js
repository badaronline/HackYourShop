import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.models.WishList ||
  mongoose.model("WishList", WishListSchema);
