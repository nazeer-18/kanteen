import React from 'react'
import {useUser} from '../contexts/userContext'

export default function HomePage() {
    const {user} = useUser();
    return (
        <div>
                <h1>Hello {user.name}</h1>

                <h3></h3>
        </div>
    )
}
