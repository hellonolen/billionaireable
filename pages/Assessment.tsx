import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Target, TrendingUp, Clock, Users, Building, Globe, Loader2, Check, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { FEATURE_FLAGS } from '../constants';

interface QuestionOption {
    value: string;
    label: string;
    score: number;
}

interface Question {
    id: string;
    pillar: string;
    question: string;
    explanation: string;
    icon: React.ReactNode;
    options: QuestionOption[];
}

const QUESTIONS: Question[] = [
    {
        id: 'vision',
        pillar: 'Reality Distortion',
        question: 'Can you describe your vision in one sentence that makes people lean forward?',
        explanation: 'Vision is the gravity that pulls in high-level talent and capital. If it’s complex, it’s weak.',
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
        explanation: 'Wealth in paper is a trap. Billionaires maintain liquidity to exploit asymmetric opportunities instantly.',
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
        explanation: 'Operating a business is a job. Controlling a holding company is power. We need to know your leverage.',
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
        explanation: 'Your hourly rate should be $10,000+. Every minute spent on clerical tasks is a massive loss of capital.',
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
        explanation: 'Open markets are for the masses. The syndicate operates on private information and direct access.',
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
        explanation: 'Single-jurisdiction risk is the greatest threat to a dynasty. We measure your sovereign independence.',
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
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const saveProgressMutation = useMutation(api.users.saveOnboardingProgress);
    const savedProgress = useQuery(api.users.getOnboardingProgress, user ? { userId: user._id } : "skip");

    // Load progress from Convex
    useEffect(() => {
        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                if (parsed.assessmentAnswers) setAnswers(parsed.assessmentAnswers);
                if (parsed.assessmentQuestionIndex !== undefined) setCurrentQuestion(parsed.assessmentQuestionIndex);
            } catch (e) {
                console.error("Failed to parse assessment progress", e);
            }
        }
    }, [savedProgress]);

    const saveProgress = async (newIndex: number, newAnswers: Record<string, string>) => {
        if (!user) return;
        setSaving(true);
        try {
            await saveProgressMutation({
                userId: user._id,
                progress: JSON.stringify({ assessmentQuestionIndex: newIndex, assessmentAnswers: newAnswers })
            });
            setLastSaved(Date.now());
        } catch (e) {
            console.error("Failed to save progress", e);
        } finally {
            setSaving(false);
        }
    };

    const handleAnswer = (questionId: string, value: string) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);
        saveProgress(currentQuestion, newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            const nextIdx = currentQuestion + 1;
            setCurrentQuestion(nextIdx);
            saveProgress(nextIdx, answers);
        } else {
            setShowConfirm(true);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            const prevIdx = currentQuestion - 1;
            setCurrentQuestion(prevIdx);
            saveProgress(prevIdx, answers);
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
                    className="h-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: showResults ? '100%' : `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
            </div>

            {/* Saved Indicator */}
            <div className="fixed top-4 right-4 z-50">
                {saving ? (
                    <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                        <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                        <span className="font-mono text-[10px] uppercase text-gray-400">Saving...</span>
                    </div>
                ) : lastSaved ? (
                    <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                        <Check className="w-3 h-3 text-art-green" />
                        <span className="font-mono text-[10px] uppercase text-gray-400">Progress Saved</span>
                    </div>
                ) : null}
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 pb-32">
                {/* Questions */}
                {!showResults && !showConfirm && (
                    <div className="animate-fade-in">
                        {FEATURE_FLAGS.REMEDIATION_PHASE_1 && (
                            <div className="mb-8 flex items-center gap-3 p-4 bg-art-green/5 border border-art-green/20 rounded-2xl">
                                <Shield className="w-5 h-5 text-art-green" />
                                <p className="font-serif text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-art-green uppercase font-mono mr-2">Sovereign Encryption:</span>
                                    Your data is encrypted end-to-end and stored in a private vault. No third parties ever see your inputs.
                                </p>
                            </div>
                        )}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black">
                                {question.icon}
                            </div>
                            <div>
                                <p className="font-mono text-xs font-bold uppercase text-gray-400">Pillar {currentQuestion + 1}</p>
                                <h2 className="font-sans text-xl font-bold dark:text-gray-300">{question.pillar}</h2>
                            </div>
                        </div>

                        <h1 className="font-serif text-3xl md:text-5xl font-black text-black dark:text-white mb-6 leading-tight">
                            {question.question}
                        </h1>

                        <div className="bg-art-blue/5 border border-art-blue/20 rounded-2xl p-6 mb-12">
                            <p className="font-mono text-[10px] uppercase text-art-blue font-bold mb-2">Why this matters</p>
                            <p className="font-serif text-sm text-gray-600 dark:text-gray-400">
                                {question.explanation}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {question.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(question.id, option.value)}
                                    className={`p-6 rounded-[24px] text-left border-2 transition-all ${answers[question.id] === option.value
                                        ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
                                        }`}
                                >
                                    <p className="font-serif text-lg">{option.label}</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentQuestion === 0}
                                className="flex items-center gap-2 font-mono text-sm font-bold uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-0"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!answers[question.id]}
                                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-mono text-sm font-bold uppercase hover:opacity-80 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {currentQuestion === QUESTIONS.length - 1 ? 'Review Path' : 'Next Pillar'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Confirm Flow */}
                {showConfirm && !showResults && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12">
                            <h1 className="font-serif text-5xl font-black text-black dark:text-white tracking-tighter mb-4">
                                Audit Your Inputs.
                            </h1>
                            <p className="font-serif text-xl text-gray-600 dark:text-gray-400">
                                This data will seed your AI Directives. Confirm it's true.
                            </p>
                        </div>

                        <div className="space-y-4 mb-12">
                            {QUESTIONS.map((q, idx) => (
                                <div key={q.id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-50 dark:bg-black rounded-xl flex items-center justify-center text-gray-400">
                                            {q.icon}
                                        </div>
                                        <div>
                                            <p className="font-mono text-[10px] uppercase text-gray-400">{q.pillar}</p>
                                            <p className="font-serif text-base text-black dark:text-white font-bold">
                                                {q.options.find(o => o.value === answers[q.id])?.label}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowConfirm(false);
                                            setCurrentQuestion(idx);
                                        }}
                                        className="font-mono text-xs uppercase text-art-orange font-bold"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setShowResults(true);
                                }}
                                className="w-full bg-art-orange text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-3"
                            >
                                Lock In & Calculate Path
                                <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="w-full py-4 font-mono text-xs font-bold uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                Back to Questions
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assessment;
