import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

import { ArrowLeft, Play, Pause, Lock, Users, FileText, Shield, ArrowUpRight, CheckCircle, MessageCircle, X, Send, Loader2, Mic, MicOff, Volume2, VolumeX, SkipBack } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { DASHBOARD_CARDS, SKILL_DATA } from '../constants';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAuth } from '../contexts/AuthContext';

import { useProgress } from '../contexts/ProgressContext';

const SkillDetail: React.FC = () => {
    const navigate = useNavigate();
    const { skillId } = useParams<{ skillId: string }>();
    const { progress, updateNetWorth, updateRevenue, getNextLevelThreshold } = useProgress();
    const [activeModule, setActiveModule] = useState(0);
    const [activeTab, setActiveTab] = useState(0); // New state for progression tabs
    
    // "Let's Talk" modal state
    const [showTalkModal, setShowTalkModal] = useState(false);
    const [talkMessages, setTalkMessages] = useState<{role: string, content: string}[]>([]);
    const [talkInput, setTalkInput] = useState('');
    const [talkLoading, setTalkLoading] = useState(false);
    const [aiInsights, setAiInsights] = useState<string[]>([]);
    const talkMessagesEndRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    
    // Voice controls
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const hasGreeted = useRef(false);
    
    // Close modal on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showTalkModal) {
                setShowTalkModal(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showTalkModal]);
    
    // When modal opens, Billionaireable starts the conversation
    useEffect(() => {
        if (showTalkModal && talkMessages.length === 0 && !hasGreeted.current) {
            hasGreeted.current = true;
            startConversation();
        }
    }, [showTalkModal]);
    
    // Reset greeting flag when modal closes
    useEffect(() => {
        if (!showTalkModal) {
            hasGreeted.current = false;
        }
    }, [showTalkModal]);
    
    // Auth & Convex
    const { user } = useAuth();
    const chat = useAction(api.billionaireable.chat);
    const textToSpeech = useAction(api.elevenlabs.textToSpeech);
    const createConversation = useMutation(api.conversations.createConversation);
    const addMessage = useMutation(api.conversations.addMessage);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recognitionRef = useRef<any>(null);

    // Find the skill data
    const skill = DASHBOARD_CARDS.find(c => c.id === skillId);

    // Get specific data or fallback
    const data = (skillId && SKILL_DATA[skillId]) ? SKILL_DATA[skillId] : SKILL_DATA['syndicate'];

    if (!skill) return <div>Skill not found</div>;

    // Theme colors based on the skill's theme
    const getThemeColors = (theme: string) => {
        switch (theme) {
            case 'green': return 'bg-art-green';
            case 'blue': return 'bg-art-blue';
            case 'orange': return 'bg-art-orange';
            case 'yellow': return 'bg-art-yellow';
            default: return 'bg-gray-100';
        }
    };

    const themeBg = getThemeColors(skill.colorTheme);

    // Theme border classes
    const getThemeBorder = (theme: string) => {
        switch (theme) {
            case 'green': return 'border-art-green';
            case 'blue': return 'border-art-blue';
            case 'orange': return 'border-art-orange';
            case 'yellow': return 'border-art-yellow';
            default: return 'border-gray-200';
        }
    };

    // Theme text classes
    const getThemeText = (theme: string) => {
        switch (theme) {
            case 'green': return 'text-art-green';
            case 'blue': return 'text-art-blue';
            case 'orange': return 'text-art-orange';
            case 'yellow': return 'text-art-yellow';
            default: return 'text-gray-500';
        }
    };

    const themeBorder = getThemeBorder(skill.colorTheme);
    const themeText = getThemeText(skill.colorTheme);

    // Speak text using ElevenLabs TTS
    const speakText = async (text: string) => {
        const result = await textToSpeech({ text });
        const audio = new Audio(`data:${result.mimeType};base64,${result.audio}`);
        audioRef.current = audio;
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
        audio.play();
    };
    
    // Start the conversation
    const startConversation = () => {
        const greeting = `Welcome to ${skill?.title}. What are you working on?`;
        setTalkMessages([{ role: 'assistant', content: greeting }]);
        speakText(greeting);
        startListening();
    };
    
    // Listen for user speech
    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript.trim()) sendMessage(transcript.trim());
        };
        
        recognition.onend = () => {
            setIsMicOn(false);
            // Keep listening while modal is open
            if (showTalkModal && !isPlaying) startListening();
        };
        
        recognitionRef.current = recognition;
        recognition.start();
        setIsMicOn(true);
    };
    
    // Toggle microphone for speech recognition
    const toggleMic = () => {
        if (isMicOn) {
            // Stop listening
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsMicOn(false);
        } else {
            startListening();
        }
    };
    
    // Stop audio playback
    const stopPlayback = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    };

    // Send a message (used by both text input and voice)
    const sendMessage = async (message: string) => {
        if (!message.trim() || talkLoading) return;

        const userMessage = message.trim();
        setTalkMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setTalkLoading(true);

        try {
            const systemPrompt = `You are Billionaireable guiding someone through Pillar: ${skill?.title}.

Context: ${data.insight}

You guide. You don't teach. Be direct. 2-3 sentences max.

If they share something meaningful or have a breakthrough, end your response with [INSIGHT: a one-sentence summary of their key realization].`;

            const response = await chat({
                message: userMessage,
                history: talkMessages.map(m => ({ role: m.role, text: m.content })),
                systemPrompt,
            });

            // Check for insight marker
            const insightMatch = response.match(/\[INSIGHT:\s*(.+?)\]/);
            let cleanResponse = response;
            if (insightMatch) {
                cleanResponse = response.replace(/\[INSIGHT:\s*.+?\]/, '').trim();
                setAiInsights(prev => [...prev, insightMatch[1]]);
            }

            setTalkMessages(prev => [...prev, { role: 'assistant', content: cleanResponse }]);
            
            // Speak the response
            speakText(cleanResponse);

            // Save to Convex
            if (user && skillId) {
                let convId = conversationId;
                if (!convId) {
                    convId = await createConversation({
                        userId: user._id,
                        title: `${skill?.title} - Conversation`
                    });
                    setConversationId(convId);
                }

                await addMessage({
                    conversationId: convId as any,
                    userId: user._id,
                    role: 'user',
                    content: userMessage,
                    skillId,
                });
                await addMessage({
                    conversationId: convId as any,
                    userId: user._id,
                    role: 'assistant',
                    content: cleanResponse,
                    skillId,
                });
            }
        } catch (error) {
            console.error('Chat error:', error);
            setTalkMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
        } finally {
            setTalkLoading(false);
        }
    };

    // Handle sending a message from text input
    const handleTalkSend = async () => {
        if (!talkInput.trim() || talkLoading) return;
        const message = talkInput.trim();
        setTalkInput('');
        await sendMessage(message);
    };

    return (
        <div className="min-h-screen bg-white animate-fade-in">
            {/* Navigation */}
            <div className="fixed top-0 right-0 z-50 px-6 py-6">
                <button
                    onClick={() => navigate('/')}
                    className="bg-white/90 backdrop-blur-md border border-gray-200 text-black px-6 py-3 rounded-full font-mono text-xs font-bold uppercase hover:bg-black hover:text-white transition-all flex items-center gap-2 shadow-soft-xl"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </button>
            </div>

            {/* Hero Section - Reduced Height */}
            <div className={`pt-24 pb-12 px-4 sm: px-6 lg: px-12 ${themeBg} min-h-[45vh] flex flex-col justify-center relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-[1800px] mx-auto w-full relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-black text-white px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest">
                                    Skill #{data.modules.findIndex(m => m.status === 'active') + 1} in Progress
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-black px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest border border-black/10">
                                    Level: Practicing
                                </span>
                            </div>
                            <h1 className="font-serif text-7xl md:text-9xl font-black text-black tracking-tighter leading-[0.9] mb-8 uppercase">
                                {skill.title}
                            </h1>
                            <p className="font-serif text-2xl md:text-3xl text-black/80 max-w-2xl leading-relaxed">
                                "{skill.description}. {data.insight.split('.')[0]}."
                            </p>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white p-8 rounded-[32px] shadow-2xl max-w-sm w-full">
                            <div className="flex justify-between items-end mb-4">
                                <span className="font-mono text-xs font-bold uppercase text-gray-400">Mastery</span>
                                <span className="font-serif text-5xl font-black text-black">32%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${themeBg} w-[32%]`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 10 Tabs - RIGHT BELOW HERO SECTION */}
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-8">
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab(0)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 0
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Training
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 1
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab(2)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 2
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Impact
                    </button>
                    <button
                        onClick={() => setActiveTab(3)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 3
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Influence
                    </button>
                    <button
                        onClick={() => setActiveTab(4)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 4
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Strategy
                    </button>
                    <button
                        onClick={() => setActiveTab(5)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 5
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        5 Levels
                    </button>
                    <button
                        onClick={() => setActiveTab(6)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 6
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        3 Triangles
                    </button>
                    <button
                        onClick={() => setActiveTab(7)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 7
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        6 Decisions
                    </button>
                    <button
                        onClick={() => setActiveTab(8)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 8
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Execute
                    </button>
                    <button
                        onClick={() => setActiveTab(9)}
                        className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 9
                            ? `${themeBg} text-white shadow-lg scale-105`
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            } `}
                    >
                        Proof
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {/* Tab 1: Training - EXISTING CONTENT */}
                {activeTab === 0 && (
                    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Column: Training Modules (The Pathway) */}
                            <div className="lg:col-span-7 space-y-12">
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="font-sans text-4xl font-black uppercase flex items-center gap-4">
                                            <FileText className="w-8 h-8" />
                                            Training Modules
                                        </h2>
                                        <button
                                            onClick={() => setShowTalkModal(true)}
                                            className={`${themeBg} text-white px-6 py-3 rounded-full font-mono text-xs font-bold uppercase flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Let's Talk
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {data.modules.map((module, index) => (
                                            <div
                                                key={module.id}
                                                onClick={() => {
                                                    if (module.status !== 'locked') {
                                                        navigate(`/skills/${skillId}/${index + 1}`);
                                                    }
                                                }}
                                                className={`group relative p-8 rounded-[32px] border-2 transition-all cursor-pointer overflow-hidden ${activeModule === index
                                                    ? 'border-black bg-white text-black shadow-2xl scale-[1.02]'
                                                    : 'border-gray-100 bg-white text-black hover:border-gray-300'
                                                    } `}
                                            >
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div className="flex items-center gap-6">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-lg ${activeModule === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                                                            } `}>
                                                            {module.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : index + 1}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-sans text-xl font-bold uppercase mb-1">{module.title}</h3>
                                                            <p className={`font-mono text-xs uppercase ${activeModule === index ? 'text-gray-600' : 'text-gray-400'} `}>
                                                                {module.duration} • {module.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeModule === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-black group-hover:text-white'
                                                        } `}>
                                                        {module.status === 'locked' ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Strategic Insight */}
                                <div className="bg-gray-50 rounded-[32px] p-10 border border-gray-100">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-4">Strategic Insight</h3>
                                    <p className="font-serif text-xl text-gray-600 leading-relaxed">
                                        "{data.insight}"
                                    </p>
                                </div>

                                {/* AI Insights from Conversation */}
                                {aiInsights.length > 0 && (
                                    <div className={`${themeBg} rounded-[32px] p-10`}>
                                        <h3 className="font-sans text-2xl font-black uppercase mb-4 text-white flex items-center gap-3">
                                            <MessageCircle className="w-6 h-6" />
                                            Your Insights
                                        </h3>
                                        <div className="space-y-3">
                                            {aiInsights.map((insight, idx) => (
                                                <div key={idx} className="bg-white/10 rounded-xl p-4">
                                                    <p className="font-serif text-base text-white leading-relaxed">
                                                        {insight}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: The Network & Tools (The Access) */}
                            <div className="lg:col-span-5 space-y-8">

                                {/* Network Card */}
                                <div className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100">
                                    <h2 className="font-sans text-2xl font-black uppercase mb-6 flex items-center gap-3">
                                        <Users className="w-6 h-6" />
                                        The Network
                                    </h2>
                                    <div className="space-y-4">
                                        {data.network.map((contact, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold font-serif">
                                                        {contact.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{contact.name}</p>
                                                        <p className="font-mono text-[10px] uppercase text-gray-400">{contact.type}</p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-6 py-4 border border-black rounded-full font-mono text-xs font-bold uppercase hover:bg-black hover:text-white transition-all">
                                        View Full Directory
                                    </button>
                                </div>

                                {/* Tools Card */}
                                <div className="bg-white text-black rounded-[32px] p-8 shadow-soft-xl border border-gray-100">
                                    <h2 className="font-sans text-2xl font-black uppercase mb-6 flex items-center gap-3">
                                        <Shield className="w-6 h-6" />
                                        Tools & Templates
                                    </h2>
                                    <ul className="space-y-4">
                                        {data.tools.map((tool, i) => (
                                            <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
                                                <span className="font-serif text-lg">{tool}</span>
                                                <ArrowUpRight className="w-4 h-4 opacity-50" />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Analytics - FULL BUILD */}
                {activeTab === 1 && (
                    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                        <h2 className="font-sans text-4xl font-black uppercase mb-12">$1B Progression Analytics</h2>

                        {/* Top Row: 3 Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Capital Progress */}
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Capital Deployed</h3>
                                <div className="mb-4">
                                    <p className="font-sans text-4xl font-black mb-2">${progress.netWorth.toLocaleString()}</p>
                                    <p className="font-mono text-xs text-gray-400">Goal: ${getNextLevelThreshold(progress.currentLevel).toLocaleString()}</p>
                                </div>
                                <div className="w-full bg-gray-100 h-3 rounded-full mb-4">
                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-3 rounded-full`} style={{ width: `${Math.min(100, (progress.netWorth / getNextLevelThreshold(progress.currentLevel)) * 100)}%` }}></div>
                                </div>
                                <p className="font-serif text-sm text-gray-600">
                                    Gap to Next Level: ${(getNextLevelThreshold(progress.currentLevel) - progress.netWorth).toLocaleString()}
                                </p>
                            </div>

                            {/* Level Indicator */}
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Current Level</h3>
                                <div className="mb-4">
                                    <h4 className="font-sans text-3xl font-black uppercase mb-2">{progress.currentLevel}</h4>
                                    <p className="font-mono text-xs text-gray-400 uppercase">Level {['Architect', 'Accumulator', 'Optimizer', 'Autonomy', 'Perpetual'].indexOf(progress.currentLevel) + 1} of 5</p>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-mono text-xs text-gray-400">Progress to Next Level</span>
                                        <span className="font-mono text-xs font-bold">{Math.min(100, Math.round((progress.netWorth / getNextLevelThreshold(progress.currentLevel)) * 100))}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full">
                                        <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full`} style={{ width: `${Math.min(100, (progress.netWorth / getNextLevelThreshold(progress.currentLevel)) * 100)}%` }}></div>
                                    </div>
                                </div>
                                <p className="font-mono text-xs text-gray-400 mt-4">Est. 14 months to Next Level</p>
                            </div>

                            {/* Next Action */}
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Recommended Next Action</h3>
                                <div className={`p-6 rounded-2xl bg-art-${skill?.colorTheme || 'green'}/10 border-2 border-art-${skill?.colorTheme || 'green'} mb-4`}>
                                    <p className="font-sans text-lg font-bold mb-2">Deploy $15K More Capital</p>
                                    <p className="font-serif text-sm text-gray-600">Priority: High</p>
                                </div >
                                <button className={`w-full py-3 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase hover:opacity-90 transition-all`}>
                                    Start Now
                                </button>
                            </div >
                        </div >

                        {/* Triangle Dimensions - 3 Cards */}
                        < div className="mb-12" >
                            <h3 className="font-sans text-2xl font-black uppercase mb-6">Triangle Dimensions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Capital */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h4 className="font-mono text-xs uppercase text-gray-400 mb-4">Capital</h4>
                                    <p className="font-sans text-4xl font-black mb-2">${progress.netWorth.toLocaleString()}</p>
                                    <div className="w-full bg-gray-100 h-3 rounded-full mb-2">
                                        <div className={`bg-art-${skill?.colorTheme || 'green'} h-3 rounded-full`} style={{ width: `${Math.min(100, (progress.netWorth / getNextLevelThreshold(progress.currentLevel)) * 100)}%` }}></div>
                                    </div>
                                    <p className="font-mono text-xs text-gray-400">Target: ${getNextLevelThreshold(progress.currentLevel).toLocaleString()}</p>
                                </div>

                                {/* Vitality */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h4 className="font-mono text-xs uppercase text-gray-400 mb-4">Vitality</h4>
                                    <p className="font-sans text-4xl font-black mb-2">0</p>
                                    <div className="w-full bg-gray-100 h-3 rounded-full mb-2">
                                        <div className={`bg-art-${skill?.colorTheme || 'green'} h-3 rounded-full w-[0%]`}></div>
                                    </div>
                                    <p className="font-mono text-xs text-gray-400">Score: 0 / 100</p>
                                </div>

                                {/* Leverage */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h4 className="font-mono text-xs uppercase text-gray-400 mb-4">Leverage</h4>
                                    <p className="font-sans text-4xl font-black mb-2">0</p>
                                    <div className="w-full bg-gray-100 h-3 rounded-full mb-2">
                                        <div className={`bg-art-${skill?.colorTheme || 'green'} h-3 rounded-full w-[0%]`}></div>
                                    </div>
                                    <p className="font-mono text-xs text-gray-400">Score: 0 / 100</p>
                                </div>
                            </div>
                        </div >

                        {/* 9 Triangle Sub-Dimensions Radar */}
                        < div className="mb-12" >
                            <h3 className="font-sans text-2xl font-black uppercase mb-6">9 Triangle Sub-Dimensions</h3>
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Capital Sub-metrics */}
                                    <div>
                                        <h4 className="font-sans text-lg font-black uppercase mb-4">Capital</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Structure</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Flow</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Control</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vitality Sub-metrics */}
                                    <div>
                                        <h4 className="font-sans text-lg font-black uppercase mb-4">Vitality</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Energy</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Clarity</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Relationship</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Leverage Sub-metrics */}
                                    <div>
                                        <h4 className="font-sans text-lg font-black uppercase mb-4">Leverage</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Tools</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Team</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-mono text-xs uppercase text-gray-400">Scale</span>
                                                    <span className="font-mono text-xs font-bold">0/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full">
                                                    <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[0%]`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >

                        {/* Row 4: Time Log, Self-Reported Metrics, Platform Stats */}
                        < div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" >
                            {/* Time Log */}
                            < div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl" >
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Activity Log</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Total Hours Invested</p>
                                        <p className="font-sans text-3xl font-black">0.0</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Last Activity</p>
                                        <p className="font-serif text-sm text-gray-700">Never</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Days Active</p>
                                        <p className="font-serif text-sm text-gray-700">0 days</p>
                                    </div>
                                </div>
                            </div >

                            {/* Business Metrics Input */}
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Self-Reported Metrics</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="font-mono text-xs uppercase text-gray-400 block mb-2">Capital Deployed</label>
                                        <input
                                            type="number"
                                            defaultValue={progress.netWorth}
                                            onBlur={(e) => updateNetWorth(Number(e.target.value))}
                                            placeholder="$0"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-sans text-lg font-bold focus:border-gray-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-mono text-xs uppercase text-gray-400 block mb-2">Monthly Revenue</label>
                                        <input
                                            type="number"
                                            defaultValue={progress.revenue}
                                            onBlur={(e) => updateRevenue(Number(e.target.value))}
                                            placeholder="$0"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-sans text-lg font-bold focus:border-gray-400 focus:outline-none"
                                        />
                                    </div>
                                    <button className={`w-full py-2 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase hover:opacity-90 transition-all`}>
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Platform Stats */}
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <h3 className="font-mono text-xs uppercase text-gray-400 mb-6">Platform Progress</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Skills Active</p>
                                        <p className="font-sans text-3xl font-black">{progress.skillProgress.length}/12</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Milestones</p>
                                        <p className="font-sans text-3xl font-black">{progress.skillProgress.reduce((acc, curr) => acc + curr.completedModules.length, 0)}/60</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs text-gray-400 mb-1">Net Worth</p>
                                        <p className="font-sans text-3xl font-black">${progress.netWorth.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div >

                        {/* Activity Timeline */}
                        < div >
                            <h3 className="font-sans text-2xl font-black uppercase mb-6">Recent Activity</h3>
                            <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <p className="font-mono text-xs text-gray-400 mb-1">No activity yet</p>
                                        <p className="font-serif text-sm text-gray-600">Complete your first milestone to start tracking progress</p>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                )}

                {/* Tab 3: Impact - FULL BUILD */}
                {
                    activeTab === 2 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-sans text-4xl font-black uppercase mb-12"
                            >
                                Leverage Multipliers by Level
                            </motion.h2>

                            {/* Leverage Chart Visualization */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-16 h-80 w-full bg-white rounded-[32px] p-8 border-2 border-gray-100 shadow-lg"
                            >
                                <h3 className="font-mono text-sm text-gray-400 uppercase mb-4">Leverage Velocity</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { name: 'L1', leverage: 2, label: 'Architect' },
                                            { name: 'L2', leverage: 10, label: 'Accumulator' },
                                            { name: 'L3', leverage: 20, label: 'Optimizer' },
                                            { name: 'L4', leverage: 100, label: 'Autonomy' },
                                            { name: 'L5', leverage: 1000, label: 'Perpetual' },
                                        ]}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-black text-white p-3 rounded-lg text-xs font-mono">
                                                            <p className="font-bold mb-1">{payload[0].payload.label}</p>
                                                            <p>Leverage: {payload[0].value}x</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="leverage" radius={[4, 4, 0, 0]}>
                                            {[
                                                { name: 'L1', leverage: 2 },
                                                { name: 'L2', leverage: 10 },
                                                { name: 'L3', leverage: 20 },
                                                { name: 'L4', leverage: 100 },
                                                { name: 'L5', leverage: 1000 },
                                            ].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#4ade80' : index === 1 ? '#22c55e' : index === 2 ? '#16a34a' : index === 3 ? '#15803d' : '#14532d'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Level 1: Architect */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl relative overflow-hidden group hover:border-green-400 transition-colors duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-sans text-3xl font-black uppercase">Level 1: Architect</h3>
                                            <p className="font-mono text-sm text-gray-400 uppercase mt-1">Personal Leverage</p>
                                        </div>
                                        <div className={`mt-4 md:mt-0 px-6 py-3 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase text-center`}>
                                            Current Level
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Time Multiplier</p>
                                            <p className="font-sans text-2xl font-black mb-1">2x<span className="text-sm text-gray-400 font-bold"> Output</span></p>
                                            <p className="font-serif text-xs text-green-600 font-bold">Personal Efficiency</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Hours Freed</p>
                                            <p className="font-sans text-2xl font-black mb-1">15<span className="text-sm text-gray-400 font-bold">hrs/wk</span></p>
                                            <p className="font-serif text-xs text-gray-600">For high-value work</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Key Unlock</p>
                                            <p className="font-serif text-lg text-gray-800 font-bold">Scalable Systems</p>
                                            <p className="font-serif text-[10px] text-gray-600 mt-1">Break time-for-money</p>
                                        </div>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 italic border-l-2 border-gray-300 pl-4">
                                        "You stop trading time for money. You start building systems that work while you sleep."
                                    </p>
                                </motion.div>

                                {/* Level 2: Accumulator */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-90 hover:opacity-100 transition-all hover:scale-[1.02]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-sans text-3xl font-black uppercase text-gray-800">Level 2: Accumulator</h3>
                                            <p className="font-mono text-sm text-gray-400 uppercase mt-1">Team Leverage</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Team Leverage</p>
                                            <p className="font-sans text-2xl font-black mb-1">10x<span className="text-sm text-gray-400 font-bold"> Output</span></p>
                                            <p className="font-serif text-xs text-green-600 font-bold">Via Delegation</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Execution Speed</p>
                                            <p className="font-sans text-2xl font-black mb-1">2x<span className="text-sm text-gray-400 font-bold"> Faster</span></p>
                                            <p className="font-serif text-xs text-gray-600">Parallel processing</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Key Unlock</p>
                                            <p className="font-serif text-lg text-gray-800 font-bold">Operations</p>
                                            <p className="font-serif text-[10px] text-gray-600 mt-1">Remove self as bottleneck</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Level 3: Optimizer */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-80 hover:opacity-100 transition-all hover:scale-[1.02]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-sans text-3xl font-black uppercase text-gray-700">Level 3: Optimizer</h3>
                                            <p className="font-mono text-sm text-gray-400 uppercase mt-1">Capital Efficiency</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Capital Efficiency</p>
                                            <p className="font-sans text-2xl font-black mb-1">+20%<span className="text-sm text-gray-400 font-bold"> ROI</span></p>
                                            <p className="font-serif text-xs text-green-600 font-bold">Money works harder</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Profit Margin</p>
                                            <p className="font-sans text-2xl font-black mb-1">40%<span className="text-sm text-gray-400 font-bold"> Net</span></p>
                                            <p className="font-serif text-xs text-gray-600">Optimization focus</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Key Unlock</p>
                                            <p className="font-serif text-lg text-gray-800 font-bold">Margin Expansion</p>
                                            <p className="font-serif text-[10px] text-gray-600 mt-1">Max efficiency per unit</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Level 4: Autonomy */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-70 hover:opacity-100 transition-all hover:scale-[1.02]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-sans text-3xl font-black uppercase text-gray-600">Level 4: Autonomy</h3>
                                            <p className="font-mono text-sm text-gray-400 uppercase mt-1">Network Effect</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Network Effect</p>
                                            <p className="font-sans text-2xl font-black mb-1">Global<span className="text-sm text-gray-400 font-bold"> Reach</span></p>
                                            <p className="font-serif text-xs text-green-600 font-bold">Access to deal flow</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Optionality</p>
                                            <p className="font-sans text-2xl font-black mb-1">5+<span className="text-sm text-gray-400 font-bold"> Flags</span></p>
                                            <p className="font-serif text-xs text-gray-600">Jurisdictional arbitrage</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Key Unlock</p>
                                            <p className="font-serif text-lg text-gray-800 font-bold">Sovereignty</p>
                                            <p className="font-serif text-[10px] text-gray-600 mt-1">Detach from single points of failure</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Level 5: Perpetual */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-60 hover:opacity-100 transition-all hover:scale-[1.02]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                        <div>
                                            <h3 className="font-sans text-3xl font-black uppercase text-gray-500">Level 5: Perpetual</h3>
                                            <p className="font-mono text-sm text-gray-400 uppercase mt-1">Durability</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Durability</p>
                                            <p className="font-sans text-2xl font-black mb-1">100+<span className="text-sm text-gray-400 font-bold"> Yrs</span></p>
                                            <p className="font-serif text-xs text-green-600 font-bold">Legacy Lifespan</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Impact</p>
                                            <p className="font-sans text-2xl font-black mb-1">Multi-Gen<span className="text-sm text-gray-400 font-bold"> Security</span></p>
                                            <p className="font-serif text-xs text-gray-600">Family Office Structure</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400 mb-1">Key Unlock</p>
                                            <p className="font-serif text-lg text-gray-800 font-bold">Empire</p>
                                            <p className="font-serif text-[10px] text-gray-600 mt-1">Permanent Influence</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Bottom Section: Leverage Calculator */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                <div className="md:col-span-2 p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Leverage Calculator</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Time to Impact</p>
                                            <p className="font-sans text-3xl font-black">3 Months</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Projected Leverage</p>
                                            <p className="font-sans text-3xl font-black">10x</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Confidence</p>
                                            <p className="font-sans text-3xl font-black">92%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl flex flex-col justify-center items-center text-center">
                                    <p className="font-mono text-xs uppercase text-gray-400 mb-4">Critical Rating</p>
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`w-4 h-12 rounded-full ${i <= 5 ? `bg-art-${skill?.colorTheme || 'green'}` : 'bg-gray-200'}`}></div>
                                        ))}
                                    </div>
                                    <p className="font-sans text-xl font-black uppercase">Essential</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 4: Influence - FULL BUILD */}
                {
                    activeTab === 3 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">Triangle Influence</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {/* Capital Influence */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="mb-6">
                                        <h3 className="font-sans text-2xl font-black uppercase mb-2">Capital</h3>
                                        <p className="font-mono text-xs uppercase text-gray-400">Direct Impact</p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Cash Efficiency</p>
                                            <p className="font-sans text-xl font-bold">+20%</p>
                                            <p className="font-serif text-xs text-gray-600">Usable capital</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">ROI Multiplier</p>
                                            <p className="font-sans text-xl font-bold">2x</p>
                                            <p className="font-serif text-xs text-gray-600">On all investments</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Runway</p>
                                            <p className="font-sans text-xl font-bold">+6 Mo</p>
                                            <p className="font-serif text-xs text-gray-600">Operating safety</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Leverage Influence */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="mb-6">
                                        <h3 className="font-sans text-2xl font-black uppercase mb-2">Leverage</h3>
                                        <p className="font-mono text-xs uppercase text-gray-400">Systemic Impact</p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Team Output</p>
                                            <p className="font-sans text-xl font-bold">3x</p>
                                            <p className="font-serif text-xs text-gray-600">Per person</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Automation</p>
                                            <p className="font-sans text-xl font-bold">40%</p>
                                            <p className="font-serif text-xs text-gray-600">Processes automated</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Time Freedom</p>
                                            <p className="font-sans text-xl font-bold">15h+</p>
                                            <p className="font-serif text-xs text-gray-600">Hours freed/week</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vitality Influence */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="mb-6">
                                        <h3 className="font-sans text-2xl font-black uppercase mb-2">Vitality</h3>
                                        <p className="font-mono text-xs uppercase text-gray-400">Personal Impact</p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Stress Reduction</p>
                                            <p className="font-sans text-xl font-bold">-60%</p>
                                            <p className="font-serif text-xs text-gray-600">Financial anxiety</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Decision Quality</p>
                                            <p className="font-sans text-xl font-bold">2x</p>
                                            <p className="font-serif text-xs text-gray-600">Better choices</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Sleep Quality</p>
                                            <p className="font-sans text-xl font-bold">+1.5h</p>
                                            <p className="font-serif text-xs text-gray-600">Deep sleep/night</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Impact Strength</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-sans font-bold">Direct Impact</span>
                                                <span className="font-mono text-xs">5/5</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                                <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-full`}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-sans font-bold">Enabling Impact</span>
                                                <span className="font-mono text-xs">4/5</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                                <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[80%]`}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-sans font-bold">Supporting Impact</span>
                                                <span className="font-mono text-xs">3/5</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2 rounded-full">
                                                <div className={`bg-art-${skill?.colorTheme || 'green'} h-2 rounded-full w-[60%]`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-gray-50 shadow-inner">
                                    <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Billionaire Case Study</h3>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-16 h-16 rounded-full bg-art-${skill?.colorTheme || 'green'} flex-shrink-0 flex items-center justify-center text-white font-bold text-xl`}>
                                            WB
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-xl font-black uppercase mb-1">Warren Buffett</h4>
                                            <p className="font-serif text-sm text-gray-600 mb-2">Application: Capital Allocation Mastery</p>
                                            <p className="font-sans text-2xl font-bold mb-2">$120B Net Worth</p>
                                            <p className="font-serif text-sm italic text-gray-700">
                                                "It's not about stock picking. It's about the float. The insurance float gave us billions in capital to deploy at 0% cost."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 5: Strategy - FULL BUILD */}
                {
                    activeTab === 4 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">Strategic Framework</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 1. Hierarchy */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">1. Hierarchy</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        What are your top 3 priorities? What gets 80% of focus? What gets delegated or eliminated?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: My top priority is capital accumulation. 80% of my focus goes to sales. I delegate all admin."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Warren Buffett's "20 Slot Rule" - only 20 investments in a lifetime.</p>
                                    </div>
                                </div>

                                {/* 2. Integration */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">2. Integration</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        How does this skill connect with others? Where are leverage points? What compounds?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: This connects with Tax Strategy to minimize leakage. Leverage point is the holding company."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Elon Musk's vertical integration - owning the entire supply chain.</p>
                                    </div>
                                </div>

                                {/* 3. Progression Rules */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">3. Progression Rules</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        What triggers advance to next level? What are the gates? How do you measure success?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: Advance when liquid capital hits $50k. Gate is forming the LLC."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Ray Dalio's "Principles" - codified rules for decision making.</p>
                                    </div>
                                </div>

                                {/* 4. Financial Mechanics */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">4. Financial Mechanics</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        How does money flow? What's the capital cycle? Where is the leverage?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: Revenue -> OpCo -> HoldCo -> Investments. Leverage is in the float."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Jeff Bezos' Cash Conversion Cycle - getting paid before paying suppliers.</p>
                                    </div>
                                </div>

                                {/* 5. Brand Cohesion */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">5. Brand Cohesion</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        What's your identity? What stays consistent? What changes per level?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: Identity is 'Reliable compounder'. Consistency in reporting."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Steve Jobs' design-first identity across all products.</p>
                                    </div>
                                </div>

                                {/* 6. User Flow */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-sans text-xl font-black uppercase">6. User Flow</h3>
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                    </div>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        How do users/clients engage? What's the journey? Where is the friction?
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Example: Client enters via low-ticket, upsold to high-ticket. Friction at onboarding."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-4"
                                    />
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <p className="font-mono text-xs uppercase text-gray-400 mb-1">Billionaire Example</p>
                                        <p className="font-serif text-xs text-gray-700">Amazon's 1-Click ordering - removing all friction.</p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 p-6 bg-white border-2 border-gray-200 rounded-[32px] flex justify-between items-center shadow-xl">
                                    <div>
                                        <p className="font-mono text-xs uppercase text-gray-400">Strategy Completion</p>
                                        <p className="font-sans text-2xl font-bold">0/6 Defined</p>
                                    </div>
                                    <button className={`px-8 py-4 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase hover:opacity-90 transition-all`}>
                                        Save Framework
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 6: 5 Levels */}
                {
                    activeTab === 5 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">The 5 Levels of Wealth</h2>

                            {/* Status Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="p-8 bg-white border-2 border-gray-200 rounded-[32px] shadow-xl">
                                    <p className="font-mono text-xs uppercase text-gray-400 mb-2">Current Status</p>
                                    <h3 className="font-sans text-4xl font-black uppercase mb-2">Level 1: Architect</h3>
                                    <p className="font-serif text-sm text-gray-600">Progress: 23% to Level 2 • Gap: $37K Capital</p>
                                </div>
                                <div className="p-8 bg-white border-2 border-gray-200 rounded-[32px] shadow-xl flex flex-col justify-center items-end">
                                    <p className="font-mono text-xs uppercase text-gray-400 mb-2">Est. Time to Level 2</p>
                                    <p className="font-sans text-4xl font-black text-green-600">14 Months</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {/* Level 1 */}
                                <div className="p-8 rounded-[32px] border-2 border-green-500 bg-green-50/50 shadow-xl relative">
                                    <div className="absolute top-6 right-6 px-4 py-2 bg-green-500 text-white rounded-full font-mono text-xs font-bold uppercase">Current</div>
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Level 1: Architect</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Objective</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Build Foundation</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Bottleneck</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Cash Flow & Time</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Indicators</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$1M-$10M NW, 1-3 Entities</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Capital Req</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$50K Deployed</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Level 2 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-90 hover:opacity-100 transition-all">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6 text-gray-700">Level 2: Accumulator</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Objective</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Scale Operations</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Bottleneck</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Team & Systems</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Indicators</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$10M-$50M NW, Team &gt;10</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Capital Req</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$500K Deployed</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Level 3 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-80 hover:opacity-100 transition-all">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6 text-gray-600">Level 3: Optimizer</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Objective</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Maximize Efficiency</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Bottleneck</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Margins & Leverage</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Indicators</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$50M-$250M NW, Auto &gt;40%</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Capital Req</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$5M Deployed</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Level 4 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-70 hover:opacity-100 transition-all">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6 text-gray-500">Level 4: Autonomy</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Objective</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Build Optionality</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Bottleneck</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Jurisdiction & Protection</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Indicators</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$250M-$1B NW, Multi-Flag</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Capital Req</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$50M Deployed</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Level 5 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl opacity-60 hover:opacity-100 transition-all">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6 text-gray-400">Level 5: Perpetual</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Objective</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Multi-Gen Wealth</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Bottleneck</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">Succession</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Indicators</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$1B+ NW, Family Office</p>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Capital Req</p>
                                            <p className="font-serif text-sm font-bold text-gray-800">$500M+ Controlled</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Advance Requirements</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
                                            <span className="font-serif text-sm text-gray-700">Skills 8/12 Complete</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs"></div>
                                            <span className="font-serif text-sm text-gray-700">Capital $50K Deployed</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs"></div>
                                            <span className="font-serif text-sm text-gray-700">2+ Entities Formed</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Time Projection</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-700">Current Pace</span>
                                            <span className="font-sans font-bold">14 Months</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-700">Accelerated (2x Effort)</span>
                                            <span className="font-sans font-bold text-green-600">7 Months</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-700">Top 10% Speed</span>
                                            <span className="font-sans font-bold text-purple-600">9 Months</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 7: 3 Triangles */}
                {
                    activeTab === 6 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">The Three Dimensions</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {/* Capital */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Capital</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Structure</span>
                                                <span className="font-mono text-xs font-bold">Legal Entities</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Flow</span>
                                                <span className="font-mono text-xs font-bold">Monthly Revenue</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Control</span>
                                                <span className="font-mono text-xs font-bold">Assets Managed</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Combined Score</p>
                                            <p className="font-sans text-3xl font-black">0/100</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vitality */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Vitality</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Energy</span>
                                                <span className="font-mono text-xs font-bold">Physical Capacity</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Clarity</span>
                                                <span className="font-mono text-xs font-bold">Mental Bandwidth</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Relationship</span>
                                                <span className="font-mono text-xs font-bold">Quality Score</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Combined Score</p>
                                            <p className="font-sans text-3xl font-black">0/100</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Leverage */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Leverage</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Tools</span>
                                                <span className="font-mono text-xs font-bold">Automation %</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Team</span>
                                                <span className="font-mono text-xs font-bold">Headcount</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-mono text-xs uppercase text-gray-400">Scale</span>
                                                <span className="font-mono text-xs font-bold">Output/Person</span>
                                            </div>
                                            <input type="range" className="w-full" />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-1">Combined Score</p>
                                            <p className="font-sans text-3xl font-black">0/100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-2xl font-black uppercase mb-6">Balance Index</h3>
                                    <div className="flex items-center gap-8">
                                        <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center">
                                            <span className="font-sans text-4xl font-black">0</span>
                                        </div>
                                        <div>
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Overall Health</p>
                                            <p className="font-serif text-sm text-gray-600 mb-2">Target balance: 70+ across all three</p>
                                            <p className="font-serif text-sm text-red-500">Weakest Link: Capital</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-mono text-xs uppercase text-gray-400 mb-4">Benchmark</h3>
                                    <p className="font-serif text-lg text-gray-800 mb-4">
                                        Your scores vs typical billionaire at Level 1.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-600">Capital Gap</span>
                                            <span className="font-mono font-bold text-red-500">-40%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-600">Vitality Gap</span>
                                            <span className="font-mono font-bold text-yellow-500">-10%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-serif text-sm text-gray-600">Leverage Gap</span>
                                            <span className="font-mono font-bold text-red-500">-60%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 8: 6 Decisions */}
                {
                    activeTab === 7 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">6 Core Decisions</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* 1. Hierarchy */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">1. Hierarchy</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "What are non-negotiables?" "What gets 80% focus?" "What's delegated?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define non-negotiables..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Buffett's 20-slot rule</span>
                                    </div>
                                </div>

                                {/* 2. Integration */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">2. Integration</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "What systems connect?" "Where are leverage points?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define system connections..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Musk's vertical integration</span>
                                    </div>
                                </div>

                                {/* 3. Progression Rules */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">3. Progression Rules</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "What triggers next level?" "What are gates?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define progression triggers..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Specific capital thresholds</span>
                                    </div>
                                </div>

                                {/* 4. Financial Mechanics */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">4. Financial Mechanics</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "How does money flow?" "What's the cycle?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define money flow..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Bezos' cash conversion cycle</span>
                                    </div>
                                </div>

                                {/* 5. Brand Cohesion */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">5. Brand Cohesion</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "What's your identity?" "What's consistent?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define brand identity..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Jobs' design-first identity</span>
                                    </div>
                                </div>

                                {/* 6. User Flow */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">6. User Flow</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-4">
                                        "How do users engage?" "What's the journey?"
                                    </p>
                                    <textarea
                                        rows={4}
                                        placeholder="Define user journey..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-serif text-sm resize-none focus:border-black focus:outline-none mb-2"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-xs text-gray-400">0/500 chars</span>
                                        <span className="font-mono text-xs text-gray-400">Example: Customer acquisition funnel</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-gray-50 rounded-[32px] border border-gray-200 flex justify-between items-center">
                                <div>
                                    <p className="font-mono text-xs uppercase text-gray-400 mb-1">Framework Status</p>
                                    <p className="font-sans text-xl font-bold">0/6 Frameworks Defined</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-6 py-3 rounded-full border-2 border-gray-200 font-mono text-xs font-bold uppercase hover:bg-gray-100 transition-all">
                                        Compare to Billionaires
                                    </button>
                                    <button className={`px-6 py-3 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase hover:opacity-90 transition-all`}>
                                        Save Frameworks
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 9: Execute */}
                {
                    activeTab === 8 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">Execute Milestones</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Milestone 1 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-full bg-art-${skill?.colorTheme || 'green'} flex items-center justify-center text-white font-black text-xl`}>1</div>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-mono text-xs uppercase font-bold">Pending</span>
                                    </div>
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">Define Strategy</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-6">
                                        Complete the 6 Decisions framework and save your initial strategy document.
                                    </p>
                                    <button className="w-full py-3 rounded-full border-2 border-gray-200 font-mono text-xs font-bold uppercase hover:bg-gray-50 transition-all">
                                        Mark Complete
                                    </button>
                                </div>

                                {/* Milestone 2 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-black text-xl">2</div>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-mono text-xs uppercase font-bold">Locked</span>
                                    </div>
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">Entity Formation</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-6">
                                        Establish your primary legal entity and banking structure. Upload proof of formation.
                                    </p>
                                    <button className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-400 font-mono text-xs font-bold uppercase cursor-not-allowed">
                                        Locked
                                    </button>
                                </div>

                                {/* Milestone 3 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-black text-xl">3</div>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-mono text-xs uppercase font-bold">Locked</span>
                                    </div>
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">First Revenue</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-6">
                                        Generate your first $1,000 in revenue through the new entity.
                                    </p>
                                    <button className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-400 font-mono text-xs font-bold uppercase cursor-not-allowed">
                                        Locked
                                    </button>
                                </div>

                                {/* Milestone 4 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-black text-xl">4</div>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-mono text-xs uppercase font-bold">Locked</span>
                                    </div>
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">Core Team</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-6">
                                        Hire your first key employee or contractor to delegate operational tasks.
                                    </p>
                                    <button className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-400 font-mono text-xs font-bold uppercase cursor-not-allowed">
                                        Locked
                                    </button>
                                </div>

                                {/* Milestone 5 */}
                                <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-black text-xl">5</div>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-mono text-xs uppercase font-bold">Locked</span>
                                    </div>
                                    <h3 className="font-sans text-xl font-black uppercase mb-4">Systemization</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-6">
                                        Document core processes and remove yourself from day-to-day operations.
                                    </p>
                                    <button className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-400 font-mono text-xs font-bold uppercase cursor-not-allowed">
                                        Locked
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Tab 10: Proof */}
                {
                    activeTab === 9 && (
                        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-20">
                            <h2 className="font-sans text-4xl font-black uppercase mb-12">Proof & Verification</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Upload Section */}
                                <div className="p-8 rounded-[32px] border-2 border-dashed border-gray-300 bg-gray-50 text-center flex flex-col justify-center items-center min-h-[400px]">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-6">
                                        <span className="text-4xl">↑</span>
                                    </div>
                                    <h3 className="font-sans text-2xl font-black uppercase mb-4">Upload Evidence</h3>
                                    <p className="font-serif text-sm text-gray-600 mb-8 max-w-md">
                                        Upload screenshots, documents, or reports to verify your milestones.
                                        Accepted formats: PDF, JPG, PNG.
                                    </p>
                                    <button className={`px-8 py-4 rounded-full bg-art-${skill?.colorTheme || 'green'} text-white font-mono text-xs font-bold uppercase hover:opacity-90 transition-all shadow-lg`}>
                                        Select Files
                                    </button>
                                </div>

                                {/* Status & History */}
                                <div className="space-y-6">
                                    {/* Status Cards */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 rounded-[32px] bg-white border-2 border-gray-200 shadow-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Verified</p>
                                            <p className="font-sans text-4xl font-black text-green-500">0</p>
                                        </div>
                                        <div className="p-6 rounded-[32px] bg-white border-2 border-gray-200 shadow-xl">
                                            <p className="font-mono text-xs uppercase text-gray-400 mb-2">Pending</p>
                                            <p className="font-sans text-4xl font-black text-yellow-500">0</p>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="p-8 rounded-[32px] border-2 border-gray-200 bg-white shadow-xl flex-grow">
                                        <h3 className="font-sans text-xl font-black uppercase mb-6">Recent Uploads</h3>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">📄</div>
                                                    <div>
                                                        <p className="font-sans text-sm font-bold">No uploads yet</p>
                                                        <p className="font-mono text-xs text-gray-400">Start by uploading proof</p>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 font-mono text-[10px] uppercase font-bold">Empty</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >

            {/* Let's Talk Modal */}
            {showTalkModal && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        // Close modal when clicking outside
                        if (e.target === e.currentTarget) {
                            setShowTalkModal(false);
                        }
                    }}
                >
                    <div 
                        ref={modalRef}
                        className="bg-white dark:bg-gray-900 rounded-[32px] w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className={`${themeBg} p-4 flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black">
                                    B
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-lg">Billionaireable</h3>
                                    <p className="text-white/70 text-xs font-mono uppercase">{skill?.title}</p>
                                </div>
                            </div>
                            
                            {/* YouTube-style Controls */}
                            <div className="flex items-center gap-2">
                                {/* Restart */}
                                <button
                                    onClick={() => {
                                        setTalkMessages([]);
                                        stopPlayback();
                                    }}
                                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                                    title="Start Over"
                                >
                                    <SkipBack className="w-4 h-4" />
                                </button>
                                
                                {/* Play/Pause - stops current playback */}
                                <button
                                    onClick={() => {
                                        if (isPlaying) {
                                            stopPlayback();
                                        }
                                    }}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors ${isPlaying ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'}`}
                                    title={isPlaying ? "Stop" : "Playing..."}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                                
                                {/* Mic Toggle - actual speech recognition */}
                                <button
                                    onClick={toggleMic}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isMicOn ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-white/20 hover:bg-white/30'} text-white`}
                                    title={isMicOn ? "Listening..." : "Speak"}
                                >
                                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                                </button>
                                
                                {/* Volume Toggle */}
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors ${isMuted ? 'bg-white/10' : 'bg-white/20 hover:bg-white/30'}`}
                                    title={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                                
                                {/* Close */}
                                <button
                                    onClick={() => setShowTalkModal(false)}
                                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors ml-2"
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px]">
                            {talkMessages.length === 0 && (
                                <div className="text-center py-12">
                                    <div className={`w-16 h-16 rounded-full ${themeBg} mx-auto mb-4 flex items-center justify-center`}>
                                        <MessageCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 font-serif mb-4">
                                        Let's talk about {skill?.title}. What's on your mind?
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-500 text-xs font-mono uppercase">
                                        Click outside or press ESC to close
                                    </p>
                                </div>
                            )}
                            {talkMessages.map((msg, idx) => (
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
                                        {msg.role !== 'user' && (
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`w-5 h-5 rounded-full ${themeBg} flex items-center justify-center text-[10px] font-black text-white`}>
                                                    B
                                                </div>
                                                <span className="font-mono text-[10px] text-gray-400 uppercase">Billionaireable</span>
                                            </div>
                                        )}
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {talkLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={talkMessagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={talkInput}
                                    onChange={(e) => setTalkInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleTalkSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    disabled={talkLoading}
                                />
                                <button
                                    onClick={handleTalkSend}
                                    disabled={!talkInput.trim() || talkLoading}
                                    className={`w-12 h-12 ${themeBg} text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};
export default SkillDetail;

