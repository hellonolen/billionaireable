import React, { useState } from 'react';
import { Watch, Heart, Activity, Wallet, Calendar, Database, CheckCircle, Clock } from 'lucide-react';

interface Integration {
    id: string;
    name: string;
    category: 'Wearable' | 'Health' | 'Finance' | 'Productivity';
    icon: React.ReactNode;
    description: string;
    connected: boolean;
    lastSync?: string;
    colorTheme: 'orange' | 'green' | 'blue' | 'yellow';
}

const INTEGRATIONS: Integration[] = [
    {
        id: 'oura',
        name: 'Oura Ring',
        category: 'Wearable',
        icon: <Watch className="w-6 h-6" />,
        description: 'Sleep, HRV, body temperature tracking',
        connected: true,
        lastSync: '2m ago',
        colorTheme: 'orange',
    },
    {
        id: 'whoop',
        name: 'Whoop',
        category: 'Wearable',
        icon: <Activity className="w-6 h-6" />,
        description: 'Strain, recovery, sleep performance',
        connected: true,
        lastSync: '5m ago',
        colorTheme: 'green',
    },
    {
        id: 'apple-watch',
        name: 'Apple Watch',
        category: 'Wearable',
        icon: <Watch className="w-6 h-6" />,
        description: 'VO2 Max, workouts, heart rate',
        connected: true,
        lastSync: '1m ago',
        colorTheme: 'blue',
    },
    {
        id: 'apple-health',
        name: 'Apple Health',
        category: 'Health',
        icon: <Heart className="w-6 h-6" />,
        description: 'Centralized health data repository',
        connected: true,
        lastSync: 'Just now',
        colorTheme: 'orange',
    },
    {
        id: 'google-fit',
        name: 'Google Fit',
        category: 'Health',
        icon: <Activity className="w-6 h-6" />,
        description: 'Activity tracking and wellness data',
        connected: false,
        colorTheme: 'yellow',
    },
    {
        id: 'plaid',
        name: 'Plaid',
        category: 'Finance',
        icon: <Wallet className="w-6 h-6" />,
        description: 'Bank accounts and investment portfolios',
        connected: false,
        colorTheme: 'blue',
    },
    {
        id: 'calendar',
        name: 'Google Calendar',
        category: 'Productivity',
        icon: <Calendar className="w-6 h-6" />,
        description: 'Schedule sync for growth sessions',
        connected: false,
        colorTheme: 'green',
    },
    {
        id: 'notion',
        name: 'Notion',
        category: 'Productivity',
        icon: <Database className="w-6 h-6" />,
        description: 'Notes and knowledge base integration',
        connected: false,
        colorTheme: 'orange',
    },
];

const Integrations: React.FC = () => {
    const [integrations, setIntegrations] = useState(INTEGRATIONS);

    const handleConnect = (id: string) => {
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, connected: !int.connected, lastSync: int.connected ? undefined : 'Just now' } : int
        ));
    };

    const getColorClass = (theme: string) => {
        switch (theme) {
            case 'orange': return 'group-hover:bg-art-orange';
            case 'green': return 'group-hover:bg-art-green';
            case 'blue': return 'group-hover:bg-art-blue';
            case 'yellow': return 'group-hover:bg-art-yellow';
            default: return 'group-hover:bg-gray-800';
        }
    };

    const categories = ['Wearable', 'Health', 'Finance', 'Productivity'] as const;

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        INTEGRATIONS
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Your data, your ecosystem."</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-soft-xl">
                    <CheckCircle className="w-4 h-4 text-art-green" />
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">
                        {integrations.filter(i => i.connected).length} Connected
                    </span>
                </div>
            </div>

            {/* Categories */}
            {categories.map(category => {
                const categoryItems = integrations.filter(i => i.category === category);
                if (categoryItems.length === 0) return null;

                return (
                    <div key={category} className="mb-16">
                        <h2 className="font-sans text-3xl font-black uppercase mb-8">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {categoryItems.map((integration) => (
                                <div
                                    key={integration.id}
                                    className="group relative bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors bg-gray-100 text-black ${getColorClass(integration.colorTheme)}`}>
                                        {integration.icon}
                                    </div>

                                    {/* Name */}
                                    <h3 className="font-sans text-xl font-bold uppercase mb-2">{integration.name}</h3>
                                    <p className="font-serif text-sm text-gray-500 mb-6 min-h-[40px]">{integration.description}</p>

                                    {/* Connection Status */}
                                    {integration.connected ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-art-green animate-pulse"></div>
                                                <span className="font-mono text-xs font-bold uppercase text-art-green">Connected</span>
                                            </div>
                                            {integration.lastSync && (
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="font-mono text-xs">Synced {integration.lastSync}</span>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => handleConnect(integration.id)}
                                                className="w-full bg-gray-100 text-black py-3 rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors"
                                            >
                                                Disconnect
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleConnect(integration.id)}
                                            className="w-full bg-black text-white py-3 rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
                                        >
                                            Connect Now
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export default Integrations;
