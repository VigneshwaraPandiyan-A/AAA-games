const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

category: {
  type: [String],
  default: [],
},

platform: {
  type: [String],
  default: [],
},

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  quantity: {
    type: Number,
    required: true,
    min: 0,
  },

  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },

  publisher: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;