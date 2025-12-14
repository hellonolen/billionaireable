import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState('');
    const fullText = "I want to build generational wealth...";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-art-offwhite dark:bg-gray-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-art-orange rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-art-blue rounded-full blur-3xl" />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full mb-8"
                        >
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">Your Framework for Why the F Not</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9] mb-8"
                        >
                            Become
                            <br />
                            <span className="text-art-orange">Billionaireable.</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-serif text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
                        >
                            Billionaireable learns your situation, builds your personalized strategy, and shows you exactly why the obstacles in your way don't have to stop you.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <button
                                onClick={() => navigate('/waitlist')}
                                className="group flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-widest hover:bg-art-orange dark:hover:bg-art-orange dark:hover:text-white transition-all shadow-2xl"
                            >
                                Start Your Transformation
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/pricing')}
                                className="font-mono text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                View Pricing →
                            </button>
                        </motion.div>
                    </div>

                    {/* Chat Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-20 max-w-3xl mx-auto"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-black text-white p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-art-orange flex items-center justify-center">
                                    <span className="font-serif text-xl font-black text-black">B</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg">Billionaireable</h3>
                                    <p className="font-mono text-xs text-gray-400 uppercase">Your Strategic Advisor</p>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="p-8 space-y-6 bg-gray-50 dark:bg-gray-900/50 min-h-[200px]">
                                {/* User Message */}
                                <div className="flex justify-end">
                                    <div className="bg-black text-white px-6 py-4 rounded-2xl rounded-tr-none max-w-md">
                                        <p className="font-medium">{typedText}<span className="animate-pulse">|</span></p>
                                    </div>
                                </div>

                                {/* Response */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 2 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 max-w-md">
                                        <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                                            Let's build your path. First, I need to understand where you are now. What's your current net worth and primary income source?
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            I'll analyze your situation across all 12 pillars and create a personalized 12-month roadmap.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-black text-white">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            How It Works
                        </h2>
                        <p className="font-serif text-xl text-gray-400 max-w-2xl mx-auto">
                            Not a course. Not a community. A year-long transformation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Tell It Everything',
                                desc: 'Your net worth, income, goals, fears, constraints. Billionaireable builds a complete picture of where you are.',
                                color: 'bg-art-orange'
                            },
                            {
                                step: '02',
                                title: 'Get Your Path',
                                desc: 'A personalized 12-month strategy across all pillars of wealth building. Updated weekly as you progress.',
                                color: 'bg-art-green'
                            },
                            {
                                step: '03',
                                title: 'Execute & Adapt',
                                desc: 'Daily guidance, accountability, course corrections. Billionaireable learns what works for you and optimizes.',
                                color: 'bg-art-blue'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                                    <span className="font-mono text-2xl font-black text-black">{item.step}</span>
                                </div>
                                <h3 className="font-sans text-2xl font-black mb-3">{item.title}</h3>
                                <p className="text-gray-400 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The 12 Pillars */}
            <section className="py-24 bg-art-offwhite dark:bg-gray-950">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter mb-4">
                            The 12 Pillars
                        </h2>
                        <p className="font-serif text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            The complete framework. Your path forward.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Reality Distortion', color: 'bg-art-orange' },
                            { title: 'Liquidity & Allocation', color: 'bg-art-green' },
                            { title: 'The Holding Co', color: 'bg-art-blue' },
                            { title: 'Time Arbitrage', color: 'bg-art-orange' },
                            { title: 'Bio-Availability', color: 'bg-art-green' },
                            { title: 'Political Capital', color: 'bg-art-blue' },
                            { title: 'The Syndicate', color: 'bg-art-orange' },
                            { title: 'Family Office', color: 'bg-art-green' },
                            { title: 'Dynasty Design', color: 'bg-art-blue' },
                            { title: 'Sovereign Flags', color: 'bg-art-orange' },
                            { title: 'Asymmetric Bets', color: 'bg-art-green' },
                            { title: 'Ascendance', color: 'bg-art-blue' },
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className={`${pillar.color} p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform`}
                                onClick={() => navigate('/dashboard')}
                            >
                                <h3 className="font-sans text-sm md:text-base font-black text-black uppercase tracking-tight">
                                    {pillar.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-art-orange transition-colors"
                        >
                            Explore the Framework
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* The Promise */}
            <section className="py-24 bg-black text-white">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tighter mb-8">
                            "You already know what you want.
                            <br />
                            <span className="text-art-orange">Now remove what's stopping you."</span>
                        </h2>
                        <p className="font-serif text-xl text-gray-400 mb-12">
                            Most people fail not from lack of effort, but from lack of strategy. Billionaireable is the strategy — personalized to you, relentless in execution.
                        </p>
                        <button
                            onClick={() => navigate('/waitlist')}
                            className="group flex items-center gap-3 mx-auto bg-art-orange text-black px-8 py-4 rounded-full font-mono text-sm font-bold uppercase tracking-widest hover:bg-art-green transition-all shadow-2xl"
                        >
                            Become Billionaireable
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-art-offwhite dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '12', label: 'Pillars' },
                            { value: '365', label: 'Days' },
                            { value: '24/7', label: 'Access' },
                            { value: '1', label: 'Goal' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="font-sans text-4xl md:text-5xl font-black text-black dark:text-white">{stat.value}</p>
                                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
