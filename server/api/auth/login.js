const express = require('express');
const { body, validationResult } = require('express-validator');
const { findOneUser } = require("../data/user.js");
const jwt = require("jsonwebtoken");

const SECRET = 'mtg'; // Defina sua chave secreta

const router_login = express.Router();

router_login.post(
  "/",
  body("username").isLength({ min: 3 }).withMessage('Username is required'),
  body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res, next) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Encontra o utilizador só pelo username
      const user = await findOneUser({ username });

      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign({ id: user._id, username: user.username }, SECRET);

      return res.status(200).json({
        token,
        message: "Login successful!",
        id: user._id
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router_login;

