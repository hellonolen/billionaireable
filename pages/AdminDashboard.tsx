import React from 'react';
import { Users, DollarSign, Activity, ExternalLink } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-art-offwhite py-20 px-4 sm:px-6 lg:px-12">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="font-serif text-5xl font-black text-black tracking-tighter">COMMAND CENTER</h1>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-black text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs font-bold uppercase text-gray-400">Total Revenue</h3>
                            <DollarSign className="w-5 h-5 text-art-green" />
                        </div>
                        <p className="font-sans text-4xl font-black">$124,500</p>
                        <p className="font-mono text-xs text-art-green mt-2">+12% vs last month</p>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs font-bold uppercase text-gray-400">Active Users</h3>
                            <Users className="w-5 h-5 text-art-blue" />
                        </div>
                        <p className="font-sans text-4xl font-black">1,240</p>
                        <p className="font-mono text-xs text-art-blue mt-2">+54 this week</p>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-mono text-xs font-bold uppercase text-gray-400">Waitlist</h3>
                            <Activity className="w-5 h-5 text-art-orange" />
                        </div>
                        <p className="font-sans text-4xl font-black">8,902</p>
                        <p className="font-mono text-xs text-art-orange mt-2">High demand</p>
                    </div>
                </div>

                {/* Integrations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stripe Integration */}
                    <div className="bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <h3 className="font-sans text-2xl font-bold uppercase mb-6">Payments & Billing</h3>
                        <div className="bg-[#635BFF]/10 p-6 rounded-2xl border border-[#635BFF]/20 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-sans text-lg font-bold text-[#635BFF]">Stripe Connected</span>
                                <div className="w-3 h-3 rounded-full bg-art-green animate-pulse"></div>
                            </div>
                            <p className="font-serif text-sm text-gray-600 mb-4">
                                All payments are processed securely via Stripe. View transactions, manage subscriptions, and handle refunds in the Stripe Dashboard.
                            </p>
                            <a
                                href="https://dashboard.stripe.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#635BFF] text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-[#635BFF]/90 transition-colors"
                            >
                                Open Stripe Dashboard
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Recent Signups */}
                    <div className="bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100">
                        <h3 className="font-sans text-2xl font-bold uppercase mb-6">Recent Signups</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                            U{i}
                                        </div>
                                        <div>
                                            <p className="font-sans font-bold">User {i}</p>
                                            <p className="font-mono text-xs text-gray-400">user{i}@example.com</p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-400">2m ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
