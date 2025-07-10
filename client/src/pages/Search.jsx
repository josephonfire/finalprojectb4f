import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import NavBarHome from "../components/NavBarHome";

// Componente de resultado de busca que exibe cartas encontradas com base no nome pesquisado
// O nome da carta é obtido da URL, por exemplo, /search/Lightning Bolt
// O componente faz uma requisição à API para buscar as cartas e exibe os resultados
// Se não encontrar nenhuma carta, exibe uma mensagem de erro
// O usuário pode clicar na carta e ver as especificações da carta em uma nova página

function SearchResult() {
  const { name } = useParams(); // Obtém o nome da carta
  const [cards, setCards] = useState([]); // Estado para armazenar as cartas encontradas
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3030/api/cards?name=${encodeURIComponent(name)}`); // Faz a requisição à API para buscar cartas pelo nome
        setCards(res.data);
        setError("");
      } catch (err) {
        setCards([]);
        setError("Nenhuma carta encontrada."); // Define mensagem de erro se não encontrar cartas
      } finally {
        setLoading(false);
      }
    }
    fetchCards(); // Chama a função para buscar as cartas quando o componente é montado
  }, [name]); // Reexecuta a busca se o nome mudar

  if (loading) {
    return (
      <>
        <NavBarHome />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-white">Buscando cartas...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBarHome />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBarHome />
      <div className="w-full max-w-6xl mx-auto p-6 pt-24">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Resultados para: <span className="text-red-400">{name}</span>
          </h1>
          <p className="text-gray-300">{cards.length} carta{cards.length !== 1 ? 's' : ''} encontrada{cards.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cards.length === 0 && (
            <div className="col-span-full text-center py-8">
              <div className="bg-white/5 rounded-lg p-6">
                <p className="text-white">Nenhuma carta encontrada.</p>
              </div>
            </div>
          )}
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <div 
                className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 cursor-pointer hover:border-red-400/50 hover:bg-white/15 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
                onClick={() => navigate(`/card/${card.id}`)}
              >
                <h3 className="font-bold mb-2 text-white text-center text-sm">
                  {card.name}
                </h3>
                
                <div className="relative overflow-hidden rounded-lg">
                  <motion.img
                    src={card.image_uris?.normal}
                    alt={card.name}
                    className="w-full h-auto rounded-lg shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.2 + index * 0.05
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  />
                  
                  {/* Overlay simples */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg">
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="text-white text-xs font-medium bg-black/70 px-2 py-1 rounded">
                        Click to see details
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="mt-6 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default SearchResult;
