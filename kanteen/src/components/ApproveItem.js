import React from 'react'
import { useNavigate } from 'react-router-dom';
import transactionService from '../services/transactionService';
import '../styles/ApproveItem.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

export default function ApproveItem(props) {
    const { orderId, userId, total, expiry } = props;
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
                {expiry} 04:00
            </div>
            <div className="approve-item-order-details">
                <div className="approve-item-order-id">
                    ID: {orderId} 123457894544
                </div>
                <div className="approve-item-user-id">
                    User: {userId} ch.en.u4cse21161@ch.students.amrita.edu
                </div>
            </div>
            <hr />
            <div className="approve-item-order-others">
                <div className="approve-item-order-total">
                    Total: <FontAwesomeIcon icon={faIndianRupee}/>  <span>{total}2000</span> 
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
                        createTransaction("success")
                    }
                    }>
                        Approve
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        createTransaction("failed")
                    }
                    }>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
}
