import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const PLAYER_COLORS = [
  "bg-red-600", "bg-blue-600", "bg-green-600", "bg-yellow-500", "bg-purple-700", "bg-pink-600", "bg-gray-700"
];
const COLOR_NAMES = [
  "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Gray"
];

function getPolygonPositions(n, radius = 180, center = 200) {
  // Retorna posições em círculo/hexágono para n jogadores
  const angleStep = (2 * Math.PI) / n;
  return Array.from({ length: n }, (_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      left: center + radius * Math.cos(angle),
      top: center + radius * Math.sin(angle),
    };
  });
}

export default function LifeCounter() {
  const [step, setStep] = useState(0); // 0: seleção, 1: jogo
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerColors, setPlayerColors] = useState([0, 1, 2, 3, 4]);
  const [lifes, setLifes] = useState([20, 20, 20, 20, 20]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Atualiza número de jogadores e reseta cores/vidas
  const handleNumPlayers = (n) => {
    setNumPlayers(n);
    setPlayerColors(Array(n).fill(0));
    setLifes(Array(n).fill(20));
    setStep(1);
  };

  // Troca cor ao clicar no quadrado
  const handleColorCycle = (idx) => {
    setPlayerColors((prev) => prev.map((c, i) => (i === idx ? (c + 1) % PLAYER_COLORS.length : c)));
  };

  // Atualiza vida de um jogador
  const handleLife = (idx, delta) => {
    setLifes((prev) => prev.map((v, i) => (i === idx ? v + delta : v)));
  };

  // Reset
  const handleReset = () => {
    setLifes(Array(numPlayers).fill(20));
  };

  // Layout positions
  const positions = getPolygonPositions(numPlayers, numPlayers === 5 ? 180 : 160, 220);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-0 overflow-hidden z-0">
    
      {/* Menu sanduíche central só aparece após escolher jogadores */}
      {step === 1 && (
        <>
          <button
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-grey-700 rounded-full p-4 shadow-lg hover:bg-red-900 transition-all duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            style={{ boxShadow: '0 0 16px 2px #0008' }}
          >
            <FaBars className="text-3xl text-white" />
          </button>
          {menuOpen && (
            <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-black/95 border-2 border-grey-700 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 animate-fade-in min-w-[220px]">
              <button
                onClick={() => { handleReset(); setMenuOpen(false); }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg border border-gray-600 text-lg mb-2"
              >
                Reset
              </button>
              <button
                onClick={() => { setStep(0); setMenuOpen(false); }}
                className="w-full bg-red-700 hover:bg-red-900 text-white font-semibold px-6 py-3 rounded-lg border border-red-900 text-lg"
              >
                Back
              </button>
            </div>
          )}
        </>
      )}
      {step === 0 && (
        <div className="flex flex-col items-center gap-8 mt-8">
          <h2 className="text-xl font-semibold mb-2">Choose number of players</h2>
          <div className="flex gap-6">
            {[2, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleNumPlayers(n)}
                className="bg-red-700 hover:bg-red-900 text-white font-bold px-8 py-4 rounded-xl text-2xl shadow-lg border-2 border-red-900 transition-all duration-200"
              >
                {n} Players
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 1 && numPlayers === 2 && (
        <div className="flex w-screen h-screen min-h-screen gap-0">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className={`flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${PLAYER_COLORS[playerColors[idx]]} border-4 border-white/30`}
              onClick={() => handleColorCycle(idx)}
              style={{ minWidth: 0, minHeight: 0, height: '100vh' }}
            >
              <span className="text-lg font-bold mb-2 select-none">Player {idx + 1}</span>
              <div className="text-6xl font-extrabold mb-4 select-none">{lifes[idx]}</div>
              <div className="flex gap-6">
                <button onClick={() => handleLife(idx, 1)} className="bg-white/20 hover:bg-white/40 text-white px-5 py-2 rounded text-3xl font-bold">+</button>
                <button onClick={() => handleLife(idx, -1)} className="bg-white/20 hover:bg-white/40 text-white px-5 py-2 rounded text-3xl font-bold">−</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {step === 1 && numPlayers === 4 && (
        <div className="w-screen h-screen min-h-screen flex flex-wrap p-0">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${PLAYER_COLORS[playerColors[idx]]} border-4 border-white/30`}
              onClick={() => handleColorCycle(idx)}
              style={{
                flex: '1 0 50%',
                minWidth: 0,
                minHeight: 0,
                width: '50%',
                height: '50%',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
              }}
            >
              <span className="text-lg font-bold mb-2 select-none">Player {idx + 1}</span>
              <div className="text-6xl font-extrabold mb-4 select-none">{lifes[idx]}</div>
              <div className="flex gap-6">
                <button onClick={() => handleLife(idx, 1)} className="bg-white/20 hover:bg-white/40 text-white px-5 py-2 rounded text-3xl font-bold">+</button>
                <button onClick={() => handleLife(idx, -1)} className="bg-white/20 hover:bg-white/40 text-white px-5 py-2 rounded text-3xl font-bold">−</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {step === 1 && numPlayers === 5 && (
        <div className="relative w-screen h-screen min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Centraliza o hexágono */}
            <div className="relative w-[520px] h-[520px] max-w-full max-h-full">
              {Array.from({ length: 5 }).map((_, idx) => {
                const pos = getPolygonPositions(5, 200, 260)[idx];
                return (
                  <div
                    key={idx}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${PLAYER_COLORS[playerColors[idx]]}`}
                    style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)', minWidth: 0, width: 180, height: 180 }}
                    onClick={() => handleColorCycle(idx)}
                  >
                    <span className="text-lg font-bold mb-2 select-none">Player {idx + 1}</span>
                    <div className="text-5xl font-extrabold mb-2 select-none">{lifes[idx]}</div>
                    <div className="flex gap-4">
                      <button onClick={(e) => { e.stopPropagation(); handleLife(idx, 1); }} className="bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded text-2xl font-bold">+</button>
                      <button onClick={(e) => { e.stopPropagation(); handleLife(idx, -1); }} className="bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded text-2xl font-bold">−</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
