import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Volume2, VolumeX, Mic, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

const ConciergeWidget: React.FC = () => {
    const { user: clerkUser, isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', text: 'Welcome back. What\'s on your mind today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Convex hooks
    const convexUser = useQuery(
        api.users.getUserByClerkId,
        isSignedIn && clerkUser ? { clerkId: clerkUser.id } : "skip"
    );
    const createConversation = useMutation(api.conversations.createConversation);
    const addMessage = useMutation(api.conversations.addMessage);
    const chat = useAction(api.billionaireable.chat);
    const textToSpeech = useAction(api.speech.textToSpeech);
    
    // Audio ref for playing TTS
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Text-to-Speech using Gemini's native audio via Convex
    const speak = useCallback(async (text: string) => {
        if (!voiceEnabled) return;

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        setIsSpeaking(true);

        try {
            // Call Convex action to get audio from Gemini
            const result = await textToSpeech({ text });
            
            // Create audio element and play
            const audio = new Audio(`data:${result.mimeType};base64,${result.audio}`);
            audioRef.current = audio;
            
            audio.onended = () => {
                setIsSpeaking(false);
                audioRef.current = null;
            };
            
            audio.onerror = () => {
                setIsSpeaking(false);
                audioRef.current = null;
                console.error('Audio playback error');
            };

            await audio.play();
        } catch (error) {
            console.error('TTS error:', error);
            setIsSpeaking(false);
            // No fallback - voice disabled until proper TTS is configured
        }
    }, [voiceEnabled, textToSpeech]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            let aiResponse: string;

            // If user is signed in and we have their Convex user, use full Billionaireable with memory
            if (isSignedIn && convexUser) {
                // Create a conversation if we don't have one
                let convId = conversationId;
                if (!convId) {
                    convId = await createConversation({ 
                        userId: convexUser._id,
                        title: userMessage.slice(0, 50),
                    });
                    setConversationId(convId);
                }

                // Save user message to Convex
                await addMessage({
                    conversationId: convId as any,
                    userId: convexUser._id,
                    role: 'user',
                    content: userMessage,
                });

                // Call Billionaireable with full context
                aiResponse = await chat({
                    userId: convexUser._id,
                    message: userMessage,
                });

                // Save response to Convex
                await addMessage({
                    conversationId: convId as any,
                    userId: convexUser._id,
                    role: 'assistant',
                    content: aiResponse,
                });
            } else {
                // Fallback for non-signed-in users
                aiResponse = "Sign in to continue. This is how billionaires think. This is what they do. Let's go.";
            }

            setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
            speak(aiResponse);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                text: "Let me recalibrate. What aspect of your journey should we focus on?" 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Speak the welcome message when widget opens
    useEffect(() => {
        if (isOpen && messages.length === 1) {
            speak(messages[0].text);
        }
    }, [isOpen, speak]);
    
    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const handleVoiceInput = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
            };
            recognition.start();
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    };

    return (
        <div className="fixed bottom-20 right-8 z-50">
            {/* Chat Window */}
            <div className={`absolute bottom-20 right-0 w-[380px] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-art-orange flex items-center justify-center">
                            <span className={`font-serif text-lg font-black text-black ${isSpeaking ? 'animate-pulse' : ''}`}>B</span>
                        </div>
                        <div>
                            <h3 className="font-black font-sans text-sm tracking-tight">Billionaireable</h3>
                            <p className="font-mono text-[10px] text-gray-400 uppercase">
                                {isLoading ? 'Thinking...' : isSpeaking ? 'Speaking...' : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            className="text-white/50 hover:text-white transition-colors p-2"
                            title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
                        >
                            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white p-2">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-[350px] overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.role === 'user' 
                                    ? 'bg-black text-white rounded-tr-none' 
                                    : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                            }`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                {msg.role === 'assistant' && (
                                    <button
                                        onClick={() => speak(msg.text)}
                                        className="mt-3 text-xs font-mono uppercase text-gray-400 hover:text-art-orange transition-colors flex items-center gap-1"
                                    >
                                        <Volume2 className="w-3 h-3" />
                                        Speak
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <Loader2 className="w-5 h-5 animate-spin text-art-orange" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-3 border border-gray-100 focus-within:border-art-orange focus-within:ring-2 focus-within:ring-art-orange/20 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder="Ask about wealth, strategy, deals..."
                            disabled={isLoading}
                            className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-gray-400"
                        />
                        <button
                            onClick={handleVoiceInput}
                            disabled={isLoading}
                            className="text-gray-400 hover:text-art-orange transition-colors disabled:opacity-50"
                        >
                            <Mic className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleSend} 
                            disabled={isLoading || !input.trim()}
                            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-art-orange transition-colors disabled:opacity-50 disabled:hover:bg-black"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-art-orange transition-all group"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <div className="relative">
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-art-green rounded-full animate-pulse" />
                    </div>
                )}
            </button>
        </div>
    );
};

export default ConciergeWidget;
