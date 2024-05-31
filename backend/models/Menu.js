const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, image: {
        type: String,
        required: true
    },
    type: { // veg, non-veg, others
        type: String,
        required: true
    },
    category: { //beverages, starters, main course, desserts, stationery, snack items, tiffin
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Item', menuSchema)