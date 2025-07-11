const express = require('express');
const jwt = require('jsonwebtoken');
const router_user = express.Router();

router_user.get("/", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token de autenticação não enviado." });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, 'pedro');

        return res.status(200).json({
            message: "Token recebido!",
            userId: decoded.id,
            email: decoded.email
        });
    } catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
});

module.exports = router_user;
