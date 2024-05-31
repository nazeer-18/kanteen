import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/PrivacyPolicy.css';


export default function OrderHistory() {
    return (
        <div className="pp-content">
        <h1 className="pp-title">Privacy Policy</h1>
        

        <div className="pp-section">
            <h2 className="pp-headings">Introduction</h2>
            <p>This privacy policy (“Policy”) relates to the manner DADI JAI CHIRANJEEVA (“we”, “us”, “our”) in which we use, handle and process the data that you provide us in connection with using the products or services we offer. By using this website or by availing goods or services offered by us, you agree to the terms and conditions of this Policy, and consent to our use, storage, disclosure, and transfer of your information or data in the manner described in this Policy.</p>
            <p>We are committed to ensuring that your privacy is protected in accordance with applicable laws and regulations. We urge you to acquaint yourself with this Policy to familiarize yourself with the manner in which your data is being handled by us.</p>
            <p>DADI JAI CHIRANJEEVA may change this Policy periodically and we urge you to check this page for the latest version of the Policy in order to keep yourself updated.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">What data is being collected</h2>
            <p>We may collect the following information from you:</p>
            <ul className='pp-list'>
                <li>Name</li>
                <li>Contact information including address and email address</li>
                <li>Demographic information or, preferences or interests</li>
                <li>Personal Data or Other information relevant/ required for providing the goods or services to you</li>
            </ul>
            <p><span className="pp-highlight">Note:</span> Notwithstanding anything under this Policy as required under applicable Indian laws, we will not be storing any credit card, debit card or any other similar card data of yours. Please also note that all data or information collected from you will be strictly in accordance with applicable laws and guidelines.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">What we do with the data we gather</h2>
            <p>We require this data to provide you with the goods or services offered by us including but not limited, for the below set out purposes:</p>
            <ul className='pp-list'>
                <li>Internal record keeping.</li>
                <li>For improving our products or services.</li>
                <li>For providing updates to you regarding our products or services including any special offers.</li>
                <li>To communicate information to you.</li>
                <li>For internal training and quality assurance purposes.</li>
            </ul>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">Who do we share your data with</h2>
            <p>We may share your information or data with:</p>
            <ul className='pp-list'>
                <li>Third parties including our service providers in order to facilitate the provisions of goods or services to you, carry out your requests, respond to your queries, fulfill your orders or for other operational and business reasons.</li>
                <li>With our group companies (to the extent relevant).</li>
                <li>Our auditors or advisors to the extent required by them for performing their services.</li>
                <li>Governmental bodies, regulatory authorities, law enforcement authorities pursuant to our legal obligations or compliance requirements.</li>
            </ul>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">How we use cookies</h2>
            <p>We use "cookies" to collect information and to better understand customer behaviour. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to avail our goods or services to the full extent. We do not control the use of cookies by third parties. The third party service providers have their own privacy policies addressing how they use such information.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">Your rights relating to your data</h2>
            <p><span className="pp-highlight">Right to Review:</span> You can review the data provided by you and can request us to correct or amend such data (to the extent feasible, as determined by us). That said, we will not be responsible for the authenticity of the data or information provided by you.</p>
            <p><span className="pp-highlight">Withdrawal of your Consent:</span> You can choose not to provide your data, at any time while availing our goods or services or otherwise withdraw your consent provided to us earlier, in writing to our email ID: ch.en.u4cse21122@ch.students.amrita.edu. In the event you choose to not provide or later withdraw your consent, we may not be able to provide you our services or goods. Please note that these rights are subject to our compliance with applicable laws.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">How long will we retain your information or data?</h2>
            <p>We may retain your information or data (i) for as long as we are providing goods and services to you; and (ii) as permitted under applicable law, we may also retain your data or information even after you terminate the business relationship with us. However, we will process such information or data in accordance with applicable laws and this Policy.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">Data Security</h2>
            <p>We will use commercially reasonable and legally required precautions to preserve the integrity and security of your information and data.</p>
        </div>

        <div className="pp-section">
            <h2 className="pp-headings">Queries/ Grievance Officer</h2>
            <p>For any queries, questions or grievances about this Policy, please contact us using the contact information provided on this website.</p>
        </div>
        <p className="pp-highlight">Last updated on 31-05-2024 16:05:57</p>
        <Link
                exact="true" to="/login"
                className="pp-backBtn">
                <button>Back</button>
                
            </Link><br></br>
    </div>
    )
}