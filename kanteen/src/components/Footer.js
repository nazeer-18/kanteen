import React from 'react'
import { Link } from 'react-router-dom';
import amritaLogo from '../images/amrita-logo.svg';
import '../styles/Footer.css'; 

export default function OrderHistory() {
    return (
        <div className="footer-container">
            <img
                src={amritaLogo}
                alt="logo"
                className="footer-logo"
            />
            <p className="footer-links">
                <Link
                    className="footer-link"
                    exact="true"
                    to="/termsandconditions"
                >
                    <span>Terms & conditions</span>
                </Link>
                |
                <Link
                    className="footer-link"
                    exact="true"
                    to="/contactus"
                >
                    <span>Contact Us</span>
                </Link>
                |
                <Link
                    className="footer-link"
                    exact="true"
                    to="/privacypolicy"
                >
                    <span>Privacy Policy</span>
                </Link>
                |
                <Link
                    className="footer-link"
                    exact="true"
                    to="/cancellationandrefund"
                >
                    <span>Cancellation & Refund Policy</span>
                </Link>
            </p>
        </div>    
    )
}
