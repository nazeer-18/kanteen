import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/ResetPwd.css';
import resetImg from '../images/forgotpwd.svg';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import userService from '../services/userService';
import { useUser } from '../contexts/userContext';

export default function ResetPwd() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.emailId === 'na' || user.emailId === undefined || user.emailId === null){
            navigate('/forgotpwd');
        }
    },[navigate,user.emailId])

    const [showPwd, setShowPwd] = useState(false);
    const [showCnfPwd, setShowCnfPwd] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState({
        pwd: '',
        cnfPwd: ''
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
        setData({ ...data, pwd: password })
        setPwdCheck({
            pwdLength: password.length >= 8,
            pwdUppercase: password.match(/[A-Z]/),
            pwdLowercase: password.match(/[a-z]/),
            pwdNumber: password.match(/[0-9]/),
            pwdSpecialChar: password.match(/[^A-Za-z0-9]/)
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setClicked(true);
        if (data.pwd !== data.cnfPwd) {
            setMessage("Passwords do not match");
            setSuccess(false);
            return;
        }
        try {
            const response = await userService.updatePassword(user.emailId, data.pwd);
            setMessage(response.data.message);
            setSuccess(response.data.success);
            setTimeout(() => {
                setMessage('');
                setClicked(false);
                if (response.data.success) {
                    setUser({
                        ...user,
                        password: data.pwd
                    })
                    navigate('/login');
                }
            }, 2500)
        } catch (err) {
            if (!err.response) {
                setMessage("Server is down, Please try again later");
                setSuccess(false);
                return;
            }
            setMessage(err.response.data.message);
            setSuccess(false);

        }
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
                                        style={{
                                            outline: data.pwd.length!==0? pwdValid===false?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45" ,
                                            border: data.pwd.length!==0? pwdValid===false?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45"                            
                                        }}
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
                                        value={data.cnfPwd}
                                        disabled={!pwdValid}
                                        style={{
                                            outline: data.cnfPwd.length!==0? data.pwd!==data.cnfPwd?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45" ,
                                            border: data.cnfPwd.length!==0? data.pwd!==data.cnfPwd?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45"                            
                                        }}
                                        onChange={(e) => setData(
                                            { ...data, cnfPwd: e.target.value },
                                            setMessage('')
                                        )}
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
                                {pwdValid && data.pwd !== data.cnfPwd && data.cnfPwd.length > 0 &&
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
                        {clicked &&
                            <div className="login-response">
                                <span
                                    style={{ color: success ? "#139a72" : "#ba1717" }}>
                                    {message}
                                </span>
                            </div>
                        }
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