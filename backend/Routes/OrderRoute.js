const express = require("express");

const router = express.Router();

const UserAuth = require("../Middleware/authMiddleware");
const AdminAuth = require("../Middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  deleteMyOrder,
} = require("../Controller/OrderController");

// =====================================================
// USER ROUTES
// =====================================================

// Create order
router.post(
  "/orders",
  UserAuth,
  createOrder
);

// Get my orders
router.get(
  "/orders",
  UserAuth,
  getMyOrders
);

// Remove my own order
router.delete(
  "/orders/my/:id",
  UserAuth,
  deleteMyOrder
);

// =====================================================
// ADMIN ROUTES
// =====================================================

// Get all orders
router.get(
  "/admin/orders",
  UserAuth,
  AdminAuth,
  getAllOrders
);

// Update order status
router.put(
  "/admin/orders/:id",
  UserAuth,
  AdminAuth,
  updateOrder
);

// Delete order
router.delete(
  "/admin/orders/:id",
  UserAuth,
  AdminAuth,
  deleteOrder
);

module.exports = router;