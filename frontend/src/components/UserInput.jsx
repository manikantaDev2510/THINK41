import { useState } from 'react';

const UserInput = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2 border-t">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-4 py-2"
                placeholder="Type a message..."
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
    );
};

export default UserInput;
