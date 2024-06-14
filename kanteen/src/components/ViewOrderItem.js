import React, { useState, useEffect, useRef } from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext'; 
import itemService from '../services/itemService';

export default function CartItem(props) {
    const { item, quantity } = props;
    const [name,setName] = useState('');
    const [price,setPrice] = useState('0');
    const [imageUrl,setImageUrl] = useState('');
    const [qty, setQty] = useState(quantity);

    useEffect(()=>{
        const fetchItemData = async () => {
            const data=await itemService.fetchItemData(item);
            console.log(data);
            const {name,price,image}=data.data;
            setName(name);
            setPrice(price);
            setImageUrl(image);
            setQty(quantity);
        }
        fetchItemData();
    },[])
    console.log(item.name);
    return (
        <div>
            <div className="order-item-data">
                <div className="order-item-image">
                <img src={imageUrl} alt="food" style={{ width: "100px", height: "100px" }} />
                </div>
                <div className="order-item-details">
                    <h3>{name}</h3>
                    <p>Price: <FontAwesomeIcon icon={faIndianRupeeSign} />{price}</p>
                    <p>Quantity: {qty}</p>
                </div>
            </div>
        </div>
    );
}
