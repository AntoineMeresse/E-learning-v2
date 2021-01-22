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

    function saveQuizzRes(quizzID, userID, score, nbQuestion, time, dateID, dateString, userName, correctAnswers, collectif) {
        console.log({quizzID, userID, score, nbQuestion, time, dateID, dateString});
        let resJSON = {
            questionNumber : nbQuestion,
            res : {
                [userID] : {
                    name : userName,
                    datas : {
                        [dateID.toString()] : {
                            score : score,
                            dateString : dateString,
                            nbQuestion : nbQuestion,
                            time : time,
                            answers : correctAnswers
                        }
                    }
                }
            }
        };
        if (!collectif) return firestore.collection("quizz").doc(quizzID).set(resJSON, { merge: true })
        else return firestore.collection("quizzCollectif").doc(quizzID).set(resJSON, { merge: true })
    }

    function getQuizzRes(quizzID) {
        return firestore.collection("quizz").doc(quizzID).get();
    }

    function getUserInfos(userId) {
        return firestore.collection("users").doc(userId).get();
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
        getQuizzRes,
        getUserInfos,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

