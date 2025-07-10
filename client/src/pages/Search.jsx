import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import NavBarHome from "../components/NavBarHome";

function SearchResult() {
  const { name } = useParams();
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCard() {
      try {
        const res = await axios.get(`http://localhost:3030/api/card?name=${encodeURIComponent(name)}`);
        setCard(res.data);
        setError("");
      } catch (err) {
        setCard(null);
        setError("Carta não encontrada!");
      }
    }
    fetchCard();
  }, [name]);

  return (
    <>
      <header> <NavBarHome /> </header>
      <div className="w-full max-w-md mx-auto p-4">
        {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
        {card && (
          <div className="mt-6 text-center  text-white">
            <h2 className="text-xl font-bold mb-2">{card.name}</h2>
            <p className="mb-4">{card.oracle_text || "No description available."}</p>
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
        )}
      </div>
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default SearchResult;