import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Volume2, VolumeX, Mic } from 'lucide-react';

const ConciergeWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
        { role: 'ai', text: 'Welcome back, Mr. Sterling. How can I assist with your portfolio or schedule today?' }
    ]);
    const [input, setInput] = useState('');
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Text-to-Speech function using Web Speech API
    const speak = (text: string) => {
        if (!voiceEnabled || !('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95; // Slightly slower for clarity
        utterance.pitch = 1.0;
        utterance.volume = 0.8;

        // Try to use a premium voice (UK English female preferred)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Karen') || v.lang.includes('en-GB'));
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', text: input }]);
        setInput('');

        // Mock AI response with voice
        setTimeout(() => {
            const aiResponse = 'I have noted that request. Is there anything else?';
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            speak(aiResponse);
        }, 1000);
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

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Chat Window */}
            <div className={`absolute bottom-20 right-0 w-[350px] bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <Sparkles className={`w-4 h-4 text-art-yellow ${isSpeaking ? 'animate-pulse' : ''}`} />
                        </div>
                        <div>
                            <h3 className="font-bold font-sans text-sm">Concierge AI</h3>
                            <p className="font-mono text-[10px] text-gray-400 uppercase">{isSpeaking ? 'Speaking...' : 'Online'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            className="text-white/50 hover:text-white transition-colors"
                            title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
                        >
                            {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-[300px] overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm rounded-tl-none'}`}>
                                <p className="mb-2">{msg.text}</p>
                                {msg.role === 'ai' && (
                                    <button
                                        onClick={() => speak(msg.text)}
                                        className="text-xs font-mono uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1"
                                    >
                                        <Volume2 className="w-3 h-3" />
                                        Speak
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100 focus-within:border-black transition-colors">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type or speak..."
                            className="flex-1 bg-transparent outline-none text-sm font-medium"
                        />
                        <button
                            onClick={() => {
                                if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                                    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
                                    const recognition = new SpeechRecognition();
                                    recognition.onresult = (event: any) => {
                                        const transcript = event.results[0][0].transcript;
                                        setInput(transcript);
                                        handleSend();
                                    };
                                    recognition.start();
                                } else {
                                    alert('Speech recognition not supported in this browser.');
                                }
                            }}
                            className="text-gray-400 hover:text-black transition-colors"
                        >
                            <Mic className="w-4 h-4" />
                        </button>
                        <button onClick={handleSend} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                            <Send className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />}
            </button>
        </div>
    );
};

export default ConciergeWidget;
