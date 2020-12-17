import React, { useState } from 'react'

import { Bar } from 'react-chartjs-2';

function AdminDashBoard() {

    const [quizzId, setQuizzId] = useState('');
    const [userId, setUserId] = useState('');
     
    return (
        <div className="admin-dashboard">
            <p>Quizz id : {quizzId}</p>
            <p>User id : {userId}</p>

            <Bar
                data = {{
                    labels : ['1', '2', '3'],
                    datasets: [
                        {
                            label : 'resultats',
                            data : [12,2,8],
                            backgroundColor : 'blue',
                        }
                    ]
                }} 
            />
        </div>
    )
}

export default AdminDashBoard
