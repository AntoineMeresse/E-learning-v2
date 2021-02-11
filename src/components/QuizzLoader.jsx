import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

import Quizz from './Quizz';
import QuizzCollectif from './QuizzCollectif'

function QuizzLoader({quizzId, userId , questionnaire, setHome, userName, collectif}) {
    
    const [quizz, setQuizz] = useState([])
    const { getAllQuizz, getDatasQuizz } = useAuth();

    const [selectedQuizz, setSelectedQuizz] = useState("");
    const [datas, setDatas] = useState([]);
    
    async function fetchAllQuizz() {
        if (quizz.length === 0) {
            const doc = await getAllQuizz();
            createDatas(doc);
        }
    }

    function createDatas(snapshot) {
        let res = []
        snapshot.forEach(function(doc) {
            res.push(doc.id);
        });
        setQuizz(res);
    }

    useEffect(() => {
        fetchAllQuizz();
        // eslint-disable-next-line
    }, [])

    async function fetchDataQuizz() {
        if(selectedQuizz !== "") {
            const doc = await getDatasQuizz(selectedQuizz);
            if (!doc.exists) console.log(`Document (${selectedQuizz}) doesn't exist`);
            else {
                const d = doc.data();
                console.log(`Document (${selectedQuizz}) data:`, d);
                setDatas(d.data);
                console.log(datas);
            }
        }
    }

    useEffect(() => {
        fetchDataQuizz();
    }, [selectedQuizz])
    
    return (
        <div>
            {
                datas.length === 0 ? 
                (
                    <select value={selectedQuizz} onChange={(event) => setSelectedQuizz(event.target.value)} className="w-100 my-2">   
                        <option value=''>Select a Quizz</option>
                        {
                            quizz.map((elem, index) => <option value={elem} key={index}>{elem}</option>)
                        }
                    </select>
                ) : 
                (
                    !collectif ? 
                    (
                        <Quizz quizzId={selectedQuizz} userId={userId} questionnaire={datas} setHome={setHome} userName={userName} collectif={false}/>
                    )
                    :
                    (
                        <QuizzCollectif quizzId={selectedQuizz} userId={userId} questionnaire={datas} setHome={setHome} userName={userName} collectif={true}/>
                    )    
                )
            }
        </div>
    )
}

export default QuizzLoader
