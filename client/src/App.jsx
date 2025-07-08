import './App.css';
import CardSearch from './components/CardSearch';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import Home from './pages/Home';
import LoginPage from './pages/Login';
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
