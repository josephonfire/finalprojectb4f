import GraficoPage from "../components/Graficos";
import Login from "../components/Login Form/Login"
import NavBarHome from "../components/NavBarHome";
import Signup from "../components/Signup";
import AppBar from "../AppNav"

function LoginPage() {
  return (
    <>
      <div className="App">
        <AppBar/> <br />
       
      </div>
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default LoginPage;
