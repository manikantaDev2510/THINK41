import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { userId, sessionTitle } = req.body;
        const session = await Session.create({ userId, sessionTitle });
        res.status(201).json(session);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Failed to create session" });

    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Failed" });

    }
});

export default router;
