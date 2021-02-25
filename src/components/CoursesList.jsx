import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'

function CoursesList() {

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [urlSelectedCourse, setUrlSelectedCourse] = useState('');

    const {getAllCourses, getUrlCourse} = useAuth();

    useEffect(() => {  
        function createDatas(snapshot) {
            let res = []
            snapshot.forEach(function(doc) {
                res.push(doc.id);
            });
            setCourses(res);
        }

        async function fetchCourses() {
            const res = await getAllCourses();
            createDatas(res);
        }
        fetchCourses();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchUrl() {
            setUrlSelectedCourse("");
            if (selectedCourse !== "") {
                const doc = await getUrlCourse(selectedCourse);
                if (!doc.exists) console.log(`Document (${selectedCourse}) doesn't exist`);
                else {
                    const d = doc.data();
                    setUrlSelectedCourse(d.url);
                }
            }
        }
        fetchUrl();
        // eslint-disable-next-line
    }, [selectedCourse])

    return (
        <div className="d-flex flex-column">
            <h2>Courses / Formations</h2>
            <select onChange={(event) => setSelectedCourse(event.target.value)}>
                <option value="">Select a Course</option>
                {
                    courses.map(
                        (elem, index) => <option value={elem} key={index}>{elem}</option>
                    )
                }
            </select>
            {
                (selectedCourse !== "" && urlSelectedCourse !== "") && 
                    <Button className="m-2" onClick={() => window.open(urlSelectedCourse, "_blank")}>Open url : {urlSelectedCourse}</Button>
            }
        </div>
    )
}

export default CoursesList
