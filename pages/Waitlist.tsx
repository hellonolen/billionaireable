import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

const Waitlist: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alreadyExists, setAlreadyExists] = useState(false);

    const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await addToWaitlist({
                email,
                name: name || undefined,
                source: 'website',
            });

            if (result.success) {
                setSubmitted(true);
            } else {
                setAlreadyExists(true);
                setSubmitted(true);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-160px)] bg-art-offwhite dark:bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="max-w-2xl w-full text-center relative z-10">
                <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-black dark:text-white">
                    BILLIONAIREABLE.
                </h1>
                <p className="font-serif text-xl md:text-2xl text-gray-400 mb-12">
                    "The second billion is inevitable. The first one is engineered."
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="YOUR NAME (OPTIONAL)"
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-8 py-4 font-mono text-sm text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-art-orange focus:ring-2 focus:ring-art-orange/20 transition-all text-center uppercase tracking-widest shadow-soft-xl"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER YOUR EMAIL"
                                required
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-8 py-4 font-mono text-sm text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-art-orange focus:ring-2 focus:ring-art-orange/20 transition-all text-center uppercase tracking-widest shadow-soft-xl"
                            />
                            {error && (
                                <div className="flex items-center gap-2 justify-center text-red-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="font-mono text-xs">{error}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest hover:bg-art-orange hover:text-white transition-all flex items-center justify-center gap-2 group shadow-lg disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : (
                                    <>
                                        Request Access
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="mt-6 font-mono text-xs text-gray-400 uppercase tracking-widest">
                            Limited spots available for Q4 2025
                        </p>
                    </form>
                ) : (
                    <div className="animate-fade-in bg-white dark:bg-gray-900 p-12 rounded-[32px] shadow-soft-xl border border-gray-100 dark:border-gray-800">
                        <div className={`w-16 h-16 ${alreadyExists ? 'bg-art-orange' : 'bg-art-green'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                            <Check className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-sans text-2xl font-bold uppercase mb-2 text-black dark:text-white">
                            {alreadyExists ? "You're Already Listed" : "Access Requested"}
                        </h3>
                        <p className="font-serif text-gray-500 dark:text-gray-400">
                            {alreadyExists
                                ? "You're already on the waitlist. We'll notify you when your spot opens."
                                : "We will notify you when your spot opens up."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Waitlist;
