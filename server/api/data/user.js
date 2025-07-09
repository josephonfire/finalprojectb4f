// const {getCollection, getConnection, closeConnection} = require("./mongodb")

// // Criar New User (Registo)
// async function createUser(data) {
//     const collection = await getCollection("user")
//     const create = await collection.insertOne(data)
//     return create.insertedId
// }

// // LOGIN - CONFIRMAR SE TEM REGISTO FEITO

// // Obter Todos os Users (get)
// async function getUsers() {
//     const collection = await getCollection("user")
//     const result = await collection.find().toArray()
//     return result
// }

// // Obter um User específico (get ID)
// async function getOneUser(data) {
//     const collection = await getCollection("user")
//     const result = await collection.findOne(data)
//     return result
// }


// // exporar funções para POST e GET
// module.exports = {createUser, getUsers, getOneUser}

DB = "mongodb+srv://marlenekakonda:nczF6ayVZvITF8ra@cluster0.cifqqpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"