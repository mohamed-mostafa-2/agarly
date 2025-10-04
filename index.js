const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({});
const path = require("path");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth.routes");
const categoryRoute = require("./routes/category.routes");
const subCategoryRoute = require("./routes/subCategory.routes");
const carRoute = require("./routes/car.routes");
const weddingRoute = require("./routes/wedding.routes");
const clothesRoute = require("./routes/clothes.routes");
const realStateRoute = require("./routes/realstate.routes");
const wishlistRoute = require("./routes/wishlist.routes");
const userRoute = require("./routes/user.routes");
const orderRoute = require("./routes/order.routes");
const compression = require("compression");
const hpp = require("hpp"); // Middleware to protect against HTTP Parameter Pollution attacks
const mongoSanitize = require("express-mongo-sanitize"); // Middleware to sanitize data from query injection
const xss = require("xss-clean"); // Middleware to sanitize data from scripting attacks
const globalError = require("./middlewares/globalError");

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); // Accept all origins
  },
  credentials: true, // Allow credentials (cookies)
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(compression()); // Compress all routes

// Apis
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/subCategory", subCategoryRoute);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/clothes", clothesRoute);
app.use("/api/v1/wedding", weddingRoute);
app.use("/api/v1/realstate", realStateRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);

app.use(globalError);

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
