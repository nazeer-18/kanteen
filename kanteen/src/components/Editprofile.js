import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Editprofile.css';
import loginImg from '../images/LoginImage.svg';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext';

export default function EditProfilePage() {
  const { user, setUser } = useUser();
  const [showPwd, setShowPwd] = useState(false);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({
    userName: '',
    pwd: ''
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  let navigate = useNavigate();


  return (
    <div className="editprofile-homepage">
      <div className="editprofile-container">
        <div className="editprofile-image-container">
          <img
            src={loginImg}
            alt="edit profile"
            width="600px" />
        </div>
        <div className="editprofile-form-container">
          <div className="editprofile-title">
            EDIT PROFILE
          </div>
          <form className="editprofile-form">
            <div className="editprofile-form-group">
              <label htmlFor="email" className="editprofile-email-label">
                Email Id:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.emailId}
                disabled
              />
            </div>
            <div className="editprofile-form-group">
              <label htmlFor="mobileNumber">
                Mobile Number:
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Enter your mobilenumber"
                value={user.mobileNumber}
              />
            </div>
            <div className="editprofile-form-group">
              <label htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={user.name}
              />
            </div>




          </form>
        </div>
      </div>
    </div>
  );
}
