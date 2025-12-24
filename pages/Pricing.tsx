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
                            className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all ${!isAnnual
                                    ? 'bg-art-orange text-white'
                                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all ${isAnnual
                                    ? 'bg-art-orange text-white'
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
                            className={`relative bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl border-2 ${tier.popular ? 'border-art-orange' : 'border-gray-200 dark:border-gray-700'
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
                                    className={`w-full py-4 rounded-full font-mono text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 ${tier.popular
                                            ? 'bg-art-orange text-black hover:bg-art-orange/90'
                                            : 'bg-art-orange text-white hover:bg-art-orange/80'
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

                {/* Social Proof / Testimonials */}
                <div className="mt-24 max-w-5xl mx-auto">
                    <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-center text-gray-400 mb-12">
                        What Members Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-[24px] p-8 shadow-soft-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-art-orange rounded-full flex items-center justify-center text-white font-black">M</div>
                                <div>
                                    <p className="font-sans font-bold text-black">Marcus T.</p>
                                    <p className="font-mono text-[10px] text-gray-400 uppercase">Owner · 8 months</p>
                                </div>
                            </div>
                            <p className="font-serif text-gray-600 leading-relaxed">
                                "I've spent $200k+ on courses and masterminds. This is the first time someone told me what to actually do instead of what to think about. My holding company structure saved me $340k in taxes last year alone."
                            </p>
                        </div>
                        <div className="bg-white rounded-[24px] p-8 shadow-soft-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-art-green rounded-full flex items-center justify-center text-white font-black">S</div>
                                <div>
                                    <p className="font-sans font-bold text-black">Samira K.</p>
                                    <p className="font-mono text-[10px] text-gray-400 uppercase">Scaler · 14 months</p>
                                </div>
                            </div>
                            <p className="font-serif text-gray-600 leading-relaxed">
                                "Pillar 4 on Time Arbitrage changed how I run my days. I went from 60-hour weeks to 25 hours while doubling revenue. The AI remembers everything and keeps me accountable."
                            </p>
                        </div>
                        <div className="bg-white rounded-[24px] p-8 shadow-soft-xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-art-blue rounded-full flex items-center justify-center text-white font-black">J</div>
                                <div>
                                    <p className="font-sans font-bold text-black">James R.</p>
                                    <p className="font-mono text-[10px] text-gray-400 uppercase">Founder · 5 months</p>
                                </div>
                            </div>
                            <p className="font-serif text-gray-600 leading-relaxed">
                                "Started as a Founder, upgraded to Scaler after month two. The framework isn't motivation — it's architecture. I now think in systems instead of tasks. That shift alone was worth 10x the investment."
                            </p>
                        </div>
                    </div>
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
                <div className="mt-20 max-w-3xl mx-auto bg-art-orange text-white rounded-[32px] p-12 text-center">
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
