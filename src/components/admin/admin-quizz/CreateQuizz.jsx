import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

import { Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';

function CreateQuizz() {

    let history = useHistory();
    const { saveNewQuizz } = useAuth();
    
    const [name, setName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionsState, setQuestionsState] = useState([])
    const [quizzState, setQuizzState] = useState("btn-secondary")

    function newQuestion() {
        setQuestions([...questions, ""]);
        setQuestionsState([...questionsState, "Ne doit pas être vide"]);
    }

    function changeValue(value, index) {
        let cpy = [...questions];
        cpy[index] = value;
        updateQuestionsState(index, value);
        setQuestions(cpy);
    }

    function deleteIndex(index) {
        let cpyQuestions = [...questions];
        let cpyQuestionsState = [...questionsState];
        cpyQuestions.splice(index, 1);
        cpyQuestionsState.splice(index, 1);
        setQuestions(cpyQuestions);
        setQuestionsState(cpyQuestionsState);
    }

    function updateQuestionsState(index, value) {
        let q = value;
        let cpy = [...questionsState];
        if (q === "") cpy[index] =  "Ne doit pas être vide !";
        else if (q.includes(";;")) cpy[index] = "Tous les éléments doivent être non nul"; 
        else {
            let qSplit = q.split(";");
            let len = qSplit.length;
            if (len <= 2) cpy[index] =  "Doit au minimum être de la forme : question;choix1;indicechoixcorrect"
            else {
                let lastElem = qSplit[len-1];
                let lastElemInt = parseInt(lastElem);
                let nbChoice = len-2;
                if (lastElemInt.toString() !== lastElem || (lastElemInt < 0) || (lastElem > (nbChoice-1))) cpy[index] = "Le dernier élément doit être un nombre et être compris entre 0 et "+(nbChoice-1);
                else {
                    cpy[index] = "ok";
                }
            }
        }   
        setQuestionsState(cpy);
    }

    // Function to check infos
    useEffect(() => {
        for(let i = 0; i < questionsState.length; i++) {
            if(questionsState[i] !== "ok") {
                return setQuizzState("btn-secondary");
            }
        }
        setQuizzState("btn-primary");
    }, [questionsState]);

    function toJson() {
        let res = [];
        if (quizzState !== "btn-secondary") {
            for (let i = 0; i<questions.length; i++) {
                let qSplit = questions[i].split(";");
                let len = qSplit.length;
                let questionObject = {
                    question : qSplit[0],
                    choices : qSplit.slice(1,len-1),
                    correctAnswer : parseInt(qSplit[len -1])
                }
                res.push(questionObject);
            }
        }
        else {
            console.log("Not ok !");
        }
        return res;
    }

    function saveQuizz() {
        let datas = toJson();
        if (datas.length >= 0 && name.length >= 0) {
            saveNewQuizz(name, datas);
            history.push("/");
        }
    }

    return (
        <div>
            <h2>Create a new quizz</h2>
            <p>{questions.toString()}</p>
            <p>{questionsState.toString()}</p>
            <p>Button : {quizzState.toString()}</p>
            <div><label>Nom du quizz : <input type="text" value={name} onChange={(event) => setName(event.target.value)}/></label></div>
            {
                questions.map((_, index) => 
                    <>
                        <hr/>
                        <div>
                            <label>Question {index+1} : 
                                <input className="mx-3" type="text" value={questions[index]} onChange={(event) => changeValue(event.target.value, index)}/>
                            </label>
                            <p> ( {questionsState[index]} ) <Button className="alert-danger mx-3" onClick={() => deleteIndex(index)}>X</Button></p> 
                        </div>
                    </>)
            }
            <Button onClick={() => newQuestion()}>+ Nouvelle question</Button>
            <Button className={`w-100 my-3 ${quizzState}`} onClick={() => saveQuizz()}>Valider</Button>
        </div>
    )
}

export default CreateQuizz;