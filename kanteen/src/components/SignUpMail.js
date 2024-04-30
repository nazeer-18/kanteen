import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signupmail.css';
import signupImg from '../images/signup.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import userService from '../services/userService';

export default function SignupMail() {
    const [checked, SetChecked] = useState(false);
    const [email, SetEmail] = useState('');
    const [emailValid, SetEmailValid] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [clicked, setClicked] = useState(false);
    let navigate = useNavigate();
    const validateEmail = (email) => {
        const regex = /@ch\.amrita\.edu$|@ch\.students\.amrita\.edu$/;
        return regex.test(email);
    }
    const handleEmailChange = (e) => {
        const { value } = e.target;
        SetEmail(value);
        SetEmailValid(validateEmail(value.toLowerCase()));
        setClicked(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        try{
            const response = await userService.checkMail(email);
            console.log(response);
            setMessage(response.data.message);
            setSuccess(response.data.success);
            if(response.data.success){
                setTimeout(() => {
                    navigate('/signupacnt')
                }, 2000);
            }else{
                let emailInput = document.getElementById('email');
                emailInput.innerText = '';
            }
        }catch(error){
            console.error(error);
            setMessage(error.response.data.message)
            setSuccess(error.response.data.success);
            setTimeout(()=>{
                setClicked(false);
                SetEmail('');
                SetEmailValid(false);
            },2000) 
            let emailInput = document.getElementById('email');
            emailInput.innerText = '';
        }
    }

    return (
            <div className="signupmail-container">
                <div className="signupmail-image-container">
                    <img
                        src={signupImg}
                        alt="login"
                        width="600px" />
                </div>
                <div className="signupmail-form-container">
                    <div className='signupmail-signup-txt'>SIGNUP</div>
                    <form className="signupmail-form"  onSubmit={handleSubmit}>
                        <div className="signupmail-form-group">
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
                                <FontAwesomeIcon className="validate-icon" icon={faCircleCheck} beat style={{ color: "#139a72", }} />
                            }
                            {
                                !emailValid && email.length > 0 &&
                                <FontAwesomeIcon
                                    className="validate-icon"
                                    icon={faCircleXmark}
                                    shake
                                    onClick={() => SetEmail('')}
                                    style={{ color: "#ba1717", }}
                                />
                            }
                        </div>
                        {
                            !emailValid && email.length > 0 && 
                            <div className="signupmail-email-check-alert">
                                !! Enter a valid Amrita email address
                            </div>
                        }
                        {   clicked &&
                            <div className="signupmail-mail-response">
                                <span
                                    style={{ color: success ? "#139a72" : "#ba1717" }}>
                                    {message}
                                </span>
                            </div>
                        }
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
                        <div className="signupmail-verifyBtn">
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
    )
}
