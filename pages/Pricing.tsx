import React, { useState } from 'react';
import { Check, ArrowRight, Loader2, CreditCard, Building2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useAction, useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

// Payment method types
type PaymentMethod = 'stripe' | 'whop' | 'wire';

// Payment availability rules
const getAvailablePaymentMethods = (tier: string, isAnnual: boolean): PaymentMethod[] => {
    // Annual = Wire only (all tiers)
    if (isAnnual) {
        return ['wire'];
    }
    
    // Monthly by tier
    switch (tier) {
        case 'founder':
            return ['stripe', 'whop', 'wire']; // All options
        case 'scaler':
            return ['whop', 'wire']; // No Stripe (too high)
        case 'owner':
            return ['wire']; // Wire only (way too high)
        default:
            return ['wire'];
    }
};

const PAYMENT_METHOD_INFO: Record<PaymentMethod, { name: string; icon: React.ReactNode; description: string }> = {
    stripe: {
        name: 'Credit Card',
        icon: <CreditCard className="w-5 h-5" />,
        description: 'Pay instantly with card'
    },
    whop: {
        name: 'Whop',
        icon: <Zap className="w-5 h-5" />,
        description: 'Secure subscription'
    },
    wire: {
        name: 'Wire Transfer',
        icon: <Building2 className="w-5 h-5" />,
        description: 'Bank transfer (recommended)'
    }
};

const Pricing: React.FC = () => {
    const navigate = useNavigate();
    const { user: clerkUser, isSignedIn } = useUser();
    const [isAnnual, setIsAnnual] = useState(true);
    const [loading, setLoading] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    // Convex
    const convexUser = useQuery(
        api.users.getUserByClerkId,
        isSignedIn && clerkUser ? { clerkId: clerkUser.id } : "skip"
    );
    const createCheckout = useAction(api.stripe.createCheckoutSession);
    const createApplication = useMutation(api.payments.createPaymentApplication);

    const handleSelectTier = (tierName: string) => {
        if (!isSignedIn) {
            navigate('/waitlist');
            return;
        }
        setSelectedTier(tierName.toLowerCase());
        setShowPaymentOptions(true);
    };

    const handlePaymentMethod = async (method: PaymentMethod, tier: typeof tiers[0]) => {
        if (!convexUser) return;
        
        setLoading(tier.name);

        try {
            if (method === 'wire') {
                // Create application for wire transfer
                await createApplication({
                    userId: convexUser._id,
                    tier: tier.name.toLowerCase(),
                    billingCycle: isAnnual ? 'annual' : 'monthly',
                    amount: isAnnual ? tier.annualPrice : tier.monthlyPrice,
                    paymentMethod: 'wire',
                });
                navigate('/payment-application-submitted');
            } else if (method === 'whop') {
                // Redirect to Whop checkout
                // You'll set these URLs in your Whop dashboard
                const whopUrls: Record<string, string> = {
                    founder_monthly: process.env.VITE_WHOP_FOUNDER_MONTHLY || '/payment-application-submitted',
                    scaler_monthly: process.env.VITE_WHOP_SCALER_MONTHLY || '/payment-application-submitted',
                };
                const key = `${tier.name.toLowerCase()}_monthly`;
                window.location.href = whopUrls[key] || '/payment-application-submitted';
            } else if (method === 'stripe') {
                // Stripe checkout (only for low amounts)
                const priceId = isAnnual ? tier.annualPriceId : tier.monthlyPriceId;
                const { url } = await createCheckout({
                    priceId,
                    userId: convexUser._id,
                    successUrl: `${window.location.origin}/payment-success`,
                    cancelUrl: `${window.location.origin}/pricing?canceled=true`,
                });
                if (url) {
                    window.location.href = url;
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            // For wire/whop, still show application submitted
            if (method !== 'stripe') {
                navigate('/payment-application-submitted');
            }
        } finally {
            setLoading(null);
            setShowPaymentOptions(false);
            setSelectedTier(null);
        }
    };

    const tiers = [
        {
            name: 'Founder',
            description: 'Building from zero to one',
            monthlyPrice: 497,
            annualPrice: 4997,
            annualSavings: 967,
            monthlyPriceId: 'price_founder_monthly',
            annualPriceId: 'price_founder_annual',
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
            color: 'border-gray-200 dark:border-gray-700',
            barColor: 'bg-art-orange',
        },
        {
            name: 'Scaler',
            description: 'Growing what works',
            monthlyPrice: 1497,
            annualPrice: 14997,
            annualSavings: 2967,
            monthlyPriceId: 'price_scaler_monthly',
            annualPriceId: 'price_scaler_annual',
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
            monthlyPriceId: 'price_owner_monthly',
            annualPriceId: 'price_owner_annual',
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
            cta: 'Apply Now',
            popular: false,
            color: 'border-gray-200 dark:border-gray-700',
            barColor: 'bg-art-blue',
        },
    ];

    const selectedTierData = tiers.find(t => t.name.toLowerCase() === selectedTier);
    const availableMethods = selectedTier ? getAvailablePaymentMethods(selectedTier, isAnnual) : [];

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

                {/* Annual = Wire Transfer Note */}
                {isAnnual && (
                    <div className="max-w-2xl mx-auto mb-8 bg-art-blue/10 border border-art-blue/20 rounded-2xl p-4 text-center">
                        <p className="font-mono text-sm text-art-blue">
                            <Building2 className="w-4 h-4 inline mr-2" />
                            Annual plans are paid via wire transfer
                        </p>
                    </div>
                )}

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl border-2 ${tier.color} overflow-hidden flex flex-col`}
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
                                    onClick={() => handleSelectTier(tier.name)}
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

                                {/* Payment Methods Available */}
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    {getAvailablePaymentMethods(tier.name.toLowerCase(), isAnnual).map(method => (
                                        <div key={method} className="text-gray-400" title={PAYMENT_METHOD_INFO[method].name}>
                                            {PAYMENT_METHOD_INFO[method].icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Method Modal */}
                {showPaymentOptions && selectedTierData && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 max-w-md w-full shadow-2xl">
                            <h3 className="font-sans text-2xl font-black text-black dark:text-white mb-2">
                                Choose Payment Method
                            </h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400 mb-6">
                                {selectedTierData.name} - ${isAnnual ? selectedTierData.annualPrice.toLocaleString() : selectedTierData.monthlyPrice.toLocaleString()}/{isAnnual ? 'year' : 'month'}
                            </p>

                            <div className="space-y-3">
                                {availableMethods.map(method => (
                                    <button
                                        key={method}
                                        onClick={() => handlePaymentMethod(method, selectedTierData)}
                                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-art-orange dark:hover:border-art-orange transition-colors flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            {PAYMENT_METHOD_INFO[method].icon}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-sans font-bold text-black dark:text-white">
                                                {PAYMENT_METHOD_INFO[method].name}
                                            </p>
                                            <p className="font-serif text-sm text-gray-500 dark:text-gray-400">
                                                {PAYMENT_METHOD_INFO[method].description}
                                            </p>
                                        </div>
                                        {method === 'wire' && (
                                            <span className="ml-auto px-2 py-1 bg-art-green/10 text-art-green rounded-full font-mono text-xs">
                                                Recommended
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setShowPaymentOptions(false);
                                    setSelectedTier(null);
                                }}
                                className="w-full mt-6 py-3 text-gray-500 font-mono text-sm hover:text-black dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* FAQ */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="font-sans text-3xl font-black text-center text-black dark:text-white mb-8">
                        Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                            <h3 className="font-sans font-bold text-black dark:text-white mb-2">Can I cancel anytime?</h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400">
                                Yes. Cancel whenever you want. No contracts, no obligations. You keep access until your current period ends.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                            <h3 className="font-sans font-bold text-black dark:text-white mb-2">Why wire transfer?</h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400">
                                This is how serious money moves. Wire transfer is standard for high-value transactions. It's secure, professional, and what you'll use at this level.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                            <h3 className="font-sans font-bold text-black dark:text-white mb-2">What happens after I apply?</h3>
                            <p className="font-serif text-gray-500 dark:text-gray-400">
                                You'll receive an invoice with wire instructions within 24 hours. Once payment clears, your access is activated immediately.
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
                        You're in control. Cancel your subscription at any time. No contracts. No obligations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
