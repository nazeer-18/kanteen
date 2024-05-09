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
            const menuItems = res.data.map((item) => (
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
    }, [])

    const searchHandler = (e) => {
        const str = e.target.value.toLowerCase();
        const filteredItems = items.filter((item) => {
            return item.props.name.toLowerCase().startsWith(str)
        })
        setTempItems(filteredItems)
    }
    const toggleCart = () => {
        const ele = document.getElementById("orderpage-cart-display");
        if (ele.style.display === "none") {
            ele.style.display = "block";
        } else {
            ele.style.display = "none";
        }
        console.log("he");
    }
    return (
        <div>
            <div className="orderpage-nav">
                <div className="orderpage-cart" onClick={toggleCart}>
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
                <div className="orderpage-cart-display" id="orderpage-cart-display">
                    <h2 style={{textAlign:"center", backgroundColor:"#bf0c45", color:"white"}}>Your Cart</h2>
                    <div className="orderpage-cart-content">

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, cum commodi magni molestiae dolor provident atque vel ad possimus alias. Itaque delectus quod necessitatibus, hic dicta corporis possimus nostrum minima.
                    <hr style={{border:"1px dashed",margin:"5px 0px"}}/>
                    </div>
                    <div className="orderpage-proceed-button-container">
                        <button className="orderpage-proceed-button">Proceed</button>
                    </div>
                </div>
                {tempItems}
            </div>
        </div>
    )
}
