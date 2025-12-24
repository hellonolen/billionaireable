import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Check, Loader2, Crown, Users, Calendar, Zap } from 'lucide-react';

const InnerCircle: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn } = useAuth();
    const [step, setStep] = useState<'info' | 'form' | 'submitted'>('info');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        netWorth: '',
        businessDescription: '',
        whyJoin: '',
        commitment: '',
    });

    const createApplication = useMutation(api.payments.createApplication);

    const handleSubmit = async () => {
        if (!isSignedIn || !user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            await createApplication({
                userId: user._id,
                tier: 'inner-circle',
                billingCycle: 'annual',
                amount: 50000,
                paymentMethod: 'wire',
            });
            setStep('submitted');
        } catch (error) {
            console.error('Error submitting application:', error);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'submitted') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-lg text-center">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Crown className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h1 className="font-serif text-4xl font-black text-white mb-4">
                        Application Received
                    </h1>
                    <p className="font-serif text-lg text-gray-400 mb-8">
                        We review every Inner Circle application personally. Expect a response within 48 hours.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-white text-black rounded-full font-mono text-sm font-bold uppercase hover transition-all"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-yellow-500 mb-4">
                        Application Only
                    </p>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                        The Inner Circle
                    </h1>
                    <p className="font-serif text-xl text-gray-400 max-w-2xl mx-auto">
                        This is not a course. This is not a community. This is direct access to the room where decisions are made.
                    </p>
                </div>

                {step === 'info' && (
                    <>
                        {/* What You Get */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                                <Users className="w-8 h-8 text-yellow-500 mb-4" />
                                <h3 className="font-sans text-xl font-bold text-white mb-2">Monthly 1:1 Calls</h3>
                                <p className="font-serif text-gray-400">
                                    60-minute strategy sessions. Your situation. Your questions. Direct answers.
                                </p>
                            </div>
                            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                                <Calendar className="w-8 h-8 text-yellow-500 mb-4" />
                                <h3 className="font-sans text-xl font-bold text-white mb-2">Quarterly Mastermind</h3>
                                <p className="font-serif text-gray-400">
                                    In-person gatherings with other Inner Circle members. Location varies.
                                </p>
                            </div>
                            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                                <h3 className="font-sans text-xl font-bold text-white mb-2">Priority Access</h3>
                                <p className="font-serif text-gray-400">
                                    24-hour response on any question. Direct line. No queue.
                                </p>
                            </div>
                            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                                <Crown className="w-8 h-8 text-yellow-500 mb-4" />
                                <h3 className="font-sans text-xl font-bold text-white mb-2">Custom AI Instance</h3>
                                <p className="font-serif text-gray-400">
                                    Billionaireable trained specifically on your business, your goals, your situation.
                                </p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-center mb-12">
                            <p className="font-mono text-5xl font-black text-white mb-2">
                                $50,000<span className="text-xl text-gray-500">/year</span>
                            </p>
                            <p className="font-serif text-gray-500">Limited to 12 members</p>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <button
                                onClick={() => isSignedIn ? setStep('form') : navigate('/login')}
                                className="px-12 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full font-mono text-sm font-bold uppercase hover:from-yellow-400 hover:to-yellow-500 transition-all inline-flex items-center gap-3"
                            >
                                Begin Application
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}

                {step === 'form' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                            <h2 className="font-sans text-2xl font-bold text-white mb-6">
                                Inner Circle Application
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Current Net Worth Range
                                    </label>
                                    <select
                                        value={formData.netWorth}
                                        onChange={(e) => setFormData({ ...formData, netWorth: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
                                    >
                                        <option value="">Select range</option>
                                        <option value="1-5m">$1M - $5M</option>
                                        <option value="5-10m">$5M - $10M</option>
                                        <option value="10-25m">$10M - $25M</option>
                                        <option value="25-50m">$25M - $50M</option>
                                        <option value="50-100m">$50M - $100M</option>
                                        <option value="100m+">$100M+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Describe Your Business/Investments
                                    </label>
                                    <textarea
                                        value={formData.businessDescription}
                                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:outline-none resize-none"
                                        placeholder="What do you own? What are you building?"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Why Do You Want to Join the Inner Circle?
                                    </label>
                                    <textarea
                                        value={formData.whyJoin}
                                        onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:outline-none resize-none"
                                        placeholder="What are you trying to achieve? What's the gap?"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        What's Your Commitment Level?
                                    </label>
                                    <textarea
                                        value={formData.commitment}
                                        onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:outline-none resize-none"
                                        placeholder="How much time can you dedicate? What are you willing to change?"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.netWorth || !formData.businessDescription || !formData.whyJoin}
                                    className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full font-mono text-sm font-bold uppercase hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Submit Application
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InnerCircle;

