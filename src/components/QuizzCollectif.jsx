import React from 'react'
import Quizz from './Quizz'

function QuizzCollectif({quizzId, userId , questionnaire, setHome, userName, collectif}) {
    return (
        <div>
            <p>QuizzCollectif</p>
            <Quizz quizzId={quizzId} userId={userId} questionnaire={questionnaire} setHome={setHome} userName={userName} collectif={collectif}/>
        </div>
    )
}

export default QuizzCollectif
