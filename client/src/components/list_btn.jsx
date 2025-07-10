//componente botao para listas no perfil, pagina das cartas e dos decks
import React from 'react';
function ListButton() {
    return (
        <button className="w-full max-h-64 overflow-y-scroll border-4 border-black p-2 rounded shadow bg-gradient-to-br from-gray-950/85 to-red-950/85 m-1 text-gray-500 font-bold text-lg
        hover:scale-110 hover:bg-gradient-to-br from-red-900/85 to-red-700/85 hover:m-1 text-white font-bold text-lg transition duration-300 easi-in-out">texto do botão</button>
    )
}
export default ListButton;