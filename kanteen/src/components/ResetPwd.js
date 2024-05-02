import React, { useState } from 'react'
import { useEffect } from 'react';
import '../styles/ResetPwd.css';
import resetImg from '../images/forgotpwd.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function ResetPwd() {
    const [showPwd, setShowPwd] = useState(false);
    const [showCnfPwd, setShowCnfPwd] = useState(false);
    const [data, setData] = useState({
        pwd: '',
        cnfpwd: ''
    })
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdCheck, setPwdCheck] = useState({
        pwdLength: false,
        pwdUppercase: false,
        pwdLowercase: false,
        pwdNumber: false,
        pwdSpecialChar: false
    });
    useEffect(() => {
        if (pwdCheck.pwdLength && pwdCheck.pwdUppercase && pwdCheck.pwdLowercase && pwdCheck.pwdNumber && pwdCheck.pwdSpecialChar) {
            setPwdValid(true);
        } else {
            setPwdValid(false);
        }
    }, [pwdCheck])
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setData({...data,pwd:password})
        setPwdCheck({
            pwdLength: password.length >= 8,
            pwdUppercase: password.match(/[A-Z]/),
            pwdLowercase: password.match(/[a-z]/),
            pwdNumber: password.match(/[0-9]/),
            pwdSpecialChar: password.match(/[^A-Za-z0-9]/)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }
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
                        <form className="reset-pwd-form" onSubmit={handleSubmit}>
                            <div className="reset-pwd-form-group">
                                <label
                                    htmlFor="newPassword">
                                </label>
                                <div className="reset-pwd-group">
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        name="reset-pwd" id="reset-pwd"
                                        value={data.pwd}
                                        onChange={handlePasswordChange}
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
                            {data.pwd.length > 0 && !pwdValid &&
                                <div className="signupanct-hidden-texts signupacnt-pwd-check">
                                    <div className="signupacnt-check-text">
                                        Password must contain atleast:
                                    </div>
                                    <div className="signupacnt-pwd-check-list">
                                        <ul>
                                            {
                                                !pwdCheck.pwdLength && !pwdCheck.pwdLength &&
                                                <li>
                                                    <span style={{ color: "red" }} >✖ </span>
                                                    <span>8 characters</span>
                                                </li>
                                            }
                                            {
                                                !pwdCheck.pwdUppercase && !pwdCheck.pwdUppercase &&
                                                <li>
                                                    <span style={{ color: "red" }} >✖ </span>
                                                    <span>1 uppercase letter</span>
                                                </li>
                                            }
                                            {
                                                !pwdCheck.pwdLowercase && !pwdCheck.pwdLowercase &&
                                                <li>
                                                    <span style={{ color: "red" }} >✖ </span>
                                                    <span>1 lowercase letter</span>
                                                </li>
                                            }
                                            {
                                                !pwdCheck.pwdNumber && !pwdCheck.pwdNumber &&
                                                <li>
                                                    <span style={{ color: "red" }} >✖ </span>
                                                    <span>1 number</span>
                                                </li>
                                            }{
                                                !pwdCheck.pwdSpecialChar && !pwdCheck.pwdSpecialChar &&
                                                <li>
                                                    <span style={{ color: "red" }} >✖ </span>
                                                    <span>1 special character</span>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            }
                            <div className="reset-pwd-form-group">
                                <label
                                    htmlFor="cnfPassword">
                                </label>
                                <div className="reset-pwd-group">
                                    <input
                                        type={showCnfPwd ? "text" : "password"}
                                        name="reset-pwd"
                                        id="cnf-reset-pwd"
                                        value={data.cnfpwd}
                                        disabled={!pwdValid}
                                        onChange={(e) => setData({ ...data, cnfpwd: e.target.value })}
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
                            <div className="signupanct-hidden-texts">
                    {pwdValid && data.pwd !== data.cnfpwd && data.cnfpwd.length > 0 &&
                        <div className="signupacnt-check-text">
                            <span style={{ color: "red" }} >✖ </span> Passwords do not match
                        </div>
                    }
                </div>
                            <div className="reset-pwd">
                                <button
                                    type="submit"
                                    className='reset-pwdBtn'>
                                    Set new password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="reset-pwd-image-container">
                    <img
                        src={resetImg}
                        alt="otp" />
                </div>
            </div>
        </div>
    )
}