import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, onOptionClick, isTyping }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="chat-messages">
            {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                    <div className="message-bubble">
                        {msg.text}
                    </div>
                    {msg.type === 'options' && msg.options && (
                        <div className="options-container">
                            {msg.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    className="option-btn"
                                    onClick={() => onOptionClick(opt)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {isTyping && (
                <div className="message-wrapper bot">
                    <div className="message-bubble typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;
