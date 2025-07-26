import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { sessionId, sender, message } = req.body;
    const msg = await Message.create({ sessionId, sender, message });
    res.status(201).json(msg);
});

router.get('/session/:sessionId', async (req, res) => {
    const messages = await Message.find({ sessionId: req.params.sessionId }).sort({ timestamp: 1 });
    res.json(messages);
});

export default router;
