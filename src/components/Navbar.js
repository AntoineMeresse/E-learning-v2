import React, {useState} from 'react'
import { Link } from 'react-router-dom' 
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import './Navbar.css';

function Navbar({setHome}) {
    
    const [error , setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.push('/login');
        }
        catch {
            setError('Failed to logout');
        }

    }
    
    return (
        <div className="navbar">
            <ul className="ul_items">
                <li className="nav-item" onClick={() => setHome(0)}><Link to="/">Home</Link></li>
                { currentUser ? 
                    (
                        <>
                            <li className="nav-item"><Link to="/admin">Admin Dashboard</Link></li>
                            <li className="nav-item">
                                <span>{currentUser.email}</span>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) 
                    :
                    (
                        <>
                        <li className="nav-item"><Link to="/login">Log in</Link></li>
                        <li className="nav-item"><Link to="/signup">Sign up</Link></li>
                        </>
                    )
                }
            </ul>
        </div>
    )
}

export default Navbar
