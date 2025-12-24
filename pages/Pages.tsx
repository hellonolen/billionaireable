import React from 'react';
import { Link } from 'react-router-dom';

const ALL_PAGES = [
    // Core Navigation
    { path: '/', label: 'Home', description: 'Landing page', category: 'Core' },
    { path: '/dashboard', label: 'Dashboard', description: 'Main dashboard with 12 milestones', category: 'Core' },
    { path: '/strategy', label: 'Strategy', description: 'Strategy overview and planning', category: 'Core' },

    // Transformation Pages
    { path: '/wealth', label: 'Wealth', description: 'Net worth, assets, cash flow tracking', category: 'Transformation' },
    { path: '/markets', label: 'Markets', description: 'Live market data, stocks, crypto, forex', category: 'Transformation' },
    { path: '/intelligence', label: 'Intelligence', description: 'Strategic briefings and content', category: 'Transformation' },
    { path: '/bio-self', label: 'BioSelf', description: 'Health, bloodwork, longevity biomarkers', category: 'Transformation' },
    { path: '/sovereign-map', label: 'Sovereign Map', description: 'Passports, residencies, global assets', category: 'Transformation' },
    { path: '/legacy-timeline', label: 'Legacy Timeline', description: '100-year dynasty planning, trusts', category: 'Transformation' },

    // Progress & Tracking
    { path: '/decisions', label: 'Decisions', description: 'Decision journal with outcomes tracking', category: 'Progress' },
    { path: '/levels', label: 'Levels', description: 'Wealth levels: Accumulator to Immortal', category: 'Progress' },
    { path: '/progress', label: 'Progress', description: 'Skill completion and level progression', category: 'Progress' },
    { path: '/triangles', label: 'Triangles', description: 'Capital × Vitality × Leverage framework', category: 'Progress' },
    { path: '/command-center', label: 'Command Center', description: 'All 6 pillars dashboard overview', category: 'Progress' },

    // Member Features
    { path: '/vault', label: 'Vault', description: 'Off-market opportunities, pre-IPO, art', category: 'Member' },
    { path: '/community', label: 'Community', description: 'The Network - member connections', category: 'Member' },
    { path: '/integrations', label: 'Integrations', description: 'Oura, Whoop, Plaid, Calendar sync', category: 'Member' },
    { path: '/profile', label: 'Profile', description: 'User profile and settings', category: 'Member' },
    { path: '/settings', label: 'Settings', description: 'Account settings', category: 'Member' },

    // Onboarding & Sales
    { path: '/pricing', label: 'Pricing', description: 'Membership tiers and pricing', category: 'Onboarding' },
    { path: '/waitlist', label: 'Waitlist', description: 'Join the waitlist', category: 'Onboarding' },
    { path: '/inner-circle', label: 'Inner Circle', description: 'Inner Circle application', category: 'Onboarding' },
    { path: '/assessment', label: 'Assessment', description: 'Member identity assessment', category: 'Onboarding' },
    { path: '/free-assessment', label: 'Free Assessment', description: 'Public assessment preview', category: 'Onboarding' },
    { path: '/onboarding', label: 'Onboarding', description: 'New member onboarding flow', category: 'Onboarding' },

    // Admin
    { path: '/admin', label: 'Admin Dashboard', description: 'Admin: users, emails, content', category: 'Admin' },
];

const CATEGORIES = ['Core', 'Transformation', 'Progress', 'Member', 'Onboarding', 'Admin'];

const Pages: React.FC = () => {
    const baseUrl = 'https://billionaireable.com';

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-black text-black tracking-tighter mb-4">
                ALL PAGES
            </h1>
            <p className="font-serif text-xl text-gray-400 mb-12">
                {ALL_PAGES.length} pages on the platform
            </p>

            {CATEGORIES.map((category) => {
                const pages = ALL_PAGES.filter(p => p.category === category);
                if (pages.length === 0) return null;

                return (
                    <div key={category} className="mb-12">
                        <h2 className="font-sans text-2xl font-black uppercase mb-6 text-black">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pages.map((page) => (
                                <Link
                                    key={page.path}
                                    to={page.path}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all block"
                                >
                                    <h3 className="font-sans text-lg font-bold text-black mb-1">{page.label}</h3>
                                    <p className="font-serif text-gray-500 text-sm mb-3">{page.description}</p>
                                    <code className="font-mono text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                                        {page.path}
                                    </code>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Pages;

