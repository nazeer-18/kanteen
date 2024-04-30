import React, { useState } from 'react';
import '../styles/ForgotPwd.css';
import forgotImg from '../images/forgotpwd.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export default function ForgotPwd() {
    const [checked, SetChecked] = useState(false);
    const [email, SetEmail] = useState('');
    const [emailValid, SetEmailValid] = useState(false);
    const validateEmail = (email) => {
        const regex = /@ch\.amrita\.edu$|@ch\.students\.amrita\.edu$/;
        return regex.test(email);
    }
    const handleEmailChange = (e) => {
        const { value } = e.target;
        SetEmail(value);
        SetEmailValid(validateEmail(value.toLowerCase()));
    }
    return (
        <div className="forgotpwd">
            <div className="forgotpwd-forgot-container">
                <div className="forgotpwd-forgot-group">
                    <div className="forgotpwd-back">
                        <Link
                            className="forgotpwd-back-lnk" to="/">
                            &lt; &nbsp;Back to login
                        </Link>
                    </div>
                    <div className="forgotpwd-forgot-txt">
                        Forgot your password?
                    </div>
                    <div className="forgotpwd-suggest">
                        Don't worry, happens to all of us. Enter your email below to reset your password.
                    </div>
                    <form className="forgotpwd-email" onSubmit={handleSubmit}>
                        <div className="forgotpwd-email-group">
                        <label
                                htmlFor="email">
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleEmailChange}
                                value={email}
                                id="email"
                                style={{outline:"none"}}
                                className={emailValid ? "valid-border" :email.length>0? "invalid-border":""}
                                placeholder="Enter your email address"
                                required />
                            {
                                emailValid &&
                                <FontAwesomeIcon className="validateicon" icon={faCircleCheck} beat style={{ color: "#139a72", }} />
                            }
                            {
                                !emailValid && email.length > 0 &&
                                <FontAwesomeIcon
                                    className="validateicon"
                                    icon={faCircleXmark}
                                    shake
                                    onClick={() => SetEmail('')}
                                    style={{ color: "#ba1717", }}
                                />
                            }
                        </div>
                        <div className="email-check-alert">
                            {!emailValid && email.length > 0 && <span>!! Enter a valid Amrita email address</span>}
                        </div>
                        <div className="forgotpwd-btn-container">
                            <button
                                className="forgotpwd-btn"
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                    <Link
                        to="/forgotpwdotp"
                        className="signupacnt-loginBtn">
                        <span>
                            emailEntered
                        </span>
                    </Link>
                </div>
            </div>
            <div className="forgotpwd-image-container">
                <img src={forgotImg} alt="forgot" />
            </div>
        </div>
    )
}
