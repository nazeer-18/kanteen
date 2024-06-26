import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import authService from '../services/authService';
import '../styles/HomePage.css';
import foodImg from '../images/food-girl.svg';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
    const { user, setUser, checkLocalData } = useUser();
    const isAdmin = user.role === 'admin';
    const isUser = user.role === 'user';
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
       if( user.emailId === 'na' && !checkLocalData())
            navigate('/login');
    }, [user.emailId])
    return (
        <div>
            <div className="homepage-container">
                <div className="foodpage-slogan">
                    {
                        message.length > 0 ? <h2>{message}</h2> :
                            <div className="home-body">
                                <h1>Hello <text-amrita>{user.name}</text-amrita> !!</h1> <br />
                            </div>
                    }
                    <h1>
                        "Good <text-amrita>food</text-amrita> is all the sweeter when shared with good <text-amrita>friends.</text-amrita>"
                    </h1> <br />
                    <text-grey>
                        What are you waiting for? Order now!
                    </text-grey>
                </div>
                <div className="foodpage-image">
                    <img src={foodImg} alt="food img" style={{ width: "250px", height: "250px" }} />
                </div>
            </div>
            <div className="homepage-functions">
                {
                    isUser &&
                    <div className="homepage-buttons-group">
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/menu">
                                <span className="btn-name">ORDER NOW </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faNewspaper} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/orderhistory">
                                <span className="btn-name">MY ORDERS </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                    </div>
                }
                {
                    isAdmin &&
                    <div className="homepage-buttons-group">
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/menu">
                                <span className="btn-name">ORDER NOW </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faNewspaper} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/adminorderhistory">
                                <span className="btn-name">ORDERS </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/approvecash">
                                <span className="btn-name">APPROVE PAYMENTS </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/additem">
                                <span className="btn-name">ADD ITEM </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/modifyitem">
                                <span className="btn-name">MODIFY ITEM </span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                        <div className="homepage-button-container">
                            <Link className='homepage-button' exact="true" to="/admintransaction">
                                <span className="btn-name">PAYMENTS</span>
                                <div className="btn-icon">
                                    <FontAwesomeIcon icon={faFileLines} />
                                </div>
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <div className="homepage-alerts">
                <h2>Alerts</h2> <br />
                <div className="homepage-alerts-list">
                    <p> &gt; Specials</p> <br />
                    <p> &gt; Status</p> <br />
                </div>
            </div>
        </div>
    )
}
