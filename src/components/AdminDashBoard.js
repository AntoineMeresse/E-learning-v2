import React, { useState, useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext';
import OptionUserIdToName from './OptionUserIdToName.js'

// Import different charts
import ChartTimeToAnswer from './charts/ChartTimeToAnswer';
import ChartCorrectAnswer from './charts/ChartCorrectAnswer';
import ChartScore from './charts/ChartScore';
import ChartMessage from './charts/ChartMessage';

// Import Colors
import colors from '../colors';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom' 

function AdminDashBoard() {

    const [quizzId, setQuizzId] = useState('quizz1');
    
    const [userId, setUserId] = useState('');
    const [datas, setDatas] = useState({});

    const { getQuizzRes, getAllMessages } = useAuth();

    const [chartInfo, setChartInfo] = useState('');
    
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

            <div className="admin-dashboard-nav">
            <Link to="/admin/charts"><Button className="w-25 mb-1 btn-primary mx-2">Manage Quizz</Button></Link>
                <Link to="/admin/quizz"><Button className="w-25 mb-1 btn-primary mx-2">Manage Quizz</Button></Link>
            </div>


            <select value={userId} onChange={handleChange} className="w-100 my-2">   
                <option value=''>Select an user</option>
                {
                    datas.res && Object.entries(datas.res).map((elem, index) => <OptionUserIdToName elem={elem} key={index}/>)
                }
            </select>

            <select value={chartInfo} onChange={(event)=> setChartInfo(event.target.value)} className="w-100 my-2">
                <option value=''>Select what type of info you want to see</option>
                <option value="time">Time</option>
                <option value="answer">Answers</option>
                <option value="score">Score</option>
                <option value="message">Messages</option>
            </select>

            { chartInfo === "time" ?  <ChartTimeToAnswer datas={datas} userId={userId} createListOfLength={createListOfLength} colors={colors}/> : null}
            { chartInfo === "answer" ? <ChartCorrectAnswer datas={datas} userId={userId} createListOfLength={createListOfLength} colors={colors}/> : null}
            { chartInfo === "score" ? <ChartScore datas={datas} userId={userId} colors={colors} /> : null}
            { chartInfo === "message" ? <ChartMessage getAllMessages={getAllMessages} colors={colors} /> : null}
        </div>
    )
}

export default AdminDashBoard
