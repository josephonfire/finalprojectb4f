import GraficoPage from "../components/Graficos";
import Login from "../components/Login Form/Login"
import NavBarHome from "../components/NavBarHome";
import Signup from "../components/Signup";
import AppBar from "../AppNav"


// Pagina do login do site. 
// Importante: o servidor deve estar rodando na porta 3030 para que a API funcione corretamente

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
