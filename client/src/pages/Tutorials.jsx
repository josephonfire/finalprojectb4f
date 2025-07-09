import '../index.css';

//a fazer: 
//titulo da página
//lista de conteudo
//caixa para alojar a lista
//scrollbar para a lista

function tutorials() {
    const conteudo = [
        "Instalação do Node.js",
        "Criar componente em React",
        "Usar React Router",
        "Estilizar com Tailwind",
        "Deploy no Vercel",
        "Consumir API",
        "Gerir estado com Context",
        "Hooks avançados"
    ];
    return (
        <div className="p-8 text-center min-h-screen text-white">
            <h1 className="font-bold text-xl mb-6">Tutorials</h1>
            <p className="text-gray-300">Learn how to play the game</p>

            <div className="min-h-screen bg-pink-900 text-white p-5 mt-5 border-[10px] border-black rounded-lg">
                <div className="grid grid-cols-1 gap-7">
                    <div className="w-full max-h-64 overflow-y-scroll border border-white p-4 rounded shadow">
                        <ul className="text-left list-disc pl-5">
                            {conteudo.map((item, index) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full max-h-64 overflow-y-scroll border border-white p-4 rounded shadow">
                        <ul className="text-left list-disc pl-5">
                            {conteudo.map((item, index) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default tutorials;
