import React from 'react'
import '../styles/MenuItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import vegIcon from '../images/veg-icon.png';
import nonVegIcon from '../images/non-veg-icon.png';

export default function MenuItem(props) {
    const {item}  = props;
    const name = item.name;
    const image = item.image;
    const price = item.price;
    const quantity = item.quantity;
    const type = item.type;
    const category = item.category;

    return (
        <div className={`${type} ${category}`}>
            <div className="menuitem-container">
                <div className="menuitem-type">
                    {type==="veg"?<img src={vegIcon} alt="veg"/>:<img src={nonVegIcon} alt="non-veg"/>}
                </div>
                <div className="menuitem-image">
                    <img src={image} alt="food" style={{ width: "120px", height: "120px" }} />
                </div>

                <div className="menuitem-name">
                    <h3>{name}</h3>
                </div>

                <div className="menuitem-qty">
                    <p>Qty left : <strong>{quantity}</strong></p>
                </div>

                <div className="menuitem-price">
                    <FontAwesomeIcon icon={faIndianRupeeSign} /> {price}
                </div>

                <div className="menuitem-cart-btn">
                    <button>
                        Add to Cart 
                        <FontAwesomeIcon icon={faCartShopping} /> 
                    </button>
                </div>

            </div>
        </div>
    )
}
