import React, { useState } from 'react';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useAction, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

// Stripe Price IDs - set these in Stripe Dashboard
const PRICE_IDS = {
    pathfinder_monthly: 'price_pathfinder_monthly', // Replace with real Stripe price IDs
    pathfinder_annual: 'price_pathfinder_annual',
    ascendant_monthly: 'price_ascendant_monthly',
    ascendant_annual: 'price_ascendant_annual',
    principal_monthly: 'price_principal_monthly',
    principal_annual: 'price_principal_annual',
};

const Pricing: React.FC = () => {
    const navigate = useNavigate();
    const { user: clerkUser, isSignedIn } = useUser();
    const [isAnnual, setIsAnnual] = useState(true);
    const [loading, setLoading] = useState<string | null>(null);

    // Convex
    const convexUser = useQuery(
        api.users.getUserByClerkId,
        isSignedIn && clerkUser ? { clerkId: clerkUser.id } : "skip"
    );
    const createCheckout = useAction(api.stripe.createCheckoutSession);

    const handleSubscribe = async (tierName: string, priceId: string) => {
        if (!isSignedIn) {
            navigate('/waitlist');
            return;
        }

        if (!convexUser) {
            console.error('User not found in Convex');
            return;
        }

        setLoading(tierName);

        try {
            const { url } = await createCheckout({
                priceId,
                userId: convexUser._id,
                successUrl: `${window.location.origin}/dashboard?success=true`,
                cancelUrl: `${window.location.origin}/pricing?canceled=true`,
            });

            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            // Fall back to waitlist if Stripe isn't configured
            navigate('/waitlist');
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
            monthlyPriceId: PRICE_IDS.pathfinder_monthly,
            annualPriceId: PRICE_IDS.pathfinder_annual,
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
            color: 'border-gray-200',
            barColor: 'bg-art-orange',
        },
        {
            name: 'Scaler',
            description: 'Growing what works',
            monthlyPrice: 1497,
            annualPrice: 14997,
            annualSavings: 2967,
            monthlyPriceId: PRICE_IDS.ascendant_monthly,
            annualPriceId: PRICE_IDS.ascendant_annual,
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
            color: 'border-art-orange',
            barColor: 'bg-art-green',
        },
        {
            name: 'Owner',
            description: 'Building dynasties',
            monthlyPrice: 4997,
            annualPrice: 49997,
            annualSavings: 9967,
            monthlyPriceId: PRICE_IDS.principal_monthly,
            annualPriceId: PRICE_IDS.principal_annual,
            features: [
                'Everything in Scaler',
                'Family Office frameworks',
                'Dynasty Design training',
                'Sovereign Flags intelligence',
                'Asymmetric Bets analysis',
                'Ascendance program',
                'Complete playbook library',
            ],
            cta: 'Start Now',
            popular: false,
            color: 'border-gray-200',
            barColor: 'bg-art-blue',
        },
    ];

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full mb-6">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest">Investment in Your Future</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter mb-6">
                        Choose Your Path
                    </h1>
                    <p className="font-serif text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        The cost of this program is trivial compared to the cost of another year without a strategy.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all ${
                                !isAnnual 
                                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                                isAnnual 
                                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                                    : 'text-gray-500 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            Annual
                            <span className="bg-art-green text-black px-2 py-0.5 rounded-full text-[10px]">Save 2 months</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative bg-white dark:bg-gray-900 p-8 lg:p-10 rounded-[32px] shadow-soft-xl border-2 ${tier.color} transition-all hover:-translate-y-2 duration-500 ${
                                tier.popular ? 'lg:scale-105 lg:shadow-2xl' : ''
                            }`}
                        >
                            {/* Top Bar */}
                            <div className={`absolute top-0 left-0 w-full h-2 ${tier.barColor} rounded-t-[32px]`}></div>

                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-art-orange text-black px-4 py-1 rounded-full font-mono text-xs font-bold uppercase">
                                    Most Popular
                                </div>
                            )}

                            {/* Tier Name */}
                            <h3 className={`font-mono text-sm font-bold uppercase tracking-widest mb-2 ${
                                tier.popular ? 'text-art-orange' : 'text-gray-400'
                            }`}>
                                {tier.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{tier.description}</p>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-serif text-5xl font-black text-black dark:text-white">
                                        ${isAnnual ? tier.annualPrice.toLocaleString() : tier.monthlyPrice.toLocaleString()}
                                    </span>
                                    <span className="font-mono text-sm text-gray-400">
                                        /{isAnnual ? 'year' : 'month'}
                                    </span>
                                </div>
                                {isAnnual && (
                                    <p className="font-mono text-xs text-art-green mt-2">
                                        Save ${tier.annualSavings.toLocaleString()} vs monthly
                                    </p>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                            tier.popular ? 'bg-art-orange/20' : 'bg-black/5 dark:bg-white/10'
                                        }`}>
                                            <Check className={`w-3 h-3 ${tier.popular ? 'text-art-orange' : 'text-black dark:text-white'}`} />
                                        </div>
                                        <span className="font-sans text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={() => handleSubscribe(
                                    tier.name, 
                                    isAnnual ? tier.annualPriceId : tier.monthlyPriceId
                                )}
                                disabled={loading === tier.name}
                                className={`w-full py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group disabled:opacity-50 ${
                                    tier.popular
                                        ? 'bg-art-orange text-black hover:bg-art-green shadow-lg'
                                        : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                                }`}
                            >
                                {loading === tier.name ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        {tier.cta}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="text-center mt-16 max-w-2xl mx-auto">
                    <p className="font-serif text-lg text-gray-500 dark:text-gray-400 mb-4">
                        Not sure where to start?
                    </p>
                    <button
                        onClick={() => navigate('/waitlist')}
                        className="font-mono text-sm font-bold uppercase tracking-widest text-art-orange hover:underline"
                    >
                        Talk to Billionaireable first →
                    </button>
                </div>

                {/* Guarantee */}
                <div className="mt-20 max-w-3xl mx-auto bg-black dark:bg-white text-white dark:text-black rounded-[32px] p-12 text-center">
                    <h3 className="font-serif text-3xl font-black mb-4">30-Day Strategic Alignment Guarantee</h3>
                    <p className="font-serif text-lg opacity-80">
                        If after 30 days you don't feel aligned, we'll refund your investment in full. No questions, no friction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
