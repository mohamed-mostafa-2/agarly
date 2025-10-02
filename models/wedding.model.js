const mongoose = require("mongoose");
const Product = require("./product.model");

const weddingSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Types.ObjectId,
    ref: "subCategory",
  },
  area: { type: Number }, // m²
  capacity: { type: Number }, // number of people
  type: { type: String, enum: ["Indoor", "Open air"] },
  buffet: { type: String, enum: ["Open buffet", "Meals", "Desserts"] },
});

module.exports = Product.discriminator("Wedding", weddingSchema);
