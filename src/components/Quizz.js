import React, {useState} from 'react'
//import questionnaire from '../datas/questionnaire.json'
import Question from './Question'
import Reponse from './Reponse'

function Quizz({questionnaire}) {
    
    const [reponseSelect , setReponseSelect] = useState("Null")

    function onReponseSelect(value) {
        console.log(value);
        //setReponseSelect(event.currentTarget.value);
    }
    
    return (
        <div className="quizz">
            <h1>I'm a quizz component</h1>
            <p>Reponse Selectionnee : {reponseSelect}</p>
            <Question question="That's a default question"/>
            <Reponse value="A" onReponseSelect={onReponseSelect}/>
            <Reponse value="B" onReponseSelect={onReponseSelect}/>
            <Reponse value="C" onReponseSelect={onReponseSelect}/>
        </div>
    )
}
export default Quizz
