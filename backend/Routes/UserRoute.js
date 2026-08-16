const express = require("express");
const router = express.Router();

const { registerUser, loginUser, updateUser, deleteUser } = require("../Controller/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;