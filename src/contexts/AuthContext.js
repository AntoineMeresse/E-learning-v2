import React, {useState, useContext, useEffect} from 'react'
import { auth, firestore } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password, firstname, lastname) {
        return auth.createUserWithEmailAndPassword(email,password).then(cred => createUserInfos(cred, firstname, lastname));
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    function createUserInfos(cred, firstname,lastname) {
        console.log(cred);
        console.log("Test createUserInfos");
        return firestore.collection("users").doc(cred.user.uid).set(
            {
                nom : lastname,
                prenom : firstname,
                mail : cred.user.email,
            }
        );
    }

    function saveQuizzRes(quizzID, userID, score, nbQuestion,  time) {
        console.log({quizzID, userID, score, nbQuestion, time});
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
        saveQuizzRes,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

