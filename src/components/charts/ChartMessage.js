import React from 'react'
import { Doughnut } from 'react-chartjs-2';

function ChartMessage() {
    
    const datas = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };
      
    return (
        <div className="chart-message">
            <h1>Chart Message</h1>
            <Doughnut
                data = {datas}
            />
        </div>
    )
}

export default ChartMessage
