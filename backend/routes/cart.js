const express = require('express')
const cartRouter = express.Router();
const Cart = require('../models/Cart')

//Get all items from cart for a user
cartRouter.get('/fetchall',async (req,res)=>{
    try{
        const userId = req.user_id;
        const cart = await Cart.findOne({userId:userId}).populate('items.item');
        res.status(200).json(cart);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})