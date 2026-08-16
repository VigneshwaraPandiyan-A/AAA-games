const Order = require("../Model/OrderModel");
const Product = require("../Model/ProductModel");
const { redisClient } = require("../Config/redis");

// =====================================================
// CREATE ORDER
// =====================================================

const createOrder = async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    const orderedProducts = [];

    // ==========================================
    // CHECK PRODUCTS AND REDUCE STOCK
    // ==========================================

    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} has only ${product.quantity} stock left.`,
        });
      }

      // Reduce stock
      product.quantity -= item.quantity;

      await product.save();

      // Calculate total
      totalAmount += product.price * item.quantity;

      // Store product information in order
      orderedProducts.push({
        product: product._id,
        title: product.title,
        image: product.image,
        category: product.category,
        platform: product.platform,
        publisher: product.publisher,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({
      user: req.user.id,
      customer,
      products: orderedProducts,
      totalAmount,
      status: "Pending",
    });

    // ==========================================
    // CLEAR USER ORDER CACHE
    // ==========================================

    await redisClient.del(`orders:${req.user.id}`);

    // ==========================================
    // CLEAR PRODUCT CACHE
    // ==========================================

    await redisClient.del("products");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// USER - GET MY ORDERS
// =====================================================

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Redis key for this user
    const cacheKey = `orders:${userId}`;

    // ==========================================
    // CHECK REDIS
    // ==========================================

    const cachedOrders = await redisClient.get(cacheKey);

    if (cachedOrders) {
      console.log("⚡ Orders loaded from Redis");

      return res.status(200).json({
        success: true,
        message: "Orders fetched from Redis",
        source: "redis",
        orders: JSON.parse(cachedOrders),
      });
    }

    // ==========================================
    // GET ORDERS FROM MONGODB
    // ==========================================

    console.log("📦 Orders loaded from MongoDB");

    const orders = await Order.find({
      user: userId,
    }).populate("products.product");

    // ==========================================
    // SAVE ORDERS IN REDIS
    // ==========================================

    await redisClient.set(
      cacheKey,
      JSON.stringify(orders),
      {
        EX: 300,
      }
    );

    // ==========================================
    // SEND RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      source: "mongodb",
      orders,
    });
  } catch (error) {
    console.log("GET MY ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET ALL ORDERS
// =====================================================

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("GET ALL ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// ADMIN - UPDATE ORDER STATUS
// =====================================================

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // ALLOWED STATUS
    // ==========================================

    const allowedStatus = [
      "Pending",
      "Confirmed",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    order.status = req.body.status;

    await order.save();

    // ==========================================
    // CLEAR USER ORDER CACHE
    // ==========================================

    await redisClient.del(`orders:${order.user}`);

    console.log(
      `🗑️ Redis cache cleared for user ${order.user}`
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// ADMIN - DELETE ORDER
// =====================================================

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const userId = order.user;

    // Delete order
    await Order.findByIdAndDelete(req.params.id);

    // ==========================================
    // CLEAR USER ORDER CACHE
    // ==========================================

    await redisClient.del(`orders:${userId}`);

    console.log(
      `🗑️ Redis cache cleared for user ${userId}`
    );

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("ADMIN DELETE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// USER - REMOVE OWN ORDER
// =====================================================

const deleteMyOrder = async (req, res) => {
  try {
    console.log(
      "USER DELETE ORDER ID:",
      req.params.id
    );

    console.log(
      "USER ID:",
      req.user.id
    );

    // ==========================================
    // FIND USER'S ORDER
    // ==========================================

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found or you are not allowed to remove this order",
      });
    }

    // ==========================================
    // DELIVERED ORDER CANNOT BE REMOVED
    // ==========================================

    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message:
          "Delivered orders cannot be removed",
      });
    }

    // ==========================================
    // DELETE ORDER
    // ==========================================

    await Order.findByIdAndDelete(req.params.id);

    // ==========================================
    // CLEAR REDIS CACHE
    // ==========================================

    await redisClient.del(
      `orders:${req.user.id}`
    );

    console.log(
      `🗑️ Redis cache cleared for user ${req.user.id}`
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Order removed successfully",
    });
  } catch (error) {
    console.log(
      "USER DELETE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  deleteMyOrder,
};