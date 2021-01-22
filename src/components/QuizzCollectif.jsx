import React from 'react'
import Quizz from './Quizz'
import Chat from './chat/Chat'

function QuizzCollectif({quizzId, userId , questionnaire, setHome, userName, collectif}) {
    return (
        <div>
            <p>QuizzCollectif</p>
            <Quizz quizzId={quizzId} userId={userId} questionnaire={questionnaire} setHome={setHome} userName={userName} collectif={collectif}/>
            <Chat/>
        </div>
    )
}

export default QuizzCollectif
