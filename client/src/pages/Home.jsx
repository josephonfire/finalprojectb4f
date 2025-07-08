import CardSearch from "../components/Search Bar/CardSearch";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


function Home() {
  const navigate = useNavigate();
  const [topCards, setTopCards] = useState([]);

  console.log(topCards);
  useEffect(() => {
    fetch("http://localhost:3030/api/cards/top3")
      .then(res => res.json())
      .then(data => setTopCards(data))
      .catch(err => console.error(err));
  }, []);

  // Header fixo no topo
  const Header = () => (
    <header className="w-full flex justify-end items-center px-6 py-4 bg-transparent fixed top-0 left-0 z-20">
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-red-700 hover:scale-105 hover:text-white transition duration-300 font-medium shadow-lg"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-5 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition font-medium shadow"
        >
          Sign up
        </button>
      </div>
    </header>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 pt-20">
      <Header />
      {/* Banner */}
      { /* Adicionar algum banner aqui depois */ }

      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Magic: The Gathering
          </h1>
          <p className="text-xl mb-2 text-gray-200">
            Search for your favorite cards
          </p>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
            Use the search bar below to find cards by name, type, or set.
          </p>
        </div>

        {/* Componente de busca */}
        <div className="mb-0 flex justify-center">
          <CardSearch />
        </div>

        {/* New to Magic + Get Started */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
          <span className="text-lg sm:text-xl font-medium text-white">New to Magic?</span>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300 font-medium shadow-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Top 3 Cartas */}
      <div className="mt-12 w-full max-w-4xl mx-auto"> 
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Top 3 Today's Searches</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {topCards.map((card, idx) => (
            <div key={card.name} className="bg-white/10 rounded-lg p-4 shadow-lg flex-1 text-center">
              <div className="text-lg font-bold text-white mb-2">{idx + 1}º - {card.name}</div>
              <img src={card.image} alt={card.name} className="mx-auto rounded shadow mb-2 h-40 object-contain" />
              <div className="text-gray-300 text-sm">Searches today: {card.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </div>
  );
}

export default Home;
