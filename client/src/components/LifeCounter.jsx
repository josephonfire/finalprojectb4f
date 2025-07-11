import React, { useState } from "react";

export default function LifeCounter() {
  const [life1, setLife1] = useState(20);
  const [life2, setLife2] = useState(20);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-12 p-4">
      <h1 className="text-3xl font-bold text-red-500">Life Counter</h1>

      {/* Player 1 */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Player 1</h2>
        <div className="text-5xl font-bold">{life1}</div>
        <div className="flex gap-4">
          <button
            onClick={() => setLife1(life1 + 1)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white text-xl"
          >
            +
          </button>
          <button
            onClick={() => setLife1(life1 - 1)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white text-xl"
          >
            −
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 w-full max-w-sm my-6" />

      {/* Player 2 */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Player 2</h2>
        <div className="text-5xl font-bold">{life2}</div>
        <div className="flex gap-4">
          <button
            onClick={() => setLife2(life2 + 1)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white text-xl"
          >
            +
          </button>
          <button
            onClick={() => setLife2(life2 - 1)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white text-xl"
          >
            −
          </button>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setLife1(20);
          setLife2(20);
        }}
        className="mt-8 bg-gray-800 px-6 py-2 rounded hover:bg-gray-700 text-white font-medium"
      >
        Reset
      </button>
    </div>
  );
}
