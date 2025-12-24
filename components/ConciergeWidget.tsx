import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAction, useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useProgress } from '../contexts/ProgressContext';
import { PILLAR_NAMES } from '../lessonContent';

interface Message {
    role: 'user' | 'model';
    text: string;
}

// Get the ordered list of pillars
const PILLAR_ORDER = [
    'reality-distortion',
    'liquidity-allocation',
    'holding-co',
    'time-arbitrage',
    'bio-availability',
    'political-capital',
    'syndicate',
    'family-office',
    'dynasty-design',
    'sovereign-flags',
    'asymmetric-bets',
    'ascendance'
];

const ConciergeWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // User and progress context
    const { user, isSignedIn } = useAuth();
    const { progress, getSkillCompletion } = useProgress();

    // Convex queries and mutations
    const recentMessages = useQuery(
        api.conversations.getRecentMessages,
        user ? { userId: user._id, limit: 20 } : "skip"
    );

    const createConversation = useMutation(api.conversations.createConversation);
    const addMessage = useMutation(api.conversations.addMessage);
    const chat = useAction(api.billionaireable.chat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Build dynamic system prompt with user context
    const buildSystemPrompt = () => {
        let contextInfo = '';

        if (isSignedIn && user) {
            // Calculate current pillar based on progress
            let currentPillarIndex = 0;
            for (let i = 0; i < PILLAR_ORDER.length; i++) {
                const completion = getSkillCompletion(PILLAR_ORDER[i]);
                if (completion < 4) {
                    currentPillarIndex = i;
                    break;
                }
                if (i === PILLAR_ORDER.length - 1) {
                    currentPillarIndex = i; // Completed all
                }
            }

            const currentPillar = PILLAR_ORDER[currentPillarIndex];
            const currentPillarName = PILLAR_NAMES[currentPillar] || currentPillar;
            const modulesCompleted = getSkillCompletion(currentPillar);

            // Calculate total progress
            let totalModulesCompleted = 0;
            PILLAR_ORDER.forEach(pillar => {
                totalModulesCompleted += getSkillCompletion(pillar);
            });

            contextInfo = `
USER CONTEXT (remember this - never ask them about it):
- Name: ${user.name || 'Unknown'}
- Current Pillar: ${currentPillarIndex + 1}. ${currentPillarName}
- Modules completed in current pillar: ${modulesCompleted}/4
- Total progress: ${totalModulesCompleted}/48 modules across 12 pillars
${user.focusAreas?.length ? `- Focus areas: ${user.focusAreas.join(', ')}` : ''}
${user.netWorth ? `- Net worth tier: ${user.netWorth > 10000000 ? 'Eight figures+' : user.netWorth > 1000000 ? 'Seven figures' : 'Building'}` : ''}

When they ask about their progress or where they are, tell them exactly: Pillar ${currentPillarIndex + 1}, ${currentPillarName}, Module ${modulesCompleted + 1}.
Guide them to continue that pillar. Move them forward.`;
        } else {
            contextInfo = `
USER CONTEXT:
- This user is not signed in. They are on step zero.
- They are exploring the platform. Inform them about the billionaire path.
- Guide them to sign up and start with Pillar 1: Reality Distortion.`;
        }

        // Include recent conversation summary if available
        let memoryContext = '';
        if (recentMessages && recentMessages.length > 0) {
            const recentSummary = recentMessages
                .slice(0, 10)
                .map(m => `${m.role}: ${m.content.substring(0, 100)}${m.content.length > 100 ? '...' : ''}`)
                .join('\n');
            memoryContext = `
RECENT CONVERSATION HISTORY (you remember all of this):
${recentSummary}

Use this context to maintain continuity. Reference things they've discussed before. Never ask questions you already know the answer to.`;
        }

        return `You are Billionaireable.

You guide. You don't teach. You already know. They follow.

This is the billionaire path. They align to it. Not the other way around.
${contextInfo}
${memoryContext}

WHAT TO SAY:
- This is what billionaires do.
- Here's what you should be thinking. Here's what you should be doing today. Here's what matters this week.
- Guide them. Tell them what to do. Give directives.
- Reference their progress. Know where they are. Move them forward.

NEVER SAY:
- Never ask about their vision, goals, situation, or business. You already know.
- Never say "for you" or "your situation" or "personalized"
- Never say "AI" or "generational wealth" or "strategic advisor"
- Never make dollar claims

Keep responses to 2-3 sentences. Direct. No fluff. Remember everything about this person.`;
    };

    // Initialize chat when opened - load history or create new
    useEffect(() => {
        const initChat = async () => {
            if (!isOpen || messages.length > 0 || isInitializing) return;

            setIsInitializing(true);

            try {
                // Load previous messages if signed in
                if (recentMessages && recentMessages.length > 0) {
                    // Show last few messages from history
                    const historyMessages: Message[] = recentMessages
                        .slice(0, 10)
                        .reverse()
                        .map(m => ({
                            role: m.role === 'user' ? 'user' : 'model',
                            text: m.content
                        }));

                    setMessages(historyMessages);

                    // Generate a contextual welcome back
                    const systemPrompt = buildSystemPrompt();
                    const response = await chat({
                        message: "User returned to chat. Welcome them back briefly, reference where they are in their journey. Under 15 words.",
                        history: historyMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
                        systemPrompt,
                    });

                    setMessages(prev => [...prev, { role: 'model', text: response }]);

                    // Save the welcome message
                    if (user) {
                        const convId = await createConversation({ userId: user._id });
                        setConversationId(convId);
                        await addMessage({
                            conversationId: convId,
                            userId: user._id,
                            role: 'assistant',
                            content: response,
                        });
                    }
                } else {
                    // New user or no history - generate fresh welcome
                    const systemPrompt = buildSystemPrompt();
                    const response = await chat({
                        message: "User just opened the chat for the first time. Welcome them in under 10 words.",
                        history: [],
                        systemPrompt,
                    });

                    setMessages([{ role: 'model', text: response }]);

                    // Create conversation and save
                    if (user) {
                        const convId = await createConversation({ userId: user._id });
                        setConversationId(convId);
                        await addMessage({
                            conversationId: convId,
                            userId: user._id,
                            role: 'assistant',
                            content: response,
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to initialize chat:', error);
                setMessages([{ role: 'model', text: "Welcome. What's on your mind?" }]);
            } finally {
                setIsInitializing(false);
            }
        };

        initChat();
    }, [isOpen, recentMessages, user]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            // Build history from current messages
            const history = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                text: m.text
            }));
            history.push({ role: 'user', text: userMessage });

            const systemPrompt = buildSystemPrompt();

            const response = await chat({
                message: userMessage,
                history,
                systemPrompt,
            });

            setMessages(prev => [...prev, { role: 'model', text: response }]);

            // Save both messages to Convex
            if (user && conversationId) {
                await addMessage({
                    conversationId: conversationId as any,
                    userId: user._id,
                    role: 'user',
                    content: userMessage,
                });
                await addMessage({
                    conversationId: conversationId as any,
                    userId: user._id,
                    role: 'assistant',
                    content: response,
                });
            } else if (user && !conversationId) {
                // Create new conversation if needed
                const convId = await createConversation({ userId: user._id });
                setConversationId(convId);
                await addMessage({
                    conversationId: convId,
                    userId: user._id,
                    role: 'user',
                    content: userMessage,
                });
                await addMessage({
                    conversationId: convId,
                    userId: user._id,
                    role: 'assistant',
                    content: response,
                });
            }
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
                    className="fixed bottom-20 right-6 w-14 h-14 bg-art-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
                >
                    <span className="font-black text-xl">B</span>
                </button>
            )}

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-[380px] h-[500px] bg-white dark:bg-gray-900 rounded-[24px] shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-800">
                    {/* Header */}
                    <div className="bg-art-orange text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black">
                                B
                            </div>
                            <div>
                                <h3 className="font-black font-sans text-sm tracking-tight">Billionaireable</h3>
                                {isSignedIn && (
                                    <p className="text-xs text-gray-400">Remembers everything</p>
                                )}
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
                        {isInitializing && messages.length === 0 && (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                            ? 'bg-art-orange text-white'
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
                                className="w-10 h-10 bg-art-orange text-white rounded-full flex items-center justify-center hover:bg-art-orange/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
