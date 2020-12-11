import React, {useState} from 'react'
import Question from './Question'
import Reponse from './Reponse'

function Quizz({questionnaire}) {
    
    const currentDate = new Date();

    const [reponseSelect , setReponseSelect] = useState(-1);
    const [questionNumber, setQuestionNumber] = useState(-1);
    const [compteur, setCompteur] = useState(0);
    const [timers, setTimers] = useState([]);
    const [previousTime, setPreviousTime] = useState();
    
    /**
     * Function to select the next Question
     */
    function nextQuestion() {
        if (reponseSelect !== -1) {
            if(reponseSelect === questionnaire[questionNumber].correctAnswer) {
                setCompteur(compteur+1);
            }
            setQuestionNumber(questionNumber+1);
            setReponseSelect(-1);
            
            console.log("Question n° : "+questionNumber)
            addTimers()
        }
    }

    /**
     * Function to start the quizz
     */
    function startQuizz() {
        addTimers();
        setQuestionNumber(0);
    }

    /**
     * Function to calculate seconds between 2 dates 
     */
    function diffSeconds(d1,d2) {
        return Math.abs((d2-d1) / 1000);
    }

    /**
     * Function to add to timers list the time spent to answer a question
     */
    function addTimers(){
        let currentTime = currentDate.getTime()
        console.log("Current time vaut : "+currentTime);
        if(timers.length === 0) {
            setTimers(timers => [...timers, 0 ]) // Start : 0s
        }
        else {
            setTimers(timers => [...timers, diffSeconds(previousTime, currentTime)]) // Diff previous and actualtime in second
        }
        setPreviousTime(currentTime)
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
            <p>Timers : {timers.toString()}</p>
        </div>
    )
}

export default Quizz