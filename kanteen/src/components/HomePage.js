import React, { useState,useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext'

export default function HomePage() {
    const { user } = useUser();
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (user.emailId === 'na') {
            setMessage('Please login to continue');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [user.emailId])
    return (
        <div>
            <h1>Welcome to , kanteen</h1>
            {
                message.length > 0 ? <h2>{message}</h2> :
                    <div className="home-body">
                        <h1>Hello {user.name}</h1> <br />
                        userName: {user.name}<br />
                        emailId : {user.emailId}<br />
                        mobileNumber : {user.mobileNumber}<br />
                    </div>
            }
        </div>
    )
}
