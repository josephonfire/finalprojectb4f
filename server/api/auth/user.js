const express = require('express');
const jwt = require('jsonwebtoken');
const router_user = express.Router();

router_user.get("/", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication Token not sent" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, 'mtg');

        return res.status(200).json({
            message: "Token received!",
            userId: decoded.id,
            email: decoded.email
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired Token." });
    }
});

module.exports = router_user;
