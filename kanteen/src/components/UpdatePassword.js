import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdatePassword.css';
import resetImg from '../images/ResetPassword.svg';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import authService from '../services/authService';
import { useUser } from '../contexts/userContext';

export default function UpdatePasswordPage() {
  const { user, setUser, checkLocalData } = useUser();
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdCheck, setPwdCheck] = useState({
    pwdLength: false,
    pwdUppercase: false,
    pwdLowercase: false,
    pwdNumber: false,
    pwdSpecialChar: false
  });

  let navigate = useNavigate();
  const emailIdValid = !(user.emailId === 'na' || user.emailId === null || user.emailId === undefined);

  useEffect(() => {
      if (user.emailId === 'na' && !checkLocalData()) {
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
  }, [user.emailId, navigate]);
    
  useEffect(() => {
    if (pwdCheck.pwdLength && pwdCheck.pwdUppercase && pwdCheck.pwdLowercase && pwdCheck.pwdNumber && pwdCheck.pwdSpecialChar) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  }, [pwdCheck]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (name === 'newPassword') {
      setPwdCheck({
        pwdLength: value.length >= 8,
        pwdUppercase: value.match(/[A-Z]/),
        pwdLowercase: value.match(/[a-z]/),
        pwdNumber: value.match(/[0-9]/),
        pwdSpecialChar: value.match(/[^A-Za-z0-9]/)
      });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (data.newPassword !== data.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      const response = await authService.updatepassword(user.emailId, data.newPassword,data.currentPassword);
      setMessage(response.data.message);
      setSuccess(response.data.success);
      setTimeout(() => {
        setMessage('');
        setClicked(false);
        if (response.data.success) {
          setUser({ ...user, password: data.newPassword });
          navigate('/login');
        }
      }, 2500);
    } catch (err) {
      if (!err.response) {
        setMessage("Server is down, Please try again later");
        setSuccess(false);
        return;
      }
      setMessage(err.response.data.message);
      setSuccess(false);
    }
  };
  const handleupdate = async () => {
    setClicked(true);
    if (data.newPassword === data.confirmPassword) {
      setPwdValid(true);
    }
    const response = await authService.updatePassword(user.emailId, data.newPassword);
    setMessage(response.data.message);
    setSuccess(response.data.success);
    setTimeout(() => {
      setMessage('');
      setClicked(false);
      if (response.data.success) {
        setUser({ ...user, password: data.newPassword });
        navigate('/login');
      }
    }, 2500);
  };

  return (
    <div className="updatepassword-homepage">
      <div className="updatepassword-container">
        <div className="updatepassword-image-container">
          <img src={resetImg} alt="update password" width="550px" />
        </div>
        <div className="updatepassword-form-container">
          <div className="updatepassword-title">
            UPDATE PASSWORD
          </div>
          <form className="updatepassword-form" onSubmit={handleUpdatePassword}>
            <div className="updatepassword-form-group">
              <label htmlFor="currentPassword" className="updatepassword-label">
                Current Password:
              </label>
              <div className="updatepassword-group">
                <input
                  type={showCurrentPwd ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  value={data.currentPassword}
                  onChange={handlePasswordChange}
                />
                <span
                  className="updatepassword-eye"
                  onClick={() => setShowCurrentPwd((prev) => !prev)}>
                  {showCurrentPwd ? (<FaRegEyeSlash title='hide' />) : (<FaEye title='show' />)}
                </span>
              </div>
            </div>
            <div className="updatepassword-form-group">
              <label htmlFor="newPassword" className="updatepassword-label">
                New Password:
              </label>
              <div className="updatepassword-group">
                <input
                  type={showNewPwd ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  value={data.newPassword}
                  style={{
                    outline: data.newPassword.length !== 0 ? pwdValid === false ? "2px solid red" : "2px solid #0cbf60" : "1px solid #bf0c45",
                    border: data.newPassword.length !== 0 ? pwdValid === false ? "2px solid red" : "2px solid #0cbf60" : "1px solid #bf0c45"
                  }}
                  onChange={handlePasswordChange}
                />
                <span
                  className="updatepassword-eye"
                  onClick={() => setShowNewPwd((prev) => !prev)}>
                  {showNewPwd ? (<FaRegEyeSlash title='hide' />) : (<FaEye title='show' />)}
                </span>
              </div>
            </div>
            {data.newPassword.length > 0 && !pwdValid &&
              <div className="signupanct-hidden-texts signupacnt-pwd-check">
                <div className="signupacnt-check-text">
                  Password must contain at least:
                </div>
                <div className="signupacnt-pwd-check-list">
                  <ul>
                    {!pwdCheck.pwdLength && !pwdCheck.pwdLength &&
                      <li>
                        <span style={{ color: "red" }} >✖ </span>
                        <span>8 characters</span>
                      </li>}
                    {!pwdCheck.pwdUppercase && !pwdCheck.pwdUppercase &&
                      <li>
                        <span style={{ color: "red" }} >✖ </span>
                        <span>1 uppercase letter</span>
                      </li>}
                    {!pwdCheck.pwdLowercase && !pwdCheck.pwdLowercase &&
                      <li>
                        <span style={{ color: "red" }} >✖ </span>
                        <span>1 lowercase letter</span>
                      </li>}
                    {!pwdCheck.pwdNumber && !pwdCheck.pwdNumber &&
                      <li>
                        <span style={{ color: "red" }} >✖ </span>
                        <span>1 number</span>
                      </li>}
                    {!pwdCheck.pwdSpecialChar && !pwdCheck.pwdSpecialChar &&
                      <li>
                        <span style={{ color: "red" }} >✖ </span>
                        <span>1 special character</span>
                      </li>}
                  </ul>
                </div>
              </div>
            }
            {pwdValid && data.newPassword === data.currentPassword && data.currentPassword.length > 0 &&
              <div className="signupacnt-check-text">
                <span style={{ color: "red" }} >✖ </span> New password cannot be the same as the current password
              </div>
            }
            <div className="updatepassword-form-group">
              <label htmlFor="confirmPassword" className="updatepassword-label">
                Confirm Password:
              </label>
              <div className="updatepassword-group">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={data.confirmPassword}
                  disabled={!pwdValid || data.newPassword === data.currentPassword}
                  style={{
                    outline: data.confirmPassword.length !== 0 ? data.newPassword !== data.confirmPassword ? "2px solid red" : "2px solid #0cbf60" : "1px solid #bf0c45",
                    border: data.confirmPassword.length !== 0 ? data.newPassword !== data.confirmPassword ? "2px solid red" : "2px solid #0cbf60" : "1px solid #bf0c45",
                    cursor: !pwdValid || data.newPassword === data.currentPassword ? "not-allowed" : "auto"
                  }}
                  onChange={handlePasswordChange}
                />
                <span
                  className="updatepassword-eye"
                  onClick={() => setShowConfirmPwd((prev) => !prev)}>
                  {showConfirmPwd ? (<FaRegEyeSlash title='hide' />) : (<FaEye title='show' />)}
                </span>
              </div>
            </div>
            {pwdValid && data.newPassword !== data.confirmPassword && data.confirmPassword.length > 0 &&
              <div className="signupacnt-check-text">
                <span style={{ color: "red" }} >✖ </span> Passwords do not match
              </div>
            }
            <div className="updatepassword-button-container">
              <button
                type="submit"
                className="updatepassword-button"
                onClick={handleupdate}
                disabled={clicked || !pwdValid || data.newPassword === data.currentPassword || data.newPassword !== data.confirmPassword}
                style={{cursor: clicked || !pwdValid || data.newPassword === data.currentPassword || data.newPassword !== data.confirmPassword ? "not-allowed" : "pointer" }}
              >
                Update
              </button>
            </div>
          </form>
            <div className="reset-response response">
                <span
                    style={{ color: success ? "#139a72" : "#ba1717" }}>
                    {message}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}
