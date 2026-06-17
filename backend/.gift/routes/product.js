var express = require("express");
var router = express.Router();

const Product = require("../model/product");

console.log("Product Router Loaded");
// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// ADD product
router.post("/add", async (req, res) => {

  console.log("Received Data:", req.body);

  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image
    });

    await product.save();

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// UPDATE product
router.put("/:id", async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// DELETE product
router.delete("/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

// SEARCH products
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    });

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;