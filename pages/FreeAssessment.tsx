import React, { useState } from 'react';
import { ArrowRight, Check, Target, TrendingUp, Clock, Brain, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuestionOption {
    label: string;
    pillar: string;
    icon: React.ReactNode;
}

const QUESTIONS: { question: string; options: QuestionOption[] }[] = [
    {
        question: "What's your biggest challenge right now?",
        options: [
            { label: "I have a vision but can't get people to believe in it", pillar: "reality-distortion", icon: <Brain className="w-5 h-5" /> },
            { label: "I'm making money but it's not working for me", pillar: "liquidity-allocation", icon: <DollarSign className="w-5 h-5" /> },
            { label: "I'm doing everything myself and can't scale", pillar: "time-arbitrage", icon: <Clock className="w-5 h-5" /> },
            { label: "I don't have the right people or connections", pillar: "syndicate", icon: <Users className="w-5 h-5" /> },
        ]
    },
    {
        question: "Where are you in your journey?",
        options: [
            { label: "Just starting - under $100K/year", pillar: "reality-distortion", icon: <Target className="w-5 h-5" /> },
            { label: "Growing - $100K to $1M/year", pillar: "holding-co", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Scaling - $1M to $10M/year", pillar: "syndicate", icon: <DollarSign className="w-5 h-5" /> },
            { label: "Established - $10M+/year", pillar: "family-office", icon: <Users className="w-5 h-5" /> },
        ]
    },
    {
        question: "What matters most to you?",
        options: [
            { label: "Building something that outlasts me", pillar: "dynasty-design", icon: <Target className="w-5 h-5" /> },
            { label: "Freedom and time with my family", pillar: "bio-availability", icon: <Clock className="w-5 h-5" /> },
            { label: "Wealth that grows without my involvement", pillar: "liquidity-allocation", icon: <DollarSign className="w-5 h-5" /> },
            { label: "Influence and impact on the world", pillar: "political-capital", icon: <Users className="w-5 h-5" /> },
        ]
    }
];

const PILLAR_INFO: Record<string, { name: string; description: string; module: string }> = {
    'reality-distortion': {
        name: 'Reality Distortion',
        description: 'You need to architect a vision so compelling that capital and talent flow toward you automatically.',
        module: 'Vision Architecture'
    },
    'liquidity-allocation': {
        name: 'Liquidity Allocation',
        description: 'You need to put your money to work. Capital sitting idle is capital dying.',
        module: 'Capital Architecture'
    },
    'holding-co': {
        name: 'The Holding Company',
        description: 'You need systems that operate without you. The structure creates the freedom.',
        module: 'Structure Design'
    },
    'time-arbitrage': {
        name: 'Time Arbitrage',
        description: 'You need to buy back your time and leverage others to multiply your output.',
        module: 'Time Architecture'
    },
    'bio-availability': {
        name: 'Bio-Availability',
        description: 'You need to optimize your energy, health, and presence. The body is the vehicle.',
        module: 'Energy Systems'
    },
    'political-capital': {
        name: 'Political Capital',
        description: 'You need to build influence. Relationships are the multiplier of all other assets.',
        module: 'Influence Architecture'
    },
    'syndicate': {
        name: 'The Syndicate',
        description: 'You need access to deal flow and the right co-investors.',
        module: 'Deal Flow'
    },
    'family-office': {
        name: 'Family Office',
        description: 'You need institutional-grade infrastructure for managing complex wealth.',
        module: 'Institutional Infrastructure'
    },
    'dynasty-design': {
        name: 'Dynasty Design',
        description: 'You need to build something that transcends your lifetime.',
        module: 'Legacy Architecture'
    },
    'sovereign-flags': {
        name: 'Sovereign Flags',
        description: 'You need to plant flags across jurisdictions. Geographic diversification is protection.',
        module: 'Geographic Strategy'
    },
    'asymmetric-bets': {
        name: 'Asymmetric Bets',
        description: 'You need to find opportunities where the upside massively outweighs the downside.',
        module: 'Risk Architecture'
    },
    'ascendance': {
        name: 'Ascendance',
        description: "You're ready for the final transformation. Integration of all pillars.",
        module: 'Full Integration'
    },
};

const FreeAssessment: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (pillar: string) => {
        const newAnswers = [...answers, pillar];
        setAnswers(newAnswers);
        
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    // Calculate recommended pillar based on most frequent answer
    const getRecommendedPillar = () => {
        const frequency: Record<string, number> = {};
        answers.forEach(pillar => {
            frequency[pillar] = (frequency[pillar] || 0) + 1;
        });
        
        let maxCount = 0;
        let recommended = 'reality-distortion';
        Object.entries(frequency).forEach(([pillar, count]) => {
            if (count > maxCount) {
                maxCount = count;
                recommended = pillar;
            }
        });
        
        return recommended;
    };

    if (showResult) {
        const pillar = getRecommendedPillar();
        const info = PILLAR_INFO[pillar];
        
        return (
            <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 bg-art-orange rounded-full flex items-center justify-center mx-auto mb-8">
                        <Target className="w-10 h-10 text-white" />
                    </div>
                    
                    <p className="font-mono text-xs font-bold uppercase text-art-orange mb-4">Your Starting Point</p>
                    
                    <h1 className="font-sans text-4xl md:text-5xl font-black text-black dark:text-white mb-6">
                        {info.name}
                    </h1>
                    
                    <p className="font-serif text-xl text-gray-600 dark:text-gray-400 mb-8">
                        {info.description}
                    </p>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800 mb-8">
                        <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-4">Start With</p>
                        <h2 className="font-sans text-2xl font-black text-black dark:text-white mb-2">
                            {info.module}
                        </h2>
                        <p className="font-serif text-gray-500 dark:text-gray-400">
                            This is where you begin. Pillar 1 is available free.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/skills/reality-distortion/1')}
                            className="w-full py-4 bg-art-orange text-white rounded-full font-mono text-sm font-bold uppercase hover:bg-art-orange/80 transition-colors flex items-center justify-center gap-3"
                        >
                            Start Free Module
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/pricing')}
                            className="w-full py-4 bg-art-orange text-white rounded-full font-mono text-sm font-bold uppercase hover:bg-art-orange/90 transition-colors"
                        >
                            Unlock Full Path
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = QUESTIONS[currentQuestion];

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
                <div
                    className="h-full bg-art-orange transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl mx-auto w-full">
                    {/* Question Counter */}
                    <p className="font-mono text-xs font-bold uppercase text-gray-400 text-center mb-8">
                        Question {currentQuestion + 1} of {QUESTIONS.length}
                    </p>

                    {/* Question */}
                    <h1 className="font-sans text-3xl md:text-4xl font-black text-black dark:text-white text-center mb-12">
                        {question.question}
                    </h1>

                    {/* Options */}
                    <div className="space-y-4">
                        {question.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option.pillar)}
                                className="w-full p-6 bg-white dark:bg-gray-900 rounded-[24px] border border-gray-200 dark:border-gray-800 hover:border-art-orange dark:hover:border-art-orange transition-colors text-left flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 group-hover:bg-art-orange/10 rounded-full flex items-center justify-center transition-colors">
                                    <span className="text-gray-400 group-hover:text-art-orange transition-colors">
                                        {option.icon}
                                    </span>
                                </div>
                                <span className="font-serif text-lg text-black dark:text-white">
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-center">
                <p className="font-mono text-xs text-gray-400">
                    Takes 30 seconds • Free • No email required
                </p>
            </div>
        </div>
    );
};

export default FreeAssessment;

