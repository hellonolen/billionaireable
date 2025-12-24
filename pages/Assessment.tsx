import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Target, TrendingUp, Clock, Users, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

interface QuestionOption {
    value: string;
    label: string;
    score: number;
}

interface Question {
    id: string;
    pillar: string;
    question: string;
    icon: React.ReactNode;
    options: QuestionOption[];
}

const QUESTIONS: Question[] = [
    {
        id: 'vision',
        pillar: 'Reality Distortion',
        question: 'Can you describe your vision in one sentence that makes people lean forward?',
        icon: <Target className="w-6 h-6" />,
        options: [
            { value: 'no', label: "I don't have a clear vision yet", score: 0 },
            { value: 'long', label: "It takes me a few minutes to explain", score: 1 },
            { value: 'short', label: "I can do it in under 30 seconds", score: 2 },
            { value: 'one', label: "One sentence. People get excited.", score: 3 },
        ]
    },
    {
        id: 'capital',
        pillar: 'Liquidity & Allocation',
        question: 'How much of your net worth is in liquid, deployable capital?',
        icon: <TrendingUp className="w-6 h-6" />,
        options: [
            { value: 'low', label: "Less than 10% - most is locked up", score: 0 },
            { value: 'medium', label: "10-30% - some flexibility", score: 1 },
            { value: 'high', label: "30-50% - ready to move", score: 2 },
            { value: 'optimal', label: "50%+ structured for rapid deployment", score: 3 },
        ]
    },
    {
        id: 'systems',
        pillar: 'Holding Company',
        question: 'Do you have systems that generate revenue without your daily involvement?',
        icon: <Building className="w-6 h-6" />,
        options: [
            { value: 'none', label: "No - I am the business", score: 0 },
            { value: 'some', label: "Some processes, but I'm still essential", score: 1 },
            { value: 'mostly', label: "Mostly runs without me, occasional input", score: 2 },
            { value: 'full', label: "Fully systematized. I focus on growth only.", score: 3 },
        ]
    },
    {
        id: 'time',
        pillar: 'Time Arbitrage',
        question: 'How many hours per week do you spend on $10/hour tasks?',
        icon: <Clock className="w-6 h-6" />,
        options: [
            { value: 'high', label: "20+ hours - I do most things myself", score: 0 },
            { value: 'medium', label: "10-20 hours - some delegation", score: 1 },
            { value: 'low', label: "5-10 hours - good team in place", score: 2 },
            { value: 'minimal', label: "Less than 5 - everything is delegated", score: 3 },
        ]
    },
    {
        id: 'network',
        pillar: 'The Syndicate',
        question: 'Do you have access to deal flow that others don\'t?',
        icon: <Users className="w-6 h-6" />,
        options: [
            { value: 'no', label: "No - I find deals like everyone else", score: 0 },
            { value: 'some', label: "Occasionally I hear about things early", score: 1 },
            { value: 'good', label: "I'm usually in the room for good deals", score: 2 },
            { value: 'source', label: "I source deals. Others come to me.", score: 3 },
        ]
    },
    {
        id: 'global',
        pillar: 'Sovereign Flags',
        question: 'How internationally diversified is your wealth and operations?',
        icon: <Globe className="w-6 h-6" />,
        options: [
            { value: 'none', label: "Everything is in one country", score: 0 },
            { value: 'some', label: "Some international investments", score: 1 },
            { value: 'diversified', label: "Multiple jurisdictions, residencies", score: 2 },
            { value: 'sovereign', label: "Fully sovereign. No single point of failure.", score: 3 },
        ]
    },
];

