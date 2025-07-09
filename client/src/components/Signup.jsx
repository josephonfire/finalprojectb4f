import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password e Confirm Password precisam ser iguais.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username, 
          email, 
          password, 
          confirmPassword 
        }),
      });

      console.log("CENAS: ",response)
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Erro ao criar usuário");
        return;
      }

      alert(data.message || "Usuário criado com sucesso!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Erro no signup:", error);
      alert("Erro de rede, tente novamente.");
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="text-center text-gray-300 mb-4">
              <p className="text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-red-400 hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
            <div className="text-left">
              <label htmlFor="username">Username:</label> <br />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="text-left">
              <label htmlFor="email">Email:</label> <br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="text-left">
              <label htmlFor="password">Password:</label> <br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="text-left">
              <label htmlFor="confirmPassword">Confirm your password:</label>
              <br />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <br />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md transition-all duration-200 font-medium"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
    <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
      </>
  );
}

export default Signup;
