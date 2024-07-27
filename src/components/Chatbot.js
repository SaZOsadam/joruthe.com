import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_Ruthie_KEY,
  organization: "org-kGmhBOd9GfYSIiSPmEg1Aus8",
  dangerouslyAllowBrowser: true // Only use this for client-side applications
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('ruthieChatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([{ text: "Hi, I'm Ruthie, your virtual assistant for Joruthe LLC. How may I help you today?", isBot: true }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ruthieChatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Ruthie, a helpful assistant for Joruthe LLC, a home repair and renovation company. Provide friendly and informative responses about their services including plumbing, electrical work, carpentry, renovation, lawn care, landscaping, and fencing."
          },
          ...messages.map(msg => ({
            role: msg.isBot ? "assistant" : "user",
            content: msg.text
          })),
          { role: "user", content: inputMessage }
        ],
      });

      const botResponse = response.choices[0].message.content.trim();
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setError('Sorry, I encountered an error. Please try again later.');
      if (error.response) {
        console.error(error.response.status, error.response.data);
        setError(`Error ${error.response.status}: ${error.response.data.error.message}`);
      } else {
        console.error('Error', error.message);
        setError(`Error: ${error.message}`);
      }
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
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-primary text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold">Chat with Ruthie</h3>
            <button onClick={toggleChat} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isBot ? 'text-left' : 'text-right'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isBot ? 'bg-gray-200' : 'bg-primary text-white'}`}>
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-center">
                <Loader className="animate-spin inline-block" size={24} />
                <p>Ruthie is thinking...</p>
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
              className="bg-primary text-white p-2 rounded-r-md hover:bg-primary-dark transition duration-300"
              aria-label="Send message to Ruthie"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;