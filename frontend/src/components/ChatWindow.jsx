import { useState } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import axios from 'axios';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const userId = 'user123'; // In real apps, fetch from auth

    const handleSend = async (text) => {
        const userMessage = { sender: 'user', message: text };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const res = await axios.post('http://localhost:8080/api/chat', {
                userId,
                sessionId,
                message: text
            });

            const { aiMessage, sessionId: newSessionId } = res.data;
            if (!sessionId) setSessionId(newSessionId);

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'ai', message: "Error: Couldn't process your request." }]);
        }
    };

    return (
        <div className="h-screen flex flex-col max-w-xl mx-auto border shadow">
            <div className="p-4 text-lg font-semibold border-b bg-gray-100">AI Chat Agent</div>
            <MessageList messages={messages} />
            <UserInput onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;
