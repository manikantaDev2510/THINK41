import React from 'react'

export default function Message({ message }) {
    const isUser = message.sender === 'user';

    return (
        <div className={`my-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.message}
            </div>
        </div>
    )
}