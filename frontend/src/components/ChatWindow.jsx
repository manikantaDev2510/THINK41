import React from "react";
import MessageList from "./MessageList.jsx";
import UserInput from "./UserInput.jsx";
import { useChat } from "../context/ChatContext.jsx";

const ChatWindow = () => {
    const { loading } = useChat();

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow">
            <MessageList />
            {loading && <div className="text-gray-500 p-2">AI is typing...</div>}
            <UserInput />
        </div>
    );
};

export default ChatWindow;
