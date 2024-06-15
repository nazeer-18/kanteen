import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/userContext';
import OrderItem from './OrderItem'
import ordersImg from '../images/order-history.svg'
import '../styles/OrderHistory.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import orderService from '../services/orderService';

export default function OrderHistory() {
    const navigate = useNavigate()
    const { user } = useUser();
    const userId = user.emailId;
    const [orders, setOrders] = useState([])
    useEffect(() => {
        if (userId.emailId === 'na') {
            setTimeout(() => {
                navigate('/login');
            }, 1500)
        }
    },[userId.emailId,navigate]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderService.fetchOrders(userId);
                const orders = res.data.orders;
                const sortedOrders = orders.slice().sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
                setOrders(sortedOrders);
            } catch (err) {
                console.error('Error fetching orders', err);
            }
        }
        fetchOrders();
        const interval = setInterval(() => {
            fetchOrders();
        }, 20000);
        return () => clearInterval(interval);
    }, [])
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
    return (
        <div className="order-history-page">
            <div className="order-history-img">
                <img src={ordersImg} alt="order-history" />
            </div>
            <div className="order-history-content">
                <div className="order-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => {
                            navigate(-1);
                        }}>
                            &lt;
                        </span>
                    </div>
                    <h1>
                        Your Orders
                    </h1>
                    <div className="order-history-filters">
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>

                </div>
                <div className="order-history-body">
                    {
                        orders.length > 0 ? (
                            <div >
                                {orders.map((item) => {
                                    const oid=item._id;
                                    return <OrderItem
                                        key={oid}
                                        date={toLocaleDateString(item.date)}
                                        orderId={item._id}
                                        orderStatus={item.orderStatus}
                                        paymentMode={item.paymentMode}
                                        paymentStatus={item.paymentStatus}
                                        total={item.total}
                                        odid={oid}
                                    />
                                })}
                            </div>
                        ) : (
                            <div>
                                <p className="empty-orders">No Orders Found</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
