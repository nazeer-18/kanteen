const express = require('express')
const Order = require('../models/Order');
const orderRouter = express.Router();

orderRouter.post('/create', async (req, res) => {
    try {
        const order = new Order({
            userId: req.body.userId,
            orderId:req.body.orderId,
            products: req.body.products,
            total: req.body.total,
            paymentMode:req.body.mode
        });
        await order.save();
        return res.status(201).send(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

orderRouter.post('/fetchOrders', async (req,res) => {
    try {
        const userId = req.body.userId;
        const orders = await Order.find({ userId: userId });
        res.status(200).json({ message: "Orders fetched successfully", orders: orders });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = orderRouter;