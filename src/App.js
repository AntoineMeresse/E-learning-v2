import './App.css';
import Signup from './components/authentification/Signup';
import Quizz from './components/Quizz';
import questionnaire from './datas/questionnaire.json'

function App() {
  return (
    <div className="App">
      {/*
      <h1>E-learning</h1>
      <Quizz questionnaire={questionnaire}/>
      */}
      <Signup/>
    </div>
  );
}

export default App;
