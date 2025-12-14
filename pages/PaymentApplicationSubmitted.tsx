import React, { useEffect, useState } from 'react';
import { CheckCircle, Building2, ArrowRight, Copy, Clock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';

const PaymentApplicationSubmitted: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const applicationId = searchParams.get('id') as Id<"paymentApplications"> | null;
    const [copied, setCopied] = useState<string | null>(null);

    const application = useQuery(
        api.payments.getApplicationWithWireDetails,
        applicationId ? { applicationId } : "skip"
    );

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl p-12">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-art-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-art-green" />
                    </div>
                    <h1 className="font-serif text-4xl font-black text-black dark:text-white mb-4">
                        You're Almost In
                    </h1>
                    <p className="font-serif text-xl text-gray-500 dark:text-gray-400">
                        Complete the wire transfer below. Once payment clears, your access activates automatically.
                    </p>
                </div>

                {/* Wire Transfer Details */}
                {application?.wireDetails && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-6 h-6 text-art-blue" />
                            <h2 className="font-sans text-xl font-bold text-black dark:text-white">
                                Wire Transfer Details
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Amount */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border-2 border-art-orange">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Amount to Send</p>
                                    <p className="font-sans text-2xl font-black text-black dark:text-white">
                                        {formatCurrency(application.wireDetails.amount)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.amount.toString(), 'amount')}
                                    className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Bank Name */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Bank Name</p>
                                    <p className="font-sans font-bold text-black dark:text-white">
                                        {application.wireDetails.bankName}
                                    </p>
                                </div>
                            </div>

                            {/* Account Name */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Account Name</p>
                                    <p className="font-sans font-bold text-black dark:text-white">
                                        {application.wireDetails.accountName}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.accountName, 'accountName')}
                                    className={`p-2 transition-colors ${copied === 'accountName' ? 'text-art-green' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                >
                                    {copied === 'accountName' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Routing Number */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Routing Number</p>
                                    <p className="font-mono text-lg text-black dark:text-white">
                                        {application.wireDetails.routingNumber}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.routingNumber, 'routing')}
                                    className={`p-2 transition-colors ${copied === 'routing' ? 'text-art-green' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                >
                                    {copied === 'routing' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Account Number */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Account Number</p>
                                    <p className="font-mono text-lg text-black dark:text-white">
                                        {application.wireDetails.accountNumber}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.accountNumber, 'account')}
                                    className={`p-2 transition-colors ${copied === 'account' ? 'text-art-green' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                >
                                    {copied === 'account' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* SWIFT Code */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">SWIFT Code (International)</p>
                                    <p className="font-mono text-lg text-black dark:text-white">
                                        {application.wireDetails.swiftCode}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.swiftCode, 'swift')}
                                    className={`p-2 transition-colors ${copied === 'swift' ? 'text-art-green' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                >
                                    {copied === 'swift' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Reference - IMPORTANT */}
                            <div className="flex items-center justify-between p-4 bg-art-blue/10 border-2 border-art-blue rounded-xl">
                                <div>
                                    <p className="font-mono text-xs text-art-blue uppercase mb-1">Payment Reference (REQUIRED)</p>
                                    <p className="font-mono text-xl font-bold text-black dark:text-white">
                                        {application.wireDetails.reference}
                                    </p>
                                    <p className="font-serif text-xs text-gray-500 mt-1">
                                        Include this reference to auto-activate your account
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(application.wireDetails!.reference, 'reference')}
                                    className={`p-2 transition-colors ${copied === 'reference' ? 'text-art-green' : 'text-art-blue hover:text-black dark:hover:text-white'}`}
                                >
                                    {copied === 'reference' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* What happens next */}
                <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-6 mb-8 text-white">
                    <h3 className="font-sans font-bold mb-4">What happens next:</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="font-mono text-xs">1</span>
                            </div>
                            <p className="font-serif text-sm text-gray-300">
                                Complete your wire transfer using the details above
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="font-mono text-xs">2</span>
                            </div>
                            <p className="font-serif text-sm text-gray-300">
                                Include the payment reference—this links your payment to your account
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-art-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-3 h-3" />
                            </div>
                            <p className="font-serif text-sm text-white">
                                <strong>Your access activates automatically</strong> once payment clears (1-3 business days)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tier Info */}
                {application && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-8">
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase">Your Plan</p>
                            <p className="font-sans font-bold text-black dark:text-white capitalize">
                                {application.tier} • {application.billingCycle}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-art-orange">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase">Awaiting Payment</span>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                    <p className="font-serif text-center text-gray-500 dark:text-gray-400">
                        While you wait, start with the free content:
                    </p>
                    <button
                        onClick={() => navigate('/skills/reality-distortion/1')}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                        Start Pillar 1 Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 text-gray-500 font-mono text-sm hover:text-black dark:hover:text-white transition-colors"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentApplicationSubmitted;
