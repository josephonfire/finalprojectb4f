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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await axios.get(`http://localhost:3030/api/cards?name=${encodeURIComponent(name)}`); // Faz a requisição à API para buscar cartas pelo nome
        setCards(res.data);
        setError("");
      } catch (err) {
        setCards([]);
        setError("Nenhuma carta encontrada."); // Define mensagem de erro se não encontrar cartas
      }
    }
    fetchCards(); // Chama a função para buscar as cartas quando o componente é montado
  }, [name]); // Reexecuta a busca se o nome mudar

  if (error) {
    return (
      <>
        <NavBarHome />
        <p className="mt-4 text-red-600 font-semibold text-center">{error}</p>
      </>
    );
  }

  return (
    <>
      <NavBarHome />
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.length === 0 && (
            <p className="text-white text-center">Nenhuma carta encontrada.</p>
          )}
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-900 p-4 rounded-2xl cursor-pointer hover:bg-gray-700 transition"
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
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default SearchResult;
