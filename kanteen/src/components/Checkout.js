import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import userService from '../services/userService';
import '../styles/Checkout.css';

export default function Checkout({ route, navigate }) {
    const location = useLocation();
    const [upiStr, setUpiStr] = useState('')
    const session_id= location.state.session_id;
    const [selectedOption, setSelectedOption] = useState('upi');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("sid", session_id);
        console.log("ustr", upiStr);
      
        const getPayment = await userService.getPayment(session_id, upiStr);
        window.open(getPayment, '_self', 'noopener,noreferrer');
        //TODO: redirect user after payment
    }

    const handleUpiIdChange = (e) => {
        const { value } = e.target;
        setUpiStr(value);
    }

    useEffect(() => {
        console.log(location.state.session_id);
    })
    return (
        // TODO: Add styles and responsiveness to checkout page
        <div>
            <form className="upi-adress-form" onSubmit={handleSubmit}   >
                <div className="upi-field">
                    <label
                        htmlFor="upi">
                    </label>
                    <input
                        type="text"
                        name="upi-id"
                        id="upi-id"
                        value={upiStr}
                        onChange={handleUpiIdChange}
                        placeholder="Enter your upi address"
                        required />
                </div>
                <div className="upi-submit">
                    <button
                        type="submit"
                        className='upi-submit'>
                        send
                    </button>
                </div>
            </form>
        </div>
    )
}
