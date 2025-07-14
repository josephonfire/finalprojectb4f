const { getUserDecks } = require("./decks.js");

async function getStatsForUser(user) {
  const decks = await getUserDecks(user);

  const colorMap = {};
  const typeMap = {};
  const cardCount = {};

  decks.forEach(deck => {
    deck.cards.forEach(card => {
      if (card.color) colorMap[card.color] = (colorMap[card.color] || 0) + 1;
      if (card.type) typeMap[card.type] = (typeMap[card.type] || 0) + 1;
      if (card.name) cardCount[card.name] = (cardCount[card.name] || 0) + 1;
    });
  });

  const colorData = Object.entries(colorMap).map(([name, value]) => ({ name, value }));
  const typeData = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
  const topCards = Object.entries(cardCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return { colorData, typeData, topCards };
}

module.exports = { getStatsForUser };
