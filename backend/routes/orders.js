const express = require('express')
const Order = require('../models/Order');
const orderRouter = express.Router();

orderRouter.post('/create', async (req, res) => {
    try {
        const order = new Order({
            user: req.body.userId,
            products: req.body.products,
            total: req.body.total
        });
        await order.save();
        return res.status(201).send(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = orderRouter;