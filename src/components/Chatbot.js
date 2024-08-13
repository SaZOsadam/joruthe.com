import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader, Trash2 } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([{ text: "Hi, I'm Ruthie, your virtual assistant for Joruthe LLC. How may I help you today?", isBot: true }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const clearChat = () => {
    setMessages([{ text: "Hi, I'm Ruthie. How can I assist you today?", isBot: true }]);
    localStorage.removeItem('chatMessages');
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage, messages }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Server response:', textResponse);
        throw new Error(`HTTP error! status: ${response.status}, body: ${textResponse.slice(0, 200)}...`);
      }

      const data = await response.json();
      setTimeout(() => {
        setMessages(prev => [...prev, { text: data.botResponse, isBot: true }]);
        setIsTyping(false);
      }, 500); // Simulate typing delay
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      setError(`Error: ${error.message}`);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
          aria-label="Open chat with Ruthie"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 h-[32rem] flex flex-col">
          <div className="bg-primary text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold">Chat with Ruthie</h3>
            <div className="flex items-center">
              <button onClick={clearChat} className="mr-2 hover:text-gray-300" aria-label="Clear chat">
                <Trash2 size={20} />
              </button>
              <button onClick={toggleChat} className="hover:text-gray-300" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isBot ? 'text-left' : 'text-right'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isBot ? 'bg-gray-200' : 'bg-primary text-white'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200">
                  Ruthie is typing...
                </span>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type your message to Ruthie..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark transition duration-300 disabled:opacity-50"
              aria-label="Send message to Ruthie"
              disabled={isLoading || isTyping}
            >
              {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;