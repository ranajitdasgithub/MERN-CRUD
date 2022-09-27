import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Notes from './Components/Notes';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/notes" element={<Notes/>}/>
      </Routes>
    </div>
  );
}

export default App;
