import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom' 

import { useAuth } from '../../../contexts/AuthContext';

function ManageQuizz() {
    
    const [quizz, setQuizz] = useState([])
    const { getAllQuizz } = useAuth();
    
    async function fetchAllQuizz() {
        if (quizz.length === 0) {
            const doc = await getAllQuizz();
            createDatas(doc);
        }
    }

    function createDatas(snapshot) {
        snapshot.forEach(function(doc) {
            setQuizz([...quizz, doc.id])
        });
    }

    useEffect(() => {
        fetchAllQuizz();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="manageQuizz">
            <p>Liste Quizz :</p>
            <ul>
                {quizz.map((elem, index) => <li key={index}>{elem}</li>)}
            </ul>
            <Link to="/admin/quizz/new"><Button>+</Button></Link>
        </div>
    )
}

export default ManageQuizz
