import React from 'react'
import { Bar } from 'react-chartjs-2';

function ChartCorrectAnswer({datas, userId, createListOfLength, colors}) {
    
    const options = {
        title: {
            display: true,
            text: "Correct Answers (1 if correct, else 0)"
        },
        scales: {
            yAxes : [{
                ticks: {
                    min : 0,
                    max : 1,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Correct answer : 1 | Bad answer : 0'
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
            options = {options}
        />
    )
}

export default ChartCorrectAnswer;