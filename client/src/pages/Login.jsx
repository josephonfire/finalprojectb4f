import Login from "../components/Login Form/Login";
import NavBarHome from "../components/NavBarHome";

// Pagina do login do site. 
// Importante: o servidor deve estar rodando na porta 3030 para que a API funcione corretamente

function LoginPage() {
  return (
    <>
      <header>
        <NavBarHome />
      </header>
      <div className="App">
        <Login /> <br />
      </div>
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default LoginPage;
