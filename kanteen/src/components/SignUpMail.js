import React from 'react';
import '../styles/Signupmail.css';
import signupImg from '../images/signup.svg';
import 'reactjs-popup/dist/index.css';

export default function SignupMail() {
    // const [email, setEmail] = useState('');
    // const [isChecked, setIsChecked] = useState(false);
    // const [error, setError] = useState('');
    // const [showPopup, setShowPopup] = useState(false);

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     if (name === 'email') {
    //         setEmail(value);
    //         setError('');
    //     }
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (!isChecked) {
    //         setError('Please agree to the terms and conditions.');
    //         return;
    //     }
    //     setShowPopup(true); // Open the pop-up
    // };

    return (
        <div className='signupmail'>
            <div className="signup-container">
                <div className="image-container">
                    <img src={signupImg} alt="login" width="600px" />
                </div>
                <div className="signup-form">
                    <div className='signup'>SIGNUP</div>
                    <form className="signup-form">
                        <div className="signup-form-group">
                            <label htmlFor="email"></label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address"  />
                        </div>
                        <label>
                            <input
                                type="checkbox"/>
                            {' '} I agree to the <span style={{ color: 'magenta' }}>Terms and conditions</span> and <span style={{ color: 'magenta' }}>Privacy Policy.</span>
                        </label>
                        
                        <button type="submit" className='VerifyBtn' >Verify</button>
                        {/* <Popup open={showPopup} onClose={() => setShowPopup(false)} modal className="pop">
                            <div className='popupcode'>
                                <div className='codesent'>Enter the Verification Code sent to your mail</div>
                                <input type="text" name="email" id="email" placeholder="Enter your verification code sent to your mail"  />
                                

                                <button type="submit" className='VerifyBtn' >Verify</button>
                            </div>
                        </Popup> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
