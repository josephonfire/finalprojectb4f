import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListButton({ text, link, onClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsSelected(true);

    if (onClick) {
      onClick(); // 🔴 usa a função personalizada (como navigate com username)
    } else if (link) {
      navigate(link); // 🔄 fallback se não tiver onClick
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full max-h-64 overflow-y-scroll border-4 border-black p-2 rounded shadow 
        m-1 font-bold text-lg transition duration-500 ease-in-out
        ${isSelected ? 
          'bg-gradient-to-br from-red-900/85 to-red-700/85 text-white scale-105' : 
          'bg-gradient-to-br from-gray-950/85 to-red-950/85 text-gray-500'
        }
        hover:from-red-900/85 hover:to-red-700/85 hover:text-white hover:scale-105`}
    >
      {text}
    </button>
  );
}

export default ListButton;