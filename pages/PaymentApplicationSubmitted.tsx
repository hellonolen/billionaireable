import React from 'react';
import { CheckCircle, Mail, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentApplicationSubmitted: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl p-12 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-art-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-art-green" />
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl font-black text-black dark:text-white mb-4">
                    Application Received
                </h1>

                {/* Message */}
                <p className="font-serif text-xl text-gray-500 dark:text-gray-400 mb-8">
                    Your application for the Billionaireable program has been submitted.
                </p>

                {/* What happens next */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8 text-left">
                    <h2 className="font-sans font-bold text-black dark:text-white mb-4">What happens next:</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="w-4 h-4 text-art-blue" />
                            </div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Check your email</p>
                                <p className="font-serif text-sm text-gray-500 dark:text-gray-400">
                                    You'll receive an invoice with wire transfer details within 24 hours.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-4 h-4 text-art-orange" />
                            </div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Complete payment</p>
                                <p className="font-serif text-sm text-gray-500 dark:text-gray-400">
                                    Wire transfer typically clears within 1-3 business days.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-art-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-art-green" />
                            </div>
                            <div>
                                <p className="font-sans font-bold text-black dark:text-white">Access activated</p>
                                <p className="font-serif text-sm text-gray-500 dark:text-gray-400">
                                    Once payment clears, your full access is activated immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* While you wait */}
                <div className="mb-8">
                    <p className="font-serif text-gray-500 dark:text-gray-400 mb-4">
                        While you wait, start with Pillar 1—it's free.
                    </p>
                    <button
                        onClick={() => navigate('/skills/reality-distortion/1')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase transition-all hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                        Start Pillar 1
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Dashboard Link */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="font-mono text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    Go to Dashboard →
                </button>
            </div>
        </div>
    );
};

export default PaymentApplicationSubmitted;

