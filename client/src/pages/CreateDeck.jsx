import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
        src={card.image_uris?.normal || card.image_uris?.large || "/default-card.png"}
        alt={card.name}
        className="mx-auto rounded shadow-lg"
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

function DeckSidebar({ deckCards, onRemove, onSave, onClear, deckName, setDeckName }) {
  return (
    <aside className="bg-white/10 border-l border-red-800 p-6 overflow-y-auto shadow-md sticky top-24 h-[calc(100vh-6rem)] hidden lg:block min-w-[300px] rounded-l-xl border-t border-b border-white/10">
      <h2 className="text-xl font-bold mb-4 border-b border-red-700 pb-2 text-white">
        Current Deck
      </h2>
      <input
        type="text"
        value={deckName}
        onChange={e => setDeckName(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded bg-black/60 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
        placeholder="Enter deck name"
      // Permite manter o nome ao editar, não obriga alteração
      />
      {deckCards.length === 0 ? (
        <p className="text-white/70 italic">No cards added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {deckCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="relative group border border-white/10 rounded-lg overflow-hidden bg-black/40 flex flex-col items-center p-2">
                <motion.img
                  src={card.image_uris?.normal || card.image_uris?.large || "/default-card.png"}
                  alt={card.name}
                  className="mx-auto rounded shadow-lg"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3 + Math.random(), // entre 3 e 4 segundos
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                <div className="w-full text-center text-xs font-semibold text-white mt-1 truncate px-1">
                  {card.name}
                </div>
                <button
                  onClick={() => onRemove(card.id)}
                  className="absolute top-1 right-1 bg-red-700 text-xs px-2 py-0.5 rounded opacity-80 group-hover:opacity-100 transition border border-white/20"
                  title="Remove card"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={onSave}
              className="w-full py-2 rounded-lg bg-green-800 hover:bg-green-900 text-white font-bold shadow-sm transition-all duration-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-900"
            >
              Save Deck
            </button>
            <button
              onClick={onClear}
              className="w-full py-2 rounded-lg bg-red-700 hover:bg-red-900 text-white font-bold shadow-sm transition-all duration-200 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              Delete All
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

function CreateDeck() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get("user");
  const cardParam = searchParams.get("card");
  const editId = searchParams.get("edit");
  const [deckName, setDeckName] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deckCards, setDeckCards] = useState([]);

  useEffect(() => {
    async function fetchFullCards(cards) {
      // Busca dados completos para cartas que não têm image_uris
      return Promise.all(
        cards.map(async (card) => {
          if (card.image_uris) return card;
          // Buscar na Scryfall pelo ID
          try {
            const res = await fetch(`https://api.scryfall.com/cards/${card.id}`);
            if (!res.ok) return card;
            const data = await res.json();
            return data;
          } catch {
            return card;
          }
        })
      );
    }
    if (editId) {
      fetch(`http://localhost:3030/api/decks/${editId}`)
        .then(res => res.json())
        .then(async data => {
          setDeckName(data.name || "");
          if (Array.isArray(data.cards) && data.cards.length > 0) {
            const fullCards = await fetchFullCards(data.cards);
            setDeckCards(fullCards);
          } else {
            setDeckCards([]);
          }
        });
    }
  }, [editId]);

  useEffect(() => {
    if (cardParam) {
      // Buscar a carta na API Scryfall pelo nome
      fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardParam)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.id) {
            setDeckCards(prev => {
              // Evitar duplicatas
              if (prev.some(card => card.id === data.id)) return prev;
              return [...prev, data];
            });
          }
        });
    }
  }, [cardParam]);

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
      const url = editId
        ? `http://localhost:3030/api/decks/${editId}`
        : "http://localhost:3030/api/decks";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deck),
      });
      if (res.ok) {
        alert("Deck salvo com sucesso!");
        // Se o deck tiver mais de 10 cartas, redireciona para o perfil
        if (deckCards.length > 10 && username) {
          navigate(`/profile/${username}`);
        }
        // Redirecionar ou limpar formulário se quiser
      } else {
        alert("Erro ao salvar deck!");
      }
    } catch (err) {
      alert("Erro de rede ao salvar deck!");
    }
  };

  // Adicionar handlers para salvar e limpar deck
  const handleSaveDeck = async () => {
    if (!deckName) {
      alert("Please enter a deck name before saving.");
      return;
    }
    await handleSubmit({ preventDefault: () => { } });

  };
  const handleClearDeck = () => {
    if (window.confirm("Are you sure you want to remove all cards from this deck?")) {
      setDeckCards([]);
    }
  };

  return (
    <>
      <NavBarAndSearch />
      {/* Remover overlay pesado, manter background padrão do body */}
      <div className="relative z-10 pt-24 grid grid-cols-1 lg:grid-cols-[1fr_350px] min-h-screen text-white mx-3">
        {/* Conteúdo principal */}
        <div className=" p-8 bg-white/10 rounded-xl shadow-md max-w-5xl w-full  border border-white/10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center text-white">
            Welcome to your Deck Builder, <br />{username}
          </h1>
          {/* (input de nome de deck movido para a sidebar) */}
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
                className="text-black px-4 py-2 rounded flex-1 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-900"
                placeholder="Type card name..."
              />
              <button
                onClick={searchCards}
                className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition border border-white/10 font-semibold"
              >
                Search
              </button>
            </div>
          </div>

          {/* NOVO: Texto de resultados */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Results for: <span className="text-red-400">{query}</span>
            </h1>
            <p className="text-gray-300">
              {searchResults.length} Card{searchResults.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Resultados da busca */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((card, index) => (
              <motion.div
                key={card.id}
                className="group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="h-72 bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20 cursor-pointer hover:border-red-400/50 hover:bg-white/15 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 flex flex-col justify-between"
                >
                  <h3 className="font-bold mb-4 text-white text-center text-sm">
                    {card.name}
                  </h3>
                  <motion.div
                    className="relative rounded-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3 + Math.random(),
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <img
                      src={card.image_uris?.normal || card.image_uris?.large || "/default-card.png"}
                      alt={card.name}
                      className="mx-auto rounded shadow-lg"
                    />
                    {/* Overlay que acompanha a imagem */}
                    <div className="absolute inset-[-1px] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg pointer-events-none">
                      <div className="absolute bottom-2 left-2 right-2 text-center">
                        <span className="text-white text-xs font-medium bg-black/70 px-2 py-1 rounded">
                          Click to see details
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Botões de adicionar/remover por baixo da imagem */}
                  <div className="mt-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleAddCard(card)}
                      className="bg-green-600 px-4 py-1 rounded hover:bg-green-800 transition border border-white/10"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="bg-red-600 px-4 py-1 rounded hover:bg-red-800 transition border border-white/10"
                    >
                      -
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SIDEBAR - Deck atual, responsiva */}
        <div className="lg:static lg:block w-full">
          <DeckSidebar deckCards={deckCards} onRemove={handleRemoveCard} onSave={handleSaveDeck} onClear={handleClearDeck} deckName={deckName} setDeckName={setDeckName} />
        </div>
      </div>
      {/* Sidebar mobile: aparece abaixo do conteúdo principal */}
      <div className="block lg:hidden p-4">
        <DeckSidebar deckCards={deckCards} onRemove={handleRemoveCard} onSave={handleSaveDeck} onClear={handleClearDeck} deckName={deckName} setDeckName={setDeckName} />
      </div>
    </>
  );
}

export default CreateDeck;
