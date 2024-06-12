import React,{useState,useEffect} from 'react'
import cashier from '../images/cashier.svg'
import orderService from '../services/orderService';
import ApproveItem from './ApproveItem';
import '../styles/ApproveCash.css'

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
        <div className='approvecash-page'>
            <div className="approvecash-img">
                <img src={cashier} alt="cashier"/>
            </div>
            <div className="approvecash-pending-orders">
                <ApproveItem/>
                {
                    pendingOrders.map(order=>{
                        return(
                            <ApproveItem orderId={order._id} userId={order.userId} total={order.total} expiry={order.date+5*60*1000-Date().now}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
