import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Componente que exibe os detalhes de uma carta específica
// Obtém o ID da carta da URL, faz uma requisição à API para buscar os detalhes da carta
// Exibe o nome, imagem, tipo, texto oracle, custo de mana e nome do conjunto
// Se a carta não for encontrada, exibe uma mensagem de erro
// Lembrar de estilizar e adicionar mais coisas depois

function CardDetails() {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cleanManaSymbols = (text) => {
    if (!text) return "N/A";
    return text.replace(/[{}]/g, "");
  };

  useEffect(() => {
    fetch(`http://localhost:3030/api/cards/${cardId}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cardId]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!card) return <p className="text-white">Carta não encontrada</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 justify-center">{card.name}</h1>
      <img
        src={card.image_uris?.normal || card.image_uris?.large}
        alt={card.name}
        className="mb-6 rounded shadow-lg max-w-xs"
      />
      <p>
        <strong>Type:</strong> {card.type_line}
      </p>
      <p>
        <strong>Oracle Text:</strong> {card.oracle_text || "N/A"}
      </p>
      <p>
        <strong>Mana Cost:</strong> {cleanManaSymbols(card.mana_cost)}
      </p>
      <p>
        <strong>Set Name:</strong> {card.set_name}
      </p>
    </div>
  );
}

export default CardDetails;