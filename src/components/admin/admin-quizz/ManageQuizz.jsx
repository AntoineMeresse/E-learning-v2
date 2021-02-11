import React, {useState, useEffect} from 'react'

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
        console.log(snapshot);
        snapshot.forEach(function(doc) {
            console.log(doc.id);
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
        </div>
    )
}

export default ManageQuizz
