import React from 'react'
import { Line } from 'react-chartjs-2';

function ChartScore({datas, userId, colors}) {
    
    const options = {
        title: {
            display: true,
            text: "Score Evolution over time"
        },
        scales: {
            yAxes : [{
                ticks: {
                    min : 0,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Score'
                }
            }],
            xAxes : [{
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
        }
    }

    function generateDatas(){
        let score = [];
        let dates = [];
        if (userId !== '') {
            for (const [, value] of Object.entries(datas.res[userId].datas)) {
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
    
    return (
        <Line 
            data = { generateDatas() } 
            options={options} 
        />
    )
}

export default ChartScore
