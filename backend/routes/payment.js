const express = require('express')
const paymentRouter = express.Router();
const fetch = require('node-fetch');
const Order = require('../models/Order');
const Gateway = require('cashfree-pg');

Gateway.Cashfree.XEnvironment=Gateway.Cashfree.Environment.SANDBOX;
Gateway.Cashfree.XClientId=process.env.PAYMENT_X_CLIENT_ID;
Gateway.Cashfree.XClientSecret=process.env.PAYMENT_X_SECRET_ID;

paymentRouter.post('/checkout', async (req, res) => {
    try {
        //const url = 'https://api.cashfree.com/pg/orders'; //for production
        const url = 'https://sandbox.cashfree.com/pg/orders' //for testing
        const userId=req.body.customerId;
        const orderId=req.body.orderId;
        const returnUrl="https://kanteen-ase.netlify.app/AddonlineTransaction?oid="+orderId+"?uid="+userId;
        console.log(returnUrl);
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
                    customer_id: userId,
                    customer_phone: req.body.customerNumber,
                    customer_name: req.body.customerName
                },
                order_id: orderId,
                order_amount: req.body.orderAmount,
                order_currency: 'INR',
                order_meta:{
                    return_url:returnUrl,
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

paymentRouter.post('/status',async(req,res)=>{
    try{
    Gateway.Cashfree.PGOrderFetchPayments("2022-09-01", req.body.orderId).then((response) => {
        console.log('Payments fetched successfully:', response.data);
        const payments=response.data;
        for (let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            console.log(payment.payment_status);
            if (payment.payment_status === 'SUCCESS') {
                return res.status(200).send({status:"success",data:response.data.data})
            } else {
                console.log("Payment ID:", payment.cf_payment_id, "was not successful.");
            }
        }

        return res.status(200).send({status:"failed",data:response.data})
    })
    .catch((error) => {
        console.error('Error fetching payment details', error.response);
    });}
    catch(e){
        return res.status(404).send("error");
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
});

paymentRouter.post('/validateUserOrder',async(req,res)=>{
    try{
        const orderId=req.body.orderId;
        const userId=req.body.alphanumericId;
        Gateway.Cashfree.PGFetchOrder("2022-09-01", orderId).then((response) => {
            console.log('Order fetched successfully:', response.data);
            console.log(userId,response.data.customer_details.customer_id);
            const logout= (userId!=response.data.customer_details.customer_id)?true:false;
            if(!logout){
                console.log("user is Invalid");
            }
            res.status(200).send({status:"success",data:{logout:logout}});
        })
        .catch((error) => {
            console.error('Error fetching order', error);
        });
    } catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = paymentRouter;