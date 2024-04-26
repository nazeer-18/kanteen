import React from 'react'
import './App.css'
import loginImg from './images/Login-amico.svg'

export default function App() {
  return (
    <div>
      <div className="login-container">
        <div className="image-container">
          <img src={loginImg} alt="login" width="380px"/>
        </div>
        <div className="login-form">
            <div className='login'>LOGIN</div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username"></label>
                <input type="text" name="username" id="username" placeholder="Enter your username"/>
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" placeholder="Enter your password"/>
              </div>
              <button type="submit" className='loginBtn'>Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}
