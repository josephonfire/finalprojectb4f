import Login from "../components/Login Form/Login"
import Signup from "../components/Signup";

function LoginPage() {
  return (
    <div className="App">
      <Login/> <br />
     Not a member?  <button> Register now!</button>

     <Signup></Signup>
    </div>
  );
}

export default LoginPage;
