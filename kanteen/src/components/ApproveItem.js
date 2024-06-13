import React from 'react'
import transactionService from '../services/transactionService';

export default function ApproveItem(props) {
    const { orderId, userId, total, expiry } = props;
    const createTransaction = async (status) => {
        try {
            const response = await transactionService.createTransaction(userId, orderId, "cash", status);
            console.log(response.status);
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="approveitem-page">
            <div className="approve-item-order-details">
                <div className="approve-item-order-id">
                    Order id: {orderId}
                </div>
                <div className="approve-item-user-id">
                    User id: {userId}
                </div>
            </div>
            <div className="approve-item-order-handling">
                <button onClick={() => {
                    createTransaction("success")
                }
                }>
                    Approve
                </button>
                <button onClick={() => {
                    createTransaction("failed")
                }
                }>
                    Reject
                </button>
            </div>
            <div className="approve-item-order-others">
                <div className="approve-item-order-expiry">
                    Expires in: {expiry}
                </div>
                <div className="approve-item-order-total">
                    Total: {total}
                </div>
                <div className="approve-item-order-explore">
                    <button>
                        Explore
                    </button>
                </div>
            </div>

        </div>
    )
}
