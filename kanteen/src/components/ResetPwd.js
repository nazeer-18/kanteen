import React from 'react'
import '../styles/ResetPwd.css';
import resetImg from '../images/ResetPwd.svg';
import { Link } from 'react-router-dom';

export default function ResetPwd() {
    return (
        <div className='reset-pwd-homepage'>
            <div className="reset-pwd-container">
                <div className="reset-pwd-form-container">
                
                <div className="reset-pwd-form">
                    <div className='reset-pwdvertxt'>Set new password</div>
                    <p className='reset-pwdauthtxt'>Your previous password has been reseted. Please set a new password for your account..</p>
                    <form className="reset-pwd-form">
                        <div className="reset-pwd-form-group">
                            <label htmlFor="newPassword"></label>
                            <input type="password" name="reset-pwd" id="reset-pwd" placeholder="Enter new password" required/>
                        </div>
                        <div className="reset-pwd-form-group">
                            <label htmlFor="cnfPassword"></label>
                            <input type="password" name="reset-pwd" id="reset-pwd" placeholder="Re-enter password" required/>
                        </div>
                    </form>
                    <div className="reset-pwd">
                        <button type="submit" className='reset-pwdBtn'>Set new password</button>
                        <Link to="/" ><span >On success , get back to login</span></Link>                       
                    </div>
                </div>
                </div>
                <div className="reset-pwd-image-container">
                    <img src={resetImg} alt="otp" width="600px" />
                </div>
            </div>
        </div>
    )
}