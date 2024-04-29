import React, { useState } from 'react';
import '../styles/Signupmail.css';
import signupImg from '../images/signup.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export default function SignupMail() {
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
        <div className='signupmail'>
            <div className="signup-container">
                <div className="image-container">
                    <img
                        src={signupImg}
                        alt="login"
                        width="600px" />
                </div>
                <div className="signup-form">
                    <div className='signup'>SIGNUP</div>
                    <form className="signup-form">
                        <div className="signup-form-group">
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
                                <FontAwesomeIcon className="validate-icon" icon={faCircleCheck} beat style={{ color: "#139a72", }} />
                            }
                            {
                                !emailValid && email.length > 0 &&
                                <FontAwesomeIcon className="validate-icon" icon={faCircleXmark} shake style={{color: "#ba1717",}} />
                            }
                        </div>
                        <div className="email-check-alert">
                            {!emailValid && email.length > 0 && <span>!! Enter a valid Amrita email address</span>}
                        </div>
                        <div className="signupmail-terms">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => SetChecked(!checked)}
                                    required
                                    title={checked ? "unMark" : "Mark"} />
                                <span>
                                    I agree to the
                                </span>
                                <span className="text-amrita">
                                    Terms and conditions
                                </span>
                                and
                                <span className="text-amrita">
                                    Privacy Policy.
                                </span>
                            </label>
                        </div>
                        <div className="signupMail-verifyBtn">
                            <button
                                type="submit"
                                disabled={!emailValid && email.length !== 0}
                                className='VerifyBtn' >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Link
                to="/signupacnt"
                className='VerifyBtn' >
                <b>
                    signup acnt
                </b>
            </Link>
        </div>
    )
}
