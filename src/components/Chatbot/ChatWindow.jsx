import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';

const INITIAL_MESSAGE = {
    id: 1,
    text: "Hey there! 👋 I'm Vaibhav's AI assistant. I know everything about his skills, projects, and experience. Ask me anything!",
    sender: 'bot',
    type: 'text'
};

const QUICK_ACTIONS = [
    { id: 'experience', label: "💼 Work Experience" },
    { id: 'projects', label: "🚀 Key Projects" },
    { id: 'skills', label: "🛠️ Technical Skills" },
    { id: 'contact', label: "📧 Contact Info" }
];

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
    const [sessionId] = useState(() => `session_${Date.now()}`);

    // Check if AI is asking for contact info
    const checkForContactPrompt = (text) => {
        const contactKeywords = ['contact', 'email', 'phone', 'name', 'reach you', 'get in touch', 'follow up', 'send you', 'proposal'];
        const lowerText = text.toLowerCase();
        return contactKeywords.some(keyword => lowerText.includes(keyword)) &&
            (lowerText.includes('?') || lowerText.includes('share') || lowerText.includes('provide'));
    };

    const callGroqAPI = async (userText) => {
        setIsTyping(true);
        try {
            const apiMessages = messages
                .filter(m => m.type === 'text')
                .map(m => ({
                    role: m.sender === 'bot' ? 'assistant' : 'user',
                    content: m.text
                }));

            apiMessages.push({ role: 'user', content: userText });

            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages, sessionId }),
            });

            const data = await response.json();

            if (data.response) {
                const botMessage = {
                    id: Date.now(),
                    text: data.response,
                    sender: 'bot',
                    type: 'text'
                };
                setMessages(prev => [...prev, botMessage]);

                // Check if AI is asking for contact info
                if (checkForContactPrompt(data.response)) {
                    setTimeout(() => setShowContactForm(true), 500);
                }
            }
        } catch (error) {
            console.error("Failed to get AI response", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "I'm having a bit of trouble connecting right now. Could you try again in a moment? 🙏",
                sender: 'bot',
                type: 'text'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleUserMessage = (text) => {
        const userMsg = { id: Date.now(), text, sender: 'user', type: 'text' };
        setMessages(prev => [...prev, userMsg]);
        setShowQuickActions(false);
        callGroqAPI(text);
    };

    const handleQuickAction = (action) => {
        const actionMessages = {
            'experience': "Tell me about Vaibhav's work experience",
            'projects': "What are Vaibhav's key projects?",
            'skills': "What are Vaibhav's technical skills?",
            'contact': "How can I contact Vaibhav?"
        };
        handleUserMessage(actionMessages[action.id] || action.label);
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        if (!contactInfo.email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        setShowContactForm(false);

        // Add user's contact info as a message
        const contactMsg = {
            id: Date.now(),
            text: `My name is ${contactInfo.name}, email: ${contactInfo.email}, phone: ${contactInfo.phone}`,
            sender: 'user',
            type: 'text'
        };
        setMessages(prev => [...prev, contactMsg]);

        setIsTyping(true);

        try {
            // Get all messages for requirement extraction
            const allMessages = [...messages, contactMsg].filter(m => m.type === 'text').map(m => ({
                role: m.sender === 'bot' ? 'assistant' : 'user',
                content: m.text
            }));

            // Generate and send requirements document
            const response = await fetch('http://localhost:3000/api/generate-requirements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: allMessages,
                    contactInfo
                }),
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: `Perfect, ${contactInfo.name}! 🎉 I've compiled all our discussion into a detailed requirements document and sent it to Vaibhav. He'll review everything and reach out to you at ${contactInfo.email} within 24 hours with a personalized proposal.\n\nIs there anything else you'd like to know about our AI services in the meantime?`,
                sender: 'bot',
                type: 'text'
            }]);

        } catch (error) {
            console.error("Failed to generate requirements", error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "I've noted your details! Vaibhav will be in touch soon. 😊",
                sender: 'bot',
                type: 'text'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-header-info">
                    <div className="avatar-bot">
                        <span>🤖</span>
                    </div>
                    <div>
                        <div className="chat-title">Vaibhav's AI Assistant</div>
                        <div className="chat-status">
                            <span className="status-dot"></span>
                            Online • Powered by AI
                        </div>
                    </div>
                </div>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>

            <div className="chat-body">
                <MessageList
                    messages={messages}
                    onOptionClick={() => { }}
                    isTyping={isTyping}
                />

                {showQuickActions && (
                    <div className="quick-actions">
                        {QUICK_ACTIONS.map(action => (
                            <button
                                key={action.id}
                                className="quick-action-btn"
                                onClick={() => handleQuickAction(action)}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                {showContactForm && (
                    <div className="contact-form-overlay">
                        <form className="contact-form" onSubmit={handleContactSubmit}>
                            <h4>📋 Let's get your details</h4>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={contactInfo.name}
                                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={contactInfo.email}
                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone (Optional)"
                                value={contactInfo.phone}
                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            />
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowContactForm(false)}>
                                    Later
                                </button>
                                <button type="submit" className="btn-submit-contact">
                                    Send Details ✨
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="chat-footer">
                <InputArea
                    onSend={handleUserMessage}
                    disabled={isTyping}
                    placeholder="Ask me anything about AI services..."
                />
            </div>
        </div>
    );
};

export default ChatWindow;
