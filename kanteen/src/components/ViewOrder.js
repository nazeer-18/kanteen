import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import '../styles/ViewOrder.css';
import ViewOrderItem from './ViewOrderItem';

export default function ViewOrder() {
    const orderId = new URLSearchParams(window.location.search).get("id");
    const [date,setdate]=useState('');
    const [paymentStatus,setpaymentStatus]=useState('');
    const [paymentMode,setpaymentMode]=useState('');
    const [orderedItems, setorderedItems] = useState([]);
    const [total,settotal]=useState('');
    const [orderStatus,setorderStatus]=useState('');

    const toLocaleDateString = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            //12 hour format
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }

    useEffect(() => {
        const fetchOrderData= async () => {
            try {
                const orderData=await orderService.fetchOrder(orderId);
                // console.log("func order data:");
                // console.log(orderData.data.data);
                const {date, orderStatus, paymentMode, paymentStatus, products, total} =orderData.data.data;
                
                setdate(toLocaleDateString(date));
                setorderStatus(orderStatus);
                setpaymentMode(paymentMode);
                setpaymentStatus(paymentStatus);
                setorderedItems(products);
                settotal(total);
                return orderData
            } catch (err) {
                console.error('Error fetching OrderData', err);
            }
        }
        fetchOrderData();
        const interval = setInterval(() => {
            fetchOrderData();
        }, 2000);
        return () => clearInterval(interval);
    })
    return (
        <div className="order-container">
            <div className="order-header">
                <h1>Order Details</h1>
            </div>
            <div className="order-details">
                <h2>Order ID: #{ orderId }</h2>
                <p>Order Date: { date }</p>
                <p>Payment Status: { paymentStatus }</p>
                <p>Payment Mode: { paymentMode }</p>
                <h3>Ordered Items</h3>
                <ul>
                    <li>Item 1 - $10.99</li>
                    <li>Item 2 - $8.49</li>
                    <li>Item 3 - $5.99</li>
                </ul>
                {orderedItems.map((item) => {
                    console.log()
                    return <ViewOrderItem key={item._id} item={item.item} quantity={item.quantity} />
                })}
                <p>Total: { total }</p>
                <p>Order Status: { orderStatus }</p>
            </div>
        </div>
    )
}


// const fetchOrderData= async () => {
    //     try {
    //         const orderData=await orderService.fetchOrder(orderId);
    //         console.log("func order data:");
    //         console.log(orderData.data)
    //         setflag(true);
    //         return orderData
    //     } catch (err) {
    //         console.error('Error fetching OrderData', err);
    //     }
    // }
    // const orderData=fetchOrderData(); 
    // console.log("out order.data:"); 
    //         console.log(orderData); 
    //         console.log(Object.getOwnPropertyNames(orderData)); 
    // useEffect(()=>{
    //     if(flag){
            
    //         setflag(false);
    //     }

    // })
    // if(flag)
    // console.log("order.data:"); 
    // console.log(orderData); 
    // console.log(Object.getOwnPropertyNames(orderData)); 