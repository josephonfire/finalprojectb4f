import React from "react";
import { useState } from "react";
import axios from "axios";

function CardSearch() {
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/card?name=${encodeURIComponent(name)}`
      );
      setCard(response.data);
    } catch (err) {
      setCard(null);
      setError("Carta não encontrada!");
    }
  };

  return (
    <div className="card-search">
      <h1>Busca de Cartas</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p>{error}</p>}

      {card && (
        <div>
          <h2>{card.name}</h2>
          <img src={card.image_uris?.normal} alt={card.name} />
          <p>{card.oracle_text}</p>
        </div>
      )}
    </div>
  );
}

export default CardSearch;
