import './App.css';
import Signup from './components/authentification/Signup';
import Login from './components/authentification/Login';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight : "90vh"}}>
          <div className="w-100" style={{maxWidth: '800px'}}>
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/login" component={Login}/>
                </Switch>
          </div>  
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
