import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';

export default function Menu() {
    const cnt = 10;
    const items = [];
    for (let i = 0; i < cnt; i++) {
        items.push(<MenuItem key={i} />);
    }
    return (
        <div>
            <dv className="orderpage-nav">
                <div className="orderpage-cart">
                    <FontAwesomeIcon icon={faCartShopping}  />
                </div>
                <div className="orderpage-search">
                    <input
                        type="text"
                        name=""
                        placeholder='Search any item here..'
                        id="" />
                    <span className="orderpage-search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                </div>
                <div className="orderpage-filter">
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </dv>
            <div className="orderpage-floating-menu">

            </div>

            <div className="orderpage-menu-items">
                {items}
            </div>
        </div>
    )
}
