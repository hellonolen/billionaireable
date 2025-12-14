import React from 'react';
import { BarChart3, TrendingUp, Activity, DollarSign, Users, Zap } from 'lucide-react';

const CommandCenter: React.FC = () => {
    return (
        <div className="min-h-screen animate-fade-in pt-24 pb-12 px-4 sm:px-6 lg:px-12">
            <div className="max-w-[1800px] mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-4">
                        COMMAND CENTER
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">
                        "Your single source of truth."
                    </p>
                </div>

                {/* 6 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* BioSelf */}
                    <div className="bg-art-orange rounded-[32px] p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Bio-Self</h2>
                            <Activity className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white/60 text-sm mb-1">HRV</p>
                                <p className="text-4xl font-black">82</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm mb-1">Sleep Score</p>
                                <p className="text-4xl font-black">91%</p>
                            </div>
                        </div>
                    </div>

                    {/* Wealth */}
                    <div className="bg-art-green rounded-[32px] p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Wealth</h2>
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Net Worth</p>
                                <p className="text-4xl font-black">$4.2B</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm mb-1">YTD Return</p>
                                <p className="text-4xl font-black">+18.4%</p>
                            </div>
                        </div>
                    </div>

                    {/* Markets */}
                    <div className="bg-art-blue rounded-[32px] p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Markets</h2>
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white/60 text-sm mb-1">S&P 500</p>
                                <p className="text-4xl font-black">4,850</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm mb-1">BTC</p>
                                <p className="text-4xl font-black">$68.5K</p>
                            </div>
                        </div>
                    </div>

                    {/* Intelligence */}
                    <div className="bg-art-yellow rounded-[32px] p-8 text-black shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Intelligence</h2>
                            <Zap className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-black/60 text-sm mb-1">Latest Episode</p>
                                <p className="text-lg font-bold">Sovereign Individual 2.0</p>
                            </div>
                        </div>
                    </div>

                    {/* Strategy */}
                    <div className="bg-black rounded-[32px] p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Strategy</h2>
                            <BarChart3 className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Active Goals</p>
                                <p className="text-4xl font-black">7</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm mb-1">Completion</p>
                                <p className="text-4xl font-black">64%</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white border-2 border-black rounded-[32px] p-8 text-black shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-sans text-2xl font-bold uppercase">Skills</h2>
                            <Users className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-black/60 text-sm mb-1">Mastery</p>
                                <p className="text-4xl font-black">61%</p>
                            </div>
                            <div>
                                <p className="text-black/60 text-sm mb-1">Active</p>
                                <p className="text-4xl font-black">5/12</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommandCenter;
