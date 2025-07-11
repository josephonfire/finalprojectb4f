const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { newUser } = require("../data/user.js");

router.post(
  "/",
  
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  async (req, res) => {
     console.log('Corpo da requisição:', req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userData = req.body;
      await newUser(userData);
      return res.status(201).json({ message: "User account created with success!" });
    } catch (err) {
      if (err.status === 400) {
        return res.status(400).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Error creating user." });
    }
  }
);

module.exports = router;
