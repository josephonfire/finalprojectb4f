import React, { useState } from "react";
import axios from "axios";

function CardSearch() {
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3030/api/card?name=${encodeURIComponent(name)}`
      );
      setCard(response.data);
      setError("");
    } catch (err) {
      setCard(null);
      setError("Carta não encontrada!");
    }
  };

  return (
    <div className="card-search mb-8 w-full max-w-md p-4">
      <form onSubmit={handleSearch} className="relative mb-4 flex flex-col gap-4 w-full items-stretch">
        <h1 className="text-2xl font-bold text-center">Find your card</h1>
        
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border border-gray-300 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:outline-2 focus:outline-red-700 active:outline-red-900"
            placeholder="Search card"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-900 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {card && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-2">{card.name}</h2>
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
