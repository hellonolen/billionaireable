import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Waitlist: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-art-offwhite flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="max-w-2xl w-full text-center relative z-10">
                <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-black">
                    BILLIONAIRE<br />ABLE.
                </h1>
                <p className="font-serif text-xl md:text-2xl text-gray-400 mb-12">
                    "The second billion is inevitable. The first one is engineered."
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ENTER YOUR EMAIL"
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-full px-8 py-4 font-mono text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-art-orange focus:ring-2 focus:ring-art-orange/20 transition-all text-center uppercase tracking-widest shadow-soft-xl"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white rounded-full px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-art-orange transition-all flex items-center justify-center gap-2 group shadow-lg"
                            >
                                Request Access
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <p className="mt-6 font-mono text-xs text-gray-400 uppercase tracking-widest">
                            Limited spots available for Q4 2025
                        </p>
                    </form>
                ) : (
                    <div className="animate-fade-in bg-white p-12 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <div className="w-16 h-16 bg-art-green rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-sans text-2xl font-bold uppercase mb-2 text-black">Access Requested</h3>
                        <p className="font-serif text-gray-500">
                            We will notify you when your spot opens up.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Waitlist;
