import react from 'react';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Implementar a logica do login aqui, como enviar os dados, etc..
        console.log('Logging in with:', { username, password });
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
                        Login
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-left text-sm font-medium text-gray-200 mb-2">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-200 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-800 rounded-md bg-black backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 font-medium"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <span className="text-gray-200">Not a member?</span>
                        <a href="/signup" className="text-red-400 hover:underline ml-2">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;