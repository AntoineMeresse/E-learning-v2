import React, {useState, useContext, useEffect} from 'react'
import { auth, firestore } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password).then(cred => createUserInfos(cred));
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    function createUserInfos(cred) {
        console.log(cred);
        console.log("Test createUserInfos");
        return firestore.collection("users").doc(cred.user.uid).set(
            {
                nom : "test",
                prenom : "test",
                groupe : "test",
                mail : cred.user.email,
            }
        );
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

