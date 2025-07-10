import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardSearch() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Digite o nome de uma carta.");
      return;
    }

    setError("");
    navigate(`/search/${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className="card-search w-full max-w-md p-4">
      <form
        onSubmit={handleSearch}
        className="relative mb-4 flex flex-col gap-3 w-full items-stretch"
        role="search"
      >
        <h1 className="text-2xl font-bold text-center text-white">Find your card</h1>

        <div className="relative w-full">
          <input
            className="flex-1 w-full rounded-2xl border border-gray-300 bg-black px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search card"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Search card name"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-600 hover:text-red-800 transition"
            aria-label="Search"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
    </div>
  );
}

export default CardSearch;
