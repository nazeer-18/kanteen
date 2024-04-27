import React from 'react'
import '../styles/ForgotPwd.css';
import forgotImg from '../images/forgot-pwd.svg';
import { Link } from 'react-router-dom';

export default function ForgotPwd() {
    return (
        <div className="forgotpwd">
            <div className="forgotpwd-forgot-container">
                <div className="forgotpwd-forgot-group">

                    <div className="forgotpwd-back">
                        <Link className="forgotpwd-back-lnk" to="/">&lt; &nbsp;Back to login</Link>
                    </div>
                    <div className="forgotpwd-forgot-txt">
                        Forgot your password?
                    </div>
                    <div className="forgotpwd-suggest">
                        Don't worry, happens to all of us. Enter your email below to reset your password.
                    </div>
                    <form action="" className="forgotpwd-email">
                        <div className="forgotpwd-email-group">
                            <label htmlFor="email"></label>
                            <input type="email" name="email" id="email" placeholder="Enter your email " required/>
                        </div>
                    </form>
                    <div className="forgotpwd-btn">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
            <div className="forgotpwd-image-container">
                <img src={forgotImg} alt="forgot" />
            </div>
        </div>
    )
}
