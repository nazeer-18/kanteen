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
          <div className="contact-column">
            <h1 className="contact-heading">Merchant</h1>
            <p className="contact-description">DADI JAI CHIRANJEEVA</p>
          </div>
          <div className="contact-column">
            <h1 className="contact-heading">Address</h1>
            <p className="contact-description">Registered Address: SH20A , Amrita college, Vengal, Tamil Nadu, PIN: 601103<br></br>
              Operational Address: SH20A , Amrita college, Vengal, Tamil Nadu, PIN: 601103<br></br></p>
          </div>
        </div>
        <div className="contact-tele-mail-row">
          <div className="contact-column">
            <h1 className="contact-heading">Telephone No</h1>
            <p className="contact-description">+91 91005 67702</p>
          </div>
          <div className="contact-column">
            <h1 className="contact-heading">E-Mail</h1>
            <p className="contact-mail-description">ch.en.u4cse21122@ch.students.amrita.edu</p>
          </div>
        </div>
      </div>
    </div>
  )
}