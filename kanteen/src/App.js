import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignUpMail from './components/SignUpMail';
import ForgotPwd from './components/ForgotPwd';
import ForgotPwdOtp from './components/ForgotPwdOtp';
import Verify from './components/Verify';
import ResetPwd from './components/ResetPwd';
import SignUpAcnt from './components/SignUpAcnt';
import HomePage from './components/HomePage';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<LoginPage />}></Route>
                <Route path='/signupmail' element={<SignUpMail />}></Route>
                <Route path='/verify' element={<Verify />}></Route>
                <Route path='/forgotpwd' element={<ForgotPwd />}></Route>
                <Route path='/forgotpwdotp' element={<ForgotPwdOtp />}></Route>
                <Route path='/resetpwd' element={<ResetPwd />}></Route>
                <Route path='/signupacnt' element={<SignUpAcnt />}></Route>
                <Route path='/home' element={<HomePage />}></Route>
            </Routes>
        </BrowserRouter>

    )
}
