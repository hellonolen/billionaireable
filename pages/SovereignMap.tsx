import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';

// Passports as Cards
const PASSPORT_CARDS: CardData[] = [
    {
        id: 'us-passport',
        title: 'United States',
        type: 'curriculum',
        description: 'Tier A Passport',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Visa-Free', value: '186' },
            { label: 'Status', value: 'Active' },
        ],
    },
    {
        id: 'portugal-passport',
        title: 'Portugal',
        type: 'curriculum',
        description: 'EU Citizenship',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Visa-Free', value: '188' },
            { label: 'Status', value: 'Active' },
        ],
    },
    {
        id: 'singapore-passport',
        title: 'Singapore',
        type: 'curriculum',
        description: 'Asia Gateway',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Visa-Free', value: '192' },
            { label: 'Status', value: 'Pending' },
        ],
    },
];

// Residencies as Cards
const RESIDENCY_CARDS: CardData[] = [
    {
        id: 'monaco-residency',
        title: 'Monaco',
        type: 'curriculum',
        description: 'Primary Residence',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Tax Rate', value: '0%' },
            { label: 'Status', value: 'Active' },
        ],
    },
    {
        id: 'dubai-residency',
        title: 'Dubai',
        type: 'curriculum',
        description: 'Secondary Base',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Tax Rate', value: '0%' },
            { label: 'Days/Year', value: '90' },
        ],
    },
];

// Asset Locations as Cards
const ASSET_CARDS: CardData[] = [
    {
        id: 'nyc-assets',
        title: 'New York',
        type: 'curriculum',
        description: 'Real Estate',
        colorTheme: 'green',
        previewMetrics: [
            { label: 'Properties', value: '2' },
            { label: 'Value', value: '$8.2M' },
        ],
    },
    {
        id: 'london-assets',
        title: 'London',
        type: 'curriculum',
        description: 'Holding Co',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Entities', value: '3' },
            { label: 'Assets', value: '$12M' },
        ],
    },
    {
        id: 'singapore-assets',
        title: 'Singapore',
        type: 'curriculum',
        description: 'Family Office',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'AUM', value: '$45M' },
            { label: 'Status', value: 'Active' },
        ],
    },
    {
        id: 'zurich-assets',
        title: 'Zurich',
        type: 'curriculum',
        description: 'Private Banking',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Accounts', value: '2' },
            { label: 'Balance', value: '$6.5M' },
        ],
    },
];

const SovereignMap: React.FC = () => {
    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        SOVEREIGN MAP
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Freedom through jurisdictional diversification"</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-soft-xl">
                    <div className="w-2 h-2 rounded-full bg-art-blue animate-pulse"></div>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">3 Passports</span>
                </div>
            </div>

            {/* Passports Section */}
            <div className="mb-20">
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Passport Portfolio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PASSPORT_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard data={card} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Residencies Section */}
            <div className="mb-20">
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Residencies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RESIDENCY_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard data={card} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Asset Locations Section */}
            <div>
                <h2 className="font-sans text-3xl font-black uppercase mb-8">Global Asset Locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {ASSET_CARDS.map((card) => (
                        <div key={card.id} className="h-full">
                            <DashboardCard data={card} onClick={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SovereignMap;
