import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import CardModal from '../components/CardModal';
import { CardData } from '../types';
import { MOCK_MARKETS } from '../constants';

const WEALTH_CARDS: CardData[] = [
    {
        id: 'net-worth',
        title: 'Net Worth',
        type: 'curriculum',
        description: 'Total Assets',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Value', value: '$4.2B', trend: 'up' },
            { label: 'Change', value: '+2.4%' }
        ],
    },
    {
        id: 'liquid-assets',
        title: 'Liquid Assets',
        type: 'curriculum',
        description: 'Cash & Equivalents',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Value', value: '$840M' },
            { label: 'Allocation', value: '20%' }
        ],
    },
    {
        id: 'private-equity',
        title: 'Private Equity',
        type: 'curriculum',
        description: 'PE Holdings',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Value', value: '$2.1B' },
            { label: 'Allocation', value: '50%' }
        ],
    },
    {
        id: 'real-estate',
        title: 'Real Estate',
        type: 'curriculum',
        description: 'Property Portfolio',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Value', value: '$950M' },
            { label: 'Allocation', value: '22.6%' }
        ],
    },
    {
        id: 'crypto',
        title: 'Crypto',
        type: 'curriculum',
        description: 'Digital Assets',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Value', value: '$310M' },
            { label: 'Allocation', value: '7.4%' }
        ],
    },
    {
        id: 'cash-flow',
        title: 'Monthly Cash Flow',
        type: 'curriculum',
        description: 'Net Income',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Income', value: '$8.2M', trend: 'up' },
            { label: 'Expenses', value: '$1.8M' }
        ],
    },
    {
        id: 'roi',
        title: 'ROI',
        type: 'curriculum',
        description: 'Annual Return',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'YTD', value: '+18.4%', trend: 'up' },
            { label: 'Target', value: '15%' }
        ],
    },
    {
        id: 'tax-efficiency',
        title: 'Tax Efficiency',
        type: 'curriculum',
        description: 'Optimization',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Rate', value: '12.3%' },
            { label: 'Saved', value: '$42M' }
        ],
    },
];

const Wealth: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

    return (
        <div className="min-h-screen animate-fade-in">
            {/* Live Ticker Marquee */}
            <div className="bg-black text-white overflow-hidden py-4 border-b border-white/10 shadow-soft-xl mb-12 relative z-10">
                <div className="whitespace-nowrap animate-marquee flex gap-12 items-center">
                    {MOCK_MARKETS.concat(MOCK_MARKETS).map((market, i) => (
                        <div key={i} className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest">
                            <span className="text-white/50">{market.category} ///</span>
                            <span className="text-white">{market.symbol}</span>
                            <span className={market.change >= 0 ? 'text-art-green' : 'text-art-red'}>
                                {market.price.toLocaleString()} ({market.changePercent > 0 ? '+' : ''}{market.changePercent}%)
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-20">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div>
                        <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                            WEALTH
                        </h1>
                        <p className="font-serif text-2xl text-gray-400">"True wealth is the ability to fully experience life."</p>
                    </div>
                </div>

                {/* The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {WEALTH_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard
                                data={card}
                                onClick={() => setSelectedCard(card)}
                            />
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

export default Wealth;
