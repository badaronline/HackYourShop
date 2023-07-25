import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.js";

const productRouter = express.Router();

//CREATE
productRouter.post("/create", createProduct);

//UPDATE
productRouter.put("/:id", updateProduct);
//DELETE
productRouter.put("/:id"), deleteProduct;

//GET
productRouter.get("/find/:id", getProduct);

//GET ALL
productRouter.get("/", getAllProducts);

export default productRouter;
