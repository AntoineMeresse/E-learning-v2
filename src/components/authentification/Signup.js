import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Signup() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const lastnameRef = useRef()
    const firstnameRef = useRef()

    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password are not the same");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, firstnameRef.current.value, lastnameRef.current.value);
            history.push('/');
        }
        catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id="firstname">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" required ref={firstnameRef}/>
                        </Form.Group>
                        <Form.Group id="lastname">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" required ref={lastnameRef}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" required ref={passwordConfirmRef}/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <p>Already have an account ? <Link to="/login">Log In</Link></p>
            </div>
        </>
    )
}

export default Signup
