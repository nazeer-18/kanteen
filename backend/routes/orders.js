const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const orderRouter = express.Router();
const ObjectId = mongoose.Types.ObjectId;

orderRouter.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const order = new Order({
            userId: req.body.userId, 
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

orderRouter.post('/fetchOrder', async (req,res) => {
    try {
        const orderData = await Order.findById( new ObjectId(req.body.orderId) );
        res.status(200).json({ message: "Order fetched successfully", data: orderData });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

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

orderRouter.get('/fetchPendingOrders', async (req,res) => {
    try {
        const orders = await Order.find({ orderStatus: "pending" , paymentMode:"cash"});
        res.status(200).json({ message: "Orders fetched successfully", orders: orders });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = orderRouter;