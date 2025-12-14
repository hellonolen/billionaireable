import React, { useState } from 'react';
import { Lock, TrendingUp, Building2, Palmtree, Image, Gem } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import CardModal from '../components/CardModal';
import { CardData } from '../types';

// Exclusive Off-Market Opportunities
const VAULT_CARDS: CardData[] = [
    {
        id: 'pre-ipo-1',
        title: 'Series D Allocation',
        type: 'curriculum',
        description: 'Infrastructure',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Valuation', value: '$8.5B' },
            { label: 'Min. Entry', value: '$5M' },
            { label: 'Status', value: 'Open' },
        ],
    },
    {
        id: 'art-1',
        title: 'Basquiat Fragment',
        type: 'curriculum',
        description: 'Blue Chip Art',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Est. Value', value: '$12M' },
            { label: 'Share Size', value: '$500K' },
            { label: 'Provenance', value: 'Verified' },
        ],
    },
    {
        id: 'island-1',
        title: 'Private Island',
        type: 'curriculum',
        description: 'Sovereign Territory',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Location', value: 'Bahamas' },
            { label: 'Acreage', value: '42' },
            { label: 'Price', value: '$28M' },
        ],
    },
    {
        id: 'block-1',
        title: 'Manhattan Block',
        type: 'curriculum',
        description: 'Trophy Real Estate',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'District', value: 'Tribeca' },
            { label: 'Yield', value: '4.2%' },
            { label: 'Cap Rate', value: 'Prime' },
        ],
    },
    {
        id: 'diamond-1',
        title: 'Uncut Diamond',
        type: 'curriculum',
        description: 'Rare Gemstone',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Carats', value: '45.2' },
            { label: 'Grade', value: 'D/FL' },
            { label: 'Origin', value: 'Botswana' },
        ],
    },
    {
        id: 'vintage-1',
        title: 'Vintage Allocation',
        type: 'curriculum',
        description: 'Bordeaux 1945',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Bottles', value: '12' },
            { label: 'Score', value: '100/100' },
            { label: 'Est.', value: '$180K' },
        ],
    },
];

const Vault: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        THE VAULT
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Access is the ultimate advantage."</p>
                </div>
                <div className="flex items-center gap-4 bg-black text-white px-6 py-3 rounded-full shadow-soft-xl">
                    <Lock className="w-4 h-4" />
                    <span className="font-mono text-sm font-bold uppercase tracking-widest">Invitation Only</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-12 bg-white border border-gray-100 rounded-[32px] p-12 shadow-soft-xl">
                <div className="max-w-3xl">
                    <h2 className="font-sans text-3xl font-black uppercase mb-4">Off-Market Opportunities</h2>
                    <p className="font-serif text-xl text-gray-600 leading-relaxed mb-6">
                        The Vault provides exclusive access to opportunities that never reach public markets. Pre-IPO allocations, trophy assets, and once-in-a-generation investments curated for those who understand the value of discretion.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-gray-50 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase">Pre-IPO</div>
                        <div className="bg-gray-50 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase">Blue Chip Art</div>
                        <div className="bg-gray-50 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase">Private Islands</div>
                        <div className="bg-gray-50 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase">Rare Gems</div>
                    </div>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VAULT_CARDS.map((card) => (
                    <div key={card.id} className="h-full">
                        <DashboardCard
                            data={card}
                            onClick={() => setSelectedCard(card)}
                        />
                    </div>
                ))}
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

export default Vault;
