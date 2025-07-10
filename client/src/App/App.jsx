import "./App.css";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import SearchPage from "../pages/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tutorials from "../pages/Tutorials";
import Profile from "../pages/Profile";
import Graficos from "../pages/Graficos";
import MagicFireBackground from "../components/MagicFireBG/MagicFireBg";
import CreateDeck from "../pages/CreateDeck";
import React from "react";
import ProfileTest from "../pages/ProfileTest";
import CardDetails from "../components/CardDetails";

//<>

function App() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      {/* Fagulhas entre o fundo e o conteúdo */}
      <MagicFireBackground />
      <div className="relative z-20">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="search/:name" element={<SearchPage />} />
            <Route path="/Tutorials" element={<Tutorials />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/graficos" element={<Graficos />} />
            <Route path="/create-deck" element={<CreateDeck />} />
            <Route path="/profile-test" element={<ProfileTest />} />
            <Route path="/card/:cardId" element={<CardDetails />} />
          </Routes>
          <div className="App"></div>
        </Router>
      </div>
    </div>
  );
}

export default App;
