import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'; 
import itemService from '../services/itemService';
import { useUser } from '../contexts/userContext'
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import buyImage from '../images/cart-proceed.svg';

export default function Cart() {
    const navigate = useNavigate();
    const { user, checkLocalData } = useUser();
    const userId = user.emailId;
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (!checkLocalData()) {
            navigate('/login');
        }
    }, [userId, navigate])

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await itemService.fetchCartItems(userId);
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
    }, [userId])

    const handleCheckout = async () => {
        try {
            setTimeout(() => {
                navigate('/checkout', { state: { products: cartItems, total: total } });
            }, 2000);
        } catch (err) {
            console.error('Error in checkout', err);
        }
    }

    return (
        <div className="cart-page">
            <div className="cart-img">
                <img src={buyImage} alt="buy" />
            </div>
            <div className="cart-container">
                <div className="cart-content">
                    {
                        <div>
                            <div className="cart-heading">
                                <div className="cart-heading-desc">
                                    <span title="view menu" className="cart-arrow" onClick={() => {
                                        navigate(-1);
                                    }}>
                                        &lt;
                                    </span>
                                </div>
                                <span className="cart-heading-txt">
                                    Your cart {cartItems.length === 0 ? 'is empty' : ''}
                                </span>
                                {
                                    cartItems.length > 0 &&
                                    <div className="cart-heading-price">
                                        price
                                    </div>
                                }
                            </div>
                            {cartItems.map((item) => {
                                return <CartItem key={item._id} item={item.item} quantity={item.quantity} />
                            })}
                        </div>
                    }
                    <div className="cart-total">
                        Subtotal ({totalItems} items):
                        {
                            total > 0 &&
                            <span>
                                <FontAwesomeIcon icon={faIndianRupeeSign} />
                                <span>
                                    {total}
                                </span>
                            </span>
                        }
                    </div>
                </div>
                {
                    cartItems.length > 0 &&
                    <div className="cart-footer">
                        <button
                            className="cart-footer-button"
                            disabled={total === 0}
                            onClick={handleCheckout}>
                            Proceed to order
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
