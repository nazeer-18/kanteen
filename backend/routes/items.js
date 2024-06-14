const express = require('express');
const mongoose = require('mongoose');
const itemRouter = express.Router();
const Item = require('../models/Menu')
const ObjectId = mongoose.Types.ObjectId;
//Get all items from menu
itemRouter.get('/fetchall', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
});

itemRouter.post('/fetchone', async (req,res)=>{
    try{
        const data = await Item.findById(new ObjectId(req.body.itemId));
        const {name, price, image} = data;
        return res.status(200).json({"price":price, "name":name, "image":image})
    } catch(e) {
        return res.status(500).send("fetch failed, CHECK ITEM_ID")
    }
})

//Add an item to menu => admin functionality
itemRouter.post('/add', async (req, res) => {
    const newItem = new Item({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.body.image,
        type: req.body.type,
        category: req.body.category
    })
    try {
        const item = await Item.findOne({ id: req.body.id });
        if (item) {
            res.status(400).json({ msg: "Item already exists", success: false })
        }
        await newItem.save();
        res.status(200).json({ msg: "Item added successfully", success: true })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = itemRouter;