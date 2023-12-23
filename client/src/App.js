
import './App.css';
import SignIn from './components/SignIn';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<SignIn/>}/>


      </Routes>
    </Router>
  );
}

export default App;
