import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, Zap, Brain, Globe } from 'lucide-react';

const INTELLIGENCE_FEEDS = [
    {
        id: 'feed-1',
        title: 'Market Intelligence',
        description: 'Real-time analysis of global markets, trends, and opportunities',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'bg-art-green',
        updates: 'Updated daily',
    },
    {
        id: 'feed-2',
        title: 'Deal Flow Analysis',
        description: 'Breakdown of major deals, structures, and strategic moves',
        icon: <Target className="w-6 h-6" />,
        color: 'bg-art-orange',
        updates: 'Updated weekly',
    },
    {
        id: 'feed-3',
        title: 'Global Macro Briefing',
        description: 'Geopolitical shifts and their impact on capital flows',
        icon: <Globe className="w-6 h-6" />,
        color: 'bg-art-blue',
        updates: 'Updated weekly',
    },
    {
        id: 'feed-4',
        title: 'Strategy Playbooks',
        description: 'Deep dives into billionaire strategies and frameworks',
        icon: <BookOpen className="w-6 h-6" />,
        color: 'bg-black',
        updates: 'New content monthly',
    },
    {
        id: 'feed-5',
        title: 'Asymmetric Opportunities',
        description: 'High-upside, limited-downside opportunities analysis',
        icon: <Zap className="w-6 h-6" />,
        color: 'bg-art-orange',
        updates: 'Updated as identified',
    },
    {
        id: 'feed-6',
        title: 'Mental Models Library',
        description: 'Frameworks for better thinking and decision-making',
        icon: <Brain className="w-6 h-6" />,
        color: 'bg-art-green',
        updates: 'Expanding library',
    },
];

const Community: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="font-serif text-5xl md:text-6xl font-black text-black dark:text-white tracking-tighter mb-4">
                    Intelligence
                </h1>
                <p className="font-serif text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                    The information edge. Updated continuously. This is what billionaires know.
                </p>
            </div>

            {/* Intelligence Feeds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INTELLIGENCE_FEEDS.map((feed) => (
                    <div
                        key={feed.id}
                        onClick={() => navigate('/dashboard')}
                        className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-100 dark:border-gray-800 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`w-12 h-12 ${feed.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                            {feed.icon}
                        </div>
                        <h3 className="font-sans text-xl font-bold uppercase tracking-tight mb-2 dark:text-white">
                            {feed.title}
                        </h3>
                        <p className="font-serif text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {feed.description}
                        </p>
                        <p className="font-mono text-xs text-gray-400 uppercase">
                            {feed.updates}
                        </p>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 bg-black dark:bg-white rounded-[32px] p-12 text-center">
                <h2 className="font-serif text-3xl font-black text-white dark:text-black mb-4">
                    All Intelligence. One Source.
                </h2>
                <p className="font-serif text-lg text-white/80 dark:text-black/80 max-w-xl mx-auto mb-8">
                    Billionaireable synthesizes global intelligence and delivers what matters. No noise. Only signal.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-art-orange text-white px-8 py-4 rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                    Access Intelligence →
                </button>
            </div>
        </div>
    );
};

export default Community;
