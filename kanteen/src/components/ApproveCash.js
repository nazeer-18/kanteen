import React,{useState,useEffect} from 'react'
import orderService from '../services/orderService';

export default function ApproveCash() {
    const [pendingOrders,setPendingOrders] = useState([]);
    useEffect(()=>{
        const getpendingOrders = async()=>{
            const response = await orderService.fetchPendingOrders();
            setPendingOrders(response.data.orders);
        }
        getpendingOrders();
    });
    return (
        <div>
            <h1>Approve Cash</h1>
            {pendingOrders.map((order)=>{
                return(
                    <div>
                        <h2>{order.orderId}</h2>
                        <h3>{order.userId}</h3>
                        <h4>{order.total}</h4>
                        <h4>{order.date+5*60*1000-Date().now}</h4>
                    </div>
                )
            })}
        </div>
    )
}
