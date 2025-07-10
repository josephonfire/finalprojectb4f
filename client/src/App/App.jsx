import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import SearchPage from "../pages/Search";
import Tutorials from "../pages/Tutorials";
import Profile from "../pages/Profile";
import Graphs from "../pages/Graficos";
import MagicFireBackground from "../components/MagicFireBG/MagicFireBg";
import CreateDeck from "../pages/CreateDeck";
import ProfileTest from "../pages/ProfileTest";
import CardDetails from "../components/CardDetails";

function App() {
  return (
    <Router>
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/your-background.jpg')" }}
      >
        {/* Fagulhas entre o fundo e o conteúdo */}
        <MagicFireBackground />
        <div className="relative z-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/search/:name" element={<SearchPage />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/graficos" element={<Graphs />} />
            <Route path="/create-deck" element={<CreateDeck />} />
            <Route path="/profile-test" element={<ProfileTest />} />
            <Route path="/card/:cardId" element={<CardDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
