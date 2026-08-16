const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "secret_key");

    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = adminAuth;