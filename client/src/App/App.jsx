import './App.css';
import CardSearch from '../components/Search Bar/CardSearch.jsx';
import ChatBot from '../components/ChatBot.jsx';
import Login from '../components/Login Form/Login.jsx';
import Home from '../pages/Home.jsx';
import LoginPage from '../pages/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div className="App">
      </div>
    </Router>
  );
}

export default App;
