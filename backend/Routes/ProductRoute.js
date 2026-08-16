const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  checkout,
} = require("../Controller/ProductController");
const UserAuth = require("../Middleware/authMiddleware");
const AdminAuth = require("../Middleware/adminMiddleware");

router.post("/create", UserAuth, AdminAuth, createProduct);

router.get("/products", getAllProducts);


router.post("/checkout", UserAuth, checkout);

router.get("/products/:id", getProductById);

router.put("/products/:id", UserAuth, AdminAuth, updateProduct);

router.delete("/products/:id", UserAuth, AdminAuth, deleteProduct);


module.exports = router;