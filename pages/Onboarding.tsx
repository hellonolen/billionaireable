import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Target, TrendingUp, Globe, Brain, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GOALS = [
    { id: 'wealth', label: 'Wealth Preservation', icon: <TrendingUp className="w-6 h-6" />, description: 'Multi-generational asset protection' },
    { id: 'growth', label: 'Portfolio Growth', icon: <Target className="w-6 h-6" />, description: 'Strategic capital allocation' },
    { id: 'legacy', label: 'Legacy Building', icon: <Globe className="w-6 h-6" />, description: '100-year family dynasty' },
    { id: 'health', label: 'Longevity', icon: <Heart className="w-6 h-6" />, description: 'Peak healthspan optimization' },
    { id: 'sovereignty', label: 'Global Sovereignty', icon: <Globe className="w-6 h-6" />, description: 'Jurisdictional freedom' },
];

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [netWorth, setNetWorth] = useState<string>('');

    const handleGoalToggle = (goalId: string) => {
        setSelectedGoals(prev =>
            prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
        );
    };

    const handleComplete = () => {
        // Save onboarding state to localStorage
        localStorage.setItem('onboarding_complete', 'true');
        localStorage.setItem('user_goals', JSON.stringify(selectedGoals));
        localStorage.setItem('net_worth_range', netWorth);

        // Navigate to assessment
        navigate('/assessment');
    };

    return (
        <div className="min-h-screen bg-art-offwhite">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(step / 5) * 100}%` }}
                ></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20">
                {/* Step 1: The Backstory */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12">
                            <Sparkles className="w-16 h-16 mx-auto mb-6 text-art-orange" />
                            <h1 className="font-serif text-6xl md:text-7xl font-black text-black tracking-tighter leading-[0.9] mb-8">
                                You've Built Wealth.
                            </h1>
                            <p className="font-serif text-3xl text-gray-600 mb-8">
                                Now it's time to <span className="text-black font-bold">multiply</span> it,
                                <span className="text-black font-bold"> protect</span> it, and make it
                                <span className="text-black font-bold"> immortal</span>.
                            </p>
                        </div>

                        <div className="bg-white rounded-[32px] p-12 shadow-soft-xl border border-gray-100 mb-8">
                            <p className="font-serif text-xl text-gray-700 leading-relaxed mb-6">
                                Money is power. But <span className="font-bold text-art-orange">unstructured wealth</span> is vulnerability.
                                Without the right <span className="font-bold text-black">systems</span>,
                                <span className="font-bold text-art-green"> intelligence</span>, and
                                <span className="font-bold text-art-blue"> strategy</span>, even nine-figure fortunes erode.
                            </p>
                            <p className="font-serif text-xl text-gray-700 leading-relaxed">
                                The wealthiest don't just accumulate. They <span className="font-bold text-black">architect</span>.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-black text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
                        >
                            Show Me How
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 2: The Desires (Goal Selection) */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="mb-12">
                            <h2 className="font-serif text-5xl font-black text-black tracking-tighter mb-4">
                                What Do You Truly Want?
                            </h2>
                            <p className="font-serif text-xl text-gray-600">
                                Select your primary objectives. Be honest.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {GOALS.map(goal => (
                                <div
                                    key={goal.id}
                                    onClick={() => handleGoalToggle(goal.id)}
                                    className={`p-8 rounded-[32px] border-2 cursor-pointer transition-all ${selectedGoals.includes(goal.id)
                                        ? 'border-black bg-black text-white shadow-2xl'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={selectedGoals.includes(goal.id) ? 'text-white' : 'text-black'}>
                                            {goal.icon}
                                        </div>
                                        {selectedGoals.includes(goal.id) && (
                                            <Check className="w-5 h-5" />
                                        )}
                                    </div>
                                    <h3 className="font-sans text-xl font-bold uppercase mb-2">{goal.label}</h3>
                                    <p className={`font-serif text-sm ${selectedGoals.includes(goal.id) ? 'text-white/80' : 'text-gray-600'}`}>
                                        {goal.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            disabled={selectedGoals.length === 0}
                            className="w-full bg-black text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 3: Current State Assessment */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <div className="mb-12">
                            <h2 className="font-serif text-5xl font-black text-black tracking-tighter mb-4">
                                Where Are You Now?
                            </h2>
                            <p className="font-serif text-xl text-gray-600">
                                This helps us personalize your experience. (All data is encrypted)
                            </p>
                        </div>

                        <div className="bg-white rounded-[32px] p-12 shadow-soft-xl border border-gray-100 mb-8">
                            <div className="mb-8">
                                <label className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">
                                    Net Worth Range (Optional)
                                </label>
                                <select
                                    value={netWorth}
                                    onChange={(e) => setNetWorth(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-full px-6 py-4 font-serif text-lg focus:outline-none focus:border-black transition-colors"
                                >
                                    <option value="">Prefer not to say</option>
                                    <option value="1-10m">$1M - $10M</option>
                                    <option value="10-50m">$10M - $50M</option>
                                    <option value="50-100m">$50M - $100M</option>
                                    <option value="100m+">$100M+</option>
                                </select>
                            </div>

                            <p className="font-mono text-xs text-gray-400 text-center">
                                We'll use this to calibrate your dashboard. You can change this later.
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(4)}
                            className="w-full bg-black text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 4: Connect Your Ecosystem */}
                {step === 4 && (
                    <div className="animate-fade-in">
                        <div className="mb-12">
                            <h2 className="font-serif text-5xl font-black text-black tracking-tighter mb-4">
                                Connect Your Ecosystem
                            </h2>
                            <p className="font-serif text-xl text-gray-600">
                                We'll sync data automatically. You can do this later too.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {['Oura Ring', 'Whoop', 'Apple Health', 'Google Calendar'].map((device) => (
                                <div key={device} className="bg-white rounded-[24px] p-6 shadow-soft-xl border border-gray-100 text-center">
                                    <Brain className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                                    <p className="font-sans text-sm font-bold">{device}</p>
                                    <button className="mt-3 text-xs font-mono uppercase text-gray-400 hover:text-black transition-colors">
                                        Skip for now
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(5)}
                            className="w-full bg-black text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 5: Meet Your AI */}
                {step === 5 && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12">
                            <div className="w-24 h-24 rounded-full bg-black mx-auto mb-6 flex items-center justify-center">
                                <Sparkles className="w-12 h-12 text-art-yellow animate-pulse" />
                            </div>
                            <h2 className="font-serif text-5xl font-black text-black tracking-tighter mb-4">
                                Meet Your AI Concierge
                            </h2>
                            <p className="font-serif text-xl text-gray-600 mb-8">
                                I'll guide you through your transformation.
                            </p>
                        </div>

                        <div className="bg-white rounded-[32px] p-12 shadow-soft-xl border border-gray-100 mb-8">
                            <p className="font-serif text-lg text-gray-700 leading-relaxed mb-6 italic">
                                "Good morning. Based on your goals, I've prepared a personalized assessment.
                                Let's discover where you are on the path to becoming <span className="font-bold text-black">Billionaireable</span>."
                            </p>
                            <p className="font-mono text-xs text-gray-400 uppercase">
                                — Your AI Concierge
                            </p>
                        </div>

                        <button
                            onClick={handleComplete}
                            className="w-full bg-art-orange text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl"
                        >
                            Begin Assessment
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
