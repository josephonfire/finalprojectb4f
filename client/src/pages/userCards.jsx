import React, { useEffect, useState } from "react";
import NavBarAndSearch from "../components/NavBarAndSearch";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

function UserCards() {
  const { username } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Só executa o fetch se username existir e não for vazio
    if (!username) return;

    async function fetchCards() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3030/api/user-cards?user=${username}`);

        if (!res.ok) {
          console.error("Resposta não está OK:", res.status, res.statusText);
          setCards([]);
          return;
        }

        const data = await res.json();
        console.log("Cartas recebidas:", data);
        setCards(data);
      } catch (error) {
        console.error("Erro ao buscar cartas:", error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, [username]);

  return (
    <>
      <NavBarAndSearch />
      <div className="pt-24 max-w-6xl mx-auto p-6">
        <h1 className="text-2xl text-center font-bold text-white mb-6">All Your Cards</h1>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : cards.length === 0 ? (
          <p className="text-white">No cards found in your decks.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card, index) => (
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
                }}>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 cursor-pointer hover:border-red-400/50 hover:bg-white/15 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200"
                  onClick={() => navigate(`/card/${card.id}`)}>
                  <h3 className="font-bold mb-4 text-white text-center text-sm">
                    {card.name}
                  </h3>

                  {/* Imagem + overlay com movimento sincronizado */}
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
                      src={card.image_uris?.normal}
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div >
    </>
  );
}

export default UserCards;
