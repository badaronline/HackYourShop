import express from "express";
import {
  getCategories,
  createCategory,
  getOneCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories); //get all categories
categoryRouter.post("/", createCategory); //create category
categoryRouter.get("/find/:id", getOneCategory); //get one category
categoryRouter.put("/:id", deleteCategory); //delete category
categoryRouter.put("/:id", updateCategory); //update category

export default categoryRouter;
