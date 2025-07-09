var express = require("express");
const { body, validationResult } = require("express-validator");
const router_signup = express.Router();
const { insertUser } = require("../../services/signup");

router_signup.post(
  // logica para o signup
  "/",
  body("email").isEmail(), // confirma se é email pelo expressvalidator
  body("password").isLength({ min: 6 }), //pede mais de 6 caracteres
  body("confirmPassword").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req); // erros do framework

    const { email, password, confirmPassword } = req.body;
    try {
      // se houver algum erro retorna os dados introduzidos conforme o desafio
      if (!errors.isEmpty() && errors.errors[0].param === email) {
        return res.status(400).send("Os dados introduzidos não são válidos.");
      } // idem
      if (!errors.isEmpty() && errors.errors[0].param === password) {
        return res.status(400).send("Password precisa conter 6 caracteres.");
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Password e Confirmar Password precisa ser igual.",
        });
      }

      const user = await insertUser(req.body);

      return res.status(201).json({
        message: "Utilizador criado com sucesso!",
        user,
      });
    } catch (err) {
      if (err.message === "Este e-mail já está em uso." || err.code === 11000) {
        return res.status(400).json({
          message: "O endereço introduzido já está registado.",
        });
      }
      return res
        .status(500)
        .json({ message: "Erro ao criar o utilizador.", error: err.message });
    }
  }
);

module.exports = router_signup;
