import React from 'react'
//import questionnaire from '../datas/questionnaire.json'
import Question from './Question'

function Quizz({questionnaire}) {
    return (
        <div className="quizz">
            <h1>I'm a quizz component</h1>
            <Question question="That's a default question"/>
        </div>
    )
}
export default Quizz
