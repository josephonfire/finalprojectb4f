import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBarHome from "../components/NavBarHome";

function OwnedCards() {
  const { userId } = useParams();

  // Estado para cartas
  const [cards, setCards] = useState([]);

  // Estado para modo de ordenação
  const [sortMode, setSortMode] = useState("none");

  // Buscar cartas do utilizador
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}/cards`);
        setCards(res.data);
      } catch (err) {
        console.error("Erro ao carregar cartas", err);
      }
    };

    fetchCards();
  }, [userId]);

  // Ordenar cartas conforme modo ativo
  const sortedCards = [...cards].sort((a, b) => {
    if (sortMode === "az") {
      return a.name?.localeCompare(b.name ?? "") ?? 0;
    } else if (sortMode === "color") {
      return a.color?.localeCompare(b.color ?? "") ?? 0;
    } else if (sortMode === "type") {
      return a.type?.localeCompare(b.type ?? "") ?? 0;
    }
    return 0;
  });

  return (
    <>
      <header>
        <NavBarHome />
      </header>

      <div className="p-8 text-center min-h-screen text-white">
        <h1 className="font-bold text-2xl mb-4">Your Cards</h1>
        <p className="text-gray-300 mb-6">Visualiza todas as cartas associadas aos teus decks.</p>

        {/* Barra de filtros */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            className={`px-4 py-2 rounded font-medium bg-red-800 hover:bg-red-600 transition ${
              sortMode === "az" ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSortMode("az")}
          >
            Ordenar A–Z
          </button>

          <button
            className={`px-4 py-2 rounded font-medium bg-red-800 hover:bg-red-600 transition ${
              sortMode === "color" ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSortMode("color")}
          >
            Ordenar por Cor
          </button>

          <button
            className={`px-4 py-2 rounded font-medium bg-red-800 hover:bg-red-600 transition ${
              sortMode === "type" ? "ring-2 ring-white" : ""
            }`}
            onClick={() => setSortMode("type")}
          >
            Ordenar por Tipo
          </button>
        </div>

        {/* Lista de cartas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedCards.length > 0 ? (
            sortedCards.map((card, index) => (
              <div
                key={card._id || index}
                className="bg-gray-900 border border-red-800 rounded-lg p-4 shadow hover:scale-105 transition"
              >
                <h2 className="text-lg font-bold text-red-400">{card.name ?? "Sem nome"}</h2>
                <p className="text-sm text-gray-300">Tipo: {card.type ?? "Desconhecido"}</p>
                <p className="text-sm text-gray-300">Cor: {card.color ?? "Indefinida"}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic col-span-full">Nenhuma carta encontrada.</p>
          )}
        </div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default OwnedCards;
