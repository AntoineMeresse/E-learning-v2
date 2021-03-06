import React from 'react'

import { Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom' 
import ChartMain from './admin-charts/ChartMain';
import ManageQuizz from './admin-quizz/ManageQuizz';
import CreateQuizz from './admin-quizz/CreateQuizz';
import CreateCourse from './admin-course/CreateCourse';


function AdminDashBoard() {
    return (
        <div className="admin-dashboard"> 

            <div className="admin-dashboard-nav">
                <Link to="/admin/charts"><Button className="w-25 mb-1 btn-primary mx-2">Charts</Button></Link>
                <Link to="/admin/quizz"><Button className="w-25 mb-1 btn-primary mx-2">Manage Quizz</Button></Link>
                <Link to="/admin/course"><Button className="w-25 mb-1 btn-primary mx-2">Add Course</Button></Link>
            </div>

            <Route path="/admin/charts" component={ChartMain}/>
            <Route exact path="/admin/quizz" component={ManageQuizz}/>
            <Route path="/admin/quizz/new" component={CreateQuizz}/>

            <Route path="/admin/course" component={CreateCourse}/>
        </div>
    )
}

export default AdminDashBoard
