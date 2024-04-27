import React from 'react';
import '../styles/Signupacnt.css';
import { Link } from 'react-router-dom';

export default function SignUpAcnt() {
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <form className="signupacnt-signup-form">
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
                    <input type="password" name="pwd" id="pwd" placeholder="Enter your password" required />
                </div>
                <div className="signupacnt-form-group">
                    <label htmFor="cpwd"></label>
                    <input type="password" name="cpwd" id="cpwd" placeholder="Confirm your password" required />
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
            </form>
            <div className="signupacnt-createAcnt">
                <button type="submit" className='signupacnt-createAcntBtn'>Create Account</button>
            </div>
            <div className="memoryb">
                Already have an account? <Link to="/" className="signupacnt-loginBtn"><span >Login</span></Link>
            </div>
        </div>
    )
}
