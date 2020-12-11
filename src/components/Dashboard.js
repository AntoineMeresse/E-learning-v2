import React, { useState } from 'react'
import Quizz from './Quizz';
import questionnaire from '../datas/questionnaire.json'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

function Dashboard() {
    
    const [error , setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push('/login');
        }
        catch {
            setError('Failed to logout');
        }

    }

    return (
        <div className="dashboard">
            <div className="accountInfo">
                <p>Current User Email : {currentUser.email}</p>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <br></br>
            <Quizz questionnaire={questionnaire}/>
        </div>
    )
}

export default Dashboard
