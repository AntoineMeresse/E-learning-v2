import React, { useState, useEffect } from 'react'

import { Bar } from 'react-chartjs-2';
import { useAuth } from '../contexts/AuthContext';

function AdminDashBoard() {

    const [quizzId, setQuizzId] = useState('quizz1');
    
    const [userId, setUserId] = useState('');
    const [datas, setDatas] = useState({});

    const { getQuizzRes } = useAuth();
    const colors = ['red', 'blue', 'green', 'yellow'];

    async function fetchDataQuizz() {
        const doc = await getQuizzRes(quizzId);
        if (!doc.exists) console.log(`Document (${quizzId}) doesn't exist`);
        else {
            const d = doc.data();
            console.log(`Document (${quizzId}) data:`, d);
            setDatas(d);
        }
    }

    useEffect(() => {
        fetchDataQuizz();
    }, [userId])

    function handleChange(event) {
        setUserId(event.target.value);
    }

    function createListOfLength(value){
        let res = []
        for(let i = 0; i<value; i++) res.push(i+1);
        return res;
    }

    function createDatasets(){
        let res = [];
        let index = 0;
        if (userId !== '') {
            for (const [key, value] of Object.entries(datas.res[userId])) {
                console.log(`${key}: ${value} (index : ${index})`);
                let tmp = {
                    label : value.dateString,
                    data : value.time.slice(1),
                    backgroundColor : colors[index],
                };
                index++;
                res.push(tmp);
            }
        }
        return res;
    }


    return (
        <div className="admin-dashboard"> 
            <h1>Temps de réponse pour le quizz 1</h1> 
            <select value={userId} onChange={handleChange}>   
                <option value=''>Select an user</option>
                {
                    datas.res && Object.entries(datas.res).map((elem, index) => <option value={elem[0]} key={index}>{elem[0]})</option>)
                }
            </select>

            <Bar
                data = {{
                    labels : createListOfLength(datas.questionNumber),
                    datasets : createDatasets(),
                }} 
            />
        </div>
    )
}

export default AdminDashBoard

/*

datasets: [
    {
        label : 'resultats',
        data : [12,2,8],
        backgroundColor : 'blue',
    }
]
*/