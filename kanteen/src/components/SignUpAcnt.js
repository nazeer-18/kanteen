import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signupacnt.css';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import userService from '../services/userService';

export default function SignUpAcnt(props) {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const emailIdValid = !(user.emailId === 'na' || user.emailId === null || user.emailId === undefined);
    useEffect(() => {
        if (!emailIdValid)
            navigate('/signupmail');
    }, [])
    const [emailDisabled, setEmailDisabled] = useState('');
    const [mobileValid, setMobileValid] = useState(false);
    const [validUserName, setValidUserName] = useState(1);
    const [showPwd, setShowPwd] = useState(false);
    const [cnfPwd, setCnfPwd] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [validAll, setValidAll] = useState('');
    const [pwdCheck, setPwdCheck] = useState({
        pwdLength: false,
        pwdUppercase: false,
        pwdLowercase: false,
        pwdNumber: false,
        pwdSpecialChar: false
    });
    const [data, setData] = useState({
        usrname: '',
        mobile: '',
        pwd: '',
        cnfPwd: ''
    })
    useEffect(() => {
        if (pwdCheck.pwdLength && pwdCheck.pwdUppercase && pwdCheck.pwdLowercase && pwdCheck.pwdNumber && pwdCheck.pwdSpecialChar) {
            setPwdValid(true);
        } else {
            setPwdValid(false);
        }
    }, [pwdCheck])
    useEffect(() => {
        if (mobileValid && pwdValid && data.pwd === data.cnfPwd && emailIdValid) {
            setAllValid(true);
        } else {
            setAllValid(false);
        }
    }, [mobileValid, data.cnfPwd, data.pwd, pwdValid, emailIdValid])

    let Navigate = useNavigate();
    const handleEmailClick = async (e) => {
        setEmailDisabled(`You can't change your email id once registered.Signup with a new email id.`);
        setTimeout(() => {
            setEmailDisabled('');
        }, 2500)
    }
    const handleMobileChange = (mobile) => {
        setMobileValid(mobile.match(/^\d{10}$/));
    }
    const handlePasswordChange = (password) => {
        setPwdCheck({
            pwdLength: password.length >= 8,
            pwdUppercase: password.match(/[A-Z]/),
            pwdLowercase: password.match(/[a-z]/),
            pwdNumber: password.match(/[0-9]/),
            pwdSpecialChar: password.match(/[^A-Za-z0-9]/)
        })
    }
    const handleUserName = (e) => {
        const { value } = e.target;
        const regex = /^[A-Za-z0-9@_]+$/;
        const len = value.length;
        if (regex.test(value) && len > 2) {

            setValidUserName(1);
        }
        else if (!regex.test(value) && len > 2)
            setValidUserName(2);
        else if (len < 3)
            setValidUserName(0);
        setData({ ...data, usrname: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!allValid) {
            setValidAll('Please fill all the fields correctly');
            setTimeout(() => {
                setValidAll('');
            }, 3000);
            return;
        }
        if (allValid) {
            user.password = data.pwd;
            user.mobileNumber = data.mobile;
            user.name = data.usrname;
            try {
                const response = await userService.register(user.emailId, data.usrname, data.mobile, data.pwd);
                if (response.status === 201) {
                    setValidAll('Account Created Successfully');
                    setUser({
                        emailId: user.emailId,
                        name: data.usrname,
                        mobileNumber: data.mobile,
                        password: data.pwd
                    })
                    setTimeout(() => {
                        Navigate('/');
                    }, 2500);
                } else {
                    if (response.message) {
                        setValidAll(response.message);
                        setTimeout(() => {
                            setValidAll('');
                        }, 3000);
                    }
                }
            } catch (err) {
                setValidAll('Internal Server Error');
                setTimeout(() => {
                    setValidAll('');
                }, 3000);
            }
        }
    }
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <form className="signupacnt-signup-form" onSubmit={handleSubmit}>

                <div className="signupacnt-form-group" onClick={handleEmailClick}>
                    <label
                        htmlFor="userEmail">
                    </label>
                    <input
                        type="text"
                        name="userEmail"
                        id="userEmail"
                        value={user.emailId}
                        disabled
                        required />
                </div>
                {
                    <div className="signupanct-hidden-texts">
                        <div className="signupacnt-check-text">
                            {emailDisabled}
                        </div>
                    </div>
                }
                <div className="signupacnt-form-group">
                    <label
                        htmlFor="username">
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        value={data.usrname}
                        onChange={handleUserName}
                        required />
                    {
                        validUserName === 0 &&
                        <div className="signupanct-hidden-texts">
                            <div className="signupacnt-check-text">
                                <span style={{ color: "red" }} >✖ </span> Username should contain atleast 3 Characters
                            </div>
                        </div>
                    }{
                        validUserName === 2 &&
                        <div className="signupanct-hidden-texts">
                            <div className="signupacnt-check-text">
                                <span style={{ color: "red" }} >✖ </span>  Only aplhabets, numbers, _ , @ are allowed
                            </div>
                        </div>
                    }
                </div>
                <div className="signupacnt-form-group">
                    <label
                        htmlFor="mobile">
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        placeholder={`Enter your mobile number`}
                        value={data.mobile}
                        onChange={
                            (e) => {
                                setData({ ...data, mobile: e.target.value });
                                handleMobileChange(e.target.value)
                            }
                        }
                        required />
                </div>

                {data.mobile.length > 0 && !mobileValid &&
                    <div className="signupanct-hidden-texts">
                        <div className="signupacnt-check-text">
                            <span style={{ color: "red" }} >✖ </span> Enter a valid mobile number
                        </div>
                    </div>
                }

                <div className="signupacnt-form-group">
                    <label
                        htmlFor="pwd">
                    </label>
                    <div className='signupact-pwd-group'>
                        <input
                            type={showPwd ? "text" : "password"}
                            name="password"
                            id="password"
                            style={{
                                outline: data.pwd.length!=0? pwdValid===false?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45" ,
                                border: data.pwd.length!=0? pwdValid===false?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45"                            
                            }}
                            placeholder="Enter your password"
                            value={data.pwd}
                            onChange={(e) => {
                                setData({ ...data, pwd: e.target.value });
                                handlePasswordChange(e.target.value)
                            }
                            }
                            required />
                        <span
                            className="eyedisplay"
                            onClick={() => setShowPwd((prev) => !prev)}>
                            {showPwd
                                ? (<FaRegEyeSlash title="hide" />)
                                : (<FaEye title="show" />)
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

                <div className="signupacnt-form-group">
                    <label
                        htmlFor="cpwd">
                    </label>
                    <div className='signupact-pwd-group'>
                        <input
                            type={cnfPwd ? "text" : "password"}
                            name="cpwd"
                            id="cpwd"
                            placeholder="Confirm your password"
                            value={data.cnfPwd}
                            disabled={!pwdValid}
                            style={{
                                outline: data.cnfPwd.length!=0? data.pwd!==data.cnfPwd?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45" ,
                                border: data.cnfPwd.length!=0? data.pwd!==data.cnfPwd?"2px solid red":"2px solid #0cbf60": "1px solid #bf0c45"                            
                            }}
                            onChange={(e) => setData({ ...data, cnfPwd: e.target.value })}
                            required />
                        <span
                            className="eyedisplay"
                            onClick={() => setCnfPwd((prev) => !prev)}>
                            {cnfPwd
                                ? (<FaRegEyeSlash title="hide" />)
                                : (<FaEye title="show" />)
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


                <div className="signupacnt-createAcnt">
                    <button
                        type="submit"
                        value="submit"
                        onSubmit={handleSubmit}
                        className='signupacnt-createAcntBtn'>
                        Create Account
                    </button>
                </div>
                <div className="signupanct-hidden-texts Error-message">
                    {validAll}
                </div>

            </form>
            <div className="memoryb">
                Already have an account ?
                <Link
                    exact="true" to="/"
                    className="signupacnt-loginBtn">
                    <span style={{ margin: "2px", }}>
                        Login
                    </span>
                </Link>
            </div>
        </div>
    )
}
