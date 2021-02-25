import React, {useRef} from 'react'
import { Card, Form, Button} from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router-dom'

function CreateCourse() {
    
    const nameRef = useRef();
    const urlRef = useRef();

    const { saveNewCourse } = useAuth();
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await saveNewCourse(nameRef.current.value, urlRef.current.value);
            history.push('/admin')
        }
        catch {
            console.log("Error creating course");
        }
    }

    return (
        <Card>
            <Card.Body>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nom :</Form.Label>
                        <Form.Control type="text" required ref={nameRef}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Url :</Form.Label>
                        <Form.Control type="text" required ref={urlRef}/>
                    </Form.Group>
                    <Button type="submit">Add course</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CreateCourse
