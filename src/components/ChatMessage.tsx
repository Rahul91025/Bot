import React, { useEffect, useRef } from 'react';
import { MessageCircle, Bot, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            isUser 
              ? 'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
              : 'bg-gray-700 shadow-[0_0_15px_rgba(55,65,81,0.5)]'
          }`}
        >
          {isUser ? (
            <MessageCircle className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div
          className={`group relative p-4 rounded-2xl transition-all duration-300 ${
            isUser
              ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-gray-700 text-white shadow-[0_0_15px_rgba(55,65,81,0.3)]'
          }`}
        >
          <p className="text-sm">{message}</p>
          {!isUser && (
            <button
              onClick={() => speak(message)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
            >
              <Volume2 className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;