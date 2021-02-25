import React from 'react'
import { Bar } from 'react-chartjs-2';

function ChartTimeToAnswer({datas, userId, createListOfLength, colors}) {

    const options = {
        title: {
            display: true,
            text: "Time to answer each question"
        },
        scales: {
            yAxes : [{
                ticks: {
                    min : 0,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time in Seconds '
                }
            }],
            xAxes : [{
                scaleLabel: {
                    display: true,
                    labelString: 'Question number'
                }
            }],
        }
    }

    function createDatasets(){
        let res = [];
        let index = 0;
        if (userId !== '') {
            for (const [, value] of Object.entries(datas.res[userId].datas)) {
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
        <Bar
            data = {{
                labels : createListOfLength(datas.questionNumber),
                datasets : createDatasets(),
            }} 
            options = {options}
        />
    )
}

export default ChartTimeToAnswer;
