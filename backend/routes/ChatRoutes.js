import express from 'express';
import Message from '../models/Message.js';
import Session from '../models/Session.js';
import { groq } from '../config/groq.js'; // 🆕 your Groq API config

const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { sessionId, userId, message } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ error: "userId and message are required" });
        }

        // Step 1: Create or find the session
        let session;
        if (sessionId) {
            session = await Session.findById(sessionId);
            if (!session) return res.status(404).json({ error: "Session not found" });
        } else {
            session = await Session.create({
                userId,
                sessionTitle: `Session - ${new Date().toLocaleString()}`
            });
        }

        // Step 2: Save the user message
        const userMessage = await Message.create({
            sessionId: session._id,
            sender: 'user',
            message,
        });

        // Step 3: Prepare context with past messages
        const previousMessages = await Message.find({ sessionId: session._id }).sort({ timestamp: 1 });

        const messagesForLLM = previousMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.message,
        }));

        // Append the current user message
        messagesForLLM.push({ role: 'user', content: message });

        // Step 4: Call Groq LLM (Mixtral/LLAMA3)
        const llmResponse = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: messagesForLLM,
        });

        // Step 5: Check LLM output
        if (!llmResponse || !llmResponse.choices || llmResponse.choices.length === 0) {
            return res.status(500).json({ error: "No response from LLM" });
        }

        const aiMessageText = llmResponse.choices[0].message.content;

        // Step 6: Save the AI response
        const aiMessage = await Message.create({
            sessionId: session._id,
            sender: 'ai',
            message: aiMessageText,
        });

        // Step 7: Send response
        res.status(200).json({
            sessionId: session._id,
            userMessage,
            aiMessage,
        });

    } catch (error) {
        console.error("💥 Chat API Error:", error.message);
        res.status(500).json({ error: "Failed to process chat message", details: error.message });
    }
});

export default router;
