import React, {useState} from 'react'
import { Button } from 'react-bootstrap';

function CreateQuizz() {
    
    const [name, setName] = useState("");
    const [questions, setQuestions] = useState([]);

    function changeValue(value, index) {
        let cpy = [...questions];
        cpy[index] = value;
        setQuestions(cpy);
    }

    function deleteIndex(index) {
        let cpy = [...questions];
        cpy.splice(index, 1);
        setQuestions(cpy);
    }

    function questionState(index) {
        let q = questions[index];
        if (q === "") return "Ne doit pas être vide !"
        let qSplit = q.split(";");
        let len = qSplit.length;
        if (len <= 2) return "Doit au minimum être de la forme : question;choix1;indicechoixcorrect"
        else {
            // Vérifier que le dernier est un nombre et a une valeur correcte

            // Vérifier qu'il n'y a pas 2 ; à la suite
            return "ok";
        }
    }

    return (
        <div>
            <h2>Create a new quizz</h2>
            <p>{questions.toString()}</p>
            <form>
                <div><label>Nom du quizz : <input type="text" value={name} onChange={(event) => setName(event.target.value)}/></label></div>
                {
                    questions.map((_, index) => 
                        <>
                            <hr/>
                            <div>
                                <label>Question {index+1} : 
                                    <input className="mx-3" type="text" value={questions[index]} onChange={(event) => changeValue(event.target.value, index)}/>
                                </label>
                                <p> ( {questionState(index)} ) <Button className="alert-danger mx-3" onClick={() => deleteIndex(index)}>X</Button></p> 
                            </div>
                        </>)
                }
                <Button onClick={() => setQuestions([...questions, ""])}>+ Nouvelle question</Button>
                <Button className="w-100 my-3" onClick={() => setQuestions([...questions, ""])}>Valider</Button>
            </form>
        </div>
    )
}

export default CreateQuizz;