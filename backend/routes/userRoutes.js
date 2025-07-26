import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, name, email } = req.body;
    const user = await User.create({ userId, name, email });
    res.status(201).json(user);
});

export default router;
