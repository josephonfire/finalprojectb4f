import React from "react";
import { useState } from "react";
import axios from "axios"; // importar axios para requisições HTTP (scryfall API)


// Funcao e toda a logica para buscar uuma carta
function CardSearch() {
  const [name, setName] = useState(""); // Estado para armazenar o nome da carta
  const [card, setCard] = useState(null); // Estado para armazenar os dados da carta encontrada
  const [error, setError] = useState(""); // Caso ocorra um erro


  // Função para buscar a carta com base no nome
  // Faz uma requisição para a API do Scryfall para buscar a carta pelo nome
  // Se a carta for encontrada, atualiza o estado 'card' com os dados da carta
  // Se ocorrer um erro, atualiza o estado 'error' com uma mensagem de erro
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3030/api/card?name=${encodeURIComponent(name)}` // Requisiçao para a API do Scryfall, usando porta 3030 no Backend
      );
      setCard(response.data);
      setError(""); // Limpa o erro após uma busca bem-sucedida
    } catch (err) {
      setCard(null);
      setError("Carta não encontrada!"); // mensagem de erro caso a carta não seja encontrada, usando o estado 'error'
    }
  };


  // Renderiza o componente para retornar na pagina inicial
  return (
    <div className="card-search">
      <h1>Find your card</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button> {/* Botão para buscar a carta */}
      

      {error && <p>{error}</p>}

      {card && (
          <>
            <h2>{card.name}</h2>
            <p>{card.oracle_text ? card.oracle_text : "No description available."}</p>
            <img src={card.image_uris?.normal} alt={card.name} />
          </>
      )}
    </div>
  );
}

export default CardSearch;
