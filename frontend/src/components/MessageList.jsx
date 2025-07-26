import Message from './Message';

const MessageList = ({ messages }) => {
    return (
        <div className="overflow-y-auto flex-1 px-4">
            {messages.map((msg, index) => (
                <Message key={index} message={msg} />
            ))}
        </div>
    );
};

export default MessageList;