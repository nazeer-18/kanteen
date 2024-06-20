import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ViewOrder.css';
import ViewOrderItem from './ViewOrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faCheck, faXmark, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import paymentService from '../services/paymentService';

export default function ViewOrder() {
    const orderId = new URLSearchParams(window.location.search).get("id");
    const { user, checkLocalData } = useUser();
    const userId = user.emailId;
    const alphanumericId = userId.replace(/[^a-zA-Z0-9]/g, '');
    const navigate=useNavigate();
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
            hour12: true
        });
    };

    const handleBack = () => {
        window.history.back();
    };

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
    },[]);

    const validateUser=async()=>{
        try{
            const response=await paymentService.checkUserAuth(orderId,alphanumericId);
            if(response.data.logout===true){
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        }catch(err){
            console.error(err);
        }
    };

    useEffect(() => {
        validateUser();
        if (user.emailId === 'na' && !checkLocalData()) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [user.emailId, navigate]);

    return (
        <div className="order-full-container">
            <div className="order-container">
                <div className="order-header">
                    <h1>Order Details</h1>
                </div>
                <div className="order-details">
                    <div className="order-status-details">
                        <span className="order-status-status">
                            Status:
                            <span 
                                className="order-status-status-val"
                                style={                                    
                                    (orderStatus==="completed")?{backgroundColor: "green"}:
                                    (orderStatus==="cancelled")?{backgroundColor: "#ed2525"}:
                                    (orderStatus==="processing")?{backgroundColor: "#00b1eb",}:
                                    (orderStatus==="pending")?{backgroundColor: "#e4e424", color: "black"}:
                                    {}
                                }
                            >
                                { orderStatus }
                            </span>
                        </span>
                    </div>
                    <div className='order-details-dp'>
                        <span className="order-status-id">
                            Order ID:
                            <span className="order-status-id-fp">
                                #{ orderId.slice(0,20) }
                            </span>
                            <span className="order-status-id-sp">
                                { orderId.slice(20,24) }
                            </span>                        
                        </span>
                    <p>Order Date: { date.slice(0,11) }</p>
                    <p>Order Time: { date.slice(12,27) }</p>
                    <p>
                        Payment Status: { paymentStatus }
                        <FontAwesomeIcon
                            icon={
                                (paymentStatus==="paid")?faCheck:
                                (paymentStatus==="unpaid")?faHourglassHalf:
                                (paymentStatus==="failed")?faXmark:
                                ''
                            }
                            style={
                                (paymentStatus==="paid")?{color: "#6ee665"}:
                                (paymentStatus==="unpaid")?{color: "#FFD43B"}:
                                (paymentStatus==="failed")?{color: "#e10505",}:
                                {}
                            } 
                        />
                    </p>
                    <p>Payment Mode: { paymentMode }</p>
                    </div>                    
                    {orderedItems.map((item) => {
                        return <ViewOrderItem key={item._id} item={item.item} quantity={item.quantity} />
                    })}
                    <div className='view-order-total'>
                        {/* <span className='view-order-total-dot'>----------------------</span> */}
                        <div className='view-order-total-box'>
                            <span>
                                Subtotal:                             
                            </span>
                            <span className='view-order-total-val'>
                                    {total}
                            </span>
                        </div>
                        <div className='view-order-total-box'>
                        <span>
                            Tax: 
                        </span>                        
                        <span className='view-order-total-val'>
                                {paymentMode==="cash"? 0:total*0.02}
                        </span>
                        </div>
                        <div className='view-order-total-box'>
                        <span>Total:</span>
                        <span className='view-order-total-val'>
                            <FontAwesomeIcon icon={faIndianRupeeSign} />
                            { total+ (paymentMode==="online"? total*0.02:0) }/-                            
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="view-order-backBtn-container">
                    <button className="view-order-backBtn" onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}