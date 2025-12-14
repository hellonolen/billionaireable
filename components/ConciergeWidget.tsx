import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Volume2, VolumeX, Mic, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'ai';
    text: string;
}

const SYSTEM_PROMPT = `You are Billionaireable, an elite AI advisor helping high-net-worth individuals and ambitious entrepreneurs on their path to building generational wealth. You embody the wisdom of Warren Buffett, the vision of Elon Musk, and the strategic thinking of Ray Dalio.

Your personality:
- Confident but not arrogant
- Direct and actionable advice
- Thinks in systems and leverage
- Always looking for asymmetric opportunities
- Speaks with authority but welcomes questions

Your areas of expertise:
1. Wealth building and capital allocation
2. Business strategy and scaling
3. Tax optimization and asset protection
4. Family office structures
5. Deal flow and investment opportunities
6. Time leverage and productivity
7. Network effects and relationship capital
8. Legacy planning and generational wealth

Keep responses concise (2-3 paragraphs max). Use concrete examples when relevant. Always end with a thought-provoking question or actionable next step.

Remember: The second billion is inevitable. The first one is engineered.`;

const ConciergeWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: 'Welcome back. I\'m Billionaireable, your strategic advisor on the path to generational wealth. What\'s on your mind today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Text-to-Speech function using Web Speech API
    const speak = (text: string) => {
        if (!voiceEnabled || !('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Try to use a premium voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Karen') || 
            v.name.includes('Daniel') ||
            v.lang.includes('en-GB')
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const callGeminiAPI = async (userMessage: string): Promise<string> => {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return "I'm currently in offline mode. To enable my full capabilities, please configure your Gemini API key. In the meantime, what specific area would you like to explore? I can guide you through our curriculum on wealth building, capital allocation, or strategic planning.";
        }

        try {
            // Build conversation history for context
            const conversationHistory = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            ...conversationHistory,
                            {
                                role: 'user',
                                parts: [{ text: userMessage }]
                            }
                        ],
                        systemInstruction: {
                            parts: [{ text: SYSTEM_PROMPT }]
                        },
                        generationConfig: {
                            temperature: 0.8,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024,
                        },
                        safetySettings: [
                            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                        ]
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!aiResponse) {
                throw new Error('No response from API');
            }

            return aiResponse;
        } catch (error) {
            console.error('Gemini API error:', error);
            return "I encountered a brief disruption. Let me refocus. What's the core question you're wrestling with regarding your wealth-building journey?";
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await callGeminiAPI(userMessage);
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            speak(aiResponse);
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'ai', 
                text: "Let me recalibrate. What aspect of your billion-dollar journey should we focus on?" 
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
    }, [isOpen]);

    // Load voices on component mount
    useEffect(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }
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
        <div className="fixed bottom-8 right-8 z-50">
            {/* Chat Window */}
            <div className={`absolute bottom-20 right-0 w-[380px] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-art-orange to-art-yellow flex items-center justify-center">
                            <Sparkles className={`w-5 h-5 text-black ${isSpeaking ? 'animate-pulse' : ''}`} />
                        </div>
                        <div>
                            <h3 className="font-black font-sans text-sm tracking-tight">Billionaireable</h3>
                            <p className="font-mono text-[10px] text-gray-400 uppercase">
                                {isLoading ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Strategic Advisor'}
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
                                {msg.role === 'ai' && (
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
