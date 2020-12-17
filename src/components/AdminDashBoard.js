import React, { useState, useEffect } from 'react'

import { Bar } from 'react-chartjs-2';
import { useAuth } from '../contexts/AuthContext';

function AdminDashBoard() {

    const [quizzId, setQuizzId] = useState('quizz1');
    const [userId, setUserId] = useState('');
    const [datas, setDatas] = useState({});

    const { getQuizzRes } = useAuth();

    async function fetchDataQuizz() {
        try {
            const doc = await getQuizzRes(quizzId);
            if (!doc.exists) console.log(`Document (${quizzId}) doesn't exist`);
            else {
                const datas = doc.data();
                console.log(`Document (${quizzId}) data:`, datas);
                setDatas(datas);
            }
        }
        catch {
            console.log("Error when getting res");
        }
    }

    useEffect(() => {
		fetchDataQuizz();
	}, [])
     
    return (
        <div className="admin-dashboard">
            <p>Quizz id : {quizzId}</p>
            <p>User id : {userId}</p>

            <Bar
                data = {{
                    labels : ['1', '2', '3'],
                    datasets: [
                        {
                            label : 'resultats',
                            data : [12,2,8],
                            backgroundColor : 'blue',
                        }
                    ]
                }} 
            />
        </div>
    )
}

export default AdminDashBoard
