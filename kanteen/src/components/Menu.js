import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';
import userService from '../services/userService';

export default function Menu() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isInitiated, setIsInitiated] = useState(false);
    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await userService.getMenuItems();
                setItems(res.data);
                if (!isInitiated) {
                    setFilteredItems(res.data);
                    setIsInitiated(true);
                }
            }
            catch (err) {
                console.error('Error fetching items', err);
            }
        }
        fetchItems();
        const interval = setInterval(() => {
            fetchItems();
        }, 2000);
        return () => clearInterval(interval);
    }, [isInitiated]);

    const searchHandler = (e) => {
        const str = e.target.value.toLowerCase();
        const filtered = items.filter((item) => item.name.toLowerCase().includes(str));
        setFilteredItems(filtered);
    }

    const navigate = useNavigate();
    const viewCart = () => {
        navigate('/cart');
    }

    return (
        <div>
            <div className="orderpage-nav">
                <div className="orderpage-filter" title="apply filters"> <span className="orderpage-cart-nav-label" style={{ "color": "black" }}>FILTERS</span>
                    <FontAwesomeIcon icon={faFilter} />
                </div>
                <div className="orderpage-search">
                    <input
                        type="text"
                        onChange={(e) => { searchHandler(e) }}
                        placeholder='Search any item here..'
                    />
                    <span className="orderpage-search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                </div>
                <div className="orderpage-cart" title="View items in cart" onClick={viewCart}>  <span className="orderpage-cart-nav-label" style={{ "color": "black" }}>CART</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </div>
            <div className="orderpage-floating-menu">
            </div>
            <div className="orderpage-menu-items">
                {
                    displayMessage &&
                    <div className="orderpage-cart-msg">
                        {message}
                    </div>
                }
                {
                    filteredItems.length === 0 ?
                        <h1 style={{ margin: "auto" }}>No items found</h1> : (
                            filteredItems.map((item) => (
                                <MenuItem key={item._id} item={item} setDisplayMessage={setDisplayMessage} setMessage={setMessage} />
                            ))
                        )
                }
            </div>
        </div>
    )
}
