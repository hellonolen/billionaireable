import React from 'react';
import { LogOut, User, CreditCard, Shield, Bell, Crown, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { user, isSignedIn, signOut } = useAuth();
    const { progress, getSkillCompletion } = useProgress();

    const subscription = useQuery(
        api.stripe.hasActiveSubscription,
        user?._id ? { userId: user._id } : "skip"
    );

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Calculate total progress
    const pillars = [
        'reality-distortion', 'liquidity-allocation', 'holding-co', 'time-arbitrage',
        'bio-availability', 'political-capital', 'syndicate', 'family-office',
        'dynasty-design', 'sovereign-flags', 'asymmetric-bets', 'ascendance'
    ];
    
    let totalModulesCompleted = 0;
    pillars.forEach(pillar => {
        totalModulesCompleted += getSkillCompletion(pillar);
    });

    const getPlanDetails = () => {
        if (!subscription?.hasSubscription) {
            return { name: 'Free', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' };
        }
        switch (subscription.plan) {
            case 'founder': return { name: 'Founder', color: 'text-art-orange', bgColor: 'bg-art-orange/10' };
            case 'scaler': return { name: 'Scaler', color: 'text-art-green', bgColor: 'bg-art-green/10' };
            case 'owner': return { name: 'Owner', color: 'text-art-blue', bgColor: 'bg-art-blue/10' };
            default: return { name: 'Member', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-800' };
        }
    };

    const plan = getPlanDetails();

    const formatDate = (timestamp?: number) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!isSignedIn) {
        return (
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">
                <div className="text-center py-20">
                    <h1 className="font-sans text-4xl font-black text-black dark:text-white mb-4">
                        Sign in to view your profile
                    </h1>
                    <button
                        onClick={() => navigate('/waitlist')}
                        className="px-8 py-4 bg-art-orange text-white rounded-full font-mono text-sm font-bold uppercase"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9] mb-6">PROFILE</h1>
                    <p className="font-serif text-2xl text-gray-400 dark:text-gray-500">"Identity is the ultimate asset."</p>
                </div>
                <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-full transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Personal Details Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-art-blue/10 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-art-blue" />
                        </div>
                        <div>
                            <h2 className="font-sans text-xl font-black text-black dark:text-white">Personal Details</h2>
                            <p className="font-mono text-xs text-gray-400">Your identity</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Name</p>
                            <p className="font-sans font-bold text-black dark:text-white">
                                {user?.name || 'Not set'}
                            </p>
                        </div>
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Email</p>
                            <p className="font-sans font-bold text-black dark:text-white">
                                {user?.email || 'Not set'}
                            </p>
                        </div>
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Member Since</p>
                            <p className="font-sans font-bold text-black dark:text-white">
                                {formatDate(user?.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center`}>
                            <Crown className={`w-8 h-8 ${plan.color}`} />
                        </div>
                        <div>
                            <h2 className="font-sans text-xl font-black text-black dark:text-white">Membership</h2>
                            <p className="font-mono text-xs text-gray-400">Your plan</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Current Plan</p>
                            <p className={`font-sans text-2xl font-black ${plan.color}`}>
                                {plan.name}
                            </p>
                        </div>
                        {subscription?.hasSubscription && (
                            <>
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-art-green" />
                                        <span className="font-sans font-bold text-art-green capitalize">
                                            {subscription.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Renews On</p>
                                    <p className="font-sans font-bold text-black dark:text-white">
                                        {formatDate(subscription.expiresAt)}
                                    </p>
                                </div>
                            </>
                        )}
                        {!subscription?.hasSubscription && (
                            <button
                                onClick={() => navigate('/pricing')}
                                className="w-full py-3 bg-art-orange text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-art-orange/80 transition-colors"
                            >
                                Upgrade
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-art-green/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-art-green" />
                        </div>
                        <div>
                            <h2 className="font-sans text-xl font-black text-black dark:text-white">Progress</h2>
                            <p className="font-mono text-xs text-gray-400">Your journey</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Modules Completed</p>
                            <p className="font-sans text-2xl font-black text-black dark:text-white">
                                {totalModulesCompleted} / 48
                            </p>
                        </div>
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Pillars Progress</p>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-art-green h-full transition-all duration-500"
                                    style={{ width: `${(totalModulesCompleted / 48) * 100}%` }}
                                />
                            </div>
                            <p className="font-mono text-xs text-gray-400 mt-1">
                                {Math.round((totalModulesCompleted / 48) * 100)}% complete
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/progress')}
                            className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                </div>

                {/* Focus Areas Card */}
                {user?.focusAreas && user.focusAreas.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-art-orange/10 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-art-orange" />
                            </div>
                            <div>
                                <h2 className="font-sans text-xl font-black text-black dark:text-white">Focus Areas</h2>
                                <p className="font-mono text-xs text-gray-400">Your priorities</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {user.focusAreas.map((area, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 bg-art-orange/10 text-art-orange rounded-full font-mono text-xs font-bold"
                                >
                                    {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
