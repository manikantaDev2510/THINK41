import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { userId, sessionTitle } = req.body;
    const session = await Session.create({ userId, sessionTitle });
    res.status(201).json(session);
});

router.get('/user/:userId', async (req, res) => {
    const sessions = await Session.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(sessions);
});

export default router;
