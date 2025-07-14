const { getUserDecks } = require("./decks.js");

function getColorFromCard(card) {
  if (card.color) return card.color;
  if (!card.manaCost) return 'Colorless';
  const mana = card.manaCost.toUpperCase();
  const colors = [];
  if (mana.includes('W')) colors.push('White');
  if (mana.includes('U')) colors.push('Blue');
  if (mana.includes('B')) colors.push('Black');
  if (mana.includes('R')) colors.push('Red');
  if (mana.includes('G')) colors.push('Green');
  if (colors.length === 0) return 'Colorless';
  if (colors.length > 1) return 'Multicolor';
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
      if (card.type) typeMap[card.type] = (typeMap[card.type] || 0) + 1;
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
