import { useSearchParams } from "react-router-dom";
import { useState } from "react";

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
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-4">Criar Novo Deck para {username}</h1>

      {/* Formulario para nome do deck*/}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nome do Deck:</label>
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
          Criar Deck
        </button>
      </form>

      {/* Busca de cartas */}

      <div className="mt-8">
        <label className="block mb-2">Buscar Cartas (Scryfall):</label>
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
          Buscar
        </button>
      </div>

      {/* Resultado da busca */}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchResults.map((card) => (
          <div key={card.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-bold">{card.name}</h2>
            <img
              src={card.image_uris?.normal || card.image_uris?.large}
              alt={card.name}
              className="w-full h-auto mb-2"
            />
            <button
              onClick={() => handleAddCard(card)}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Adicionar ao Deck
            </button>
          </div>
        ))}
      </div>

      {/* Cartas Adicionadas */}

      <div className="mt-8">
        <h2 className="text-2xl mb-4">Cartas no Deck:</h2>
        {deckCards.length === 0 ? (
          <p>Nenhuma carta adicionada ainda.</p>
        ) : (
          <ul className="list-disc ml-6">
            {deckCards.map((card, index) => (
              <li
                className="flex items-center"
                key={`${card.id}-${index}`}
              >
                {card.name}
                <button onClick={() => handleRemoveCard(card.id)} className="ml-4 bg-red-600 px-2 py-1 rounded hover:bg-red-800 transition text-white">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CreateDeck;
