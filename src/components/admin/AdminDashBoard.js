import React from 'react'

import { Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom' 
import ChartMain from './admin-charts/ChartMain';
import ManageQuizz from './admin-quizz/ManageQuizz';


function AdminDashBoard() {
    return (
        <div className="admin-dashboard"> 

            <div className="admin-dashboard-nav">
                <Link to="/admin/charts"><Button className="w-25 mb-1 btn-primary mx-2">Charts</Button></Link>
                <Link to="/admin/quizz"><Button className="w-25 mb-1 btn-primary mx-2">Manage Quizz</Button></Link>
            </div>

            <Route path="/admin/charts" component={ChartMain}/>
            <Route path="/admin/quizz" component={ManageQuizz}/>
        </div>
    )
}

export default AdminDashBoard
