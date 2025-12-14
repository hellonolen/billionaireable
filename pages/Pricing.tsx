import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
    return (
        <div className="min-h-screen bg-art-offwhite py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter mb-6">
                        THE ACCESS
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">
                        "The price of entry is trivial compared to the cost of ignorance."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Standard Membership */}
                    <div className="bg-white p-12 border border-gray-100 shadow-soft-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Membership</h3>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="font-serif text-6xl font-black text-black">$197</span>
                            <span className="font-mono text-sm text-gray-400">/month</span>
                        </div>

                        <ul className="space-y-4 mb-12">
                            {['Market Intelligence', 'Daily Briefings', 'Community Access', 'Basic Training Modules'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-black" />
                                    </div>
                                    <span className="font-sans text-sm font-bold text-gray-600">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="https://buy.stripe.com/test_1" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors text-center">
                            Subscribe Now
                        </a>
                    </div>

                    {/* Ascendance - Premium */}
                    <div className="bg-white p-12 shadow-hard relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border-2 border-art-orange">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-art-orange to-art-yellow"></div>

                        <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-art-orange mb-4">Ascendance</h3>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="font-serif text-6xl font-black text-black">$997</span>
                            <span className="font-mono text-sm text-gray-500">/month</span>
                        </div>

                        <ul className="space-y-4 mb-12 relative z-10">
                            {[
                                'All Membership Features',
                                'The 12-Card Curriculum',
                                'Private Deal Flow',
                                'Weekly Strategy Calls',
                                'Family Office Templates',
                                'Direct Access to Principals'
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-art-orange/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-art-orange" />
                                    </div>
                                    <span className="font-sans text-sm font-bold text-gray-800">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="https://buy.stripe.com/test_2" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-gradient-to-r from-art-orange to-art-yellow text-black font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg relative z-10 text-center">
                            Apply for Access
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
