import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import NavBarHome from "../components/NavBarHome";
import FireSparks from "../components/MagicFireBG/MagicFireBg";
import "../index.css";
import { motion } from "framer-motion";

// Componente para criar um novo deck modernizado
// Interface responsiva com sidebar para visualização das cartas do deck
// Efeitos visuais similares à página de busca de cartas
// Layout intuitivo e moderno com animações e hover effects

function CreateDeck() {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("user");
  const [deckName, setDeckName] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);

  const searchCards = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data?.data) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma carta ao deck
  const handleAddCard = (card) => {
    const count = deckCards.filter((c) => c.id === card.id).length;

    if (count >= 4) {
      alert("Você não pode adicionar mais de 4 cópias da mesma carta!");
      return;
    }

    setDeckCards((prev) => [...prev, card]);
  };

  // Função para remover uma carta do deck
  const handleRemoveCard = (cardId) => {
    setDeckCards((prev) => {
      const index = prev.findIndex((card) => card.id === cardId);
      if (index > -1) {
        const newCards = [...prev];
        newCards.splice(index, 1);
        return newCards;
      }
      return prev;
    });
  };

  // Função para lidar com o envio do formulário de criação do deck
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deckName.trim()) {
      alert("Por favor, insira um nome para o deck!");
      return;
    }
    
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
    
    // Reset form
    setDeckName("");
    setDeckCards([]);
    setSearchResults([]);
    setQuery("");
  };

  // Agrupar cartas por nome para mostrar quantidade
  const groupedDeckCards = deckCards.reduce((acc, card) => {
    const existing = acc.find((item) => item.card.id === card.id);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ card, count: 1 });
    }
    return acc;
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCards();
    }
  };

  return (
    <>
      <NavBarHome />
      <FireSparks />
      
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <div className="pt-24 pb-8 px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Olá, <span className="text-red-400">{username}</span>!
            </h1>
            <p className="text-xl text-gray-300">Crie seu novo deck</p>
          </motion.div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 px-4 pb-8">
          
          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${showSidebar ? 'lg:mr-96' : ''}`}>
            
            {/* Deck Creation Form */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Nome do Deck</label>
                  <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/15 transition-all"
                    placeholder="Digite o nome do seu deck..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Criar Deck ({deckCards.length} cartas)
                </motion.button>
              </form>
            </motion.div>

            {/* Card Search */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Buscar Cartas</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  placeholder="Digite o nome da carta..."
                />
                <motion.button
                  onClick={searchCards}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Buscar"
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">
                  Resultados ({searchResults.length} cartas)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 cursor-pointer hover:border-red-400/50 hover:bg-white/15 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200">
                        <h3 className="font-bold mb-2 text-white text-center text-xs truncate">
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
                            src={card.image_uris?.normal || card.image_uris?.large}
                            alt={card.name}
                            className="w-full rounded shadow-lg"
                          />

                          <div className="absolute inset-[-1px] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg pointer-events-none">
                            <div className="absolute bottom-2 left-2 right-2 text-center">
                              <span className="text-white text-xs font-medium bg-black/70 px-2 py-1 rounded">
                                Clique para adicionar
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        <div className="mt-3 flex justify-center">
                          <motion.button
                            onClick={() => handleAddCard(card)}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Adicionar
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            className={`fixed lg:relative top-0 right-0 h-full lg:h-auto w-80 lg:w-96 bg-black/20 backdrop-blur-md border-l border-white/20 transform transition-transform duration-300 z-30 ${
              showSidebar ? 'translate-x-0' : 'translate-x-full'
            }`}
            initial={{ x: 300 }}
            animate={{ x: showSidebar ? 0 : 300 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Seu Deck</h2>
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="lg:hidden bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-300 text-sm mt-1">
                {deckCards.length} cartas • {groupedDeckCards.length} únicas
              </p>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 h-full lg:h-96">
              {groupedDeckCards.length === 0 ? (
                <div className="text-center py-8">
                  <div className="bg-white/5 rounded-lg p-6">
                    <p className="text-gray-300">Nenhuma carta adicionada ainda!</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Use a busca para encontrar cartas
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {groupedDeckCards.map(({ card, count }) => (
                    <motion.div
                      key={card.id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={card.image_uris?.small || card.image_uris?.normal}
                          alt={card.name}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm truncate">
                            {card.name}
                          </h3>
                          <p className="text-gray-300 text-xs">
                            Quantidade: {count}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <motion.button
                            onClick={() => handleAddCard(card)}
                            disabled={count >= 4}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white p-1 rounded text-xs transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                          <motion.button
                            onClick={() => handleRemoveCard(card.id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-1 rounded text-xs transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            −
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Sidebar Toggle */}
          <motion.button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-sm font-bold">
              {deckCards.length}
            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
