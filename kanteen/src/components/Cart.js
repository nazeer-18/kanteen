import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext'
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useUser();
    const userId = user.emailId;
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        if (userId === 'na') {
            navigate('/login');
        }
    }, userId)
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await userService.fetchCartItems(userId);
                const items = res.data.cart.items;
                setTotal(res.data.cart.total);
                setTotalItems(res.data.cart.totalItems);
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
                                return <CartItem key={item._id} item={item.item} quantity={item.quantity} />
                            })}
                            <div className="cart-total">
                                Subtotal ({totalItems}items):  
                                <FontAwesomeIcon icon={faIndianRupeeSign} />
                                <span>
                                    {total}
                                </span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
