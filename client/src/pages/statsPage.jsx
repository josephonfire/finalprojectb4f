//tenho que criar uma pagina que mostre 3 graficos: 
//cor mais usada
//carta mais usada
//tipo mais usado

//ao clicar em botoes muda o gráfico

//os gráficos serão feitos com informação da conta do usuário
import '../index.css';
import { useState } from 'react';
import NavBarHome from "../components/NavBarHome";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from 'recharts';

function StatsPage() {
    const [activeIndex, setActiveIndex] = useState(null); // índice do botão ativo

    // Dados fictícios (devem ser substituídos por dados reais do utilizador via API)
    const colorData = [
        { name: 'Black', value: 12 },
        { name: 'White', value: 8 },
        { name: 'Red', value: 15 },
        { name: 'Green', value: 10 },
        { name: 'Blue', value: 6 },
    ];
    const barColors = ['#1f1f1f', '#ffffe6', '#cf1919', '#16a816', '#4573ff'];


    const typeData = [
        { name: 'Creature', value: 20 },
        { name: 'Sorcery', value: 7 },
        { name: 'Enchantment', value: 5 },
        { name: 'Instant', value: 10 },
        { name: 'Artifact', value: 3 },
        { name: 'Planeswalker', value: 1 },
    ];

    const topCards = [
        { name: 'Lightning Bolt', count: 7 },
        { name: 'Counterspell', count: 5 },
        { name: 'Llanowar Elves', count: 4 },
        { name: 'Serra Angel', count: 4 },
        { name: 'Doom Blade', count: 3 },
    ];

    // Lista de botões e componentes associados
    const conteudo = [
        ['Cards by Color', (
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={colorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill>
                        {colorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )],
        ['Cards by Type', (
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={typeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#990000" />
                </BarChart>
            </ResponsiveContainer>
        )],
        ['Top 5 Cards', (
            <ul className="text-left text-white text-lg">
                {topCards.map((card, index) => (
                    <li key={index} className="mb-1">{card.name} — {card.count}x</li>
                ))}
            </ul>
        )],
    ];

    return (
        <>
            <header><NavBarHome /></header>
            <div className="p-8 text-center mt-16 min-h-screen text-white">
                <h1 className="font-bold text-3xl mb-6 text-white">Statistics</h1>
                <p className="text-gray-300 mb-4">Visualiza estatísticas dos teus decks: cores, tipos e cartas mais usadas.</p>

                <div className="max-h-screen bg-gradient-to-br from-gray-950/60 to-red-950/60 text-white p-5 mt-5 border-[10px] border-black rounded-lg">
                    <div className="grid grid-cols-1 gap-4">

                        {/* Título da secção do gráfico */}
                        <div className="w-full border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                            <h2 className="font-bold text-left">Graphic Display</h2>
                        </div>

                        {/* Gráfico renderizado */}
                        <div className="w-full border-2 border-red-800 p-4 rounded shadow bg-gray-950/25 text-center">
                            {activeIndex !== null ? conteudo[activeIndex][1] : (
                                <p className="text-left text-sm text-gray-500 italic">Seleciona uma opção abaixo para visualizar.</p>
                            )}
                        </div>

                        {/* Título da secção dos botões */}
                        <div className="w-full border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                            <h2 className="font-bold text-left">Charts</h2>
                        </div>

                        {/* Botões de seleção */}
                        <div className="w-full border-2 border-red-800 p-4 rounded shadow bg-gray-950/25">
                            <ul className="text-left pl-0 list-none">
                                {conteudo.map(([key], index) => (
                                    <li key={index} className="mb-2">
                                        <button
                                            className={`w-full text-left font-semibold px-4 py-2 rounded transition duration-200 ${activeIndex === index
                                                ? "bg-red-700 text-white"
                                                : "bg-red-950 text-gray-400 hover:bg-gray-300 hover:text-black"
                                                }`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            {key}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <footer className="mt-4 text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
            </footer>
        </>
    );
}

export default StatsPage;