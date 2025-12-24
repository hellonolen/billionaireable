import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Circle } from 'lucide-react';

interface Decision {
    id: string;
    date: string;
    title: string;
    category: 'Capital' | 'People' | 'Strategy' | 'Time';
    decision: string;
    outcome: 'positive' | 'negative' | 'neutral' | 'pending';
    impact: string;
}

const MOCK_DECISIONS: Decision[] = [
    {
        id: '1',
        date: '2025-11-20',
        title: 'Exited Series C Startup',
        category: 'Capital',
        decision: 'Sold 40% equity stake in SaaS company for $2.3M',
        outcome: 'positive',
        impact: '+$2.3M liquidity, -$800K opportunity cost',
    },
    {
        id: '2',
        date: '2025-11-15',
        title: 'Hired COO',
        category: 'People',
        decision: 'Brought in external COO at $350K/year + equity',
        outcome: 'pending',
        impact: 'Delegation of operations, time reclamation',
    },
    {
        id: '3',
        date: '2025-11-10',
        title: 'Rejected Acquisition Offer',
        category: 'Strategy',
        decision: 'Declined $15M acquisition from PE firm',
        outcome: 'neutral',
        impact: 'Maintained control, delayed liquidity event',
    },
    {
        id: '4',
        date: '2025-11-05',
        title: 'Blocked Calendar Mornings',
        category: 'Time',
        decision: 'No meetings before 11am, deep work only',
        outcome: 'positive',
        impact: '+15 hours/week deep work, -3 deal opportunities',
    },
];

const Decisions: React.FC = () => {
    const [decisions] = useState<Decision[]>(MOCK_DECISIONS);

    const getOutcomeIcon = (outcome: string) => {
        switch (outcome) {
            case 'positive':
                return <TrendingUp className="w-5 h-5 text-art-green" />;
            case 'negative':
                return <TrendingDown className="w-5 h-5 text-red-500" />;
            case 'pending':
                return <Circle className="w-5 h-5 text-art-yellow" />;
            default:
                return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Capital':
                return 'bg-art-green';
            case 'People':
                return 'bg-art-blue';
            case 'Strategy':
                return 'bg-art-orange';
            case 'Time':
                return 'bg-art-yellow';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        DECISIONS
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Identity is forged in decisions, not intentions."</p>
                </div>
                <button className="bg-art-orange text-white px-8 py-4 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-800 transition-colors">
                    Log New Decision
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Decisions', value: decisions.length.toString(), color: 'orange' },
                    { label: 'Positive Outcomes', value: decisions.filter(d => d.outcome === 'positive').length.toString(), color: 'green' },
                    { label: 'Pending Review', value: decisions.filter(d => d.outcome === 'pending').length.toString(), color: 'yellow' },
                    { label: 'Success Rate', value: '75%', color: 'blue' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-[32px] p-6 shadow-soft-xl border border-gray-100">
                        <p className="font-mono text-xs text-gray-400 uppercase mb-2">{stat.label}</p>
                        <p className={`font-serif text-5xl font-black text-art-${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Decision Timeline */}
            <div className="space-y-6">
                {decisions.map((decision) => (
                    <div
                        key={decision.id}
                        className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                {getOutcomeIcon(decision.outcome)}
                                <div>
                                    <h3 className="font-sans text-2xl font-bold">{decision.title}</h3>
                                    <p className="font-mono text-xs text-gray-400 uppercase">{decision.date}</p>
                                </div>
                            </div>
                            <span className={`${getCategoryColor(decision.category)} text-black px-4 py-2 rounded-full font-mono text-xs font-bold uppercase`}>
                                {decision.category}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="font-serif text-lg text-gray-700 mb-2">{decision.decision}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="font-mono text-sm text-gray-600">
                                <span className="font-bold uppercase text-black">Impact:</span> {decision.impact}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Decisions;
