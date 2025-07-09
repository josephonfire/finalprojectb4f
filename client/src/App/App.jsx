import './App.css';
import Home from '../pages/Home';
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
import SearchPage from '../pages/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tutorials from '../pages/Tutorials';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='search/:name' element={<SearchPage />} />
        <Route path='/Tutorials' element={<Tutorials/>}/>
      </Routes>
      <div className="App">
      </div>
    </Router>
  );
}

export default App;
