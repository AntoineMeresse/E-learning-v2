import React, { useState, useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext';
import OptionUserIdToName from './OptionUserIdToName.js'

// Import different charts
import ChartTimeToAnswer from './charts/ChartTimeToAnswer'

function AdminDashBoard() {

    const [quizzId, setQuizzId] = useState('quizz1');
    
    const [userId, setUserId] = useState('');
    const [datas, setDatas] = useState({});

    const { getQuizzRes } = useAuth();
    
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

    return (
        <div className="admin-dashboard"> 
            <h1>Temps de réponse pour le quizz 1</h1>
            <select value={userId} onChange={handleChange} className="w-100 my-2">   
                <option value=''>Select an user</option>
                {
                    datas.res && Object.entries(datas.res).map((elem, index) => <OptionUserIdToName elem={elem} key={index}/>)
                }
            </select>

            <ChartTimeToAnswer datas={datas} userId={userId} createListOfLength={createListOfLength}/>
        </div>
    )
}

export default AdminDashBoard
