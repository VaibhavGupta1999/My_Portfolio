import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="chatbot-container">
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

            {!isOpen && (
                <button className="chat-fab" onClick={() => setIsOpen(true)}>
                    <span className="fab-icon">💬</span>
                    <span className="fab-text">Chat with AI</span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
