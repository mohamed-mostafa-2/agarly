const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    profileImage: {
      type: String,
      required: [true, "profile image is required"],
    },
    address: addressSchema,
    birthday: Date,
    phone: String,
    role: {
      type: String,
      enum: ["Admin", "User", "Agent"],
      default: "User",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
