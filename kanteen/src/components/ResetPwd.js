import React, { useState } from 'react'
import '../styles/ResetPwd.css';
import resetImg from '../images/ResetPwd.svg';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function ResetPwd() {
    const [showPwd, setShowPwd] = useState(false);
    const [showCnfPwd, setShowCnfPwd] = useState(false);
    return (
        <div className='reset-pwd-homepage'>
            <div className="reset-pwd-container">
                <div className="reset-pwd-form-container">

                    <div className="reset-pwd-form">
                        <div 
                            className='reset-pwdvertxt'>
                            Set new password
                        </div>
                        <p 
                            className='reset-pwdauthtxt'>
                            Please set a new password for your account.
                        </p>
                        <form className="reset-pwd-form">
                            <div className="reset-pwd-form-group">
                                <label
                                    htmlFor="newPassword">
                                </label>
                                <div className="reset-pwd-group">
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        name="reset-pwd" id="reset-pwd"
                                        placeholder="Enter new password"
                                        required />
                                    <span
                                        className="reset-pwd-eye"
                                        onClick={() => setShowPwd((prev) => !prev)}>
                                        {showPwd
                                            ? (<FaRegEyeSlash title='hide' />)
                                            : (<FaEye title='show' />)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="reset-pwd-form-group">
                                <label
                                    htmlFor="cnfPassword">
                                </label>
                                <div className="reset-pwd-group">
                                    <input
                                        type={showCnfPwd ? "text" : "password"}
                                        name="reset-pwd"
                                        id="cnf-reset-pwd"
                                        placeholder="Re-enter password"
                                        required />
                                    <span
                                        className="reset-pwd-eye"
                                        onClick={() => setShowCnfPwd((prev) => !prev)}>
                                        {showCnfPwd
                                            ? (<FaRegEyeSlash title='hide' />)
                                            : (<FaEye title='show' />)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="reset-pwd">
                                <button
                                    type="submit"
                                    className='reset-pwdBtn'>
                                    Set new password
                                </button>
                                <Link
                                    to="/" >
                                    <span >
                                        On success , get back to login
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="reset-pwd-image-container">
                    <img 
                        src={resetImg} 
                        alt="otp" 
                        width="600px" />
                </div>
            </div>
        </div>
    )
}