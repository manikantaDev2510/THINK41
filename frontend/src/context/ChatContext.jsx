import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null); // <-- Add this

    return (
        <ChatContext.Provider value={{
            messages, setMessages,
            input, setInput,
            loading, setLoading,
            sessionId, setSessionId // <-- and this
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
