import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, name, email } = req.body;
        const user = await User.create({ userId, name, email });
        res.status(201).json(user);

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Failed to create user" });

    }
});

export default router;