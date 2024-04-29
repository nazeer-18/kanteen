import React, { useState } from 'react';
import '../styles/Signupacnt.css';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SignUpAcnt() {
    const [showPwd, setShowPwd] = useState(false);
    const [conPwd, setconPwd] = useState(false);
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <form className="signupacnt-signup-form" legend="hel">
                <div className="signupacnt-form-group">
                    <label htmlFor="username"></label>
                    <input type="text" name="username" id="username" placeholder="Enter your username" required />
                </div>
                <div className="signupacnt-form-group">
                    <label htmlFor="mobile"></label>
                    <input type="tel" name="mobile" id="mobile" placeholder="Enter your mobile number" required />
                </div>
                <div className="signupacnt-form-group">
                    <label htmlFor="pwd"></label>
                    <div className='signupact-pwd-group'>
                    <input
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
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
                    <label htmFor="cpwd"></label>
                    <div className='signupact-pwd-group'>
                    <input
                                    type={conPwd ? "text" : "password"}
                                    name="cpwd"
                                    id="cpwd"
                                    placeholder="Confirm your password"
                                    required />
                                <span
                                    className="eyedisplay"
                                    onClick={() => setconPwd((prev) => !prev)}>
                                    {conPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                    </div>
                </div>
                <div className="signupacnt-form-group signupacnt-food-preference">
                    <span className='signupacnt-preference-txt'>Select your food preference</span> <br />
                    <div className="signupacnt-food-choice">
                        <div className="signupacnt-food-item">
                            <input type="radio" name="food" id="food" value="veg" />
                            <label htmlFor='food'>Veg</label>
                        </div>
                        <div className="signupacnt-food-item">
                            <input type="radio" name="food" id="food" value="nonveg" />
                            <label htmlFor="food">Non Veg</label>
                        </div>
                        <div className="signupacnt-food-item">
                            <input type="radio" name="food" id="food" value="any" />
                            <label htmlFor="food">Any</label>
                        </div>
                    </div>
                </div>
                <div className="signupacnt-createAcnt">
                    <button type="submit" className='signupacnt-createAcntBtn'>Create Account</button>
                </div>
            </form>
            <div className="memoryb">
                Already have an account? <Link to="/" className="signupacnt-loginBtn"><span >Login</span></Link>
            </div>
        </div>
    )
}
