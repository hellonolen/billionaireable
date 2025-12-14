import React, { useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

const Pricing: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn } = useAuth();
    const [isAnnual, setIsAnnual] = useState(true);
    const [loading, setLoading] = useState<string | null>(null);

    const createApplication = useMutation(api.payments.createPaymentApplication);

    const handleSelectTier = async (tier: typeof tiers[0]) => {
        if (!isSignedIn || !user) {
            navigate('/login');
            return;
        }
        
        setLoading(tier.name);

        try {
const result = await createApplication({
                    userId: user._id,
                tier: tier.name.toLowerCase(),
                billingCycle: isAnnual ? 'annual' : 'monthly',
                amount: isAnnual ? tier.annualPrice : tier.monthlyPrice,
                paymentMethod: 'wire',
            });
            navigate(`/payment-application-submitted?id=${result.applicationId}`);
        } catch (error) {
            console.error('Error creating application:', error);
        } finally {
            setLoading(null);
        }
    };

    const tiers = [
        {
            name: 'Founder',
            description: 'Building from zero to one',
            monthlyPrice: 497,
            annualPrice: 4997,
            annualSavings: 967,
            features: [
                'Unlimited Billionaireable access',
                'The 12 Pillars curriculum',
                'Reality Distortion training',
                'Liquidity & Allocation frameworks',
                'Holding Co structures',
                'Weekly progress tracking',
            ],
            cta: 'Start Now',
            popular: false,
            barColor: 'bg-art-orange',
        },
        {
            name: 'Scaler',
            description: 'Growing what works',
            monthlyPrice: 1497,
            annualPrice: 14997,
            annualSavings: 2967,
            features: [
                'Everything in Founder',
                'Time Arbitrage mastery',
                'Bio-Availability optimization',
                'Political Capital building',
                'The Syndicate access',
                'Deal flow intelligence',
                'Priority Billionaireable queue',
                'Progress assessments',
            ],
            cta: 'Start Now',
            popular: true,
            barColor: 'bg-art-green',
        },
        {
            name: 'Owner',
            description: 'Building dynasties',
            monthlyPrice: 4997,
            annualPrice: 49997,
            annualSavings: 9967,
            features: [
                'Everything in Scaler',
                'Family Office frameworks',
                'Dynasty Design training',
                'Sovereign Flags strategies',
                'Asymmetric Bets methodology',
                'Ascendance protocols',
                'Full pillar access forever',
                'Dedicated Billionaireable instance',
            ],
            cta: 'Start Now',
            popular: false,
            barColor: 'bg-art-blue',
        },
    ];

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter mb-4">
                        The Path Awaits
                    </h1>
                    <p className="font-serif text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        This is what billionaires do. Choose your level.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white dark:bg-gray-900 rounded-full p-1 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all ${
                                !isAnnual
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all ${
                                isAnnual
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            Annual <span className="text-art-green ml-1">Save 2 months</span>
                        </button>
                    </div>
                </div>


                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl border-2 ${
                                tier.popular ? 'border-art-orange' : 'border-gray-200 dark:border-gray-700'
                            } overflow-hidden flex flex-col`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-art-orange text-black text-center py-2 font-mono text-xs font-bold uppercase">
                                    Most Popular
                                </div>
                            )}

                            {/* Color Bar */}
                            <div className={`h-2 ${tier.barColor}`} />

                            <div className={`p-8 flex-grow flex flex-col ${tier.popular ? 'pt-12' : ''}`}>
                                {/* Tier Info */}
                                <div className="mb-6">
                                    <h3 className="font-sans text-2xl font-black text-black dark:text-white mb-1">
                                        {tier.name}
                                    </h3>
                                    <p className="font-serif text-gray-500 dark:text-gray-400">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="font-sans text-5xl font-black text-black dark:text-white">
                                            ${isAnnual ? tier.annualPrice.toLocaleString() : tier.monthlyPrice.toLocaleString()}
                                        </span>
                                        <span className="font-mono text-sm text-gray-400">
                                            /{isAnnual ? 'year' : 'month'}
                                        </span>
                                    </div>
                                    {isAnnual && (
                                        <p className="font-mono text-xs text-art-green mt-1">
                                            Save ${tier.annualSavings.toLocaleString()}/year
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-art-green flex-shrink-0 mt-0.5" />
                                            <span className="font-serif text-sm text-gray-600 dark:text-gray-400">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={() => handleSelectTier(tier)}
                                    disabled={loading === tier.name}
                                    className={`w-full py-4 rounded-full font-mono text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 ${
                                        tier.popular
                                            ? 'bg-art-orange text-black hover:bg-art-orange/90'
                                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                                    }`}
                                >
                                    {loading === tier.name ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {tier.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="font-sans text-3xl font-black text-center text-black dark:text-white mb-8">
                        Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                            <h3 className="font-sans font-bold text-black dark:text-white mb-2">Can I cancel anytime?</h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400">
                                Yes. Cancel whenever you want. No contracts, no obligations. You keep access until your current period ends. No refunds.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                            <h3 className="font-sans font-bold text-black dark:text-white mb-2">How long until I get access?</h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400">
                                Your access activates automatically the moment payment clears.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Not Sure */}
                <div className="mt-16 text-center">
                    <p className="font-serif text-gray-500 dark:text-gray-400 mb-4">
                        Not sure which tier? Start with the free module.
                    </p>
                    <button
                        onClick={() => navigate('/skills/reality-distortion/1')}
                        className="font-mono text-sm font-bold uppercase tracking-widest text-art-orange hover:underline"
                    >
                        Try Pillar 1 Free →
                    </button>
                </div>

                {/* Cancel Anytime */}
                <div className="mt-20 max-w-3xl mx-auto bg-black dark:bg-white text-white dark:text-black rounded-[32px] p-12 text-center">
                    <h3 className="font-serif text-3xl font-black mb-4">Cancel Anytime</h3>
                    <p className="font-serif text-lg opacity-80">
                        You're in control. Cancel your subscription at any time. No contracts. No obligations. No refunds.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
