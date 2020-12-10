import React, {useState} from 'react'
import Question from './Question'
import Reponse from './Reponse'

function Quizz({questionnaire}) {
    
    const [reponseSelect , setReponseSelect] = useState(-1);
    const [questionNumber, setQuestionNumber] = useState(-1);
    const [compteur, setCompteur] = useState(0);
    const [timers, setTimers] = useState([]);

    function nextQuestion() {
        if (reponseSelect !== -1) {
            if(reponseSelect === questionnaire[questionNumber].correctAnswer) {
                setCompteur(compteur+1);
            }
            setQuestionNumber(questionNumber+1);
            setReponseSelect(-1);
            
            addTimers()
        }
    }

    function startQuizz() {
        console.log("Debut");
        addTimers()
        setQuestionNumber(0);
    }

    function addTimers(){
        setTimers([...timers, new Date()])
        console.log(timers);
    }
    
    return (
        <div className="quizz">
            <p>Score : {compteur} / {questionnaire.length}</p>
            { questionNumber < 0 ? 
            (
                <button onClick={() => startQuizz()}>Start</button>
            ) : 
            (
                (questionNumber < questionnaire.length) && (
                    <>    
                    <p>Reponse Selectionnee : {reponseSelect} | {questionNumber+1}/{questionnaire.length}</p>
                    <Question question={questionnaire[questionNumber].question}/>
                    {
                        questionnaire[questionNumber].choices.map(
                            (elem, index) => <Reponse value={elem} onReponseSelect={setReponseSelect} index={index} key={index} selected={reponseSelect}/>
                        )
                    }
                    <button onClick={() => nextQuestion()}>Next</button>
                    </>
                )
            )}
        </div>
    )
}
export default Quizz
