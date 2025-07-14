const { getUserDecks } = require("./decks.js");

function getColorFromCard(card) {
  const colors = [];
  console.log("card:", card);
  if (card.colors.length === 0) return 'Colorless';
  if (card.colors.length > 1) return 'Multicolor';
  // const mana = card.manaCost.toUpperCase();
  console.log("colors:", colors)
  if (card.colors.includes('W')) colors.push('White');
  if (card.colors.includes('U')) colors.push('Blue');
  if (card.colors.includes('B')) colors.push('Black');
  if (card.colors.includes('R')) colors.push('Red');
  if (card.colors.includes('G')) colors.push('Green');
  return colors[0];
}

async function getStatsForUser(user) {
  const decks = await getUserDecks(user);

  const colorMap = {};
  const typeMap = {};
  const cardCount = {};

  decks.forEach(deck => {
    (deck.cards || []).forEach(card => {
      // Determinar cor
      const color = getColorFromCard(card);
      if (color) colorMap[color] = (colorMap[color] || 0) + 1;
      // Tipo
      if (card.type_line) typeMap[card.type_line] = (typeMap[card.type_line] || 0) + 1;
      // Nome
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

// export async function getUserStats(token) {
//   const res = await fetch(`http://localhost:3030/api/user-stats?user=${username}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   if (!res.ok) throw new Error('Erro ao buscar estatísticas');
//   return res.json();
// }


module.exports = { getStatsForUser };
