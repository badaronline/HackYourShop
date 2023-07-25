import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  category: { type: String, required: true },
});

const Categories = mongoose.model("categories", CategoriesSchema);

export default Categories;
