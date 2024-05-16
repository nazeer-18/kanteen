const express = require('express')
const cartRouter = express.Router();
const Cart = require('../models/Cart')

//Get all items from cart for a user
cartRouter.post('/fetchall', async (req, res) => {
    try {
        const userId = req.user_id;
        const cart = await Cart.findOne({ userId: userId });
        res.status(200).json({message: "Cart fetched successfully", cart: cart});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

//Add an item to cart for a user
cartRouter.post('/add', async (req, res) => {
    try {
        const userId = req.user_id;
        const { itemId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: userId });
        cart.items.push({ item: itemId, quantity: quantity });
        await cart.calculateTotal();
        res.status(200).send("Item added to cart successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = cartRouter;