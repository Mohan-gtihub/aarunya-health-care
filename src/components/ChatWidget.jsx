import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot', time: new Date().toLocaleTimeString() }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };
    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Thank you for your message. A representative will be with you shortly.',
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div>
                <h3>Live Chat Support</h3>
                <p className="chat-status">
                  <span className="status-dot"></span> Online
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="chat-close">
                ✕
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-input-form">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </>
  );
}
