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
        const data = await Item.find({id:req.body.itemId});
        return res.status(200).json(data);
    } catch(e) {
        return res.status(500).send("fetch failed, CHECK ITEM_ID")
    }
})

itemRouter.post('/add', async (req, res) => {
    const { id, name, price, quantity, image, type, category } = req.body;
    console.log("req", req.body);
    // Preprocess the name: convert to lowercase and remove spaces
    const processedName = name.toLowerCase().replace(/\s+/g, '');

    const newItem = new Item({
        id,
        name,
        price,
        quantity,
        image,
        type,
        category,
    });

    console.log("req", req.body);
    console.log(newItem);

    try {
        // Fetch all items from the database
        const existingItems = await Item.find({});

        // Check if any existing item's name matches the processed name (case-insensitive and space-insensitive)
        const isDuplicate = existingItems.some((item) => {
            const existingProcessedName = item.name.toLowerCase().replace(/\s+/g, '');
            return existingProcessedName === processedName;
        });
        if (isDuplicate) {
            return res.status(400).json({ msg: "Item already exists", success: false });
        }

        await newItem.save();
        res.status(200).json({ msg: "Item added successfully", success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//Modify an item in menu => admin functionality
itemRouter.post('/modify', async (req, res) => {
    try {
        const item = await Item.findOne({ id: req.body.id });
        if (!item) {
            res.status(400).json({ msg: "Item not found", success: false })
        }
        item.name = req.body.name;
        item.price = req.body.price;
        item.quantity = req.body.quantity;
        item.image = req.body.image;
        item.type = req.body.type;
        item.category = req.body.category;
        await item.save();
        res.status(200).json({ msg: "Item modified successfully", success: true })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
})

//Remove an item from menu => admin functionality
itemRouter.post('/remove', async (req, res) => {
    try {
        const item = await Item.findOne({ id: req.body.id });
        if (!item) {
            res.status(400).json({ msg: "Item not found", success: false })
        }
        await item.deleteOne({ id: req.body.id });
        res.status(200).json({ msg: "Item removed successfully", success: true })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = itemRouter;
