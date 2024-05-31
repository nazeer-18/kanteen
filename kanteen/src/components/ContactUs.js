import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/ContactUs.css';

export default function OrderHistory() {
    return (
        <div className="contact-body">
            <Link
                exact="true" to="/login"
                className="contact-backBtn">
                <span>
                    &lt;
                </span>
                Back
            </Link><br></br>
            <h className="contact-title">Contact Us</h> 
            <div class="contact-data">
              <div className="contact-name-address-row">
                <div className="contact-name-column">
                  <h1 className="contact-name-heading">Merchant</h1>
                  <p className="description">DADI JAI CHIRANJEEVA</p>
                </div>
                <div className="contact-address-column">
                  <h1 className="contact-address-heading">Address</h1>
                  <p className="description">Registered Address: SH20A , Amrita college, Vengal, Tamil Nadu, PIN: 601103<br></br>
                      Operational Address: SH20A , Amrita college, Vengal, Tamil Nadu, PIN: 601103<br></br></p>
                </div>
              </div>
              <div className="contact-tele-mail-row">
                <div className="contact-tele-column">
                  <h1 className="contact-tele-heading">Telephone No</h1>
                  <p className="description">+91 91005 67702</p>
                </div>
                <div className="contact-mail-column">
                  <h1 className="contact-mail-heading">E-Mail</h1>
                  <p className="description">ch.en.u4cse21122@ch.students.amrita.edu</p>
                </div>
              </div>
            </div>           
        </div>
    )
}