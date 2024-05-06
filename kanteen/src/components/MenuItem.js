import React from 'react'
import '../styles/MenuItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import chickenNodles from '../images/foods/bread-omlette.svg';

export default function MenuItem() {
    return (
        <div>
            <div className="menuitem-container">
                <div className="menuitem-image">
                    <img src={chickenNodles} alt="food" style={{ width: "130px", height: "130px" }} />
                </div>

                <div className="menuitem-name">
                    <h3>name</h3>
                </div>

                <div className="menuitem-qty">
                    <p>Qty left</p>
                </div>

                <div className="menuitem-price">
                <FontAwesomeIcon icon={faIndianRupeeSign}/> 45
                </div>

                <div className="menuitem-cart-btn">
                    <button>Add to Cart <FontAwesomeIcon icon={faCartShopping} /> </button>
                </div>

            </div>
        </div>
    )
}
