import React from 'react'
import {useUser} from '../contexts/userContext'

export default function HomePage() {
    const {user} = useUser();
    return (
        <div>
                <h1>Hello {user.name}</h1> <br />
                userName: {user.name}<br/>
                emailId : {user.emailId}<br/>
                mobileNumber : {user.mobileNumber}<br/>
        </div>
    )
}
