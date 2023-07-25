import Product from "../models/Product.js";
import { logError } from "../util/logging.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1; // Parse the page as a number
  const productsPerPage = 12;
  const qCategory = req.query.category;
  const sort = req.query.sort; // Get the sort parameter from the request
  const searchQuery = req.query.search;

  try {
    let products;
    let totalProducts;

    const query = qCategory ? { category: qCategory } : {}; // Create the initial query object

    if (searchQuery) {
      query.$or = [
        { productName: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { subCategory: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (sort === "lowest") {
      products = await Product.find(query)
        .sort({ price: 1 }) // Sort by price in ascending order
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
      totalProducts = await Product.countDocuments(query);
    } else if (sort === "highest") {
      products = await Product.find(query)
        .sort({ price: -1 }) // Sort by price in descending order
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
      totalProducts = await Product.countDocuments(query);
    } else {
      products = await Product.find(query)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
      totalProducts = await Product.countDocuments(query);
    }

    res
      .status(200)
      .json({ success: true, result: products, total: totalProducts });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get products, please try again later",
    });
  }
};
