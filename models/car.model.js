const mongoose = require("mongoose");
const Product = require("./product.model");

const carSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },
  brand: { type: String },
  model: { type: String },
  transmissionType: { type: String, enum: ["Automatic", "Manual"] },
  fuelType: {
    type: String,
    enum: ["Benzine", "Diesel", "Electric", "Hybrid", "Natural Gas"],
  },
  numberOfSeats: { type: Number },
  driver: { type: String, enum: ["With driver", "Without driver"] },
});

module.exports = Product.discriminator("Car", carSchema);
