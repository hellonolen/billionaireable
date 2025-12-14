import React from 'react';
import { LogOut } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { CardData } from '../types';

// Mock Data for Profile - modeled after Dashboard Cards
const PROFILE_CARDS: CardData[] = [
    {
        id: 'personal-details',
        title: 'Personal Details',
        type: 'curriculum',
        description: 'Identity Management',
        colorTheme: 'blue',
        previewMetrics: [
            { label: 'Status', value: 'Verified' },
            { label: 'Security', value: 'Max' },
        ],
    },
    {
        id: 'subscription',
        title: 'Membership Tier',
        type: 'curriculum',
        description: 'Global Access',
        colorTheme: 'orange',
        previewMetrics: [
            { label: 'Plan', value: 'Sovereign' },
            { label: 'Renewal', value: '365d' },
        ],
    },
    {
        id: 'security',
        title: 'Security Settings',
        type: 'curriculum',
        description: 'Protocol Level 5',
        colorTheme: 'green',
        previewMetrics: [
            { label: '2FA', value: 'Active' },
            { label: 'Devices', value: '3' },
        ],
    },
    {
        id: 'notifications',
        title: 'Notification Center',
        type: 'curriculum',
        description: 'Alert Preferences',
        colorTheme: 'yellow',
        previewMetrics: [
            { label: 'Priority', value: 'High' },
            { label: 'Channel', value: 'Encrypted' },
        ],
    }
];

const Profile: React.FC = () => {
    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">PROFILE</h1>
                    <p className="font-serif text-2xl text-gray-400">"Identity is the ultimate asset."</p>
                </div>
                <button className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-full transition-colors mb-6 md:mb-0 border border-transparent hover:border-red-100">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            {/* The Grid - Using DashboardCard for strict consistency */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {PROFILE_CARDS.map((card) => (
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

export default Profile;