import React from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
export default function CartItem(props) {
    const { item } = props;
    return (
        <div>
            <div className="cartitem-container">

                <div className="cartitem-image">
                    <img src={item.image} alt="food" style={{ width: "75px", height: "75px" }} />
                </div>

                <div>

                    <div className="cartitem-item-deatils">

                        <div className="cartitem-details cartitem-details1">
                            <div className="cartitem-name">
                                <h3>{item.name}</h3>
                            </div>
                            <div className="cartitem-price">
                                <strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {item.price}</strong>
                            </div>
                        </div>

                        <div className="cartitem-details cartitem-details2">
                            <div className="cartitem-qty">
                                <p>Qty : <strong>{item.quantity}</strong> </p>
                            </div>
                        </div>
                    </div>

                    <div className="cartitem-remove-button">
                        <button>Remove Item</button>
                    </div>

                </div>

            </div>
        </div>
    )
}