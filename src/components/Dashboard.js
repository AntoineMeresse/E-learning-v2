import React from 'react'
import Quizz from './Quizz';
import questionnaire from '../datas/questionnaire.json'
import { useAuth } from '../contexts/AuthContext'
//import { useHistory } from 'react-router-dom'

function Dashboard() {
    
    //const [error , setError] = useState('');
    const { currentUser } = useAuth();
    //const history = useHistory();

    return (
        <div className="dashboard">
            <Quizz quizzId="quizz1" userId={currentUser.uid} questionnaire={questionnaire}/>
        </div>
    )
}

export default Dashboard
