import './App.css';
import Home from '../pages/Home';
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import SearchPage from '../pages/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tutorials from '../pages/Tutorials';
import Profile from '../pages/Profile';
import MagicFireBackground from '../components/MagicFireBG/MagicFireBg';
import React from 'react';



//<>

function App() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
      {/* Fagulhas entre o fundo e o conteúdo */}
      <MagicFireBackground />
      <div className="relative z-20">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path='search/:name' element={<SearchPage />} />
            <Route path='/Tutorials' element={<Tutorials />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/:username' element={<Profile />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
          <div className="App">
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
