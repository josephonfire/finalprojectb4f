const express = require('express');
const { body, validationResult } = require('express-validator');
const { findUserByEmailAndPassword } = require("../../data/users");
const jwt = require("jsonwebtoken");

const SECRET = 'pedro'; // Defina sua chave secreta

const router_login = express.Router();

router_login.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await findUserByEmailAndPassword({email, password});
      if (!user) {
        return res.status(401).json({ message: "O utilizador não foi encontrado!" });
      }
      if (user) {
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET);
        return res.status(200).json({
          token,
          message: "Login realizado com sucesso!",
          Id: user._id
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router_login;