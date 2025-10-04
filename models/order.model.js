const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    returnDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    numOfDays: {
      type: Number,
      default: 1,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);;
