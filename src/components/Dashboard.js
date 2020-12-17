import React from 'react'
import Quizz from './Quizz';
import questionnaire from '../datas/questionnaire.json'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap';
//import { useHistory } from 'react-router-dom'

function Dashboard({home, setHome}) {
    
    //const [error , setError] = useState('');
    const { currentUser } = useAuth();
    //const history = useHistory();

    return (
        <div className="dashboard">
            { home === 0 ?
            (
                <>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>Formation</Button>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>Regles</Button>
                <Button className="w-100 mb-1 btn-primary"   onClick={() => setHome(1)}>Quizz</Button>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>QuizzCollectif</Button>
                </>
            ) :
            (
             <Quizz quizzId="quizz1" userId={currentUser.uid} questionnaire={questionnaire} setHome={setHome}/>
            )
            }
        </div>
    )
}

export default Dashboard
