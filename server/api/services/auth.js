const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();


const registerUser = async (db, req, res) => {
  const { name, foto_url, email, password } = req.body;

  try {
    const usersCollection = db.collection('user');

    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'Usuário já existe!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, foto_url, password: hashedPassword };
    console.log('Inserindo novo usuário:', newUser);

    await usersCollection.insertOne(newUser);

    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

const listUser = async (db, req, res) => {
  try {
    const usersCollection = db.collection('user');
    const users = await usersCollection.find().toArray();
    res.status(200).json({ message: users });
    console.log(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

module.exports = { registerUser, listUser };