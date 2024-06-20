import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Editprofile.css';
import profileImg from '../images/editprofile.svg';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { useUser } from '../contexts/userContext';

export default function EditProfilePage() {
  const { user, setUser, checkLocalData } = useUser();
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [validUserName, setValidUserName] = useState(1);
  const [mobileValid, setMobileValid] = useState(1);
  const [allValid, setAllValid] = useState(false);
  const [data, setData] = useState({
    emailId: user.emailId,
    mobileNumber: user.mobileNumber,
    name: user.name,
    password: user.password
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (user.mobileNumber !== data.mobileNumber || user.name !== data.name) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }, [data.mobileNumber, data.name, user.mobileNumber, user.name]);

  useEffect(() => {
    if(user.emailId === 'na' && !checkLocalData())
      navigate('/login');
    else
      setData({
        emailId: user.emailId,
        mobileNumber: user.mobileNumber,
        name: user.name,
        password: user.password
      });
  }, [user.emailId]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleMobileChange = (mobile) => {
    setMobileValid(mobile.match(/^\d{10}$/));
  };

  const handleUserName = (e) => {
    const { value } = e.target;
    const regex = /^[A-Za-z0-9@_]+$/;
    const len = value.length;
    if (regex.test(value) && len > 2) {
      setValidUserName(1);
    } else if (!regex.test(value) && len > 2) {
      setValidUserName(2);
    } else if (len < 3) {
      setValidUserName(0);
    }
    handlechange(e);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    setClicked(true);
    
    if(!allValid || !validUserName || !mobileValid) {
      setTimeout(() => {
        setMessage("Profile update failed");
      }, 2000);
      return;
    }

    try {
      if (allValid && validUserName && mobileValid) {
        const updatedUser = {
          ...user,
          name: data.name,
          mobileNumber: data.mobileNumber,
        };
        const response = await authService.updateUser(updatedUser.emailId, updatedUser.name, updatedUser.mobileNumber);
        if (response.status === 200) {
          setUser(updatedUser);
          setMessage("Profile updated successfully");
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
    } catch (error) {
      setTimeout(() => {
        setMessage("Profile update failed");
      }, 2000);
    }
  };

  return (
    <div className="editprofile-homepage">
      <div className="editprofile-container">
        <div className="editprofile-image-container">
          <img
            src={profileImg}
            alt="edit profile"
            width="550px" />
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
                name="email"
                id="email"
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
                placeholder="Enter your mobile number"
                value={data.mobileNumber}
                onChange={(e) => {
                  handlechange(e);
                  handleMobileChange(e.target.value);
                }}
              />
            </div>
            { data.mobileNumber.length > 0 && !mobileValid &&
              <div className="editprofile-hidden-texts">
                <div className="editprofile-check-text">
                  <span style={{ color: "red" }} >✖ </span> Enter a valid mobile number
                </div>
              </div>
            }
            <div className="editprofile-form-group">
              <label htmlFor="name">
                Username:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={(e) => {
                  handleUserName(e);
                }}
                required
              />

            </div>
            {validUserName === 0 &&
              <div className="editprofile-hidden-texts">
                <div className="editprofile-check-text">
                  <span style={{ color: "red" }} >✖ </span> Username should contain at least 3 characters
                </div>
              </div>
            }
            {validUserName === 2 &&
              <div className="editprofile-hidden-texts">
                <div className="editprofile-check-text">
                  <span style={{ color: "red" }} >✖ </span> Only alphabets, numbers, _ , @ are allowed
                </div>
              </div>
            }
          </form>

          <div className="editprofile-button-container">
            <button
              className="editprofile-button"
              type='submit'
              onClick={handleupdate}
              style={{
                cursor: allValid && validUserName && mobileValid ? "pointer" : "not-allowed"
              }}
              
            >
              Update
            </button>
          </div>
          {message &&
            <div className={`editprofile-message ${success ? 'success' : 'error'}`}>
              {message}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
