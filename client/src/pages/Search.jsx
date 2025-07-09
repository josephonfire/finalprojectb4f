import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div className="w-full max-w-md mx-auto p-4">
      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}
      {card && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-2">{card.name}</h2>
          <p className="mb-4">{card.oracle_text || "No description available."}</p>
          <img
            src={card.image_uris?.normal}
            alt={card.name}
            className="mx-auto rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default SearchResult;