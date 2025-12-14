import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';

const COMMUNITY_CARDS: CardData[] = [
    {
        id: 'summit-1',
        title: 'Sovereign Summit',
        type: 'curriculum',
        description: 'Davos, Switzerland',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Date', value: 'Dec 12-15' },
            { label: 'Type', value: 'Global Macro' }
        ],
    },
    {
        id: 'retreat-1',
        title: 'Bio-Age Retreat',
        type: 'curriculum',
        description: 'Costa Rica',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Date', value: 'Jan 5-10' },
            { label: 'Type', value: 'Health' }
        ],
    },
    {
        id: 'roundtable-1',
        title: 'PE Roundtable',
        type: 'curriculum',
        description: 'New York, NY',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Date', value: 'Feb 22' },
            { label: 'Type', value: 'Wealth' }
        ],
    },
    {
        id: 'member-1',
        title: 'Alex S.',
        type: 'curriculum',
        description: 'Tech Founder',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Location', value: 'SF' },
            { label: 'Status', value: 'Active' }
        ],
    },
    {
        id: 'member-2',
        title: 'Elena R.',
        type: 'curriculum',
        description: 'Family Office',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Location', value: 'London' },
            { label: 'Status', value: 'Active' }
        ],
    },
    {
        id: 'member-3',
        title: 'Marcus T.',
        type: 'curriculum',
        description: 'Real Estate',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Location', value: 'Dubai' },
            { label: 'Status', value: 'Active' }
        ],
    },
];

const Community: React.FC = () => {
    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        THE NETWORK
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Your network is your net worth. Literally."</p>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {COMMUNITY_CARDS.map((card) => (
                    <div key={card.id} className="h-full">
                        <DashboardCard
                            data={card}
                            onClick={() => { }}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Community;
