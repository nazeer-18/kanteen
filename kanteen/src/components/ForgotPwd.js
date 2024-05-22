import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPwd.css';
import forgotImg from '../images/forgotpwd.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext';

export default function ForgotPwd() {
    const { user, setUser } = useUser();
    const [email, SetEmail] = useState('');
    const navigate = useNavigate();
    const [emailValid, SetEmailValid] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const validateEmail = (email) => {
        const regex = /@ch\.amrita\.edu$|@ch\.students\.amrita\.edu$/;
        return regex.test(email);
    }
    const handleEmailChange = (e) => {
        const { value } = e.target;
        SetEmail(value);
        SetEmailValid(validateEmail(value.toLowerCase()));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValid) {
            setMessage("Enter a valid Amrita email address");
            setSuccess(false);
            return;
        }
        try {
            const response = await userService.verifyForgotMail(email);
            setMessage(response.data.message);
            setSuccess(response.data.success);
            const otp = response.data.otp;
            setTimeout(() => {
                setMessage('');
                setUser({
                    ...user,
                    emailId: email.toLowerCase()
                })
                navigate(`/forgotpwdotp`, { state: { email, otp } });
            }, 3500);
        } catch (err) {
            if (!err.response) {
                setMessage("Internal Server Error, Please try again later !");
                setSuccess(false);
                return;
            }
            setMessage(err.response.data.message)
            setSuccess(false);
            setTimeout(() => {
                setMessage('');
            }, 2500);
        }
    }
    return (
        <div className="forgotpwd">
            <div className="forgotpwd-forgot-container">
                <div className="forgotpwd-forgot-group">
                    <div className="forgotpwd-back">
                        <Link
                            className="forgotpwd-back-lnk" exact="true" to="/">
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
                                style={{ outline: "none" }}
                                className={emailValid ? "valid-border" : email.length > 0 ? "invalid-border" : ""}
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
                        {
                            !emailValid && email.length > 0 &&
                            <div className="forgotpwd-email-check-alert">
                                !! Enter a valid Amrita email address
                            </div>
                        }
                        {
                            message.length > 0 &&
                            <div className="forgotpwd-email-check-alert" style={success ? { color: "green" }
                                : { color: "red" }}>
                                {message}
                            </div>
                        }
                        <div className="forgotpwd-btn-container">
                            <button
                                className="forgotpwd-btn"
                                value="submit"
                                onSubmit={handleSubmit}
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="forgotpwd-image-container">
                <img src={forgotImg} alt="forgot" />
            </div>
        </div>
    )
}
