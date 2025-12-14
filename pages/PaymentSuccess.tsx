import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn } = useAuth();
    const [countdown, setCountdown] = useState(10);
    
    const subscription = useQuery(
        api.stripe.hasActiveSubscription,
        user?._id ? { userId: user._id } : "skip"
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/dashboard');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const getPlanName = () => {
        switch (subscription?.plan) {
            case 'founder': return 'Founder';
            case 'scaler': return 'Scaler';
            case 'owner': return 'Owner';
            default: return 'Billionaireable';
        }
    };

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Success Animation */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-art-green rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <CheckCircle className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-art-green/30 animate-ping" />
                </div>

                <h1 className="font-sans text-5xl md:text-6xl font-black text-black dark:text-white mb-6">
                    Welcome to The Path.
                </h1>
                
                <p className="font-serif text-2xl text-gray-600 dark:text-gray-400 mb-4">
                    You are now {getPlanName()}.
                </p>
                
                <p className="font-serif text-xl text-gray-500 dark:text-gray-500 mb-12">
                    The 12 Pillars await. This is what billionaires do.
                </p>

                {/* What happens next */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800 mb-8">
                    <h2 className="font-mono text-xs font-bold uppercase text-gray-400 mb-6">Your Next Steps</h2>
                    <div className="space-y-4 text-left">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-orange rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Start with Pillar 1: Reality Distortion</p>
                                <p className="font-serif text-gray-500 dark:text-gray-400">Vision architecture. The foundation of everything.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-green rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Talk to Billionaireable</p>
                                <p className="font-serif text-gray-500 dark:text-gray-400">Click the B button anytime. Ask questions. Get directives.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Complete each module</p>
                                <p className="font-serif text-gray-500 dark:text-gray-400">Mark complete as you go. Track your progress through all 12 pillars.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                    Enter The Path
                    <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="font-mono text-xs text-gray-400 mt-6">
                    Redirecting in {countdown} seconds...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;

