const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const TransactionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    paymentId: {
        type: String, //update this field with the payment id from the payment gateway
        required: true, //use the payment id for success and failed transaction and cash for cash payment
    },
    status: {
        type: String, // transaction status success, failed
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

TransactionSchema.methods.updateOrderStatus = async function () {
    //change the order payment status and transaction id based on the transaction status
    const Order = require('./Order');
    const order = await Order.findById(this.orderId);
    if(order){
        if(this.status === 'failed'){
            order.orderStatus = 'cancelled';
            order.desc = 'Payment Failed';
        }
        else{
            order.transactionId = this._id;
            order.desc = 'Payment Success';
            order.paymentStatus = 'paid';
        }
        await order.save();
    }
}

module.exports = mongoose.model('Transaction', TransactionSchema);