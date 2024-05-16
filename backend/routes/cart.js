const express = require('express')
const cartRouter = express.Router();
const Cart = require('../models/Cart')

//Get all items from cart for a user
cartRouter.post('/fetchall', async (req, res) => {
    try {
        const userId = req.body.userId;
        const cart = await Cart.findOne({ userId: userId }).populate('items.item');
        if (!cart) {
            return res.status(404).send("Cart not found for the user");
        }
        res.status(200).json({ message: "Cart fetched successfully", cart: cart});
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

//Add an item to cart for a user
cartRouter.post('/add', async (req, res) => {
    try {
        const userId = req.body.userId;
        const { itemId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).send("Cart not found for the user");
        }
        const item = cart.items.find(item => item.item == itemId);
        if(item){
            item.quantity += parseInt(quantity);
        }else{
            cart.items.push({ item: itemId, quantity: quantity });
        }
        await cart.calculateTotal();
        res.status(200).send("Item added to cart successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = cartRouter;