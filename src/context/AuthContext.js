import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import React from 'react'
import { useState } from 'react'
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
            setCurrentUser(user);
            }
            console.log(user);
        })

        return () => {
            unsub();
            console.log(unsub);
        }
    }, []);

    return (

    <AuthContext.Provider value={{
        currentUser,
        }}> 
    {children}
    </AuthContext.Provider>
    )
};