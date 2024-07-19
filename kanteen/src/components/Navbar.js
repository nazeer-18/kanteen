import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import logo from '../images/logo.jpg';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCartShopping, faFileLines, faWallet, faNewspaper, faUnlockKeyhole, faAddressCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const { user, setUser } = useUser();
    const [responsiveNav, setResponsiveNav] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const sidenavRef = useRef(null);
    const dropdownRef = useRef(null);
    const profileIconRef = useRef(null);  // Add ref for profile icon
    const navigate = useNavigate();

    useEffect(() => {
        if (user.emailId && user.emailId !== 'na' && !responsiveNav) {
            const hidden = document.querySelector('.wish');
            hidden.classList.add('hide-nav');
            const responsiveNavs = document.querySelectorAll('.responsive-nav');
            responsiveNavs.forEach(nav => {
                nav.classList.add('responsive-nav-show');
                nav.classList.remove('responsive-nav');
            });
            setResponsiveNav(true);
        }
    }, [user.emailId, responsiveNav]);

    const handleResponsiveness = () => {
        const sidenav = document.querySelector('.sidenav');
        sidenav.classList.toggle('show-nav');
    };

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleClickOutside = (event) => {
        if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
            const sidenav = document.querySelector('.sidenav');
            sidenav.classList.remove('show-nav');
        }
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !profileIconRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div ref={sidenavRef} className="sidenav">
                <div className="sidenav-heading">
                    <div className="sidenav-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h2>
                        <text-amrita>
                            Kanteen
                        </text-amrita>
                    </h2>
                    <div className="close-sidenav">
                        <button onClick={handleResponsiveness} aria-label="Close" type="button" className="close-button Overlay-closeButton">
                            <svg fill="#bf0c46" aria-hidden="true" height="20" viewBox="0 0 16 16" width="20" className="octicon octicon-x">
                                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="sidenav-content">
                    <div className="sidenav-link">
                        <Link onClick={handleResponsiveness} to="/">
                            <div className="side-nav-item-container">
                                <FontAwesomeIcon icon={faHouse} />
                                <div className="side-nav-item-desc">
                                    Home
                                </div>
                            </div>
                        </Link>
                        <Link onClick={handleResponsiveness} to="/cart">
                            <div className="side-nav-item-container">
                                <FontAwesomeIcon icon={faCartShopping} />
                                <div className="side-nav-item-desc">
                                    Cart
                                </div>
                            </div>
                        </Link>
                        <Link onClick={handleResponsiveness} to="/menu">
                            <div className="side-nav-item-container">
                                <FontAwesomeIcon icon={faNewspaper} />
                                <div className="side-nav-item-desc">
                                    Order Now
                                </div>

                            </div>
                        </Link>
                        <Link onClick={handleResponsiveness} to="/orderhistory">
                            <div className="side-nav-item-container">
                                <FontAwesomeIcon icon={faFileLines} />
                                <div className="side-nav-item-desc">
                                    My Orders
                                </div>
                            </div>
                        </Link>
                        <Link onClick={handleResponsiveness} to="/transaction">
                            <div className="side-nav-item-container">
                                <FontAwesomeIcon icon={faWallet} />
                                <div className="side-nav-item-desc">
                                    My Transactions
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="nav-body">
                <div className="hamburger responsive-nav">
                    <button onClick={handleResponsiveness}>
                        <svg aria-hidden="true" height="23" viewBox="0 0 16 16" width="23" fill="#f0f3f6" className="octicon octicon-three-bars Button-visual">
                            <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                        </svg>
                    </button>
                </div>
                <div className="app-name">
                    <Link exact="true" to="/">
                        ASE CANTEEN
                    </Link>
                </div>
                <div className="wish"></div> {/*made sidenav responsive using this so dont remove it*/}
                <div ref={profileIconRef} className="profile-icon responsive-nav" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.8334 10.8333C25.8334 14.055 23.2217 16.6667 20 16.6667C16.7784 16.6667 14.1667 14.055 14.1667 10.8333C14.1667 7.61167 16.7784 5 20 5C23.2217 5 25.8334 7.61167 25.8334 10.8333Z" stroke="white" strokeWidth="1.5" />
                        <path d="M9.04028 29.1497C9.61161 25.1912 12.6762 21.9565 16.665 21.6659C18.944 21.4998 21.064 21.4996 23.3386 21.665C27.3259 21.9549 30.3882 25.1895 30.9593 29.1463L31.0704 29.9159C31.3996 32.1964 29.8153 34.3249 27.5243 34.5706C22.1475 35.1472 17.8702 35.1405 12.4854 34.5661C10.1908 34.3214 8.60131 32.191 8.93097 29.907L9.04028 29.1497Z" stroke="white" strokeWidth="1.5" />
                    </svg>

                </div>
                {isOpen && (
                    <div ref={dropdownRef} className="dropdown-content" >
                        <div className="dropdown-link">
                            <h3>Hey {user.name}!</h3>
                            <Link to="/Editprofile">
                                <div className='dropdown-container' >
                                    <FontAwesomeIcon icon={faAddressCard} />
                                    <div className='drop-down-items'>Edit profile</div>
                                </div>
                            </Link>
                            <Link to="/UpdatePassword">
                                <div className='dropdown-container' >
                                    <FontAwesomeIcon icon={faUnlockKeyhole} />
                                    <div className='drop-down-items'>Change Password</div>
                                </div>
                            </Link>
                        </div>
                        <button onClick={handleLogout}>
                            Logout
                            <div className='drop-down-logouticon'>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
