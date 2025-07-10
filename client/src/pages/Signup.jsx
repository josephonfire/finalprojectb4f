import Signup from "../components/Signup";
import NavBarHome from "../components/NavBarHome";

function SignUpPage() {
  return (
    <>
    <header><NavBarHome/></header>
      <div className="App">
        <Signup/> <br />
       
      </div>
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default SignUpPage;
