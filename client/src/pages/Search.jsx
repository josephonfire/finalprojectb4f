import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const { name } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await axios.get(`http://localhost:3030/api/cards?name=${encodeURIComponent(name)}`);
        setCards(res.data);
        setError("");
      } catch (err) {
        setCards([]);
        setError("Nenhuma carta encontrada.");
      }
    }
    fetchCards();
  }, [name]);

  if (error) return <p className="mt-4 text-red-600 font-semibold">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 transition"
          onClick={() => navigate(`/card/${card.id}`)}
        >
          <h3 className="font-bold mb-2 text-white">{card.name}</h3>
          <motion.img
                src={card.image_uris?.normal}
                alt={card.name}
                className="mx-auto rounded shadow-lg"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
        </div>
      ))}
    </div>
  );
}

export default SearchResult;