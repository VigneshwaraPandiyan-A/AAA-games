const Product = require("../Model/ProductModel");
const { redisClient } = require("../config/redis");

// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // Clear product list cache
    try {
      await redisClient.del("products");
    } catch (redisError) {
      console.log("Redis cache clear error:", redisError.message);
    }

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);

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
    // ==========================================
    // CHECK REDIS CACHE
    // ==========================================

    try {
      const cachedProducts = await redisClient.get("products");

      if (cachedProducts) {
        console.log("⚡ Products loaded from Redis");

        return res.status(200).json({
          success: true,
          source: "redis",
          products: JSON.parse(cachedProducts),
        });
      }
    } catch (redisError) {
      console.log(
        "Redis GET error:",
        redisError.message
      );
    }

    // ==========================================
    // GET FROM MONGODB
    // ==========================================

    console.log("📦 Products loaded from MongoDB");

    const products = await Product.find();

    // ==========================================
    // SAVE IN REDIS
    // ==========================================

    try {
      await redisClient.set(
        "products",
        JSON.stringify(products),
        {
          EX: 300,
        }
      );

      console.log("💾 Products saved to Redis");
    } catch (redisError) {
      console.log(
        "Redis SET error:",
        redisError.message
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      source: "mongodb",
      products,
    });
  } catch (error) {
    console.log("GET ALL PRODUCTS ERROR:", error);

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
    const productId = req.params.id;

    // Redis key for individual product
    const cacheKey = `product:${productId}`;

    // ==========================================
    // CHECK REDIS
    // ==========================================

    try {
      const cachedProduct =
        await redisClient.get(cacheKey);

      if (cachedProduct) {
        console.log(
          "⚡ Product loaded from Redis"
        );

        return res.status(200).json({
          success: true,
          source: "redis",
          product: JSON.parse(cachedProduct),
        });
      }
    } catch (redisError) {
      console.log(
        "Redis GET product error:",
        redisError.message
      );
    }

    // ==========================================
    // GET FROM MONGODB
    // ==========================================

    console.log(
      "📦 Product loaded from MongoDB"
    );

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ==========================================
    // SAVE PRODUCT IN REDIS
    // ==========================================

    try {
      await redisClient.set(
        cacheKey,
        JSON.stringify(product),
        {
          EX: 300,
        }
      );

      console.log(
        "💾 Product saved to Redis"
      );
    } catch (redisError) {
      console.log(
        "Redis SET product error:",
        redisError.message
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      source: "mongodb",
      product,
    });
  } catch (error) {
    console.log(
      "GET PRODUCT BY ID ERROR:",
      error
    );

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
    const productId = req.params.id;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ==========================================
    // UPDATE PRODUCT FIELDS
    // ==========================================

    product.title =
      req.body.title ?? product.title;

    product.description =
      req.body.description ??
      product.description;

    product.category =
      req.body.category ??
      product.category;

    product.platform =
      req.body.platform ??
      product.platform;

    product.price =
      req.body.price ?? product.price;

    product.quantity =
      req.body.quantity ??
      product.quantity;

    product.publisher =
      req.body.publisher ??
      product.publisher;

    product.image =
      req.body.image ?? product.image;

    await product.save();

    // ==========================================
    // CLEAR REDIS CACHE
    // ==========================================

    try {
      // Clear complete product list
      await redisClient.del("products");

      // Clear individual product
      await redisClient.del(
        `product:${productId}`
      );

      console.log(
        "🗑️ Product Redis cache cleared"
      );
    } catch (redisError) {
      console.log(
        "Redis cache clear error:",
        redisError.message
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(
      "UPDATE PRODUCT ERROR:",
      error
    );

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
    const productId = req.params.id;

    const product =
      await Product.findByIdAndDelete(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ==========================================
    // CLEAR REDIS CACHE
    // ==========================================

    try {
      // Clear complete product list
      await redisClient.del("products");

      // Clear individual product
      await redisClient.del(
        `product:${productId}`
      );

      console.log(
        "🗑️ Deleted product Redis cache"
      );
    } catch (redisError) {
      console.log(
        "Redis cache clear error:",
        redisError.message
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(
      "DELETE PRODUCT ERROR:",
      error
    );

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

    // ==========================================
    // EMPTY CART CHECK
    // ==========================================

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    // Keep track of changed products
    const changedProductIds = [];

    // ==========================================
    // CHECK STOCK
    // ==========================================

    for (const item of items) {
      console.log(
        "Checking product:",
        item
      );

      const product =
        await Product.findById(item._id);

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

      // ========================================
      // STOCK VALIDATION
      // ========================================

      if (
        product.quantity <
        item.quantity
      ) {
        return res.status(400).json({
          success: false,
          message: `${product.title} has only ${product.quantity} stock left`,
        });
      }

      // ========================================
      // REDUCE STOCK
      // ========================================

      product.quantity -=
        item.quantity;

      await product.save();

      changedProductIds.push(
        product._id.toString()
      );
    }

    // ==========================================
    // CLEAR PRODUCT LIST CACHE
    // ==========================================

    try {
      await redisClient.del("products");

      console.log(
        "🗑️ Product list cache cleared"
      );

      // ========================================
      // CLEAR INDIVIDUAL PRODUCT CACHE
      // ========================================

      for (const productId of changedProductIds) {
        await redisClient.del(
          `product:${productId}`
        );
      }

      console.log(
        "🗑️ Individual product caches cleared"
      );
    } catch (redisError) {
      console.log(
        "Redis cache clear error:",
        redisError.message
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(
      "CHECKOUT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
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