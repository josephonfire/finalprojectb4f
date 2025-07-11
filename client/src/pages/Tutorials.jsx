import '../index.css';
import { useState } from 'react';
import NavBarHome from "../components/NavBarHome";


function Tutorials() {
    const [activeIndex, setActiveIndex] = useState(null); // guarda o índice clicado

    //[key, value]
    const conteudo = Array.from(new Map([
        ["What is Magic: The Gathering?",
            "Welcome to Magic: The Gathering! Magic is a collectible card game where players summon incredible creatures and cast powerful spells to defeat their opponents. The game has thousands of cards, so you'll always find a unique way to express your style on the battlefield."],
        ["How to start", "Each player shuffles their own deck and places it face down in front of them. Then, each draws a hand of seven cards from their library. If you don’t like your starting hand, you can choose to mulligan. Hand: Your hand represents the cards available to play. These must remain hidden — don’t show them to your opponent.\nLibrary: Your deck of cards is called your library.\nMulligan: To mulligan, shuffle your hand back into the library and draw seven new cards. Then, put one card of your choice on the bottom of the library for each time you mulligan during that game."],
        ["Tracking your life points", "Choose a method for tracking your life points and decide who goes first. The player who starts does not draw a card on the first turn. Don’t forget to keep track — to win, you must reduce your opponent’s life total to zero!\nTracking life points: Common methods include pen and paper or a twenty-sided die."],
        ["Casting Spells", "To use a card, you need to cast it."],
        ["Paying Mana", "To cast a spell, you must pay an amount of mana equal to the symbols in the upper-right corner of the card. Generic mana costs are represented by a number.\nMana: Mana is the magical energy used to cast spells. There are five colors of mana, each with unique characteristics and abilities.\nGeneric mana: A card with {4} requires four mana of any color, plus any specific costs shown."],
        ["Tap and Untap", "To generate mana, you must tap a land. Lands produce mana of the color shown on the card. Lands are not spells. You may play one land per turn for free.\nTap: Tapping means turning a card sideways on the battlefield."],
        ["Permanents", "After being cast, permanent spells — such as creatures, artifacts, and enchantments — remain on the battlefield.\nPermanent: A permanent is a card that remains in play after being cast.\nBattlefield: This is where your permanents stay. They can be targeted by other spells — for good or ill."],
        ["Graveyard", "Instant and sorcery spells go to the graveyard after taking effect.\nGraveyard: The graveyard is a face-up discard pile. Creatures go there when they die, and instants and sorceries go there after being used."],
        ["Taking a turn", "Each turn is divided into five phases:"],
        ["Beginning Phase", "Beginning Phase\nUntap your cards, resolve any upkeep effects, then draw a card. \nUntap: Return cards to an upright position. \nUpkeep: Some cards have effects that happen during upkeep.\nDraw: Take the top card of your library and add it to your hand. Don’t show it to your opponent."],
        ["First Main Phase", "First Main Phase\nYou may play a land and cast any spells in your hand."],
        ["Combat Phase", "Combat Phase\nTime to attack your opponent. \nttack: Your creatures attempt to deal damage to your opponent."],
        ["Second Main Phase", "Second Main Phase\nSame as the first. If you already played a land this turn, you can’t play another now."],
        ["End Step", "End Step\nRemove damage from creatures still in play, resolve any end-of-turn effects, and pass the turn."],
        ["Combat", "The combat phase has three steps, always in the same order."],
        ["Declare Attackers", "Declare Attackers\nChoose which creatures to attack with and tap them."],
        ["Declare Blockers", "Declare Blockers\nThe defending player may choose untapped creatures to block the attackers.\nBlock: A blocked creature deals damage to the blocking creature — and vice versa — instead of to the defending player."],
        ["Calculate Damage", "Assign Damage\nAttacking and blocking creatures deal damage to each other. Unblocked creatures deal damage to the opponent. If a creature takes damage equal to or greater than its toughness, it dies and goes to the graveyard.\nPower: The first number in the lower-right corner of the card indicates how much damage a creature deals. \nToughness: The second number shows how much damage it can take before dying."],
    ]));
    return (
        <>
        <header><NavBarHome/></header>
        <div className="p-8 text-center mt-16 min-h-screen text-white">
            <h1 className="font-bold text-3xl mb-6 text-white">Tutorials</h1>
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


export default Tutorials;
