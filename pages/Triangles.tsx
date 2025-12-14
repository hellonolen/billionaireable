import React from 'react';
import { DollarSign, Heart, Zap } from 'lucide-react';

const Triangles: React.FC = () => {
    // Mock user scores (0-100 for each axis)
    const capitalScore = 78; // Net worth, liquidity, deployment
    const vitalityScore = 85; // Bio-age, energy, longevity
    const leverageScore = 62; // Automation, systems, team

    const overallScore = Math.round((capitalScore + vitalityScore + leverageScore) / 3);

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        TRIANGLES
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Capital × Vitality × Leverage = Billionaireable"</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-soft-xl">
                    <div className="w-2 h-2 rounded-full bg-art-orange animate-pulse"></div>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">
                        {overallScore}% Optimized
                    </span>
                </div>
            </div>

            {/* Triangle Visualization */}
            <div className="mb-12 bg-white rounded-[32px] p-12 shadow-soft-xl border border-gray-100">
                <div className="max-w-2xl mx-auto">
                    {/* SVG Triangle */}
                    <svg viewBox="0 0 400 350" className="w-full mb-8">
                        {/* Triangle outline */}
                        <polygon
                            points="200,50 50,300 350,300"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="2"
                        />

                        {/* Triangle fill (user's position) */}
                        <polygon
                            points="200,50 50,300 350,300"
                            fill="url(#triangleGradient)"
                            opacity="0.1"
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF6B35" />
                                <stop offset="50%" stopColor="#7FBA00" />
                                <stop offset="100%" stopColor="#4A90E2" />
                            </linearGradient>
                        </defs>

                        {/* Axis labels */}
                        <text x="200" y="35" textAnchor="middle" className="text-sm font-mono font-bold uppercase fill-current text-gray-600">
                            Leverage
                        </text>
                        <text x="30" y="320" textAnchor="middle" className="text-sm font-mono font-bold uppercase fill-current text-gray-600">
                            Capital
                        </text>
                        <text x="370" y="320" textAnchor="middle" className="text-sm font-mono font-bold uppercase fill-current text-gray-600">
                            Vitality
                        </text>

                        {/* User position marker */}
                        <circle cx="200" cy="175" r="10" fill="#FF6B35" stroke="white" strokeWidth="3" />
                    </svg>

                    <p className="text-center font-mono text-sm text-gray-400 uppercase">
                        Your current position in the triangle (calculated from all metrics)
                    </p>
                </div>
            </div>

            {/* The Three Axes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Capital */}
                <div className="bg-gradient-to-br from-art-green to-green-600 rounded-[32px] p-8 shadow-soft-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
                            <DollarSign className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h3 className="font-sans text-3xl font-black uppercase text-black">Capital</h3>
                            <p className="font-mono text-sm text-black/70">Money Axis</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-serif text-6xl font-black text-black">{capitalScore}</span>
                            <span className="font-mono text-2xl text-black">/100</span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-3">
                            <div
                                className="bg-black h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${capitalScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Net Worth</span>
                            <span className="font-sans text-lg font-bold text-black">$42.3M</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Liquidity</span>
                            <span className="font-sans text-lg font-bold text-black">$8.1M (19%)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Deployment Speed</span>
                            <span className="font-sans text-lg font-bold text-black">48hrs</span>
                        </div>
                    </div>
                </div>

                {/* Vitality */}
                <div className="bg-gradient-to-br from-art-orange to-orange-600 rounded-[32px] p-8 shadow-soft-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
                            <Heart className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h3 className="font-sans text-3xl font-black uppercase text-black">Vitality</h3>
                            <p className="font-mono text-sm text-black/70">Health Axis</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-serif text-6xl font-black text-black">{vitalityScore}</span>
                            <span className="font-mono text-2xl text-black">/100</span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-3">
                            <div
                                className="bg-black h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${vitalityScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Biological Age</span>
                            <span className="font-sans text-lg font-bold text-black">38 (-8y)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">HRV Score</span>
                            <span className="font-sans text-lg font-bold text-black">78 ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Energy Level</span>
                            <span className="font-sans text-lg font-bold text-black">91%</span>
                        </div>
                    </div>
                </div>

                {/* Leverage */}
                <div className="bg-gradient-to-br from-art-blue to-blue-600 rounded-[32px] p-8 shadow-soft-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
                            <Zap className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h3 className="font-sans text-3xl font-black uppercase text-black">Leverage</h3>
                            <p className="font-mono text-sm text-black/70">Systems Axis</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-serif text-6xl font-black text-black">{leverageScore}</span>
                            <span className="font-mono text-2xl text-black">/100</span>
                        </div>
                        <div className="w-full bg-black/10 rounded-full h-3">
                            <div
                                className="bg-black h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${leverageScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Automation Level</span>
                            <span className="font-sans text-lg font-bold text-black">67%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Team Size</span>
                            <span className="font-sans text-lg font-bold text-black">14 people</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs uppercase text-black/70">Weekly Hours</span>
                            <span className="font-sans text-lg font-bold text-black">32hrs (-18)</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Triangles;
