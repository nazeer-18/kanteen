import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignUpMail from './components/SignUpMail';
import ForgotPwd from './components/ForgotPwd';
import ForgotPwdOtp from './components/ForgotPwdOtp';
import ResetPwd from './components/ResetPwd';
import SignUpAcnt from './components/SignUpAcnt';
import HomePage from './components/HomePage';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import TermsAndConditions from './components/TermsAndConditions';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import CancellationAndRefund from './components/CancellationAndRefund';
import Footer from './components/Footer'; 
import Editprofile from './components/Editprofile';
import Checkout from './components/Checkout';
import TransactionHistory from './components/TransactionHistory';
import ViewOrder from './components/ViewOrder';
import ApproveCash from './components/ApproveCash';

import { UserProvider } from './contexts/userContext';

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route exact="true" path='/login' element={<LoginPage />}></Route>
                    <Route path='/signupmail' element={<SignUpMail />}></Route>
                    <Route path='/forgotpwd' element={<ForgotPwd />}></Route>
                    <Route path='/forgotpwdotp' element={<ForgotPwdOtp />}></Route>
                    <Route path='/resetpwd' element={<ResetPwd />}></Route>
                    <Route path='/signupacnt' element={<SignUpAcnt />}></Route>
                    <Route path='/menu' element={<Menu />}></Route>
                    <Route path='/orderhistory' element={<OrderHistory />}></Route>
                    <Route path='/transaction' element={<TransactionHistory />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/Editprofile' element={<Editprofile />}></Route>
                    <Route path='/termsandconditions' element={<TermsAndConditions />}></Route>
                    <Route path='/contactus' element={<ContactUs />}></Route>
                    <Route path='/privacypolicy' element={<PrivacyPolicy />}></Route>
                    <Route path='/cancellationandrefund' element={<CancellationAndRefund />}></Route> 
                    <Route path='/checkout' element={<Checkout />}></Route> 
                    <Route path='/vieworder' element={<ViewOrder />}></Route>
                    {
                        //admin routes
                        <Route path='/approvecash' element={<ApproveCash />}></Route>
                    }
                </Routes>
                <Footer />
            </UserProvider>
        </BrowserRouter>

    )
}
