const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String }],
    imageCover: { type: String, required: [true, "image cover is required"] },
    vendorName: { type: String, required: true },
    location: { type: String },
    rentalFee: { type: Number },
    description: { type: String },
    rating: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { discriminatorKey: "Category", timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
