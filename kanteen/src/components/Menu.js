import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';
import userService from '../services/userService';

export default function Menu() {
    const [items, setItems] = useState([]);
    const [tempItems, setTempItems] = useState([]);
    useEffect(() => {
        userService.getMenuItems().then((res) => {
            const menuItems = res.data.map((item)=>(
                <MenuItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    type={item.type}
                    category={item.category}
                />
        ));
            setItems(menuItems);
            setTempItems(menuItems);
        })
    },[])

    const searchHandler = (e) => {
        const str = e.target.value.toLowerCase();
        const filteredItems = items.filter((item) => {
            return item.props.name.toLowerCase().startsWith(str)
        })
        console.log(filteredItems)
        setTempItems(filteredItems)
    }

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
                        onChange={(e) => { searchHandler(e) }}
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
                {tempItems}
            </div>
        </div>
    )
}
