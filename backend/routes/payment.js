const express = require('express')
const paymentRouter = express.Router();
const fetch = require('node-fetch');
const Gateway = require('cashfree-pg');

paymentRouter.post('/checkout', async (req, res) => {
    try {
        const url = 'https://api.cashfree.com/pg/orders'; //TODO: Migrate to Test Envi.

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
                order_currency: 'INR'
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

module.exports = paymentRouter;