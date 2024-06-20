import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import cashier from '../images/cashier.svg'
import orderService from '../services/orderService';
import ApproveItem from './ApproveItem';
import '../styles/ApproveCash.css'

export default function ApproveCash() {
    const navigate = useNavigate();
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        const getpendingOrders = async () => {
            const response = await orderService.fetchPendingOrders();
            setPendingOrders(response.data.orders);
        }
        getpendingOrders();
    });

    const { user, checkLocalData } = useUser();

    useEffect(() => {
        if (user.emailId === 'na' && !checkLocalData()) {
            navigate('/login');
        }
    }, []);
    return (
        <div className='approvecash-page'>
            <div className="approvecash-img">
                <img src={cashier} alt="cashier" />
            </div>
            <div className="approvecash-pending-orders">
                <div className="pending-order-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => {
                            navigate(-1);
                        }}>
                            &lt;
                        </span>
                    </div>
                    <h1>
                        Pending Orders
                    </h1>
                    <div className="pending-order-history-filters">
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>
                </div>
                <div className="pending-orders-container">
                    {
                        pendingOrders.length > 0 ?
                            pendingOrders.map(order => {
                                return (
                                    <ApproveItem orderId={order._id} userId={order.userId} total={order.total} date={order.date} />
                                )
                            })
                            :
                            <div className="no-pending-orders empty-orders">
                                No pending orders
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
