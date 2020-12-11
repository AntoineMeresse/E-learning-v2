import './App.css';
import Signup from './components/authentification/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight : "100vh"}}>
      <div className="w-100" style={{maxWidth: '800px'}}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>  
    </Container>
  );
}

export default App;
