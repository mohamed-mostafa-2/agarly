const Product = require("../models/product.model");
const Availability = require("../models/availability.model");
const Order = require("../models/order.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");



exports.checkAvailability = asyncHandler(async (req, res, next) => {
    const { productId, startDate, endDate } = req.body;

    // Validate input
    if (!productId || !startDate || !endDate) {
        return next(new ApiError("Product ID, start date, and end date are required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError("Product not found", 404));
    }

    const availability = await Availability.findOne({ Product: productId });
    if (!availability) {
        return next(new ApiError("Availability information not found for this product", 404));
    }

    const start = new Date(startDate).split('T')[0];
    const end = new Date(endDate).split('T')[0];
    if (start >= end) {
        return next(new ApiError("End date must be after start date", 400));
    }

    // Generate all dates in the requested range
    const requestedDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        requestedDates.push(new Date(d));
    }

    // Check for overlap with unavailable dates
    const isUnavailable = await Availability.exists({
    product: productId,
    unavailableDates: { $in: requestedDates },
    });

    if (isUnavailable) {
        return next(new ApiError("Product is not available for the selected dates", 400));
    }

    res.status(200).json({
        status: "success",
        message: "Product is available for the selected dates",
    });
});



exports.addUnavailableDates = asyncHandler(async (req, res, next) => {
    const { productId, startDate, endDate } = req.body;

    // Validate input
    if (!productId || !startDate || !endDate) {
        return next(new ApiError("Product ID, start date, and end date are required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ApiError("Product not found", 404));
    }
    
    let availability = await Availability.findOne({ Product: productId });
    if (!availability) {
        availability = new Availability({ Product: productId });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        return next(new ApiError("End date must be after start date", 400));
    }

    // Generate all dates in the requested range
    const newUnavailableDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        newUnavailableDates.push(new Date(d));
    }

    await Availability.findOneAndUpdate(
    { product: productId },
    { $addToSet: { unavailableDates: { $each: newUnavailableDates } } },
    { upsert: true, new: true }
    );

    res.status(200).json({
        status: "success",
        message: "Unavailable dates added successfully",
        unavailableDates: availability.unavailableDates,
    });
})