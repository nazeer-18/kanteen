import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { useUser } from '../contexts/userContext'


export default function Navbar() {
    const { user } = useUser();
    const [responsiveNav, setResponsiveNav] = useState(false);
    useEffect(() => {
        if (user.emailId !== 'na' && !responsiveNav) {
            const hidden = document.querySelector('.wish');
            hidden.classList.toggle('hide-nav');
            const responsiveNavs = document.querySelectorAll('.responsive-nav');
            responsiveNavs.forEach(nav => {
                nav.classList.add('responsive-nav-show');
                nav.classList.remove('responsive-nav');
            });
            setResponsiveNav(true);
        }
    }, [user.emailId, responsiveNav])
    const handleResponsiveness = () => {

    }
    return (
        <div className="nav-body">
            <div className="hamburger responsive-nav">
                <button onClick={handleResponsiveness}>
                    <svg aria-hidden="true" height="23" viewBox="0 0 16 16" version="1.1" width="23" fill="#f0f3f6" padding="10px" data-view-component="true" class="octicon octicon-three-bars Button-visual">
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button>
            </div>
            <div className="app-name">ASE CANTEEN</div>
            <div className='wish'>AUM NAMAHSHIVAYA</div>
            <div className="profile-icon responsive-nav">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.8334 10.8333C25.8334 14.055 23.2217 16.6667 20 16.6667C16.7784 16.6667 14.1667 14.055 14.1667 10.8333C14.1667 7.61167 16.7784 5 20 5C23.2217 5 25.8334 7.61167 25.8334 10.8333Z" stroke="white" stroke-width="1.5" />
                    <path d="M9.04028 29.1497C9.61161 25.1912 12.6762 21.9565 16.665 21.6659C18.944 21.4998 21.064 21.4996 23.3386 21.665C27.3259 21.9549 30.3882 25.1895 30.9593 29.1463L31.0704 29.9159C31.3996 32.1964 29.8153 34.3249 27.5243 34.5706C22.1475 35.1472 17.8702 35.1405 12.4854 34.5661C10.1908 34.3214 8.60131 32.191 8.93097 29.907L9.04028 29.1497Z" stroke="white" stroke-width="1.5" />
                </svg>

            </div>
        </div>
    )
}
