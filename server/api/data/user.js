// PENSAR EM CRUD - CREATE, READ, UPDATE, DELETE

const {getCollection, getConnection, closeConnection} = require("./db")

// Create User
async function insertUser (data) {
    const collection = await getCollection("user");
    const create = await collection.insertOne(data)
    return create
}

// Read User
async function findUser (data) {
    const collection = await getCollection("user");
    const result = await collection.findOne(data)
    return result
}

// Update User
async function updateUser (data) {
    const collection = await getCollection("user");
    const result = await collection.updateOne(data)
    return result
}

// Delete User
async function deleteUser(data) {
    const collection = await getCollection("user");
    await collection.deleteOne(data)
}

module.exports = { insertUser, findUser, updateUser, deleteUser }
