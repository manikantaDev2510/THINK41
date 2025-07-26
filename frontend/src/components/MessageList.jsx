import React from "react";
import { useChat } from "../context/ChatContext.jsx";
import Message from "./Message.jsx";

const MessageList = () => {
    const { messages } = useChat();

    return (
        <div className="mb-4 space-y-2">
            {messages.map((msg, idx) => (
                <Message key={idx} sender={msg.sender} text={msg.message} />
            ))}
        </div>
    );
};

export default MessageList;
