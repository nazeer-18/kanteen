import React, { useState,useEffect } from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext';
import userService from '../services/userService';

export default function CartItem(props) {
    const { item, quantity } = props;
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [qty, setQty] = useState(quantity);
    const { user } = useUser();
    const userId = user.emailId;
    const removeItem = async () => {
        try {
            const res = await userService.removeFromCart(userId, item._id);
        } catch (err) {
            console.error('Error removing item', err);
        }
    }
    const updateQty = async () => {
        try {
            const res = await userService.updateQty(userId, item._id, qty);
            if(res.data.success) {
                setQty(qty);
            }else{
                setQty(quantity);
            }
        } catch (err) {
            console.error('Error updating quantity', err);
        }
        setDisplayUpdate(false);
    }
    useEffect(()=>{
        console.log(qty,quantity)
        if(qty.toString() === quantity.toString()){
            setDisplayUpdate(false);
        }else{
            setDisplayUpdate(true);
        }
    },[qty,quantity])
    return (
        <div>
            <div className="cartitem-container">

                <div className="cartitem-image">
                    <img src={item.image} alt="food" style={{ width: "100px", height: "100px" }} />
                </div>

                <div className="cartitem-details">

                    <div className="cartitem-details-left">

                        <div className="cartitem-name">
                            <h3>{item.name}</h3>
                        </div>

                        <div className="cartitem-membership">

                            <span className="cartitem-quantity">
                                <p>
                                    <strong>
                                        {
                                            qty < 10 && quantity === qty ?
                                                <span> Qty:
                                                    <select name="" id="">
                                                        <option value="0" aria-checked="false" tabIndex={0}>0 (Delete)</option>
                                                        <option value="1" aria-checked="false" tabIndex={0}>1</option>
                                                        <option value="2" aria-checked="false" tabIndex={0}>2</option>
                                                        <option value="3" aria-checked="true" tabIndex={0}>3</option>
                                                        <option value="4" aria-checked="false" tabIndex={0}>4</option>
                                                        <option value="5" aria-checked="false" tabIndex={0}>5</option>
                                                        <option value="6" aria-checked="false" tabIndex={0}>6</option>
                                                        <option value="7" aria-checked="false" tabIndex={0}>7</option>
                                                        <option value="8" aria-checked="false" tabIndex={0}>8</option>
                                                        <option value="9" aria-checked="false" tabIndex={0}>9</option>
                                                    </select>
                                                </span> : <span>
                                                    <input
                                                        type="number"
                                                        id="cart-qty"
                                                        value={qty}
                                                        onChange={(e) => {
                                                            setQty(e.target.value);
                                                            setDisplayUpdate(true);
                                                        }}
                                                    />
                                                    {
                                                        displayUpdate &&
                                                        <span className="cartitem-update kanteen-btn-container">
                                                            <button
                                                                className="kanteen-btn"
                                                                onClick={updateQty}
                                                            >
                                                                Update
                                                            </button>
                                                        </span>
                                                    }
                                                </span>


                                        }
                                    </strong></p>
                            </span>
                            <span className="cartitem-remove kanteen-btn-container">
                                <button
                                    className="kanteen-btn"
                                    onClick={removeItem}
                                >Remove
                                </button>
                            </span>
                        </div>

                    </div>

                </div>

                <div className="cartitem-details-right">

                    <div className="cartitem-price">
                        <strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {item.price}</strong>
                    </div>

                </div>


            </div>

        </div>
    )
}