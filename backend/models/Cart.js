const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
        unique: true
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: {
        type: Number,
        default: 0
    },
    totalItems: {
        type: Number,
        default: 0
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

cartSchema.methods.calculateTotal = async function () {
    let total = 0, totalItems = 0;
    const Menu = require('./Menu');
    for (const it of this.items) {
        const menuItem = await Menu.findById(it.item);
        total += menuItem.price * it.quantity;
        totalItems += it.quantity;
    }
    this.total = total;
    this.totalItems = totalItems;
    await this.save();
}

module.exports = mongoose.model('Cart', cartSchema)