import React from 'react';
import '../styles/HomePage.css';
import loginImg from '../images/Login-amico.svg';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className='login-homepage'>
            <div className="login-login-container">
                <div className="login-image-container">
                    <img src={loginImg} alt="login" width="600px" />
                </div>
                <div className="login-login-form">
                    <div className='login-logintxt'>LOGIN</div>
                    <form className="login-form">
                        <div className="login-form-group">
                            <label htmlFor="username"></label>
                            <input type="text" name="username" id="username" placeholder="Enter your username" required/>
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password" placeholder="Enter your password" required/>
                        </div>
                    </form>
                    <div className="login-memory">
                        <div className="login-rememberMe">
                            <input type="checkbox" name="remember" id="remember" />
                            <label className='login-rememberLabel' htmlFor="remember"> Remember me</label>
                        </div>
                        <div className="login-forgotPwd">
                            <Link className='login-forgotpwdtxt' to="forgotpwd">
                                <span >Forgot Password</span>

                            </Link>
                        </div>
                    </div>
                    <div className="login-login">
                        <button type="submit" className='login-loginBtn'>Login</button>
                    </div>
                    <div className="login-signup">
                        Don't have an account? <Link to="/signupmail" className="login-signupBtn"><span >Sign up</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
