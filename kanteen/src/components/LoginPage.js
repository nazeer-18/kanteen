import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import loginImg from '../images/Login-amico.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext';

export default function LoginPage() {
    const { setUser } = useUser();
    const [showPwd, setShowPwd] = useState(false);
    const [checked, SetChecked] = useState(false);
    const [data, setData] = useState({
        userName: '',
        pwd: ''
    })
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [clicked, setClicked] = useState(false);
    //eslint-disable-next-line
    const [loginValid, setLoginValid] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        try {
            const response = await userService.login(data.userName.toLowerCase(), data.pwd);
            setMessage(response.data.message)
            setSuccess(response.data.success)
            if (response.data.success) {
                setLoginValid(true);
                setUser({
                    emailId: response.data.details.emailId,
                    mobileNumber: response.data.details.mobileNumber,
                    name: response.data.details.name,
                    password: data.pwd
                });
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
            else {
                setLoginValid(false);
            }
        } catch (err) {
            if (!err.response) {
                setMessage("Server Error")
                setTimeout(() => {
                    setMessage('')
                }, 2000);
                setSuccess(false)
                return;
            }
            setMessage(err.response.data.message)
            setSuccess(err.response.data.success)
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }
    };
    return (
        <div className='login-homepage'>
            <div className="login-login-container">
                <div className="login-image-container">
                    <img
                        src={loginImg}
                        alt="login"
                        width="600px" />
                </div>
                <div className="login-login-form">
                    <div className='login-logintxt'>
                        LOGIN
                    </div>
                    <form className="login-form" onSubmit={handleSubmit} >
                        <div className="login-form-group login-first-input">
                            <label
                                htmlFor="username">
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your mobile number or email Id"
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                value={data.userName}
                                required />
                        </div>
                        <div className="login-form-group login-second-input">
                            <label
                                htmlFor="password">
                            </label>
                            <div className='login-pwd-group'>
                                <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="login-second-input"
                                    onChange={(e) => setData({ ...data, pwd: e.target.value })}
                                    value={data.pwd}
                                    required />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowPwd((prev) => !prev)}>
                                    {showPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                            </div>
                        </div>
                        {clicked &&
                            <div className="login-response">
                                <span
                                    style={{ color: success ? "#139a72" : "#ba1717" }}>
                                    {message}
                                </span>
                            </div>
                        }
                        <div className="login-memory">
                            <div className="login-rememberMe">
                                <input
                                    title={checked ? "unMark" : "Mark"}
                                    type="checkbox"
                                    name="remember"
                                    checked={checked}
                                    onChange={() => SetChecked(!checked)}
                                    id="remember" />
                                <label
                                    className='login-rememberLabel'
                                    htmlFor="remember">
                                    Remember me!
                                </label>
                            </div>
                            <div className="login-forgotPwd">
                                <Link
                                    className='login-forgotpwdtxt'
                                    exact="true" to="/forgotpwd">
                                    <span>
                                        Forgot Password ?
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="login-login">
                            <button
                                type="submit"
                                value="submit"
                                className='login-loginBtn'>
                                Login
                            </button>
                        </div>
                        <div className="login-signup">
                            Don't have an account?
                            <Link exact="true" to="/signupmail"
                                className="login-signupBtn">
                                <span >
                                    Sign up
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
