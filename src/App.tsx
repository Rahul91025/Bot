import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import type { ChatInput as ChatInputType, ChatOutput } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);

    const input: ChatInputType = {
      inputValue: message,
      inputType: 'chat',
      outputType: 'chat'
    };

    try {
      const response = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      const data: ChatOutput = await response.json();

      if (!data.error && data.message) {
        setMessages(prev => [...prev, { text: data.message, isUser: false }]);
      } else {
        setMessages(prev => [
          ...prev,
          { text: 'Sorry, I encountered an error. Please try again.', isUser: false }
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, I encountered an error. Please try again.', isUser: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl h-screen p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-2 p-4 border-b border-gray-800">
          <div className="p-2 rounded-full bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            <Bot className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">AI Assistant</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-purple-400">
              <div className="animate-bounce shadow-[0_0_10px_rgba(147,51,234,0.5)]">●</div>
              <div className="animate-bounce delay-100 shadow-[0_0_10px_rgba(147,51,234,0.5)]">●</div>
              <div className="animate-bounce delay-200 shadow-[0_0_10px_rgba(147,51,234,0.5)]">●</div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="pt-4 border-t border-gray-800">
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;