const Order = require("../models/orderModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Get current user's order
const getCurrentUserOrder = async (req, res) => {
  const order = await Order.findOne({ user: req.user.userId });
  res.send(order);
};

// Create order
const createOrder = async (req, res) => {
  const user = req.user.userId;
  try {
    const existingOrder = await Order.findOne({ user: user });

    if (existingOrder) {
      // Update existing order
      existingOrder.orderItems = req.body.orderItems;
      await existingOrder.save();
      res.json(existingOrder);
      res.status(StatusCodes.OK).json({ msg: "Product added successfully" });
    } else {
      // Create new order
      const newOrder = new Order({
        user: user,
        orderItems: req.body.orderItems,
      });
      await newOrder.save();
      res.json(newOrder);
      res.status(StatusCodes.OK).json({ msg: "Product added successfully" });
    }
  } catch (error) {
    throw new CustomError.BadRequestError(
      `Error occurred while creating the order`
    );
  }
};

module.exports = {
  getCurrentUserOrder,
  createOrder,
};
