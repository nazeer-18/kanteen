import React, { useContext, createContext, useState } from 'react';
const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        emailId: 'na',
        name:'na',
        mobileNumber: 'na',
        password: 'na'
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}