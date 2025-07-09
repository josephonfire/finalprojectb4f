import '../index.css';

//a fazer: 
//titulo da página
//lista de conteudo
//caixa para alojar a lista
//scrollbar para a lista

function tutorials() {
    const conteudo = [
        "What is Magic: The Gathering?",
        "Setting up the play area",
            "How to start",
            "Tracking your life points",
        "Casting Spells",
            "Paying Mana",
            "Tap and Untap",
            "Permanents",
            "Graveyard",
        "Taking a turn",
            "Beginning Phase",
            "First Main Phase",
            "Combat Phase",
            "Second Main Phase",
            "End Step",
        "Combat",
            "Declare Attackers",
            "Declare Blockers",
            "Calculate Damage",
    ];
    return (
        <div className="p-8 text-center min-h-screen text-white">
            <h1 className="font-bold text-xl mb-6">Tutorials</h1>
            <p className="text-gray-300">Learn how to play the game</p>

            <div className="max-h-screen bg-gradient-to-br from-gray-950/60 to-red-950/60  text-white p-5 mt-5 border-[10px] border-black rounded-lg">
                <div className="grid grid-cols-1 gap-2">

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                    <h2 className="font-bold text-left">Content</h2></div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-4 rounded shadow">
                        <ul className="text-left list-disc pl-5">
                            {conteudo.map((item, index) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-2 rounded shadow bg-gradient-to-br from-gray-950/70 to-red-950/70">
                    <h2 className="font-bold text-left">Description</h2></div>

                    <div className="w-full max-h-64 overflow-y-scroll border-2 border-red-800 p-4 rounded shadow">
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
