import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type AuthStep = 'email' | 'code';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { signIn, verifyCode } = useAuth();
    
    const [step, setStep] = useState<AuthStep>('email');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [authType, setAuthType] = useState<'login' | 'signup'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequestCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await signIn(email, name || undefined);
            setAuthType(result.type as 'login' | 'signup');
            setStep('code');
        } catch (err: any) {
            setError(err.message || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const success = await verifyCode(email, code, name || undefined);
            if (success) {
                // Redirect based on auth type
                if (authType === 'signup') {
                    navigate('/onboarding');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Invalid code');
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setCode(value);
    };

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-serif text-4xl font-black text-black dark:text-white tracking-tighter">
                        Billionaireable
                    </h1>
                    <p className="font-serif text-gray-500 dark:text-gray-400 mt-2">
                        The path to a billion
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-soft-xl border border-gray-200 dark:border-gray-800 p-8">
                    {step === 'email' ? (
                        <>
                            <h2 className="font-sans text-2xl font-bold text-black dark:text-white mb-2">
                                Get Started
                            </h2>
                            <p className="font-serif text-gray-500 dark:text-gray-400 mb-6">
                                Enter your email to continue
                            </p>

                            <form onSubmit={handleRequestCode} className="space-y-4">
                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-sans text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Name <span className="text-gray-300">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-sans text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 font-mono text-sm">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-art-green/10 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-art-green" />
                                </div>
                                <div>
                                    <h2 className="font-sans text-xl font-bold text-black dark:text-white">
                                        Check your email
                                    </h2>
                                    <p className="font-mono text-xs text-gray-500">
                                        {email}
                                    </p>
                                </div>
                            </div>

                            <p className="font-serif text-gray-500 dark:text-gray-400 mb-6">
                                We sent you a 6-digit code. Enter it below.
                            </p>

                            <form onSubmit={handleVerifyCode} className="space-y-4">
                                <div>
                                    <label className="block font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={handleCodeChange}
                                        placeholder="000000"
                                        required
                                        maxLength={6}
                                        className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-2xl text-center text-black dark:text-white placeholder-gray-300 tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                        autoFocus
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 font-mono text-sm">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || code.length !== 6}
                                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-sm font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Verify & Continue
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep('email');
                                        setCode('');
                                        setError(null);
                                    }}
                                    className="w-full py-3 text-gray-500 font-mono text-sm hover:text-black dark:hover:text-white transition-colors"
                                >
                                    ← Use different email
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-6 font-serif text-sm text-gray-400">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="underline hover:text-black dark:hover:text-white">
                        Terms
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="underline hover:text-black dark:hover:text-white">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Auth;

