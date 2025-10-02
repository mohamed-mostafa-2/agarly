const mongoose = require("mongoose");
const Product = require("./product.model");

const realStateSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Schema.ObjectId,
    ref: "subCategory",
  },
  area: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  cameras: { type: Boolean },
  pool: { type: Boolean },
  garden: { type: Boolean },
});

module.exports = Product.discriminator("RealState", realStateSchema);
