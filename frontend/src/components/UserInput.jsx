import React from "react";
import axios from "axios";
import { useChat } from "../context/ChatContext.jsx";

const UserInput = () => {
    const {
        input, setInput,
        messages, setMessages,
        loading, setLoading,
        sessionId, setSessionId, // <-- Make sure to include this in ChatContext
    } = useChat();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: "user", message: input };
        setMessages([...messages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8080/api/chat", {
                message: input,
                userId: "demoUser", // 🔧 Replace this with actual user ID (static or from auth)
                sessionId: sessionId || null
            });

            const { aiMessage, sessionId: returnedSessionId } = res.data;

            // Save sessionId for later requests
            if (!sessionId && returnedSessionId) {
                setSessionId(returnedSessionId);
            }

            setMessages((prev) => [...prev, { sender: "ai", message: aiMessage.message }]);
        } catch (err) {
            console.error("❌ Error in handleSubmit:", err);
            setMessages((prev) => [...prev, { sender: "ai", message: "Error fetching response." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Type a message..."
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                Send
            </button>
        </form>
    );
};

export default UserInput;