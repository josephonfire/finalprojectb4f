// PENSAR EM CRUD - CREATE, READ, UPDATE, DELETE

const {getCollection, getConnection, closeConnection} = require("./db")

// Create User
async function insertUser(data) {
  const collection = await getCollection("users");
  const result = await collection.insertOne(data);
  return result;
}

// Read User
async function findUser (data) {
    const collection = await getCollection("users");
    return await collection.findOne(data)
}

// Update User
async function updateUser (data) {
    const collection = await getCollection("users");
    const result = await collection.updateOne(data)
    return result
}

// Delete User
async function deleteUser(data) {
    const collection = await getCollection("users");
    await collection.deleteOne(data)
}

// Funções necessárias para o index.js
async function newUser(data) {
  const collection = await getCollection("users");
  const result = await collection.insertOne(data);
  return result.insertedId;
}

async function findUsers() {
  const collection = await getCollection("users");
  return await collection.find({}).toArray();
}

async function findOneUser(query) {
  const collection = await getCollection("users");
  return await collection.findOne(query);
}

module.exports = { insertUser, findUser, updateUser, deleteUser, newUser, findUsers, findOneUser }
