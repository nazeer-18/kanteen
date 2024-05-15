import React from 'react'
import '../styles/Cart.css';

export default function Cart() {
    const cartItems = [];
    return (
        <div className="cart-container">
            <div className="cart-title">
                <h1>Your Cart</h1>
            </div>
            <div className="cart-content">
                {
                    cartItems.length === 0 ? <h2>Your cart is empty</h2> : cartItems
                }
            </div>
        </div>
    )
}
