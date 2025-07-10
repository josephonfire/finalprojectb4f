//tenho que criar uma pagina que mostre 3 graficos: 
//cor mais usada
//carta mais usada
//tipo mais usado

//ao clicar em botoes muda o gráfico

//os gráficos serão feitos com informação da conta do usuário

import '../index.css';
import { useState } from 'react';
import NavBarHome from "../components/NavBarHome";


function StatsPage() {
    const [activeIndex, setActiveIndex] = useState(null); // guarda o índice clicado

    //[key, value]
    const conteudo = Array.from(new Map([
      
    ]));
    return (
        <>
        <header><NavBarHome/></header>
        <div className="p-8 text-center min-h-screen text-white">
            <h1 className="font-bold text-xl mb-6 text-white">Tutorials</h1>
            <p className="text-gray-300">Learn how to play the game</p>

            <div className="max-h-screen bg-gradient-to-br from-gray-950/60 to-red-950/60  text-white p-5 mt-5 border-[10px] border-black rounded-lg">
                <div className="grid grid-cols-1 gap-2">

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                        <h2 className="font-bold text-left">Content</h2></div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-4 rounded shadow">
                        <ul className="text-left pl-0 list-none">
                            {conteudo.map(([key], index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        className={`w-full text-left font-semibold px-4 py-2 rounded transition duration-200 ${activeIndex === index ? "bg-red-700 text-white" : "bg-red-950 text-gray-400 hover:bg-gray-300 hover:text-black"
                                            }`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {key}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                        <h2 className="font-bold text-left">Description</h2></div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-4 rounded shadow">
                        {activeIndex !== null ? (
                            <p className="text-left text-lg text-gray-300">{conteudo[activeIndex][1].split('\n').map((linha, index) => (
                                <p key={index} className="text-left text-lg text-gray-300 mb-2">
                                    {linha}
                                </p>
                            ))}</p>
                        ) : (
                            <p className="text-left text-sm text-gray-500 italic">Select a topic above to see the tutorial</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
      </>
    )
}


export default StatsPage;