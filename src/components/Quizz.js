import React, {useState} from 'react'
import Question from './Question'
import Reponse from './Reponse'

function Quizz({questionnaire}) {
    
    const [reponseSelect , setReponseSelect] = useState(-1);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [compteur, setCompteur] = useState(0);

    function nextQuestion() {
        if (reponseSelect !== -1) {

            if(reponseSelect === questionnaire[questionNumber].correctAnswer) {
                setCompteur(compteur+1);
            }

            setQuestionNumber(questionNumber+1);
            setReponseSelect(-1);
        }
    }
    
    return (
        <div className="quizz">
            <h1>I'm a quizz component</h1>
            <p>Score : {compteur} / {questionnaire.length}</p>
            { (questionNumber < questionnaire.length) && (
                <>    
                <p>Reponse Selectionnee : {reponseSelect} | {questionNumber}/{questionnaire.length}</p>
                <Question question={questionnaire[questionNumber].question}/>
                {
                    questionnaire[questionNumber].choices.map(
                        (elem, index) => <Reponse value={elem} onReponseSelect={setReponseSelect} index={index} key={index} selected={reponseSelect}/>
                    )
                }
                <button onClick={() => nextQuestion()}>Next</button>
                </>
            )}
        </div>
    )
}
export default Quizz
