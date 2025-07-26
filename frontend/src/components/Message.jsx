import React from "react";

const Message = ({ sender, text }) => {
    const isUser = sender === "user";
    return (
        <div className={`p-2 rounded ${isUser ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
            <strong>{isUser ? "You" : "AI"}:</strong> {text}
        </div>
    );
};

export default Message;
