import Categories from "../models/Categories.js";
import { logError } from "../util/logging.js";

//GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ success: true, result: categories });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get categories, try again later",
    });
  }
};

//GET ONE CATEGORY
export const getOneCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.status(200).json({ success: true, result: category });
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "Unable to get this category, try again later",
    });
  }
};

//CREATE CATEGORY
export const createCategory = async (req, res) => {
  const newCategory = new Categories(req.body);

  try {
    await newCategory.save();

    res.status(200).json({ success: true, result: newCategory });
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "Unable to create category, try again later",
    });
  }
};

//DELETE CATEGORY
export const deleteCategory = async (req, res, next) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (err) {
    next(err);
  }
};

//UPDATE CATEGORY
export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};
