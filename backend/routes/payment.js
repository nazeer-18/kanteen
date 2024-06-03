const express = require('express')
const paymentRouter = express.Router();
const fetch = require('node-fetch');
const Gateway = require('cashfree-pg');

paymentRouter.post('/checkout', async (req, res) => {
    try {
        const url = 'https://sandbox.cashfree.com/pg/orders'; //TODO: Migrate to Prod. Envi.

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

paymentRouter.post('/upicollectreq',async(req,res)=>{
    Gateway.Cashfree.XEnvironment = Gateway.Cashfree.Environment.SANDBOX; //TODO: Migrate to Prod. envi.
    const orderPayRequest = {
                "payment_session_id": req.body.sessionID,
                "payment_method": {
                    "upi": {
                        "channel": "collect",
                        "upi_id": req.body.upiID,
                        "upi_redirect_url": true,
                        "upi_expiry_minutes": 5
                    }
                  },
                "return_url":"https://kanteen-ase.netlify.app/orderhistory" //TODO: change it to ordsrs/{orderID}
              }
        Gateway.Cashfree.PGPayOrder("2022-09-01", orderPayRequest).then((response) => {
        console.log('Transaction Initiated successfully:', response.data);
        return res.status(200).send(response.data.data.url);
    })

    .catch((error) => {
        console.error('Error creating transaction:', error);
        return res.status(500).send("check log :)");
    });
})

module.exports = paymentRouter;