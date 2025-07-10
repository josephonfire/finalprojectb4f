import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import NavBarHome from "../components/NavBarHome";
import '../index.css';
import { motion } from "framer-motion";

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
    setDeckCards((prev) => [...prev, card]);
  };

  const handleRemoveCard = (cardId) => {
    setDeckCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const deck = {
      name: deckName,
      user: username,
      cards: deckCards,
      createdAt: new Date().toISOString(),
    };
    const existingDecks = JSON.parse(localStorage.getItem("decks")) || [];
    localStorage.setItem("decks", JSON.stringify([...existingDecks, deck]));
    alert("Deck salvo com sucesso!");
    console.log(`Deck "${deckName}" criado para o usuário ${username}`);
  };

  return (
    <>
      <NavBarHome />
      <div className="p-8 text-white text-center">
        <h1 className="text-3xl mb-4">{username} create your new deck!</h1>

        {/* Formulario para nome do deck*/}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Deck Name:</label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="text-black px-4 py-2 rounded w-50 mb-4"
          />
          <button
            type="submit"
            className="bg-red-700 px-6 py-2 rounded hover:bg-red-900 transition m-2"
          >
            Create Deck
          </button>
        </form>

        {/* Busca de cartas Scrifall*/}

        <div className="mt-8">
          <label className="block mb-2">Search for the cards to add:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-black px-4 py-2 rounded w-50 mb-2"
          />
          <button
            onClick={searchCards}
            className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition m-2"
          >
            Search
          </button>
        </div>

        {/* Resultado da busca */}

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchResults.map((card) => (
            <div key={card.id} className="bg-white/10 p-4 rounded">
              <h2 className="text-sm font-bold mb-2">{card.name}</h2>
              <motion.img
                src={card.image_uris?.normal || card.image_uris?.large}
                alt={card.name}
                className="mx-auto rounded shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
              <div className="mt-2">
                <button
                  onClick={() => handleAddCard(card)}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-800 transition"
                >+</button>
                <button onClick={() => handleRemoveCard(card.id)} className="ml-4 bg-red-600 px-4 py-2 rounded hover:bg-red-800 transition text-white">-</button></div>
            </div>
          ))}
        </div>

        {/* Cartas Adicionadas */}

        <div className="mt-8">
          <h2 className="text-2xl mb-4"> Your Deck:</h2>
          {deckCards.length === 0 ? (
            <p>No cards added yet!</p>
          ) : (
            <ul className="list-disc ml-6">
              {deckCards.map((card, index) => (
                <li
                  className="flex items-center"
                  key={`${card.id}-${index}`}
                >
                  {card.name}
                  <button onClick={() => handleRemoveCard(card.id)} className="ml-4 mb-2 bg-red-600 px-2 py-0,5 rounded hover:bg-red-800 transition text-white">-</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
