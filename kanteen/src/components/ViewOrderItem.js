import React, { useState, useEffect } from 'react';
import '../styles/CartItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import itemService from '../services/itemService';
import '../styles/ViewOrderItem.css';

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
    return (
        <div className='order-item-body'>
            <div className="order-item-data">
                <div className="order-item-image">
                    <img src={imageUrl} alt="food"/>
                </div>                
                <div className="order-item-details">   
                    <span className="order-item-heading">
                        {name}
                    </span>      
                    <div className="order-item-priceNDqty">
                        <span>Quantity: {qty}</span>
                        <span>|</span>   
                        <span>Price: <FontAwesomeIcon icon={faIndianRupeeSign} />{price}</span>
                    </div>
                </div>
                <div className="order-item-total">
                    <span><FontAwesomeIcon icon={faIndianRupeeSign} /></span>
                    <span>{qty*price}</span>
                </div>
            </div>
        </div>
    );
}
