import React, { useState } from 'react';
import { ArrowRight, Check, Target, TrendingUp, Globe, Brain, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const FOCUS_AREAS = [
    { id: 'reality-distortion', label: 'Reality Distortion', icon: <Brain className="w-6 h-6" />, description: 'Vision that attracts capital' },
    { id: 'liquidity-allocation', label: 'Liquidity & Allocation', icon: <TrendingUp className="w-6 h-6" />, description: 'Capital architecture' },
    { id: 'holding-co', label: 'The Holding Co', icon: <Target className="w-6 h-6" />, description: 'Systems building' },
    { id: 'time-arbitrage', label: 'Time Arbitrage', icon: <Globe className="w-6 h-6" />, description: 'Leverage and delegation' },
    { id: 'syndicate', label: 'The Syndicate', icon: <Heart className="w-6 h-6" />, description: 'Deal flow and partnerships' },
];

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn } = useAuth();
    const [step, setStep] = useState(1);
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    const updateUser = useMutation(api.users.updateUserGoals);

    const handleAreaToggle = (areaId: string) => {
        setSelectedAreas(prev =>
            prev.includes(areaId) ? prev.filter(g => g !== areaId) : [...prev, areaId]
        );
    };

    const handleComplete = async () => {
        setSaving(true);
        
        try {
            // Save to Convex if signed in
            if (user) {
                await updateUser({
                    userId: user._id,
                    goals: selectedAreas,
                });
            }
            
            // Also save to localStorage as backup
            localStorage.setItem('onboarding_complete', 'true');
            localStorage.setItem('focus_areas', JSON.stringify(selectedAreas));

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save onboarding:', error);
            // Still navigate even if save fails
            navigate('/dashboard');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
                <div
                    className="h-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: `${(step / 3) * 100}%` }}
                ></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20">
                {/* Step 1: The Path */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center">
                                <span className="font-serif text-3xl font-black text-white">B</span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl font-black text-black dark:text-white tracking-tighter leading-[0.9] mb-8">
                                This Is The Path.
                            </h1>
                            <p className="font-serif text-2xl text-gray-600 dark:text-gray-400 mb-8">
                                12 Pillars. This is what billionaires do.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 shadow-soft-xl border border-gray-100 dark:border-gray-800 mb-8">
                            <p className="font-serif text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                You're here to be guided through the billionaire path.
                            </p>
                            <p className="font-serif text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                Not theory. Not motivation. <span className="font-bold text-black dark:text-white">Directives.</span>
                            </p>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-art-orange text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-art-orange/80 transition-colors flex items-center justify-center gap-3"
                        >
                            Let's Go
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 2: Focus Areas */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="mb-12">
                            <h2 className="font-serif text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-4">
                                Where Do You Start?
                            </h2>
                            <p className="font-serif text-xl text-gray-600 dark:text-gray-400">
                                Pick the pillars that matter most right now. You'll do all of them.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {FOCUS_AREAS.map(area => (
                                <div
                                    key={area.id}
                                    onClick={() => handleAreaToggle(area.id)}
                                    className={`p-8 rounded-[32px] border-2 cursor-pointer transition-all ${selectedAreas.includes(area.id)
                                        ? 'border-black dark:border-white bg-art-orange text-white shadow-2xl'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={selectedAreas.includes(area.id) ? 'text-white dark:text-black' : 'text-black dark:text-white'}>
                                            {area.icon}
                                        </div>
                                        {selectedAreas.includes(area.id) && (
                                            <Check className="w-5 h-5" />
                                        )}
                                    </div>
                                    <h3 className="font-sans text-xl font-bold uppercase mb-2">{area.label}</h3>
                                    <p className={`font-serif text-sm ${selectedAreas.includes(area.id) ? 'text-white/80 dark:text-black/80' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {area.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            disabled={selectedAreas.length === 0}
                            className="w-full bg-art-orange text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-art-orange/80 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 3: Meet Billionaireable */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12">
                            <div className="w-24 h-24 rounded-full bg-black dark:bg-white mx-auto mb-6 flex items-center justify-center">
                                <span className="font-serif text-4xl font-black text-white dark:text-black">B</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl font-black text-black dark:text-white tracking-tighter mb-4">
                                Billionaireable
                            </h2>
                            <p className="font-serif text-xl text-gray-600 dark:text-gray-400 mb-8">
                                I guide. You follow. Let's go.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-12 shadow-soft-xl border border-gray-100 dark:border-gray-800 mb-8">
                            <p className="font-serif text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                "This is what billionaires do. Starting with {selectedAreas.length > 0 ? FOCUS_AREAS.find(a => a.id === selectedAreas[0])?.label : 'Reality Distortion'}.
                                Open the dashboard. Start the first module. Move."
                            </p>
                            <p className="font-mono text-xs text-gray-400 uppercase">
                                — Billionaireable
                            </p>
                        </div>

                        <button
                            onClick={handleComplete}
                            disabled={saving}
                            className="w-full bg-art-orange text-white py-6 rounded-full font-mono text-sm font-bold uppercase hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Enter Dashboard'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
