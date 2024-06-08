import React from 'react'
import '../styles/OrderItem.css'

export default function OrderItem() {
    return (
        <div className="order-item-container">
            <p>Ordered on : 12/12/2021</p>
            <p>Status : Delivered</p>
            <h3>Order #1234567890123456</h3>
            <div className="order-details-btn">
                <button>
                    View Details
                </button>
            </div>
            <div className="order-item-payment">
                <h4>Payment Method : cash</h4>
                <p>Payment status : success</p>
            </div>
            <div className="order-item-amount">
                <h4>Total Amount</h4>
                <p>$ 100.00</p>
            </div>
        </div>
    )
}
