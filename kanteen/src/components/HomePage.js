import React from 'react'
import '../styles/HomePage.css'
import loginImg from '../images/Login-amico.svg'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className='homepage'>
            <div className="login-container">
                <div className="image-container">
                    <img src={loginImg} alt="login" width="600px" />
                </div>
                <div className="login-form">
                    <div className='logintxt'>LOGIN</div>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <input type="text" name="username" id="username" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password" placeholder="Enter your password" />
                        </div>
                    </form>
                    <div className="memory">
                        <div className="rememberMe">
                            <input type="checkbox" name="remember" id="remember" />
                            <label className='rememberLabel' htmlFor="remember"> Remember me</label>
                        </div>
                        <div className="forgotPwd">
                            <Link className='forgotpwdtxt' to="forgotpwd">
                                <span >Forgot Password</span>
                        
                            </Link>
                        </div>
                    </div>
                    <div className="login">
                        <button type="submit" className='loginBtn'>Login</button>
                    </div>
                    <div className="signup">
                        Don't have an account? <Link to="/signupmail" className="signupBtn"><span >Sign up</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
