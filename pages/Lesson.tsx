import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { ChevronLeft, CheckCircle, Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { SKILL_DATA } from '../constants';
import { LESSON_CONTENT, PILLAR_NAMES } from '../lessonContent';
import { useAction, useMutation, useQuery } from 'convex/react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../convex/_generated/api';

const Lesson: React.FC = () => {
    const { skillId, moduleId } = useParams<{ skillId: string; moduleId: string }>();
    const { getSkillCompletion, completeModule } = useProgress();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    
    // User context for persistence
    const { user, isSignedIn } = useAuth();
    
    // Billionaireable chat for interactive guidance
    const chat = useAction(api.billionaireable.chat);
    const createConversation = useMutation(api.conversations.createConversation);
    const addMessage = useMutation(api.conversations.addMessage);
    const [chatMessages, setChatMessages] = useState<{role: string, text: string}[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [lessonConversationId, setLessonConversationId] = useState<string | null>(null);

    if (!skillId || !moduleId) {
        return <div>Invalid lesson</div>;
    }

    const skillData = SKILL_DATA[skillId];
    const moduleIndex = parseInt(moduleId) - 1;
    const module = skillData?.modules[moduleIndex];
    const lessonContent = LESSON_CONTENT[skillId]?.[parseInt(moduleId)];

    if (!module) {
        return <div>Module not found</div>;
    }

    const completion = getSkillCompletion(skillId);
    const isCompleted = completion > moduleIndex;
    const pillarName = PILLAR_NAMES[skillId] || skillId;

    const handleComplete = () => {
        completeModule(skillId, moduleIndex + 1);
        setCompleted(true);
        setTimeout(() => {
            navigate(`/skills/${skillId}`);
        }, 1500);
    };

    const getColorClass = () => {
        const colors: Record<string, string> = {
            'reality-distortion': 'orange',
            'liquidity-allocation': 'green',
            'holding-co': 'blue',
            'time-arbitrage': 'orange',
            'bio-availability': 'green',
            'political-capital': 'blue',
            'syndicate': 'orange',
            'family-office': 'green',
            'dynasty-design': 'blue',
            'sovereign-flags': 'orange',
            'asymmetric-bets': 'green',
            'ascendance': 'blue'
        };
        return colors[skillId] || 'orange';
    };

    const color = getColorClass();

    // Audio ref for Gemini voice
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const textToSpeech = useAction(api.speech.textToSpeech);

    // Handle Listen button - uses Gemini TTS
    const handleListen = async () => {
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            return;
        }

        if (!lessonContent) return;

        setIsLoading(true);
        setIsPlaying(true);
        
        try {
            // Build the full lesson text
            const fullText = `${lessonContent.intro} ${lessonContent.sections.map(s => `${s.heading}. ${s.content}`).join(' ')} Your directive: ${lessonContent.directive}`;
            
            // Call Gemini TTS
            const result = await textToSpeech({ text: fullText });
            
            // Create audio from base64
            const audioSrc = `data:${result.mimeType};base64,${result.audio}`;
            const audio = new Audio(audioSrc);
            audioRef.current = audio;
            
            audio.onended = () => setIsPlaying(false);
            audio.onerror = () => {
                console.error('Audio playback error');
                setIsPlaying(false);
            };
            
            await audio.play();
        } catch (error) {
            console.error('TTS error:', error);
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle chat with Billionaireable about this lesson
    const handleChatSend = async () => {
        if (!chatInput.trim() || chatLoading) return;

        const userMessage = chatInput.trim();
        setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setChatInput('');
        setChatLoading(true);

        try {
            // Build rich context about this specific module
            const moduleContext = lessonContent ? `
MODULE CONTEXT (${pillarName} - ${module.title}):
${lessonContent.intro.substring(0, 500)}...

Key concepts: ${lessonContent.sections.map(s => s.heading).join(', ')}
Framework: ${lessonContent.framework?.name || 'N/A'}
Directive: ${lessonContent.directive}
` : skillData?.insight || '';

            const systemPrompt = `You are Billionaireable guiding someone through Pillar ${PILLAR_ORDER.indexOf(skillId) + 1}: ${pillarName}, specifically Module ${moduleId}: "${module.title}".

${moduleContext}

You guide. You don't teach. You already know. They follow.

REMEMBER: You know everything about this module. Answer questions directly. If they're confused, clarify with authority. If they're resisting, push them. This is the path.

Keep responses to 2-3 sentences. Direct. No fluff.`;

            const response = await chat({
                message: userMessage,
                history: chatMessages,
                systemPrompt,
            });

            setChatMessages(prev => [...prev, { role: 'model', text: response }]);
            
            // Save to Convex
            if (user) {
                let convId = lessonConversationId;
                if (!convId) {
                    convId = await createConversation({ 
                        userId: user._id,
                        title: `${pillarName} - ${module.title}`
                    });
                    setLessonConversationId(convId);
                }
                
                await addMessage({
                    conversationId: convId as any,
                    userId: user._id,
                    role: 'user',
                    content: userMessage,
                    skillId,
                    moduleId,
                });
                await addMessage({
                    conversationId: convId as any,
                    userId: user._id,
                    role: 'assistant',
                    content: response,
                    skillId,
                    moduleId,
                });
            }
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => [...prev, { role: 'model', text: "Let's refocus on the lesson. What's unclear?" }]);
        } finally {
            setChatLoading(false);
        }
    };
    
    // Pillar order for context
    const PILLAR_ORDER = [
        'reality-distortion', 'liquidity-allocation', 'holding-co', 'time-arbitrage',
        'bio-availability', 'political-capital', 'syndicate', 'family-office',
        'dynasty-design', 'sovereign-flags', 'asymmetric-bets', 'ascendance'
    ];

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Back Button */}
            <button
                onClick={() => navigate(`/skills/${skillId}`)}
                className="flex items-center gap-2 mb-8 font-mono text-sm font-bold uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to {pillarName}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Module Header */}
                    <div className={`bg-art-${color} rounded-[32px] p-8 md:p-12 mb-8 shadow-2xl`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-black/20 rounded-full font-mono text-xs font-bold uppercase text-white">
                                    Module {moduleId}
                                </span>
                                {isCompleted && (
                                    <span className="px-4 py-2 bg-white/20 rounded-full font-mono text-xs font-bold uppercase text-white flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Completed
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={handleListen}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-mono text-xs font-bold uppercase transition-colors"
                            >
                                {isPlaying ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="w-4 h-4" />
                                        Listen
                                    </>
                                )}
                            </button>
                        </div>
                        <h1 className="font-sans text-3xl md:text-5xl font-black text-white mb-3">{module.title}</h1>
                        <p className="font-mono text-sm text-white/80 uppercase">{module.duration}</p>
                    </div>

                    {/* Lesson Content */}
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-12 shadow-soft-xl border border-black/10 dark:border-white/10 mb-8">
                        {lessonContent ? (
                            <div className="space-y-10">
                                {/* Intro */}
                                <p className="font-serif text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {lessonContent.intro}
                                </p>

                                {/* Sections */}
                                {lessonContent.sections.map((section, idx) => (
                                    <div key={idx} className="border-l-4 border-art-orange pl-6 py-2">
                                        <h3 className="font-sans text-xl font-bold uppercase mb-4 dark:text-white">{section.heading}</h3>
                                        <p className="font-serif text-base text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}

                                {/* Case Study */}
                                {'caseStudy' in lessonContent && lessonContent.caseStudy && (
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
                                        <h3 className="font-sans text-lg font-bold uppercase mb-2 text-art-orange">Case Study</h3>
                                        <h4 className="font-sans text-2xl font-black mb-4 dark:text-white">{lessonContent.caseStudy.name}</h4>
                                        <p className="font-serif text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                            {lessonContent.caseStudy.story}
                                        </p>
                                        <div className="bg-black text-white rounded-xl p-4">
                                            <p className="font-mono text-xs uppercase tracking-wider mb-1 text-gray-400">Key Lesson</p>
                                            <p className="font-serif text-base">{lessonContent.caseStudy.lesson}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Framework */}
                                {'framework' in lessonContent && lessonContent.framework && (
                                    <div className={`bg-art-${color}/5 rounded-2xl p-8 border-2 border-art-${color}/20`}>
                                        <h3 className="font-sans text-lg font-bold uppercase mb-2 text-art-orange">Framework</h3>
                                        <h4 className="font-sans text-2xl font-black mb-6 dark:text-white">{lessonContent.framework.name}</h4>
                                        <div className="space-y-4">
                                            {lessonContent.framework.steps.map((step, idx) => (
                                                <div key={idx} className="flex items-start gap-4">
                                                    <div className={`w-8 h-8 rounded-full bg-art-${color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                                                        {idx + 1}
                                                    </div>
                                                    <p className="font-serif text-base text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Exercise */}
                                {'exercise' in lessonContent && lessonContent.exercise && (
                                    <div className="bg-black text-white rounded-2xl p-8">
                                        <h3 className="font-sans text-lg font-bold uppercase mb-2 text-art-orange">Exercise</h3>
                                        <p className="font-serif text-xl mb-6">{lessonContent.exercise.instruction}</p>
                                        <div className="space-y-4">
                                            {lessonContent.exercise.prompts.map((prompt, idx) => (
                                                <div key={idx} className="bg-white/10 rounded-xl p-4">
                                                    <p className="font-mono text-xs uppercase tracking-wider mb-2 text-gray-400">Prompt {idx + 1}</p>
                                                    <p className="font-serif text-base">{prompt}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Directive */}
                                <div className={`bg-art-${color} rounded-2xl p-8 text-white`}>
                                    <h3 className="font-sans text-lg font-bold uppercase mb-3">Your Directive</h3>
                                    <p className="font-serif text-xl leading-relaxed">
                                        {lessonContent.directive}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="font-serif text-lg text-gray-500">
                                    {skillData?.insight || "This module content is being prepared."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Complete Button */}
                    {!isCompleted && (
                        <button
                            onClick={handleComplete}
                            className={`w-full py-6 rounded-full font-mono text-sm font-bold uppercase transition-all flex items-center justify-center gap-3 shadow-xl ${completed
                                    ? 'bg-art-green text-white'
                                    : `bg-art-${color} text-white hover:opacity-90`
                                }`}
                        >
                            {completed ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Module Completed!
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Mark as Complete
                                </>
                            )}
                        </button>
                    )}

                    {isCompleted && (
                        <div className="bg-art-green rounded-[24px] p-6 text-center">
                            <p className="font-mono text-sm font-bold uppercase text-white flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                You've completed this module
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar - Billionaireable Chat */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl border border-black/10 dark:border-white/10 overflow-hidden sticky top-24">
                        {/* Chat Header */}
                        <div className="bg-black text-white p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black">
                                B
                            </div>
                            <div>
                                <h3 className="font-black font-sans text-sm">Ask Billionaireable</h3>
                                <p className="text-xs text-gray-400">About this module</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-[300px] overflow-y-auto p-4 space-y-3">
                            {chatMessages.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-sm text-gray-400">
                                        Have a question about {module.title}? Ask here.
                                    </p>
                                </div>
                            )}
                            {chatMessages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                            msg.role === 'user'
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {chatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                                    placeholder="Ask about this module..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                />
                                <button
                                    onClick={handleChatSend}
                                    disabled={!chatInput.trim() || chatLoading}
                                    className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 rotate-180" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lesson;
