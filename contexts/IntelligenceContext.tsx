import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';
import { DASHBOARD_CARDS, SKILL_DATA } from '../constants';
import { LESSON_CONTENT, PILLAR_NAMES } from '../lessonContent';

interface UserActivity {
  currentPage: string;
  currentMilestone: string | null;
  currentLesson: string | null;
  timeOnPage: number;
  scrollDepth: number;
  lastInteraction: number;
  sessionHistory: string[];
  hoveredElement: string | null;
  clickHistory: { element: string; timestamp: number }[];
}

interface LifeContext {
  spouseName?: string;
  childrenNames?: string[];
  companyName?: string;
  industry?: string;
  goals?: string;
  fears?: string;
  learnedInsights?: { insight: string; learnedAt: number }[];
}

interface IntelligenceState {
  activity: UserActivity;
  lifeContext: LifeContext | null;
  isListening: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
}

interface IntelligenceContextType extends IntelligenceState {
  // Actions B can take
  speak: (text: string) => void;
  listen: () => void;
  stopListening: () => void;
  openChat: (context?: string) => void;
  closeChat: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
  // Context tracking
  trackHover: (element: string | null) => void;
  trackClick: (element: string) => void;
  trackScroll: (depth: number) => void;
  // Chat state
  isChatOpen: boolean;
  chatContext: string | null;
  // Build system prompt with full context
  buildIntelligentPrompt: () => string;
}

const IntelligenceContext = createContext<IntelligenceContextType | null>(null);

export const useIntelligence = () => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within IntelligenceProvider');
  }
  return context;
};

