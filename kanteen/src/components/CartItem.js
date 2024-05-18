import React from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext';
import userService from '../services/userService';

export default function CartItem(props) {
    const { item, quantity } = props;
    const { user } = useUser();
    const userId = user.emailId;
    const removeItem = async () => {
        try {
            const res = await userService.removeFromCart(userId, item._id);
        } catch (err) {
            console.error('Error removing item', err);
        }
    }
    return (
        <div>
            <div className="cartitem-container">

                <div className="cartitem-image">
                    <img src={item.image} alt="food" style={{ width: "75px", height: "75px" }} />
                </div>

                <div className="cartitem-details">

                    <div className="cartitem-details-left">

                        <div className="cartitem-name">
                            <h3>{item.name}</h3>
                        </div>

                        <div className="cartitem-membership">

                            <div className="cartitem-quantity">
                                <p>Qty : <strong>{quantity}</strong></p>
                            </div>

                            <div className="cartitem-remove">
                                <button
                                    onClick={removeItem}
                                >Remove
                                </button>
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

        </div>
    )
}