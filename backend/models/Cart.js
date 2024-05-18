const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Menu = require('./Menu');
const User = require('./User');

const cartSchema = new Schema({
    userId :{
        type : String,
        ref : User,
        unique : true
    },
    items : [{
        item : {
            type : Schema.Types.ObjectId,
            ref : Menu
        },
        quantity : {
            type : Number,
            default : 1
        }
    }],
    total : {
        type : Number,
        default : 0
    },
    totalItems : {
        type : Number,
        default : 0
    },
    Date : {
        type : Date,
        default : Date.now
    }
})

cartSchema.methods.calculateTotal = async function () {
    let total = 0;
    for(const it of this.items){
        const menuItem = await Menu.findById(it.item);
        total += menuItem.price * it.quantity;
    }
    this.total = total;
    console.log(this.total);
    await this.save();
}

cartSchema.methods.calculateTotalItems = async function () {
    let total = 0;
    for(const it of this.items){
        total += it.quantity;
    }
    this.totalItems = total;
    await this.save();  
}

module.exports = mongoose.model('Cart', cartSchema)