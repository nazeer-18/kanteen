const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    items : [{
        item : {
            type : Schema.Types.ObjectId,
            ref : 'Menu'
        },
        quantity : {
            type : Number,
            default : 1
        }
    }]
})

module.exports = mongoose.model('Cart', cartSchema)