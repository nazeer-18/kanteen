import React , { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import userService from '../services/userService';
import '../styles/Checkout.css';

export default function Checkout({route,navigate}) {
    const location = useLocation();
    const [upiStr, setUpiStr] = useState('')
    const session_id= location.state.session_id;
    const [selectedOption, setSelectedOption] = useState('upi');
    
    const handleSubmit = async (e) => {
        e.preventDefault();        
        console.log("sid",session_id);
        console.log("ustr",upiStr);

        const getPayment = await userService.getPayment(session_id,upiStr);
        console.log(getPayment);
        window.open(getPayment, '_blank', 'noopener,noreferrer');
        //TODO: redirect user after payment
    }

    const handleUpiIdChange = (e) => {
        const { value } = e.target;
        setUpiStr(value);
    }

    const renderContent = () => {
        switch (selectedOption) {
            case 'upi':
                return (
                    <div className="payment-collect-box">
                        <h2>UPI Payment</h2>
                        <input
                                type="text"
                                name="upi-id"
                                id="upi-id"
                                className="upi-input-field"
                                value={upiStr}
                                onChange={handleUpiIdChange}
                                placeholder="Enter UPI ID"
                                required />
                        <button 
                            className="checkout-proceed-button"
                            onClick={handleSubmit}>
                            Proceed
                        </button>
                    </div>
                );
            case 'upiqr':
                return (
                    <div className="payment-collect-box">
                        <h2>UPI QR Code</h2>
                        <img src="path_to_qr_code_image" alt="QR Code" className="payment-qr-code" />
                        <button className="checkout-proceed-button">Proceed</button>
                    </div>
                );
            case 'cash':
                return (
                    <div className="payment-collect-box">
                        <h2>Cash Payment</h2>
                        <p>Please pay cash on delivery.</p>
                        <button className="checkout-proceed-button">Proceed</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return(
        <div>           
            <div className="checkout-container">
            <div className="payment-options-container">
                <button 
                    onClick={() => setSelectedOption('upi')} 
                    className="payment-option-button"
                    style={{backgroundColor: selectedOption==="upi"?"#6E0A28":""}}>
                    UPI
                </button>
                <button 
                    onClick={() => setSelectedOption('upiqr')} 
                    className="payment-option-button"
                    style={{backgroundColor: selectedOption==="upiqr"?"#6E0A28":"",
                    }}>
                    UPI QR
                </button>
                <button 
                    onClick={() => setSelectedOption('cash')}
                    className="payment-option-button"
                    style={{backgroundColor: selectedOption==="cash"?"#6E0A28":""}}>
                    Cash
                </button>
            </div>
            <div className="payment-collect-container">
                {renderContent()}
            </div>
        </div>
        </div>
    )
}
