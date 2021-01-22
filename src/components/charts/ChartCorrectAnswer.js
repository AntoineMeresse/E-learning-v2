import React from 'react'
import { Bar } from 'react-chartjs-2';

function ChartCorrectAnswer({datas, userId, createListOfLength, colors}) {
    
    function createDatasets(){
        let res = [];
        let index = 0;
        if (userId !== '') {
            for (const [key, value] of Object.entries(datas.res[userId].datas)) {
                let tmp = {
                    label : value.dateString,
                    data : value.answers,
                    backgroundColor : colors[index],
                };
                index++;
                res.push(tmp);
            }
        }
        return res;
    }
    
    return (
        <Bar
            data = {{
                labels : createListOfLength(datas.questionNumber),
                datasets : createDatasets(),
            }} 
        />
    )
}

export default ChartCorrectAnswer;