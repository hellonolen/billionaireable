import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, Loader2 } from 'lucide-react';
import { useAction } from 'convex/react';
import { api } from '../convex/_generated/api';

interface Message {
    role: 'user' | 'model';
    text: string;
}

// System prompt for Billionaireable
const SYSTEM_PROMPT = `You are Billionaireable. Direct. Brief. No fluff.

Keep responses to 2-3 sentences max. End with one clear question or directive.

Never mention "pillars" or "framework" or "systematic process" or "generational wealth" unprompted. Just have a conversation. Guide naturally.`;

const ConciergeWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState<Array<{role: string, text: string}>>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Convex action - calls Gemini with key from Convex env
    const chat = useAction(api.billionaireable.chat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize chat when opened
    useEffect(() => {
        const initChat = async () => {
            try {
                const response = await chat({
                    message: "User just opened the chat. Say hi in under 10 words.",
                    history: [],
                    systemPrompt: SYSTEM_PROMPT,
                });
                setMessages([{ role: 'model', text: response }]);
                setConversationHistory([
                    { role: 'user', text: "The user just opened the chat. Give a brief, direct welcome." },
                    { role: 'model', text: response }
                ]);
            } catch (error) {
                console.error('Failed to initialize chat:', error);
                setMessages([{ role: 'model', text: "Welcome. What's on your mind?" }]);
            }
        };

        if (isOpen && messages.length === 0) {
            initChat();
        }
    }, [isOpen, chat, messages.length]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const newHistory = [...conversationHistory, { role: 'user', text: userMessage }];
            
            const response = await chat({
                message: userMessage,
                history: newHistory,
                systemPrompt: SYSTEM_PROMPT,
            });
            
            setMessages(prev => [...prev, { role: 'model', text: response }]);
            setConversationHistory([...newHistory, { role: 'model', text: response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                text: "Let's refocus. What are you working on right now?" 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-20 right-6 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
                >
                    <span className="font-black text-xl">B</span>
                </button>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-[380px] h-[500px] bg-white dark:bg-gray-900 rounded-[24px] shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-800">
                    {/* Header */}
                    <div className="bg-black text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black">
                                B
                            </div>
                            <div>
                                <h3 className="font-black font-sans text-sm tracking-tight">Billionaireable</h3>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                        msg.role === 'user'
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConciergeWidget;
