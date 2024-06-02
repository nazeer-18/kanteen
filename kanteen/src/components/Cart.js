import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext'
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Cashfree } from '@cashfreepayments/cashfree-js';

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useUser();
    const userId = user.emailId;
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        if (userId === 'na') {
            navigate('/login');
        }
    }, [userId,navigate])
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
    }, [userId])

    const handleCheckout = async () =>{
        try{
            const orderId = "test1"; //TODO: generate a random or sequential number everytime
            const orderAmount = total;
            const customerID = user.emaiId;
            const customerName=user.name;
            const customerNumber=user.mobileNumber;
            const generate_order = await userService.paymentRequest(orderId,orderAmount,customerID,customerName,customerNumber);
            console.log(generate_order);
            const cashfree = Cashfree({
                mode:"sandbox" //or production
            });
            let checkoutOptions = {
                paymentSessionId: generate_order.payment_session_id,
                redirectTarget: "_blank",
            };
            cashfree.checkout(checkoutOptions).then((result) => {
                if (result.error) {
                  console.log("There is some payment error, Check for Payment Status");
                  console.log(result.error);
                }
                if (result.redirect) {
                  // This will be true when the payment redirection page couldnt be opened in the same window
                  // This is an exceptional case only when the page is opened inside an inAppBrowser
                  // In this case the customer will be redirected to return url once payment is completed
                  console.log("Payment will be redirected");
                }
                if (result.paymentDetails) {
                  // This will be called whenever the payment is completed irrespective of transaction status
                  console.log("Payment has been completed, Check for Payment Status");
                  console.log(result.paymentDetails.paymentMessage);
                }
                //TODO: This just returns the payment status , 
                //      upon status we should update order history and 
                //      clear the cart on a successful payment.
           });
        }catch(err){
            console.log(err);
        }
        setTimeout(()=>{
        },1800);
    }

    return (
        <div className="cart-container">
            <div className="cart-content">
                {
                    <div>

                        <div className="cart-heading">

                            <div className="cart-heading-desc">
                                <h1>
                                    <span title="view menu" className="cart-arrow" onClick={() => {
                                        navigate('/menu');
                                    }}>
                                        &#x2190;
                                    </span>
                                    Your cart {cartItems.length === 0 ? 'is empty' : ''}
                                </h1>
                            </div>

                            <div className="cart-heading-price">
                                price
                            </div>

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
            <div className="cart-footer">
                <button className="cart-footer-button" onClick={handleCheckout}>
                    Proceed to order
                </button>
            </div>
        </div>
    )
}
