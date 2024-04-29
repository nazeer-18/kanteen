import React, { useState } from 'react';
import '../styles/LoginPage.css';
import loginImg from '../images/Login-amico.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [showPwd, setShowPwd] = useState(false);
    const [checked, SetChecked] = useState(false);
    const [data, setData] = useState({
        userName: '',
        pwd: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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
                                placeholder="Enter your username or mobile number"
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                value={data.userName}
                                required />
                        </div>
                        <div className="login-form-group">
                            <label
                                htmlFor="password">
                            </label>
                            <div className='login-pwd-group'>
                                <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
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
                                    to="forgotpwd">
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
                            <Link to="/signupmail"
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