const Assessment: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn } = useAuth();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let total = 0;
        let max = QUESTIONS.length * 3;
        
        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            const option = q.options.find(o => o.value === answer);
            if (option) {
                total += option.score;
            }
        });
        
        return {
            score: total,
            max,
            percentage: Math.round((total / max) * 100),
        };
    };

    const getLevel = (percentage: number) => {
        if (percentage >= 80) return { name: 'Optimizer', description: 'You have strong foundations. Time to scale.', color: 'green' };
        if (percentage >= 60) return { name: 'Accumulator', description: 'You have momentum. Fill the gaps.', color: 'blue' };
        if (percentage >= 40) return { name: 'Architect', description: 'You have potential. Build the structure.', color: 'orange' };
        return { name: 'Explorer', description: 'You are at the beginning. The path awaits.', color: 'gray' };
    };

    const getWeakestPillars = () => {
        const pillarScores: Record<string, number> = {};
        
        QUESTIONS.forEach(q => {
            const answer = answers[q.id];
            const option = q.options.find(o => o.value === answer);
            pillarScores[q.pillar] = option?.score || 0;
        });
        
        return Object.entries(pillarScores)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 3)
            .map(([pillar]) => pillar);
    };

    if (showResults) {
        const { score, max, percentage } = calculateScore();
        const level = getLevel(percentage);
        const weakest = getWeakestPillars();

        return (
            <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Score Card */}
                    <div className={`bg-art-${level.color} rounded-[32px] p-12 text-white text-center mb-8 shadow-2xl`}>
                        <p className="font-mono text-xs uppercase mb-4 text-white/70">Your Billionaire Readiness Score</p>
                        <div className="text-8xl font-black mb-4">{percentage}%</div>
                        <h2 className="font-sans text-3xl font-black mb-2">{level.name}</h2>
                        <p className="font-serif text-xl text-white/90">{level.description}</p>
                    </div>

                    {/* Weakest Areas */}
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800 mb-8">
                        <h3 className="font-sans text-xl font-black text-black dark:text-white mb-6">
                            Your Priority Areas
                        </h3>
                        <p className="font-serif text-gray-600 dark:text-gray-400 mb-6">
                            Based on your answers, these pillars need the most attention:
                        </p>
                        <div className="space-y-4">
                            {weakest.map((pillar, idx) => (
                                <div key={pillar} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                    <div className={`w-10 h-10 rounded-full bg-art-${idx === 0 ? 'orange' : idx === 1 ? 'green' : 'blue'} flex items-center justify-center text-white font-bold`}>
                                        {idx + 1}
                                    </div>
                                    <span className="font-sans font-bold text-black dark:text-white">{pillar}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-black dark:bg-white rounded-[32px] p-8 text-center">
                        <h3 className="font-sans text-2xl font-black text-white dark:text-black mb-4">
                            Ready to close the gaps?
                        </h3>
                        <p className="font-serif text-white/80 dark:text-black/80 mb-6">
                            The 12 Pillars are the systematic path to becoming Billionaireable. Start with Pillar 1 for free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/skills/reality-distortion')}
                                className="px-8 py-4 bg-art-orange text-white rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                            >
                                Start Free: Pillar 1
                            </button>
                            <button
                                onClick={() => navigate('/pricing')}
                                className="px-8 py-4 bg-transparent text-white dark:text-black border-2 border-white/30 dark:border-black/30 rounded-full font-mono text-sm font-bold uppercase hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                            >
                                View All Plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const question = QUESTIONS[currentQuestion];
    const isAnswered = !!answers[question.id];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
                <div
                    className="h-full bg-art-orange transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="max-w-3xl mx-auto px-4 py-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                        Question {currentQuestion + 1} of {QUESTIONS.length}
                    </p>
                    <p className="font-mono text-xs text-art-orange uppercase">
                        {question.pillar}
                    </p>
                </div>

                {/* Question */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-12 shadow-soft-xl border border-gray-200 dark:border-gray-800 mb-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-art-orange/10 rounded-full flex items-center justify-center text-art-orange">
                            {question.icon}
                        </div>
                        <h2 className="font-sans text-2xl md:text-3xl font-black text-black dark:text-white">
                            {question.question}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(question.id, option.value)}
                                className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                                    answers[question.id] === option.value
                                        ? 'border-art-orange bg-art-orange/5'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-sans text-base font-medium text-black dark:text-white">
                                        {option.label}
                                    </span>
                                    {answers[question.id] === option.value && (
                                        <CheckCircle className="w-5 h-5 text-art-orange" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm font-bold uppercase transition-colors ${
                            currentQuestion === 0
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:text-black dark:hover:text-white'
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className={`flex items-center gap-2 px-8 py-4 rounded-full font-mono text-sm font-bold uppercase transition-all ${
                            isAnswered
                                ? 'bg-art-orange text-white hover:bg-art-orange/80'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {currentQuestion === QUESTIONS.length - 1 ? 'See Results' : 'Next'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
