import React from 'react'
import OrderItem from './OrderItem'
import '../styles/OrderHistory.css'

export default function OrderHistory() {
    return (
        <div className="order-history-container">
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
    )
}
