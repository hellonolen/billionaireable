import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowRight, MessageSquare } from 'lucide-react';

const PaymentCanceled: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Icon */}
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle className="w-12 h-12 text-gray-400" />
                </div>

                <h1 className="font-sans text-4xl md:text-5xl font-black text-black dark:text-white mb-6">
                    Not ready yet.
                </h1>
                
                <p className="font-serif text-xl text-gray-600 dark:text-gray-400 mb-4">
                    That's fine. The path will be here when you are.
                </p>
                
                <p className="font-serif text-lg text-gray-500 dark:text-gray-500 mb-12">
                    In the meantime, you can still access Pillar 1 for free and talk to Billionaireable.
                </p>

                {/* Options */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800 mb-8">
                    <h2 className="font-mono text-xs font-bold uppercase text-gray-400 mb-6">What You Can Do Now</h2>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/skills/reality-distortion')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-left">
                                <p className="font-sans font-bold text-black dark:text-white">Start Pillar 1 Free</p>
                                <p className="font-serif text-sm text-gray-500">Reality Distortion - Vision Architecture</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="text-left">
                                <p className="font-sans font-bold text-black dark:text-white">Talk to Billionaireable</p>
                                <p className="font-serif text-sm text-gray-500">Click the B button on any page</p>
                            </div>
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Return to pricing */}
                <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center gap-2 font-mono text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    View plans again
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PaymentCanceled;

