import React,{useState} from 'react'
import '../styles/ForgotOtp.css';
import forgotImg from '../images/forgot-pwd.svg';
import { Link } from 'react-router-dom';

export default function ForgotPwd() {
    const [data,setData] = useState({
        otp:''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className='forgot-otp-homepage'>
            <div className="forgot-otp-container">
                <div className="forgot-otp-form-container">
                    <div className="forgot-otp-back-container">
                        <Link
                            to="/forgotpwd"
                            className="forgot-otp-backBtn">
                            <span>
                                &lt;
                            </span>
                            Back
                        </Link>
                    </div>
                    <div className="forgot-otp-form">
                        <div className='forgot-otpvertxt'>Verify OTP</div>
                        <p
                            className='forgot-otpauthtxt'>
                            An authentication code has been sent to your email.
                        </p>
                        <form className="forgot-otp-form" onSubmit={handleSubmit}   >
                            <div className="forgot-otp-form-group">
                                <label
                                    htmlFor="username">

                                </label>
                                <input
                                    type="password"
                                    name="forgot-otp"
                                    id="forgot-otp"
                                    value= {data.otp}
                                    onChange ={(e)=>setData({otp:e.target.value})}
                                    placeholder="Enter your otp"
                                    required />
                            </div>
                            <p
                                className='forgot-otprestxt'>
                                Didn't receive a code(check Junk box)?
                                <button
                                    type="submit" >
                                    Resend.
                                </button>
                            </p>
                            <div className="forgot-otp">
                                <button
                                    type="submit"
                                    className='forgot-otpBtn'>
                                    Verify
                                </button>
                                <Link
                                    to="/resetpwd" >
                                    <span >
                                        verified
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="forgot-otp-image-container">
                    <img
                        src={forgotImg}
                        alt="otp"
                        width="600px" />
                </div>
            </div>
        </div>
    )
}
