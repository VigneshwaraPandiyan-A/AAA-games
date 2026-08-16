const Product = require("../Model/ProductModel");
const { redisClient } = require("../Config/redis");

// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // Clear product cache
    await redisClient.del("products");

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getAllProducts = async (req, res) => {
  try {
    // Check Redis first
    const cachedProducts = await redisClient.get("products");

    if (cachedProducts) {
      console.log("⚡ Products loaded from Redis");

      return res.status(200).json({
        success: true,
        source: "redis",
        products: JSON.parse(cachedProducts),
      });
    }

    // Redis does not have data
    console.log("📦 Products loaded from MongoDB");

    const products = await Product.find();

    // Save products in Redis
    await redisClient.set(
      "products",
      JSON.stringify(products),
      {
        EX: 300,
      }
    );

    res.status(200).json({
      success: true,
      source: "mongodb",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// =====================================================
// GET PRODUCT BY ID
// =====================================================

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.title = req.body.title;
    product.description = req.body.description;
    product.category = req.body.category;
    product.platform = req.body.platform;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.publisher = req.body.publisher;
    product.image = req.body.image;

    await product.save();

    // Clear Redis cache
    await redisClient.del("products");

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Clear Redis cache
    await redisClient.del("products");

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// =====================================================
// CHECKOUT
// =====================================================

const checkout = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    for (const item of items) {
      console.log("Checking:", item);

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      console.log(
        product.title,
        "Stock:",
        product.quantity,
        "Buy:",
        item.quantity
      );

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} has only ${product.quantity} stock left`,
        });
      }

      product.quantity -= item.quantity;

      await product.save();
    }

    // Clear cache because stock changed
    await redisClient.del("products");

    return res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  checkout,
};