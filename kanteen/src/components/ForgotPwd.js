import React,{useState} from 'react'
import '../styles/ForgotPwd.css';
import forgotImg from '../images/forgotpwd.svg';
import { Link } from 'react-router-dom';

export default function ForgotPwd() {
    
    const [data,setData] = useState({
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange = {(e) => setData({email: e.target.value})}
                                value={data.email}
                                placeholder="Enter your email "
                                required />
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
