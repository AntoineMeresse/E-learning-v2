import React from 'react'
import Quizz from './Quizz';
import questionnaire from '../datas/questionnaire.json'
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
    
    const { currentUser } = useAuth();
    
    return (
        <div className="dashboard">
            <div className="accountInfo">
                <p>Current User Email : {currentUser.email}</p>
                <button>Log out</button>
            </div>
            <br></br>
            <Quizz questionnaire={questionnaire}/>
        </div>
    )
}

export default Dashboard
