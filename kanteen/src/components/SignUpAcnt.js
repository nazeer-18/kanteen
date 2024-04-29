import React, { useState } from 'react';
import '../styles/Signupacnt.css';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SignUpAcnt() {
    const [showPwd, setShowPwd] = useState(false);
    const [cnfPwd, setCnfPwd] = useState(false);
    const [data, setData] = useState({
        usrname: '',
        mobile: '',
        pwd: '',
        cnfPwd: '',
        food: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <form className="signupacnt-signup-form" onSubmit={handleSubmit}>
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
                        onChange={(e) => setData({ ...data, usrname: e.target.value })}
                        required />
                </div>
                <div className="signupacnt-form-group">
                    <label
                        htmlFor="mobile">
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        value={data.mobile}
                        onChange={(e) => setData({ ...data, mobile: e.target.value })}
                        required />
                    {/* need to put a div here and display whether this number is available or not */}
                </div>
                <div className="signupacnt-form-group">
                    <label
                        htmlFor="pwd">
                    </label>
                    <div className='signupact-pwd-group'>
                        <input
                            type={showPwd ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={data.pwd}
                            onChange={(e) => setData({ ...data, pwd: e.target.value })}
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
                <div className="signupacnt-form-group signupacnt-food-preference">
                    <span
                        className='signupacnt-preference-txt'>
                        Select your food preference
                    </span>
                    <br />

                    <div className="signupacnt-food-choice">
                        <div className="signupacnt-food-item">
                            <input
                                type="radio"
                                name="food"
                                id="veg"
                                required
                                onChange={(e) => setData({ ...data, food: e.target.value })}
                                value="veg" />
                            <label
                                htmlFor='food'>
                                Veg
                            </label>
                        </div>
                        <div className="signupacnt-food-item">
                            <input
                                type="radio"
                                name="food"
                                id="nonveg"
                                required
                                onChange={(e) => setData({ ...data, food: e.target.value })}
                                value="nonveg" />
                            <label
                                htmlFor="food">
                                Non Veg
                            </label>
                        </div>
                        <div className="signupacnt-food-item">
                            <input
                                type="radio"
                                name="food"
                                id="any"
                                required
                                onChange={(e) => setData({ ...data, food: e.target.value })}
                                value="any" />
                            <label
                                htmlFor="food">
                                Any
                            </label>
                        </div>
                    </div>
                </div>
                <div className="signupacnt-createAcnt">
                    <button
                        type="submit"
                        className='signupacnt-createAcntBtn'>
                        Create Account
                    </button>
                </div>
            </form>
            <div className="memoryb">
                Already have an account ?
                <Link
                    to="/"
                    className="signupacnt-loginBtn">
                    <span style={{ margin: "2px", }}>
                        Login
                    </span>
                </Link>
            </div>
        </div>
    )
}
