import React, { useState, useEffect } from 'react'
import questionnaire from '../datas/questionnaire.json'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap';
import QuizzLoader from './QuizzLoader';

function Dashboard({home, setHome}) {
    
    const [userFullName, setUserFullName] = useState('Test');

    const { currentUser, getUserInfos } = useAuth();
    
    const userId = currentUser.uid;

    async function fetchRealName(userId) {
        const doc = await getUserInfos(userId);
        if (!doc.exists) console.log(`User (${userId}) doesn't exist`);
        else {
            const d = doc.data();
            const name = d.prenom+" "+d.nom
            setUserFullName(name);
        }
    }

    useEffect(() => {
        fetchRealName(userId);
    }, [])

    return (
        <div className="dashboard">
            { home === 0 ?
            (
                <>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>Formation</Button>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>Regles</Button>
                <Button className="w-100 mb-1 btn-primary"   onClick={() => setHome(1)}>Quizz</Button>
                <Button className="w-100 mb-1 btn-primary"   onClick={() => setHome(2)}>QuizzCollectif</Button>
                </>
            ) :
            (
                home === 1 ? 
                (
                    <QuizzLoader quizzId="quizz1" userId={userId} setHome={setHome} userName={userFullName} collectif={false}/>
                ) 
                :
                (
                    <QuizzLoader quizzId="quizz1" userId={userId} setHome={setHome} userName={userFullName} collectif={true}/>
                )
            )
            }
        </div>
    )
}

export default Dashboard
