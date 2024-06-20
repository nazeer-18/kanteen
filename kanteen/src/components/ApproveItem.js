import React from 'react'
import { useNavigate } from 'react-router-dom';
import transactionService from '../services/transactionService';
import '../styles/ApproveItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

export default function ApproveItem(props) {
    const { orderId, userId, total, date } = props;
    const expiry = date + 5 * 60 * 1000;
    const navigate = useNavigate();
    const createTransaction = async (status) => {
        try {
            const response = await transactionService.createTransaction(userId, orderId, "cash", status);
            console.log(response.status);
        }
        catch (err) {
            console.error(err);
        }
    }
    const viewOrder = () => {
        navigate(`/vieworder?id=${orderId}`)
    }
    return (
        <div className="approveitem-page">
            <div className="approve-item-order-expiry">
                {date+5*60*1000-Date().now}
            </div>
            <div className="approve-item-order-details">
                <div className="approve-item-order-id">
                    ID: {orderId}
                </div>
                <div className="approve-item-user-id">
                    User: {userId}
                </div>
            </div>
            <hr />
            <div className="approve-item-order-others">
                <div className="approve-item-order-total">
                    Total: <FontAwesomeIcon icon={faIndianRupee} />  <span>{total}</span>
                </div>
                <div className="approve-item-order-explore">
                    <button onClick={viewOrder}>
                        View order
                    </button>
                </div>
            </div>
            <hr />
            <div className="approve-item-order-handling">
                <div>
                    <button onClick={() => {
                        createTransaction("failed")
                    }
                    }>
                        Reject
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        createTransaction("success")
                    }
                    }>
                        Approve
                    </button>
                </div>
            </div>
        </div>
    )
}
