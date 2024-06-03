import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import userService from '../services/userService';

export default function Checkout({ route, navigate }) {
    const location = useLocation();
    const [upiStr, setUpiStr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("sid", location.state.session_id);
        console.log("ustr", upiStr);
        const getPayment = await userService.getPayment(location.state.session_id, upiStr);
        console.log(getPayment);
        // window.open(getPayment, '_blank', 'noopener,noreferrer');
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
