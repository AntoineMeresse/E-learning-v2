import React, {useState, useContext} from 'react'
import { auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()

    const value = {
        currentUser
    }

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

