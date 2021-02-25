import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap';
import QuizzLoader from './QuizzLoader';
import CoursesList from './CoursesList';

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
        // eslint-disable-next-line
    }, [])

    return (
        <div className="dashboard">
            { home === 0 ?
            (
                <>
                <Button className="w-100 mb-1 btn-primary" onClick={() => setHome(3)}>Formation</Button>
                <Button className="w-100 mb-1 btn-secondary" onClick={() => console.log("Quizz Collectif")}>Regles</Button>
                <Button className="w-100 mb-1 btn-primary"   onClick={() => setHome(1)}>Quizz</Button>
                <Button className="w-100 mb-1 btn-primary"   onClick={() => setHome(2)}>QuizzCollectif</Button>
                </>
            ) :
            (
                home === 1 ? 
                (
                    <QuizzLoader userId={userId} setHome={setHome} userName={userFullName} collectif={false}/>
                ) 
                :
                (
                    home === 2 ?
                    <QuizzLoader userId={userId} setHome={setHome} userName={userFullName} collectif={true}/> :
                    <CoursesList/>
                )
            )
            }
        </div>
    )
}

export default Dashboard
