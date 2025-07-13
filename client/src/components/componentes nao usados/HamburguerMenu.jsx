import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MenuSandwich = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      {/* Botão hambúrguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group"
        aria-label="Abrir Menu"
      >
        {/* efeito de criar um X para fechar o menu */}
        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
    <div className="flex justify-between items-center p-4 bg-gray-900">
      {/* Título ou logo */}
      <h1 className="text-white font-bold text-xl">Magic Deck Builder</h1>

      {/* Menu desktop */}
      <nav className="hidden md:flex gap-6 text-white text-lg">
        <Link to="/search" className="hover:text-red-400 transition">Search</Link>
        <Link to="/Tutorials" className="hover:text-red-400 transition">Tutoriais</Link>
        <Link to="/projetos" className="hover:text-red-400 transition">item 1</Link>
        <Link to="/contacto" className="hover:text-red-400 transition">item 2</Link>
      </nav>

      {/* Menu mobile */}
      <div className="md:hidden relative z-50">
        {/* Botão hambúrguer */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group"
          aria-label="Abrir menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Menu lateral */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-lg`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} className="text-white text-2xl">&times;</button>
          </div>
          <nav className="flex flex-col items-start space-y-4 px-6 text-lg">
            <Link to="/search" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition">Search</Link>
            <Link to="/Tutorials" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition">Tutoriais</Link>
            <Link to="/projetos" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition">item 1</Link>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="hover:text-red-400 transition">item 2</Link>
          </nav>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MenuSandwich;

