import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signupmail.css';
import signupImg from '../images/signup.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import userService from '../services/userService';

export default function SignupMail() {
    const [checked, SetChecked] = useState(false);
    const [email, SetEmail] = useState('');
    const [emailValid, SetEmailValid] = useState(false);
    const [usedEmail, SetUsedEmail] = useState(false);
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
    const [websocket, setWebsocket] = useState(null);
    useEffect(() => {
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, [websocket]);
    const initWebSocket = () => {
        let socket = new WebSocket(`ws://localhost:8080/?emailId=${encodeURIComponent(email)}`);
        socket.onopen = () => {
            console.log('WebSocket connection established from client');
        };
        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data.message);
            socket.send("client received", data.message)
            setMessage(data.message);
            setSuccess(data.success);
            if (data.type === 'verified') {
                await new Promise(resolve => setTimeout(resolve, 2500));
                navigate('/signupacnt', { state: { email: email } });
            }
        }
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        socket.onclose = (event) => {
            console.log('WebSocket connection closed', event.code, event.reason);
        };
        setWebsocket(socket);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        try {
            const response = await userService.checkMail(email);
            setMessage(response.data.message);
            setSuccess(response.data.success);
            await new Promise(resolve => setTimeout(resolve, 2500));
            if (response.data.success) {
                initWebSocket();
            }
            else {
                let emailInput = document.getElementById('email');
                emailInput.innerText = '';
            }
        } catch (error) {
            setMessage(error.response.data.message);
            setSuccess(false);
            setTimeout(() => {
                setClicked(false);
                SetEmailValid(false);
                if(error.response.status==409) SetUsedEmail(true);
            }, 3500)
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
                <form className="signupmail-form" onSubmit={handleSubmit}>
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
                        !emailValid && email.length > 0 && !usedEmail &&
                        <div className="signupmail-email-check-alert">
                            !! Enter a valid Amrita email address
                        </div>
                    }
                    {
                        !emailValid && email.length > 0 && usedEmail &&
                        <div className="signupmail-email-check-alert">
                            !! This Amrita email address is already used
                        </div>
                    }
                    {clicked &&
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
                            style={{ backgroundColor: !emailValid && email.length !== 0 ? '#BF0C4569' : '#bf0c45' }}
                            className='VerifyBtn' >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
