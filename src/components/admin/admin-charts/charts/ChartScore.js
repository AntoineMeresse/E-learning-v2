import React from 'react'
import { Line } from 'react-chartjs-2';

function ChartScore({datas, userId, colors}) {
    
    function generateDatas(){
        let score = [];
        let dates = [];
        if (userId !== '') {
            for (const [key, value] of Object.entries(datas.res[userId].datas)) {
                dates.push(value.dateString);
                score.push(value.score);
            }
        }
        const res = {
            labels : dates,
            datasets : [{
                label : "Score",
                data : score,
                backgroundColor: colors,
            }],
        };
        console.log("res ==>", res)
        return res;
    }

    function generateOptions(){
        const options = {
            scales: {
                ticks: {
                    beginAtZero : true,
                }
            }
        }
        return options;
    }
    
    return (
        <Line data = { generateDatas() } options={generateOptions} />
    )
}

export default ChartScore
