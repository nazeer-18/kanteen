import React, { useState } from 'react';
import '../styles/HomePage.css';
import loginImg from '../images/Login-amico.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [showPwd, setShowPwd] = useState(false);
    const [checked, SetChecked] = useState(false);
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
                    <form className="login-form">
                        <div className="login-form-group login-first-input">
                            <label
                                htmlFor="username">
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username or mobile number"
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
                                    title={checked?"unMark":"Mark"}
                                    type="checkbox"
                                    name="remember"
                                    checked={checked}
                                    onChange={()=>SetChecked(!checked)}
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
