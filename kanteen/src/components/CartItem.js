import React, { useState, useEffect, useRef } from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext'; 
import itemService from '../services/itemService';

export default function CartItem(props) {
    const dropdownRef = useRef(null);
    const outerRef = useRef(null);
    const { item, quantity } = props;
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [updatingItem, setUpdatingItem] = useState(false);
    const [qty, setQty] = useState(quantity);
    const { user } = useUser();
    const userId = user.emailId;

    const removeItem = async () => {
        setUpdatingItem(true);
        try {
            const res = await itemService.removeFromCart(userId, item._id);
            console.log(res.data);
        } catch (err) {
            console.error('Error removing item', err);
        }
        setUpdatingItem(false);
    };

    const updateQty = async (q) => {
        const new_qty = q === 'undefined' ? qty : q;
        if (new_qty === quantity) {
            return;
        }
        setUpdatingItem(true);
        if (new_qty === 0) {
            removeItem();
            return;
        }
        try {
            const res = await itemService.updateQty(userId, item._id, new_qty);
            if (res.data.success) {
                setQty(new_qty);
            } else {
                setQty(quantity);
            }
        } catch (err) {
            console.error('Error updating quantity', err);
        }
        setDisplayUpdate(false);
        setShowDropdown(false);
        setUpdatingItem(false);
    };

    useEffect(() => {
        if (quantity > 9) {
            if (qty.toString() === quantity.toString()) {
                setDisplayUpdate(false);
            } else {
                setDisplayUpdate(true);
            }
        } else {
            setDisplayUpdate(false);
        }
    }, [qty, quantity]);

    useEffect(() => {
        if (!displayUpdate) {
            if (qty < 10) {
                setDisplayDropdown(true);
            } else {
                setDisplayDropdown(false);
            }
        }
    }, [qty, displayUpdate]);

    const listItems = Array.from({ length: 10 }, (_, i) => i);
    const handleDropSelect = (quantity) => {
        if (quantity === 0) {
            removeItem();
        } else {
            updateQty(quantity);
        }
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target) && outerRef.current && !outerRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    }

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    })

    return (
        <div>
            <div className={updatingItem ? "updating-cart" : ""} >
                <div className="cartitem-container">
                    <div className="cartitem-image">
                        <img src={item.image} alt="food" style={{ width: "100px", height: "100px" }} />
                    </div>
                    <div className="cartitem-details">
                        <div className="cartitem-details-left">
                            <div className="cartitem-name">
                                <h3>{item.name}</h3>
                            </div>
                            <div ref={outerRef} className="cartitem-membership">
                                <span className="cartitem-quantity">
                                    <p>
                                        {displayDropdown ? (
                                            <div
                                                className="qty-drop-down-container"
                                                onClick={() => { setShowDropdown(!showDropdown) }}
                                            >
                                                <span className="qty-label">
                                                    Qty: {qty}
                                                </span>
                                                <span className="qty-drop-down">
                                                    <FontAwesomeIcon icon={faChevronDown} />
                                                    {showDropdown && (
                                                        <div
                                                            onClick={() => { setShowDropdown(true) }}
                                                            className="drop-down-qty-list"
                                                        >
                                                            <ul ref={dropdownRef}>
                                                                {listItems.map((quantity) => (
                                                                    <li
                                                                        key={quantity}
                                                                        onClick={() => handleDropSelect(quantity)}
                                                                    >
                                                                        {quantity === 0 ? '0(Delete)' : quantity}
                                                                    </li>
                                                                ))}
                                                                <hr />
                                                                <li onClick={() => handleDropSelect(10)}>10+</li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="cartitem-input-qty">
                                                <input
                                                    type="number"
                                                    id="cart-qty"
                                                    value={qty}
                                                    onChange={(e) => {
                                                        setQty(parseInt(e.target.value, 10));
                                                        setDisplayUpdate(true);
                                                    }}
                                                />
                                                {displayUpdate && (
                                                    <span className="cartitem-update kanteen-btn-container">
                                                        <button
                                                            className="kanteen-btn"
                                                            onClick={() => { updateQty(qty) }}
                                                        >
                                                            Update
                                                        </button>
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                    </p>
                                </span>
                                <span className="cartitem-remove kanteen-btn-container">
                                    <button
                                        className="kanteen-btn"
                                        onClick={removeItem}
                                    >
                                        Remove
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="cartitem-details-right">
                        <div className="cartitem-price">
                            <strong>
                                <FontAwesomeIcon icon={faIndianRupeeSign} /> {item.price}
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
