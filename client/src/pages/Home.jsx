import CardSearch from "../components/Search Bar/CardSearch";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import mtg_logo_duocolor from "../images/mtg_logo_duocolor.svg"
import NavBarHome from "../components/NavBarHome";
import '../index.css';


// Pagina inicial do site, onde o usuario pode pesquisar cartas, ver as 3 cartas mais pesquisadas do dia e acessar o login e cadastro
// Importante: o servidor deve estar rodando na porta 3030 para que a API funcione corretamente



function Home() {
  const navigate = useNavigate();
  const [topCards, setTopCards] = useState([]); // Adicionado mas lembrar de adicionar depois

  useEffect(() => {
    fetch("http://localhost:3030/api/cards/top3") // Endpoint para buscar as 3 cartas mais pesquisadas do dia
      .then(res => res.json())
      .then(data => setTopCards(data))
      .catch(err => console.error(err));
  }, []);

  
  // Header fixo no topo
  // const Header = () => (
  //   <header className="w-full flex justify-end items-center px-6 py-4 bg-transparent top-0 left-0 z-20">
  //     <div className="flex gap-4">
  //       <button
  //         onClick={() => navigate('/login')}
  //         className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-700 hover:scale-105 hover:text-white transition duration-300 font-medium shadow-lg"
  //       >
  //         Login
  //       </button>
  //       <button
  //         onClick={() => navigate('/signup')}
  //         className="px-5 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition font-medium shadow"
  //       >
  //         Sign up
  //       </button>
  //     </div>
  //   </header>
  // );

  return (
  <>
    <NavBarHome />
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-12 pt-0">
      {/* Banner */}
      {/* Adicionar algum banner aqui depois */}

      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <img
            src={mtg_logo_duocolor}
            alt="MtG Deck Builder Logo"
            className="mx-auto w-56 sm:w-64 md:w-72 drop-shadow-[0_0_8px_rgba(255,0,0,0.75)]"
          />

          <p className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-200">
            Search for your favorite cards
          </p>
          <p className="mt-3 text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Use the search bar below to find cards by name, type, or set.
          </p>
        </div>

        {/* Componente de busca */}
        <div className="mb-8 flex justify-center">
          <CardSearch />
        </div>

        {/* New to Magic / Get started / Tools buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="text-lg sm:text-xl font-medium text-white select-none">
            New to Magic?
          </span>
          <button
            onClick={() => navigate("/tutorials")}
            className="px-8 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/lifecounter")}
            className="px-8 py-3 bg-white text-black rounded-lg shadow-lg hover:scale-105 hover:text-gray-900 transition-transform duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Tools
          </button>
        </div>
      </div>

      {/* Top 3 Cartas
      <div className="mt-12 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Top 3 Today's Searches</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {topCards.map((card, idx) => (
            <div key={card.name} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg flex-1 text-center">
              <div className="text-lg font-bold text-white mb-2">{idx + 1}º - {card.name}</div>
              <img src={card.image} alt={card.name} className="mx-auto rounded shadow mb-2 h-40 object-contain" />
              <div className="text-gray-300 text-sm">Searches today: {card.usage}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Rodapé */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
      </div>
  </>);
}

export default Home;
