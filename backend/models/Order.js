const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    //use objects id as unique identifier for each order
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    orderStatus: {
        type: String, // pending, processing ,completed, cancelled
        required: true,
        default: 'pending'
    },
    desc: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMode: {
        type: String, // cash, online 
        default: 'cash'
    },
    //whenever a transaction gets added for this order id automatically it updates the payment status and transaction id
    paymentStatus: {
        type: String, // paid, unpaid ,failed
        default: 'unpaid'
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    products: [
        {
            item: {
                type: Schema.Types.ObjectId, //take name and price from Menu
                ref: 'Menu',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }
});

OrderSchema.methods.expireOrder = async function () {

    //CHANGING ORDER STATUS BASED ON TIME AND PAYMENT STATUS  
    if (Date.now() - this.date > 7 * 60 * 1000 && this.paymentStatus === 'unpaid') {
        this.orderStatus = 'cancelled';
        this.paymentStatus = 'failed';
        this.desc = 'Order Expired due to inactivity for 7 minutes.';
        await this.save();
    } else if (this.paymentStatus === 'paid') {
        this.orderStatus = 'processing';
        this.desc = 'Order is being processed.';
        await this.save();
    }
}

OrderSchema.methods.completeOrder = async function () {
    this.desc = 'Order is completed.';
    await this.save();
}

async function checkAndExpireOrders() {
    try {
        const Order = require('./Order');
        const pendingOrders = await Order.find({
            orderStatus: { $in: ['pending', 'completed'] },
            desc: { $ne: 'Order is completed.' }
        });
        for (let order of pendingOrders) {
            if (order.orderStatus === 'pending')
                await order.expireOrder();
            else if (order.orderStatus === 'completed')
                await order.completeOrder();
        }
    }
    catch (err) {
        console.log(err);
    }
}

setInterval(checkAndExpireOrders, 20 * 1000);

module.exports = mongoose.model('Order', OrderSchema);