import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';

// Generational Milestones as Cards
const MILESTONE_CARDS: CardData[] = [
    {
        id: 'foundation-2025',
        title: 'Foundation',
        type: 'curriculum',
        description: '2025 - 2035',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Phase', value: 'Active' },
            { label: 'Assets', value: '$42M' },
        ],
    },
    {
        id: 'succession-2035',
        title: 'Succession',
        type: 'curriculum',
        description: '2035 - 2055',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Phase', value: 'Planned' },
            { label: 'Target', value: '$250M' },
        ],
    },
    {
        id: 'continuity-2055',
        title: 'Continuity',
        type: 'curriculum',
        description: '2055 - 2095',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Phase', value: 'Mapped' },
            { label: 'Generation', value: 'Gen 3' },
        ],
    },
    {
        id: 'perpetuity-2095',
        title: 'Perpetuity',
        type: 'curriculum',
        description: '2095+',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Phase', value: 'Designed' },
            { label: 'Endowment', value: '$1B+' },
        ],
    },
];

// Trust Structures as Cards
const TRUST_CARDS: CardData[] = [
    {
        id: 'dynasty-trust',
        title: 'Dynasty Trust',
        type: 'curriculum',
        description: 'Irrevocable',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Assets', value: '$2.1B' },
            { label: 'Duration', value: '1000y' },
        ],
    },
    {
        id: 'charitable-trust',
        title: 'Charitable Trust',
        type: 'curriculum',
        description: 'Remainder',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Value', value: '$450M' },
            { label: 'Payout', value: '5%/yr' },
        ],
    },
    {
        id: 'education-trust',
        title: 'Education Trust',
        type: 'curriculum',
        description: 'Generational',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Fund', value: '$180M' },
            { label: 'Heirs', value: '12' },
        ],
    },
];

const LegacyTimeline: React.FC = () => {
    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        LEGACY TIMELINE
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"100-year dynasty in motion"</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-soft-xl">
                    <div className="w-2 h-2 rounded-full bg-art-blue animate-pulse"></div>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">4 Generations</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                <div className="bg-white rounded-[32px] p-6 shadow-soft-xl border border-gray-100">
                    <p className="font-mono text-xs text-gray-400 uppercase mb-2">Generations</p>
                    <p className="font-serif text-5xl font-black">4</p>
                </div>
                <div className="bg-white rounded-[32px] p-6 shadow-soft-xl border border-gray-100">
                    <p className="font-mono text-xs text-gray-400 uppercase mb-2">Trust Assets</p>
                    <p className="font-serif text-5xl font-black">$2.7B</p>
                </div>
                <div className="bg-white rounded-[32px] p-6 shadow-soft-xl border border-gray-100">
                    <p className="font-mono text-xs text-gray-400 uppercase mb-2">Lifetime Giving</p>
                    <p className="font-serif text-5xl font-black">$890M</p>
                </div>
                <div className="bg-white rounded-[32px] p-6 shadow-soft-xl border border-gray-100">
                    <p className="font-mono text-xs text-gray-400 uppercase mb-2">Horizon</p>
                    <p className="font-serif text-5xl font-black">100y</p>
                </div>
            </div>

            {/* Milestone Timeline */}
            <div className="mb-20">
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Generational Milestones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MILESTONE_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard data={card} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Structures */}
            <div>
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Trust Structures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TRUST_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard data={card} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default LegacyTimeline;
