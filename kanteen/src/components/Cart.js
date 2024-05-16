import React, { useState, useEffect } from 'react'
import '../styles/Cart.css';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext'
import CartItem from './CartItem';

export default function Cart() {
    const { user } = useUser();
    const userId = user.emailId;
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await userService.fetchCartItems(userId);
                const items = res.data.cart.items;
                setTotal(res.data.cart.total);
                setCartItems(items);
            } catch (err) {
                console.error('Error fetching items', err);
            }
        }
        fetchItems();
        const interval = setInterval(() => {
            fetchItems();
        }, 2000);
        return () => clearInterval(interval);
    }, [])


    return (
        <div className="cart-container">
            <div className="cart-title">
                <h1>Your Cart</h1>
            </div>
            <div className="cart-content">
                {
                    cartItems.length === 0 ?
                        <h2>Your cart is empty</h2> :
                        <div>
                            {cartItems.map((item) => {
                                return <CartItem key={item._id} item={item.item} />
                            })}
                            <div className="cart-total">
                                <h2>Total: {total}</h2>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
