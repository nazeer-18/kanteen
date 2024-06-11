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

orderRouter.post('/get',async (req,res)=>{
    try{
        const userId = req.body.userId;
        const orders = await Order.find({user:userId});
        sortOrders = orders.sort((a,b)=>b.date-a.date);
        return orders.length === 0 ? res.status(404).send("No orders found") : res.status(200).send(orders);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = orderRouter;