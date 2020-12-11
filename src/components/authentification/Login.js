import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Login() {
    
    const emailRef = useRef()
    const passwordRef = useRef()

    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
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
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <p>Need an account ? <Link to="/signup">Sign Up</Link> </p>
            </div>
        </>
    )
}

export default Login
