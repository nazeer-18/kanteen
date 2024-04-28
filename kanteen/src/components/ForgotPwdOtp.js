import React from 'react'
import '../styles/ForgotOtp.css';
import forgotImg from '../images/forgot.svg';
import { Link } from 'react-router-dom';

export default function ForgotPwd() {
    return (
        <div className='forgot-otp-homepage'>
            <div className="forgot-otp-container">
                <div className="forgot-otp-form-container">
                <div className="forgot-otp-back-container">
                    <Link to="/forgotpwd" className="forgot-otp-backBtn"><span>&lt;</span> Back</Link>
                </div>
                <div className="forgot-otp-form">
                    <div className='forgot-otpvertxt'>Verify OTP</div>
                    <p className='forgot-otpauthtxt'>An authentication code has been sent to your email.</p>
                    <form className="forgot-otp-form">
                        <div className="forgot-otp-form-group">
                            <label htmlFor="username"></label>
                            <input type="password" name="forgot-otp" id="forgot-otp" placeholder="Enter your otp" required/>
                        </div>
                    </form>
                    <p className='forgot-otprestxt'>Didn't receive a code(check Junk box)?<button type="submit" >Resend.</button> </p>
                    <div className="forgot-otp">
                        <button type="submit" className='forgot-otpBtn'>Verify</button>
                        <Link to="/resetpwd" ><span >verified</span></Link>                       
                    </div>
                </div>
                </div>
                <div className="forgot-otp-image-container">
                    <img src={forgotImg} alt="otp" width="600px" />
                </div>
            </div>
        </div>
    )
}
