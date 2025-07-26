import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { sessionId, sender, message } = req.body;
        const msg = await Message.create({ sessionId, sender, message });
        res.status(201).json(msg);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Failed to add Message" });

    }
});

router.get('/session/:sessionId', async (req, res) => {
    try {
        const messages = await Message.find({ sessionId: req.params.sessionId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Failed to get Session" });

    }
});

export default router;
