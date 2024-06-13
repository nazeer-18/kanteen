import React, { useState } from 'react';
import orderService from '../services/orderService';

export default function ViewOrder() {
    const orderId = new URLSearchParams(window.location.search).get("id");
    const [OrderData,setOrderData]=useState('');
    const fetchOrderData=async ()=>{
        setOrderData(await orderService.fetchOrders(orderId)); 
        console.log(OrderData);
    }
    fetchOrderData();
    return (
        <div>   
            this is view orders page <br/> 
            your order id is : {orderId}
            your oder data: {OrderData}
        </div>
    )
}
