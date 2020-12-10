import './App.css';
import Quizz from './components/Quizz';
import questionnaire from './datas/questionnaire.json'

function App() {
  return (
    <div className="App">
      <h1>E-learning</h1>
      <Quizz questionnaire={questionnaire}/>
    </div>
  );
}

export default App;
