import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';
import { Activity, TrendingUp, Heart, Brain, Zap, Calendar } from 'lucide-react';
import CardModal from '../components/CardModal';

// Existing Health Cards - ALL ORANGE
const HEALTH_CARDS: CardData[] = [
    {
        id: 'sleep-optimization',
        title: 'Sleep Optimization',
        type: 'curriculum',
        description: 'Recovery Engine',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Quality', value: '94%' },
            { label: 'Duration', value: '7h 42m', trend: 'up' },
        ],
    },
    {
        id: 'bio-availability',
        title: 'Bio-Availability',
        type: 'curriculum',
        description: 'Nutrient Stack',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Status', value: 'Optimal' },
            { label: 'Adherence', value: '100%' },
        ],
    },
    {
        id: 'deep-work',
        title: 'Deep Work',
        type: 'curriculum',
        description: 'Cognitive Output',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Flow State', value: '4.5h' },
            { label: 'Focus', value: 'High', trend: 'up' },
        ],
    },
    {
        id: 'hydration',
        title: 'Hydration Protocol',
        type: 'curriculum',
        description: 'Cellular Health',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Intake', value: '3.2L' },
            { label: 'Electrolytes', value: 'Balanced' },
        ],
    },
    {
        id: 'fitness',
        title: 'Physical Training',
        type: 'curriculum',
        description: 'Strength & Conditioning',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Strain', value: '14.2' },
            { label: 'Recovery', value: '98%' },
        ],
    },
    {
        id: 'meditation',
        title: 'Mindfulness',
        type: 'curriculum',
        description: 'Mental Clarity',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Session', value: '20m' },
            { label: 'Streak', value: '42d' },
        ],
    }
];

// Longevity Biomarkers - Evidence-Based Metrics
const LONGEVITY_BIOMARKERS = [
    {
        id: 'vo2-max',
        name: 'VO2 Max',
        value: 52,
        unit: 'mL/kg/min',
        optimal: '50-60',
        category: 'Cardiovascular',
        trend: 'up',
        source: 'Apple Watch',
    },
    {
        id: 'grip-strength',
        name: 'Grip Strength',
        value: 48,
        unit: 'kg',
        optimal: '45-55',
        category: 'Muscular',
        trend: 'up',
        source: 'Manual Entry',
    },
    {
        id: 'hrv',
        name: 'HRV',
        value: 78,
        unit: 'ms',
        optimal: '60-100',
        category: 'Autonomic',
        trend: 'neutral',
        source: 'Oura Ring',
    },
    {
        id: 'fasting-glucose',
        name: 'Fasting Glucose',
        value: 92,
        unit: 'mg/dL',
        optimal: '70-100',
        category: 'Metabolic',
        trend: 'neutral',
        source: 'Lab Test',
    },
    {
        id: 'lean-mass',
        name: 'Lean Muscle Mass',
        value: 72,
        unit: '%',
        optimal: '70-80',
        category: 'Composition',
        trend: 'up',
        source: 'DEXA Scan',
    },
    {
        id: 'sleep-efficiency',
        name: 'Sleep Efficiency',
        value: 89,
        unit: '%',
        optimal: '85-95',
        category: 'Recovery',
        trend: 'up',
        source: 'Whoop',
    },
];

const BioSelf: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<any>(null);

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        BIO-SELF
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Consistency is the only currency that matters."</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-black/20 px-6 py-3 rounded-full shadow-soft-xl">
                    <div className="w-2 h-2 rounded-full bg-art-orange animate-pulse"></div>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">System Operational</span>
                </div>
            </div>

            {/* Health Cards Grid */}
            <div className="mb-20">
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Daily Systems</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {HEALTH_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard
                                data={card}
                                onClick={() => setSelectedCard(card)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Longevity Biomarkers Section */}
            <div>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="font-sans text-3xl font-black uppercase">Longevity Biomarkers</h2>
                        <p className="font-mono text-sm text-gray-400 mt-2">Evidence-based metrics for peak healthspan</p>
                    </div>
                    <button className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Sync Devices
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LONGEVITY_BIOMARKERS.map((biomarker) => (
                        <div
                            key={biomarker.id}
                            onClick={() => setSelectedCard({
                                id: biomarker.id,
                                title: biomarker.name,
                                type: 'biomarker',
                                description: biomarker.category,
                                colorTheme: 'orange',
                                previewMetrics: [
                                    { label: 'Value', value: String(biomarker.value) },
                                    { label: 'Optimal', value: biomarker.optimal }
                                ]
                            })}
                            className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-black/20 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-sans text-xl font-bold uppercase mb-1">{biomarker.name}</h3>
                                    <p className="font-mono text-xs text-gray-400 uppercase">{biomarker.category}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${biomarker.trend === 'up' ? 'bg-art-green/10 text-art-green' :
                                    biomarker.trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                    <TrendingUp className={`w-5 h-5 ${biomarker.trend === 'down' ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Value */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="font-serif text-5xl font-black text-black">{biomarker.value}</span>
                                    <span className="font-mono text-sm text-gray-400">{biomarker.unit}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-gray-400 uppercase">Optimal:</span>
                                    <span className="font-mono text-xs font-bold text-black">{biomarker.optimal} {biomarker.unit}</span>
                                </div>
                            </div>

                            {/* Source */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs text-gray-400 uppercase">Source</span>
                                    <span className="font-mono text-xs font-bold text-black">{biomarker.source}</span>
                                </div>
                            </div>

                            {/* Mini Sparkline (visual placeholder) */}
                            <div className="mt-4 h-8 flex items-end gap-1">
                                {[40, 50, 45, 55, 60, 58, biomarker.value].map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 bg-art-orange/20 rounded-t"
                                        style={{ height: `${(val / 100) * 100}%` }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card Modal */}
            {selectedCard && (
                <CardModal
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}
        </div>
    );
};

export default BioSelf;