import React, { useContext, createContext, useState } from 'react';
import authService from '../services/authService';
const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        emailId: 'na',
        name:'na',
        mobileNumber: 'na',
        password: 'na',
        role:'na',
    });

    const checkLocalData = async () => {
        const loggedInUser = localStorage.getItem("user");
        console.log("fsd",loggedInUser);
        
        if (user.emailId==='na' && loggedInUser) {
            console.log("xxx",loggedInUser);
            const foundUser = JSON.parse(loggedInUser);
            const localDataResponse= (await authService.login(foundUser.emailId, foundUser.password));
            console.log("xyz",foundUser);
            setUser(foundUser); 
            if (localDataResponse.data.success) {
                return 1;
              }
            return 0;
        }
    }
    return (
        <UserContext.Provider value={{ user, setUser, checkLocalData}}>
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    return useContext(UserContext);
}