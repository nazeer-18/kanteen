const express = require('express')
const paymentRouter = express.Router();
const fetch = require('node-fetch');
const Order = require('../models/Order');

paymentRouter.post('/checkout', async (req, res) => {
    try {
        //const url = 'https://api.cashfree.com/pg/orders'; //for production
        const url = 'https://sandbox.cashfree.com/pg/orders' //for testing

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'content-type': 'application/json',
                'x-client-id': process.env.PAYMENT_X_CLIENT_ID,
                'x-client-secret': process.env.PAYMENT_X_SECRET_ID
            },
            body: JSON.stringify({
                customer_details: {
                    customer_id: req.body.customerId,
                    customer_phone: req.body.customerNumber,
                    customer_name: req.body.customerName
                },
                order_id: req.body.orderId,
                order_amount: req.body.orderAmount,
                order_currency: 'INR',
                order_meta:{
                    return_url:"https://kanteen-ase.netlify.app/orderhistory",
                    notify_url:"https://kanteen-server.onrender.com/api/payment/handlestatus",
                }
            })
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => { return res.status(200).send(json); })
            .catch(err => console.error('error:' + err));

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

paymentRouter.post('/handlestatus',async(req,res)=>{
    try{
        console.log("Webhook called");
        const payment_status=req.body.data.payment.payment_status;
        const order_id= req.body.data.order.order_id;
        console.log("ps:"+payment_status);
        console.log("oid"+order_id);
        const order = await Order.findOne({ orderId: order_id }); 
        if(order){
            if(payment_status=="SUCCESS"){
                order.paymentStatus="paid";
                order.orderStatus = 'processing';
                order.desc='payment received';
            }
            else if(payment_status=="FAILED"){
                order.paymentStatus="failed";
                order.orderStatus = 'cancelled';
                order.desc='online payment failed';
            }
            await order.save();
            res.status(200).send("succesfully received and updated payment status");
        }
        else{
            console.log("no orders found with id:"+order_id);
            res.status(200).send("Issue with the orderId");
        }
        // console.log(req);
    }catch(err){
        console.log(err);
        res.status(200).send("catched an error");
    }
})

module.exports = paymentRouter;