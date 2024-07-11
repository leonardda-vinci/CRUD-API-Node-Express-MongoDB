const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {
  getProducts,
  deleteProduct,
  putProduct,
  getProduct,
  createProduct,
} = require("../controller/product.controller.js");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
