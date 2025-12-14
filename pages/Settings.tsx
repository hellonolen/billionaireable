import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';

const SETTINGS_CARDS: CardData[] = [
    {
        id: 'identity',
        title: 'Identity',
        type: 'curriculum',
        description: 'Personal Details',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Status', value: 'Verified' },
            { label: 'Security', value: 'Max' }
        ],
    },
    {
        id: 'security',
        title: 'Security',
        type: 'curriculum',
        description: 'Protocol Level 5',
        colorTheme: 'green',
        previewMetrics: [
            { label: '2FA', value: 'Active' },
            { label: 'Devices', value: '3' }
        ],
    },
    {
        id: 'subscription',
        title: 'Membership',
        type: 'curriculum',
        description: 'Sovereign Tier',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Plan', value: 'Annual' },
            { label: 'Renewal', value: '365d' }
        ],
    },
    {
        id: 'privacy',
        title: 'Sovereignty',
        type: 'curriculum',
        description: 'Data Control',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Encryption', value: 'E2E' },
            { label: 'Jurisdiction', value: 'Multi' }
        ],
    },
];

const Settings: React.FC = () => {
    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        ADMIN
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Control is the ultimate luxury."</p>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {SETTINGS_CARDS.map((card) => (
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

export default Settings;
