import React from 'react'
import Quizz from './Quizz';
import questionnaire from '../datas/questionnaire.json'

function Dashboard() {
    return (
        <div className="dashboard">
            <Quizz questionnaire={questionnaire}/>
        </div>
    )
}

export default Dashboard
