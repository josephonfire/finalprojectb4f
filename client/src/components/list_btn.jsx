//componente botao para listas no perfil, pagina das cartas e dos decks
import React from 'react';

function ListButton() {
  return (
    <button
      className="w-full max-h-64 overflow-y-scroll border-4 border-black p-2 rounded shadow 
                 bg-gradient-to-br from-gray-950/85 to-red-950/85 text-gray-500 font-bold text-lg 
                 m-1 transition duration-500 ease-in-out 
                 hover:from-red-950/85 hover:to-red-700/85 hover:text-white hover:scale-105 
                 active:from-red-950/85 active:to-red-700/85 active:text-white active:scale-105"
    >
      texto do botão
    </button>
  );
}

export default ListButton;

