import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';
import userService from '../services/userService';

export default function Menu() {
    const [items, setItems] = React.useState([]);
    useEffect(() => {
        userService.getMenuItems().then((res) => {
            setItems(res.data.map((item) => {
                return <MenuItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} image={item.image} type={item.type} category={item.category} />
            }))
        })
    })

    return (
        <div>
            <div className="orderpage-nav">
                <div className="orderpage-cart">
                    <FontAwesomeIcon icon={faCartShopping} />
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
            </div>
            <div className="orderpage-floating-menu">

            </div>

            <div className="orderpage-menu-items">
                {items}
            </div>
        </div>
    )
}
