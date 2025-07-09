import './App.css';
import Home from '../pages/Home';
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <div className="App">
      </div>
    </Router>
  );
}

export default App;
