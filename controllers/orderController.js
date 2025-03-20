const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('productId');
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('productId');
    if (!order) return res.status(404).send('Order not found');
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('userId').populate('productId');
    if (!order) return res.status(404).send('Order not found');
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.status(200).send('Order deleted');
  } catch (err) {
    res.status(500).send(err);
  }
};
