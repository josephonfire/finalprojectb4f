import GraficoPage from "../components/Graficos";
import Login from "../components/Login Form/Login"
import Signup from "../components/Signup";

function LoginPage() {
  return (
    <>
      <div className="App">
        <GraficoPage/> <br />
       
      </div>
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default LoginPage;
