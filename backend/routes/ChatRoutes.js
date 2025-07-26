import express from 'express';
import Message from '../models/Message.js';
import Session from '../models/Session.js';
import { openai } from '../config/openai.js';

const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { sessionId, userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: "userId and message are required" });
        }

        // Step 1: Ensure session exists or create a new one
        let session;
        if (sessionId) {
            session = await Session.findById(sessionId);
            if (!session) {
                return res.status(404).json({ error: "Session not found" });
            }
        } else {
            session = await Session.create({
                userId,
                sessionTitle: `Session - ${new Date().toLocaleString()}`
            });
        }

        // Step 2: Save user's message to DB
        const userMessage = await Message.create({
            sessionId: session._id,
            sender: 'user',
            message,
        });

        // Step 3: Fetch all previous messages for chat context
        const previousMessages = await Message.find({ sessionId: session._id }).sort({ timestamp: 1 });

        const messagesForAI = previousMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.message,
        }));

        // Add current message again as context for AI
        messagesForAI.push({ role: 'user', content: message });

        // Step 4: Call OpenAI to get response
        const aiResult = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messagesForAI,
        });

        // Step 5: Validate AI response
        if (!aiResult || !aiResult.choices || aiResult.choices.length === 0) {
            return res.status(500).json({ error: "No response from OpenAI" });
        }

        const aiMessageText = aiResult.choices[0].message.content;

        // Step 6: Save AI's response to DB
        const aiMessage = await Message.create({
            sessionId: session._id,
            sender: 'ai',
            message: aiMessageText,
        });

        // Step 7: Send back sessionId, userMessage, and aiMessage
        res.status(200).json({
            sessionId: session._id,
            userMessage,
            aiMessage,
        });

    } catch (error) {
        console.error("💥 Chat API error:", error.message);
        res.status(500).json({ error: "Failed to process chat message", details: error.message });
    }
});

export default router;