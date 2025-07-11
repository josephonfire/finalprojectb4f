import React from 'react';
import { Link } from 'react-router-dom';
import {graficos} from './Graficos'
function Navbar() {
  return (
    <nav className="bg-white shadow-md">
        <h1 className="text-xl font-bold text-indigo-600">Graficos</h1>
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-center items-center">

        <ul className="flex gap-12 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-indigo-600">Início</Link></li>
          <li><Link to="/graficos" className="hover:text-indigo-600">Gráficos</Link></li>
          <li><Link to="/cartas" className="hover:text-indigo-600">Cartas</Link></li>
          <li><Link to="/configuracoes" className="hover:text-indigo-600">Configurações</Link></li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;