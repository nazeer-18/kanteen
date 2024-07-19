import React, { useEffect } from 'react'
import '../styles/OrderItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from '../contexts/userContext';

export default function OrderItem(prop) {
    const { date, orderId, orderStatus, paymentMode, paymentStatus, total, oid } = prop;
    const getStatusClass = () => {
        switch (orderStatus) {
            case 'completed':
                return 'completed';
            case 'cancelled':
                return 'cancelled';
            case 'processing':
                return 'processing';
            case 'pending':
                return 'pending';
            default:
                return '';
        }
    };
    const navigate=useNavigate();
    const handleViewClick=()=>{
        navigate(`/viewOrder?id=${oid}`);
    };

    const { user, checkLocalData } = useUser();
    useEffect(() => {
        if (!checkLocalData())
            navigate('/login');
    }, []);
    return (
        <div className="order-item-container">
            <div className="order-item-content">
                <div className={`order-status ${getStatusClass()}`}>
                    {orderStatus}
                </div>
                <div className="order-item-details-first order-item">
                    <div className="order-item-order-details">
                        <div className="ordered-date">
                            <FontAwesomeIcon icon={faCalendarDays}/> <br className="apply-break" /> {date}
                        </div>
                        <div className="order-id">
                            <strong>ID</strong>:#{orderId}
                        </div>
                    </div>
                    <div className="order-explore">
                        <div className="order-explore-button">
                        <Link to={`/viewOrder?id=${orderId}`}>
                        <button>
                                View Order
                            </button>
                        </Link>
                            
                        </div>
                    </div>
                </div>
                <hr />
                <div className="order-item-details-second order-item">
                    <div className="payment-details">
                        <FontAwesomeIcon icon={faWallet} /> &nbsp;
                        <div className="order-payment-status">
                            <div>
                                Payment method : <span className="txt-black">{paymentMode}</span>
                            </div>
                            <div >
                                Payment Status : <span className='txt-black'>{paymentStatus}</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-item-total">
                        Total : <FontAwesomeIcon icon={faIndianRupee} /> <span className="txt-black">{total}</span>
                    </div>
                </div>
                <hr className="hidden-hr" />
                <div className="order-item-details-third order-item">
                    <div className="order-explore-hidden">
                        <div className="order-explore-button">
                            <button>
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="order-item-total-hidden">
                        Total : <FontAwesomeIcon icon={faIndianRupee} /> <span className="txt-black">{total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}