import React, { useState } from 'react';
import { X, TrendingUp, Activity, MessageCircle, Mic, Send } from 'lucide-react';
import { CardData } from '../types';

interface CardModalProps {
    card: CardData;
    onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
    const [chatMessage, setChatMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const getThemeColor = () => {
        switch (card.colorTheme) {
            case 'green': return 'bg-art-green';
            case 'blue': return 'bg-art-blue';
            case 'orange': return 'bg-art-orange';
            case 'yellow': return 'bg-art-yellow';
            default: return 'bg-gray-100';
        }
    };

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            // TODO: Integrate with Billionaireable
            console.log('Sending message:', chatMessage);
            setChatMessage('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">

                {/* Header */}
                <div className={`${getThemeColor()} p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <h2 className="font-serif text-4xl font-black mb-2">{card.title}</h2>
                            <p className="font-sans text-lg opacity-90">{card.description}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left: Data Visualization */}
                        <div>
                            <h3 className="font-sans text-xl font-bold uppercase mb-6">Live Data</h3>

                            {/* Metrics */}
                            <div className="space-y-4 mb-8">
                                {card.previewMetrics?.map((metric, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-xs font-bold uppercase text-gray-400">{metric.label}</span>
                                            {metric.trend && (
                                                <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-art-green' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                                                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                                                    {metric.trend === 'down' && <Activity className="w-4 h-4" />}
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-sans text-3xl font-bold">{metric.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <h3 className="font-sans text-xl font-bold uppercase mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-art-orange text-white py-4 rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                                    Update Data
                                </button>
                                <button className="w-full bg-white border-2 border-black text-black py-4 rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-50 transition-colors">
                                    Set Alert
                                </button>
                                <button className="w-full bg-white border-2 border-black text-black py-4 rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-50 transition-colors">
                                    View History
                                </button>
                            </div>
                        </div>

                        {/* Right: Chat */}
                        <div className="flex flex-col">
                            <h3 className="font-sans text-xl font-bold uppercase mb-6 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                Ask Billionaireable
                            </h3>

                            {/* Chat Messages */}
                            <div className="flex-1 bg-gray-50 rounded-2xl p-6 mb-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-art-blue flex items-center justify-center text-white flex-shrink-0 font-black text-sm">
                                            B
                                        </div>
                                        <div className="bg-white rounded-2xl p-4 flex-1">
                                            <p className="text-sm">How can I help you with {card.title.toLowerCase()}? I can update data, analyze trends, or answer questions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Input */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsRecording(!isRecording)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message or use voice..."
                                    className="flex-1 px-6 py-3 bg-gray-100 border-none rounded-full font-sans text-sm focus:ring-2 focus:ring-black transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardModal;
