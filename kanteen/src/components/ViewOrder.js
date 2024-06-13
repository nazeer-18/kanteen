import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';

export default function ViewOrder() {
    const orderId = new URLSearchParams(window.location.search).get("id");
    const fetchOrderData= async () => {
        try {
            const orderData=await orderService.fetchOrder(orderId);
            console.log(orderData.data.data)
            return orderData
        } catch (err) {
            console.error('Error fetching OrderData', err);
        }
    }
    const orderData=fetchOrderData();    
    return (
        <div>   
            this is view orders page <br/> 
            your order id is : {orderId}
            order data: {orderData.data}
        </div>
    )
}
