import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, TrendingUp, Brain, Target, Globe, ArrowRight, CheckCircle } from 'lucide-react';

interface Question {
    id: string;
    pillar: 'bioself' | 'wealth' | 'intelligence' | 'strategy' | 'markets';
    question: string;
    options: { value: number; label: string }[];
}

const QUESTIONS: Question[] = [
    // Bio-Self
    {
        id: 'q1', pillar: 'bioself', question: 'How would you rate your current health optimization?', options: [
            { value: 1, label: 'No system - reactive only' },
            { value: 2, label: 'Basic tracking (steps, sleep)' },
            { value: 3, label: 'Active optimization (supplements, workouts)' },
            { value: 4, label: 'Advanced protocols (HRV, bloodwork, peptides)' },
        ]
    },
    {
        id: 'q2', pillar: 'bioself', question: 'Do you track longevity biomarkers?', options: [
            { value: 1, label: 'No tracking' },
            { value: 2, label: 'Annual checkups only' },
            { value: 3, label: 'Quarterly labs basic panels)' },
            { value: 4, label: 'Monthly tracking with full biomarker suite' },
        ]
    },

    // Wealth
    {
        id: 'q3', pillar: 'wealth', question: 'How is your wealth structured?', options: [
            { value: 1, label: 'Single jurisdiction, mostly liquid' },
            { value: 2, label: 'Some trusts, basic planning' },
            { value: 3, label: 'Multi-jurisdictional, structured vehicles' },
            { value: 4, label: 'Dynasty trusts, family office, global optimization' },
        ]
    },
    {
        id: 'q4', pillar: 'wealth', question: 'What is your effective tax rate?', options: [
            { value: 1, label: 'Don\'t know / 30%+' },
            { value: 2, label: '20-30%' },
            { value: 3, label: '10-20%' },
            { value: 4, label: '<10% (legal optimization)' },
        ]
    },

    // Markets
    {
        id: 'q5', pillar: 'markets', question: 'How do you track market opportunities?', options: [
            { value: 1, label: 'News/headlines' },
            { value: 2, label: 'Newsletters + basic alerts' },
            { value: 3, label: 'Bloomberg/trading platform' },
            { value: 4, label: 'AI-powered real-time intelligence' },
        ]
    },

    // Intelligence
    {
        id: 'q6', pillar: 'intelligence', question: 'How do you stay informed?', options: [
            { value: 1, label: 'Casual reading' },
            { value: 2, label: 'Curated newsletters' },
            { value: 3, label: 'Private networks/masterminds' },
            { value: 4, label: 'Personal board of advisors + AI synthesis' },
        ]
    },

    // Strategy
    {
        id: 'q7', pillar: 'strategy', question: 'How often do you conduct strategic reviews?', options: [
            { value: 1, label: 'Rarely / when problems arise' },
            { value: 2, label: 'Annually' },
            { value: 3, label: 'Quarterly with advisors' },
            { value: 4, label: 'Weekly sessions with AI-assisted planning' },
        ]
    },
];

const Assessment: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        if (currentQuestion < QUESTIONS.length - 1) {
            setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
        } else {
            setTimeout(() => setShowResults(true), 300);
        }
    };

    const calculateScore = (pillar: string) => {
        const pillarQuestions = QUESTIONS.filter(q => q.pillar === pillar);
        const pillarAnswers = pillarQuestions.map(q => answers[q.id] || 0);
        const total = pillarAnswers.reduce((sum, val) => sum + val, 0);
        const max = pillarQuestions.length * 4;
        return Math.round((total / max) * 100);
    };

    const scores = {
        bioself: calculateScore('bioself'),
        wealth: calculateScore('wealth'),
        markets: calculateScore('markets'),
        intelligence: calculateScore('intelligence'),
        strategy: calculateScore('strategy'),
    };

    const averageScore = Math.round(Object.values(scores).reduce((sum, val) => sum + val, 0) / 5);

    const getScoreColor = (score: number) => {
        if (score >= 75) return 'text-art-green';
        if (score >= 50) return 'text-art-orange';
        return 'text-red-500';
    };

    const getGapAnalysis = (score: number) => {
        if (score >= 75) return 'Optimized - maintain and refine';
        if (score >= 50) return 'Good foundation - room for growth';
        if (score >= 25) return 'Opportunity area - needs attention';
        return 'Critical gap - high priority';
    };

    if (showResults) {
        return (
            <div className="min-h-screen bg-art-offwhite py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12 animate-fade-in">
                        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-art-green" />
                        <h1 className="font-serif text-6xl font-black text-black tracking-tighter mb-4">
                            Assessment Complete
                        </h1>
                        <p className="font-serif text-2xl text-gray-600">
                            Your Billionaireable Score: <span className={`font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</span>
                        </p>
                    </div>

                    {/* Results by Pillar */}
                    <div className="space-y-6 mb-12">
                        {[
                            { key: 'bioself', label: 'Bio-Self', icon: <Heart className="w-6 h-6" />, color: 'art-orange' },
                            { key: 'wealth', label: 'Wealth', icon: <TrendingUp className="w-6 h-6" />, color: 'art-green' },
                            { key: 'markets', label: 'Markets', icon: <Target className="w-6 h-6" />, color: 'art-green' },
                            { key: 'intelligence', label: 'Intelligence', icon: <Brain className="w-6 h-6" />, color: 'art-blue' },
                            { key: 'strategy', label: 'Strategy', icon: <Globe className="w-6 h-6" />, color: 'art-blue' },
                        ].map(pillar => {
                            const score = scores[pillar.key as keyof typeof scores];
                            return (
                                <div key={pillar.key} className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100 animate-fade-in">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full bg-${pillar.color}/10 flex items-center justify-center`}>
                                                {pillar.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-sans text-xl font-bold uppercase">{pillar.label}</h3>
                                                <p className="font-mono text-xs text-gray-400">{getGapAnalysis(score)}</p>
                                            </div>
                                        </div>
                                        <div className={`font-serif text-4xl font-black ${getScoreColor(score)}`}>
                                            {score}%
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`bg-${pillar.color} h-2 rounded-full transition-all duration-1000`}
                                            style={{ width: `${score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="bg-black text-white rounded-[32px] p-12 text-center">
                        <h2 className="font-serif text-4xl font-black mb-4">
                            Ready to Close the Gaps?
                        </h2>
                        <p className="font-serif text-xl mb-8 text-white/80">
                            Your dashboard is ready.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white text-black px-12 py-4 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-100 transition-colors inline-flex items-center gap-3"
                        >
                            Enter Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = QUESTIONS[currentQuestion];

    return (
        <div className="min-h-screen bg-art-offwhite flex items-center justify-center py-20">
            <div className="max-w-3xl w-full px-4">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-xs font-bold uppercase text-gray-400">
                            Question {currentQuestion + 1} of {QUESTIONS.length}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase text-gray-400">
                            {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question */}
                <div className="animate-fade-in">
                    <h2 className="font-serif text-4xl md:text-5xl font-black text-black tracking-tighter mb-8">
                        {question.question}
                    </h2>

                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(question.id, option.value)}
                                className="w-full bg-white border-2 border-gray-200 rounded-[24px] p-6 text-left hover:border-black hover:bg-gray-50 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-serif text-lg">{option.label}</span>
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
