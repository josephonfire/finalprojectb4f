import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import NavBarAndSearch from "../components/NavBarAndSearch";
import "../index.css";
import { motion } from "framer-motion";

function CardResult({ card, onAdd, onRemove }) {
  return (
    <div
      className="relative bg-white/10 p-4 rounded-xl shadow-md transition-transform hover:scale-105 hover:bg-white/20 group cursor-pointer border border-white/10"
    >
      <h2 className="text-sm font-bold mb-2 text-center text-white">
        {card.name}
      </h2>
      <img
        src={card.image_uris?.normal || card.image_uris?.large}
        alt={card.name}
        className="relative rounded-lg shadow max-w-full mx-auto"
      />
      <div className="mt-2 flex justify-center gap-2">
        <button
          onClick={() => onAdd(card)}
          className="bg-green-600 px-4 py-1 rounded hover:bg-green-800 transition border border-white/10"
        >
          +
        </button>
        <button
          onClick={() => onRemove(card.id)}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-800 transition border border-white/10"
        >
          -
        </button>
      </div>
    </div>
  );
}

function DeckSidebar({ deckCards, onRemove }) {
  return (
    <aside className="bg-white/10 border-l border-red-800 p-6 overflow-y-auto shadow-md sticky top-24 h-[calc(100vh-6rem)] hidden lg:block min-w-[300px] rounded-l-xl border-t border-b border-white/10">
      <h2 className="text-xl font-bold mb-4 border-b border-red-700 pb-2 text-white">
        Current Deck
      </h2>
      {deckCards.length === 0 ? (
        <p className="text-white/70 italic">No cards added yet.</p>
      ) : (
        <ul className="space-y-3">
          {deckCards.map((card, index) => (
            <li
              key={`${card.id}-${index}`}
              className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition border border-white/5"
            >
              <span className="text-sm font-medium text-white truncate max-w-[150px]">{card.name}</span>
              <button
                onClick={() => onRemove(card.id)}
                className="bg-red-600 px-2 py-1 text-xs rounded hover:bg-red-800 transition border border-white/10"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function CreateDeck() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const [deckName, setDeckName] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deckCards, setDeckCards] = useState([]);

  const searchCards = async () => {
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (data?.data) {
      setSearchResults(data.data);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddCard = (card) => {
    const count = deckCards.filter((c) => c.id === card.id).length;
    if (count >= 4) {
      alert("You can't add more than 4 copies of the same card!");
      return;
    }
    setDeckCards((prev) => [...prev, card]);
  };

  const handleRemoveCard = (cardId) => {
    const indexToRemove = deckCards.findIndex((card) => card.id === cardId);
    if (indexToRemove !== -1) {
      const newDeck = [...deckCards];
      newDeck.splice(indexToRemove, 1);
      setDeckCards(newDeck);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deck = {
      name: deckName,
      user: username,
      cards: deckCards,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("http://localhost:3030/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deck),
      });
      if (res.ok) {
        alert("Deck salvo com sucesso!");
        // Redirecionar ou limpar formulário se quiser
      } else {
        alert("Erro ao salvar deck!");
      }
    } catch (err) {
      alert("Erro de rede ao salvar deck!");
    }
  };

  return (
    <>
      <NavBarAndSearch />
      {/* Remover overlay pesado, manter background padrão do body */}
      <div className="relative z-10 pt-24 grid grid-cols-1 lg:grid-cols-[1fr_350px] min-h-screen text-white">
        {/* Conteúdo principal */}
        <div className="p-8 bg-white/10 rounded-xl shadow-md max-w-5xl mx-auto w-full mb-8 lg:mb-0 border border-white/10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center text-white">
            {username}, <br /> create your new deck!
          </h1>
          {/* Nome do deck */}
          <form onSubmit={handleSubmit} className="mb-6">
            <label className="block mb-2 font-semibold text-white/80">Deck Name:</label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="text-black px-4 py-2 rounded w-full mb-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter deck name"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-700 px-6 py-2 rounded hover:bg-red-900 transition mt-2 border border-white/10 font-semibold"
              >
                Create Deck
              </button>
            </div>
          </form>
          {/* Buscar carta */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-white/80">
              Search for cards:
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-black px-4 py-2 rounded flex-1 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ex: Lightning Bolt"
              />
              <button
                onClick={searchCards}
                className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition border border-white/10 font-semibold"
              >
                Search
              </button>
            </div>
          </div>
          {/* Resultados da busca */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((card) => (
              <CardResult
                key={card.id}
                card={card}
                onAdd={handleAddCard}
                onRemove={handleRemoveCard}
              />
            ))}
          </div>
        </div>
        {/* SIDEBAR - Deck atual, responsiva */}
        <div className="lg:static lg:block w-full">
          <DeckSidebar deckCards={deckCards} onRemove={handleRemoveCard} />
        </div>
      </div>
      {/* Sidebar mobile: aparece abaixo do conteúdo principal */}
      <div className="block lg:hidden p-4">
        <DeckSidebar deckCards={deckCards} onRemove={handleRemoveCard} />
      </div>
    </>
  );
}

export default CreateDeck;