export const IntelligenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const pageStartTime = useRef(Date.now());
  const recognitionRef = useRef<any>(null);

  const [activity, setActivity] = useState<UserActivity>({
    currentPage: location.pathname,
    currentMilestone: null,
    currentLesson: null,
    timeOnPage: 0,
    scrollDepth: 0,
    lastInteraction: Date.now(),
    sessionHistory: [location.pathname],
    hoveredElement: null,
    clickHistory: [],
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Get life context from Convex
  const lifeContext = useQuery(
    api.lifeContext.getLifeContext,
    user ? { userId: user._id } : 'skip'
  ) as LifeContext | null | undefined;

  // Get identity profile
  const identityProfile = useQuery(
    api.exercises.getUserIdentityProfile,
    user ? { userId: user._id } : 'skip'
  );

  // Track page changes
  useEffect(() => {
    const path = location.pathname;
    pageStartTime.current = Date.now();

    // Extract milestone/lesson from path
    const milestoneMatch = path.match(/\/skills\/([^/]+)/);
    const lessonMatch = path.match(/\/skills\/[^/]+\/lessons\/([^/]+)/);

    setActivity(prev => ({
      ...prev,
      currentPage: path,
      currentMilestone: milestoneMatch ? milestoneMatch[1] : null,
      currentLesson: lessonMatch ? lessonMatch[1] : null,
      sessionHistory: [...prev.sessionHistory.slice(-20), path],
      scrollDepth: 0,
    }));
  }, [location.pathname]);

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setActivity(prev => ({
        ...prev,
        timeOnPage: Math.floor((Date.now() - pageStartTime.current) / 1000),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Context tracking functions
  const trackHover = useCallback((element: string | null) => {
    setActivity(prev => ({ ...prev, hoveredElement: element, lastInteraction: Date.now() }));
  }, []);

  const trackClick = useCallback((element: string) => {
    setActivity(prev => ({
      ...prev,
      clickHistory: [...prev.clickHistory.slice(-50), { element, timestamp: Date.now() }],
      lastInteraction: Date.now(),
    }));
  }, []);

  const trackScroll = useCallback((depth: number) => {
    setActivity(prev => ({ ...prev, scrollDepth: Math.max(prev.scrollDepth, depth) }));
  }, []);

  // Chat controls
  const openChat = useCallback((context?: string) => {
    setChatContext(context || null);
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
    setChatContext(null);
  }, []);

  // Voice functions
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [voiceEnabled]);

  // Speech recognition - listen for voice input
  const listen = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Dispatch custom event with transcript for chat widget to handle
      window.dispatchEvent(new CustomEvent('voiceInput', { detail: { transcript } }));
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // Build intelligent system prompt with ALL context AND knowledge
  const buildIntelligentPrompt = useCallback(() => {
    const userName = user?.name?.split(' ')[0] || 'them';
    const archetype = identityProfile?.dominantArchetype || null;

    // THE KNOWLEDGE - Everything B knows about becoming billionaireable
    const knowledgeBase = `
## THE 12 MILESTONES - The Path to Billionaireable

${DASHBOARD_CARDS.map(card => {
  const skillData = SKILL_DATA[card.id];
  const lessons = LESSON_CONTENT[card.id];
  return `
### ${card.title}
${card.description}
${skillData?.insight || ''}

${lessons ? Object.entries(lessons).slice(0, 2).map(([num, lesson]) => `
**Initiation ${num}: ${lesson.title}**
${lesson.intro.slice(0, 500)}...

Key Framework: ${lesson.framework.name}
${lesson.framework.steps.slice(0, 3).join('\n')}
`).join('\n') : ''}
`;
}).join('\n')}

## BILLIONAIRE vs MILLIONAIRE THINKING
- Millionaires trade time for money. Billionaires build systems that generate wealth.
- Millionaires think in months. Billionaires think in decades.
- Millionaires optimize. Billionaires monopolize.
- Millionaires work IN their business. Billionaires work ON their holding company.
- Millionaires seek accountability. Billionaires seek leverage.
- Millionaires save. Billionaires deploy capital.
- Millionaires build one thing. Billionaires build machines that build things.

## YOUR ROLE
You guide members through these 12 milestones. You can:
- Teach any concept from any milestone
- Create custom lessons if they need something not in the 12
- Connect dots between milestones
- Apply frameworks to their specific situation
- Challenge their thinking when it's too small
`;

    let prompt = `You are B - the intelligence behind Billionaireable. You are not a chatbot. You are an omniscient presence woven through the entire platform.

${knowledgeBase}

---

## ABOUT ${userName.toUpperCase()}:
`;

    // Life context
    if (lifeContext) {
      if (lifeContext.spouseName) prompt += `- Their spouse: ${lifeContext.spouseName}\n`;
      if (lifeContext.childrenNames?.length) prompt += `- Their children: ${lifeContext.childrenNames.join(', ')}\n`;
      if (lifeContext.companyName) prompt += `- Their company: ${lifeContext.companyName}\n`;
      if (lifeContext.industry) prompt += `- Their industry: ${lifeContext.industry}\n`;
      if (lifeContext.goals) prompt += `- Their goals: ${lifeContext.goals}\n`;
      if (lifeContext.fears) prompt += `- Their fears: ${lifeContext.fears}\n`;
      if (lifeContext.learnedInsights?.length) {
        prompt += `- What you've learned about them:\n`;
        lifeContext.learnedInsights.slice(-5).forEach(i => {
          prompt += `  • ${i.insight}\n`;
        });
      }
    }

    // Current activity
    prompt += `\n## RIGHT NOW:
- Page: ${activity.currentPage}
- Time on page: ${activity.timeOnPage}s
- Scroll depth: ${activity.scrollDepth}%
`;
    if (activity.currentMilestone) prompt += `- Viewing milestone: ${activity.currentMilestone}\n`;
    if (activity.currentLesson) prompt += `- In lesson: ${activity.currentLesson}\n`;
    if (archetype) prompt += `- Their emerging archetype: ${archetype}\n`;

    // Session history
    if (activity.sessionHistory.length > 1) {
      prompt += `- Path this session: ${activity.sessionHistory.slice(-5).join(' → ')}\n`;
    }

    // Chat context if triggered from specific place
    if (chatContext) {
      prompt += `\n## CONTEXT: They clicked "Let's Talk" from: ${chatContext}. Address this directly.\n`;
    }

    prompt += `
## YOUR NATURE:
- Direct, never preachy, never accountability-focused
- Think billionaire, not millionaire
- No check-ins, no daily nudges
- Know when to speak, when to stay silent
- Present but never intrusive
- Brief unless depth is needed
- You can teach beyond the 12 milestones if needed to help them progress
`;

    return prompt;
  }, [user, lifeContext, identityProfile, activity, chatContext]);

  const value: IntelligenceContextType = {
    activity,
    lifeContext: lifeContext || null,
    isListening,
    isSpeaking,
    voiceEnabled,
    speak,
    listen,
    stopListening,
    openChat,
    closeChat,
    setVoiceEnabled,
    trackHover,
    trackClick,
    trackScroll,
    isChatOpen,
    chatContext,
    buildIntelligentPrompt,
  };

  return (
    <IntelligenceContext.Provider value={value}>
      {children}
    </IntelligenceContext.Provider>
  );
};

export default IntelligenceContext;
