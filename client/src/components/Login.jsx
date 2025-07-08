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
    

    // Formulario para o login
    // O formulario tem dois campos, um para o username e outro para a senha
    // Ao submeter o formulario, chama a funcao handleLogin
    // A funcao handleLogin resolve os dados do formulario e imprime os dados
    return (
        <div className="login-container">
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
            <label htmlFor="username">Username:</label> <br></br>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label> <br></br>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div> <br></br>
            <button type="submit">Login</button> 
        </form>
        </div>
    );
}

export default Login;