import React from 'react'
import '../styles/signupacnt.css'
import { Link } from 'react-router-dom'

export default function SignUpAcnt() {
    return (
        <div className="signupacnt">
            <div className="signupacnt-signuptxt">Sign up</div>
            <div className="signupForm">

            </div>
            <div className="signupacnt-createAcnt">
                <button type="submit" className='signupacnt-createAcntBtn'>Create Account</button>
            </div>
            <div className="memoryb">
                Already have an account? <Link to="/" className="signupacnt-loginBtn"><span >Login</span></Link>
            </div>
        </div>
    )
}
