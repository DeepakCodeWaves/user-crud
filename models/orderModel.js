const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, required: true } // e.g., "Pending", "Shipped", "Delivered"
});

module.exports = mongoose.model('Order', orderSchema);
