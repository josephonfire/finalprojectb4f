const { getCollection } = require("./db");

// Cria um novo deck
async function createDeck(deck) {
  const collection = await getCollection("decks");
  const result = await collection.insertOne(deck);
  return result.insertedId;
}

// Busca todos os decks de um usuário
async function getUserDecks(username) {
  const collection = await getCollection("decks");
  return await collection.find({ user: username }).toArray();
}

// Busca um deck por ID
async function getDeckById(id) {
  const collection = await getCollection("decks");
  const { ObjectId } = require("mongodb");
  return await collection.findOne({ _id: new ObjectId(id) });
}

// Atualiza um deck
async function updateDeck(id, update) {
  const collection = await getCollection("decks");
  const { ObjectId } = require("mongodb");
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });
}

async function deleteDeck(id) {
  const collection = await getCollection("decks");
  const { ObjectId } = require("mongodb");
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = { createDeck, getUserDecks, getDeckById, updateDeck, deleteDeck };
