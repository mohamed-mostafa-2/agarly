const mongoose = require("mongoose");
const Product = require("./product.model");

const clothingSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Schema.ObjectId,
    ref: "subCategory",
  },
  size: { type: String },
  color: { type: String },
  condition: {
    type: String,
    enum: ["Used many times", "Medium used", "As new"],
  },
  brand: { type: String },
});

module.exports = Product.discriminator("Clothing", clothingSchema);
