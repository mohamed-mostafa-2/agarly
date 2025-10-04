const asyncHandler = require("express-async-handler");
const Order = require('../models/order.model');
const ProductModel = require('../models/product.model')
const factory = require('./handlerFactory')
const moment = require('moment')


exports.checkoutOrder = asyncHandler(async (req, res, next) => {
    const { Customer, Product, orderDate, numOfDays } = req.body;

    if (!Customer || !Product || !numOfDays) {
        return res.status(400).json({ status: "fail", message: 'Please provide all required fields' });
    }

    const Product1 = await ProductModel.findById(Product);

    if (!Product1) {
        return res.status(404).json({ status: "fail", message: 'Product not found' });
    }

    const totalAmount = Product1.rentalFee * numOfDays;
    const formattedOrderDate =  orderDate ? moment(orderDate, 'YYYY-MM-DD') : moment()
    const returnDate = new Date(formattedOrderDate);
    returnDate.setDate(returnDate.getDate() + numOfDays);

    const order = await Order.create({
        Customer,
        Product,
        orderDate,
        returnDate,
        totalAmount 
    });
    res.status(201).json({ status: "success", message: 'order created successfully', data: order });
});

exports.getAllOrders = factory.getAll(Order, ['user', 'product']);