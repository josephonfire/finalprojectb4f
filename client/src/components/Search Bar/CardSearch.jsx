import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardSearch() {
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  const handleSearch = async (e) => {
    e.preventDefault();

    try { 
      // Redireciona para a página de resultados, passando o nome da carta como parâmetro de URL
      navigate(`/search/${encodeURIComponent(name)}`);
      // Não faz a requisição aqui; a próxima página irá buscar e mostrar os dados da carta
      return;
    } catch (err) {
      setCard(null);
      setError("Carta não encontrada!");
    }
  };

  return (
    <div className="card-search mb-0 w-full max-w-md p-4">
      <form onSubmit={handleSearch} className="relative mb-4 flex flex-col gap-3 w-full items-stretch">
        <h1 className="text-2xl font-bold text-center text-white">Find your card</h1>
        
        <div className="relative w-full">
          <input
            className="flex-1 w-full rounded border border-gray-300 bg-black px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search card"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-600 hover:text-red-800 transition"
            tabIndex={-1}
          >
            <FaSearch size={20} />
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {card && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-2 text-white">{card.name}</h2>
          <p className="mb-4">{card.oracle_text || "No description available."}</p>
          <img
            src={card.image_uris?.normal}
            alt={card.name}
            className="mx-auto rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default CardSearch;
