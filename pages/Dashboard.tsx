import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { DASHBOARD_CARDS, MOCK_MARKETS } from '../constants';
import { CardData } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Lock, Crown } from 'lucide-react';

// Free pillars (Pillar 1)
const FREE_PILLARS = ['reality-distortion'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { progress, getSkillCompletion } = useProgress();
  const { user, isSignedIn } = useAuth();
  
  const subscription = useQuery(
    api.stripe.hasActiveSubscription,
    user?._id ? { userId: user._id } : "skip"
  );

  const handleCardClick = (id: string) => {
    // Check if user can access this pillar
    const isFree = FREE_PILLARS.includes(id);
    const hasSubscription = subscription?.hasSubscription;
    
    if (!isFree && !hasSubscription) {
      navigate('/pricing');
      return;
    }
    
    navigate(`/skills/${id}`);
  };

  // Calculate total progress
  let totalModulesCompleted = 0;
  DASHBOARD_CARDS.forEach(card => {
    totalModulesCompleted += getSkillCompletion(card.id);
  });

  // Get current pillar (first incomplete one)
  let currentPillarIndex = 0;
  for (let i = 0; i < DASHBOARD_CARDS.length; i++) {
    if (getSkillCompletion(DASHBOARD_CARDS[i].id) < 4) {
      currentPillarIndex = i;
      break;
    }
  }

  const getPlanName = () => {
    if (!subscription?.hasSubscription) return null;
    switch (subscription.plan) {
      case 'founder': return 'Founder';
      case 'scaler': return 'Scaler';
      case 'owner': return 'Owner';
      default: return 'Member';
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Live Ticker Marquee */}
      <div className="bg-black text-white overflow-hidden py-4 border-b border-white/10 shadow-soft-xl mb-12 relative z-10 group">
        <div className="whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] flex gap-12 items-center">
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

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pb-20 pt-8">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h1 className="font-serif text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9] mb-6">
              THE PATH
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <p className="font-serif text-2xl text-gray-400 dark:text-gray-500">"The second billion is inevitable."</p>
            </div>
          </div>

          <div className="text-right space-y-2">
            {isSignedIn && (
              <>
                <p className="font-mono text-xs font-bold uppercase text-gray-300">
                  {clerkUser?.firstName || 'Welcome'}
                </p>
                <div className="flex items-center gap-2 justify-end">
                  {getPlanName() && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-art-green/10 text-art-green rounded-full font-mono text-xs font-bold">
                      <Crown className="w-3 h-3" />
                      {getPlanName()}
                    </span>
                  )}
                </div>
                <p className="font-sans text-2xl font-black tracking-tight dark:text-white">
                  {totalModulesCompleted}/48 Modules
                </p>
              </>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        {isSignedIn && (
          <div className="mb-12 bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-1">Current Pillar</p>
                <h2 className="font-sans text-2xl font-black text-black dark:text-white">
                  {currentPillarIndex + 1}. {DASHBOARD_CARDS[currentPillarIndex]?.title}
                </h2>
              </div>
              <button
                onClick={() => navigate(`/skills/${DASHBOARD_CARDS[currentPillarIndex]?.id}`)}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-xs font-bold uppercase hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Continue
              </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-art-green h-full transition-all duration-500"
                style={{ width: `${(totalModulesCompleted / 48) * 100}%` }}
              />
            </div>
            <p className="font-mono text-xs text-gray-400 mt-2">
              {Math.round((totalModulesCompleted / 48) * 100)}% complete
            </p>
          </div>
        )}

        {/* The Grid - 12 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DASHBOARD_CARDS.map((card: CardData, index: number) => {
            const isFree = FREE_PILLARS.includes(card.id);
            const hasSubscription = subscription?.hasSubscription;
            const isLocked = !isFree && !hasSubscription;
            const completion = getSkillCompletion(card.id);
            
            return (
              <div key={card.id} className="relative">
                {/* Lock overlay for non-subscribers */}
                {isLocked && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[32px] z-10 flex flex-col items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="font-mono text-xs text-gray-500 uppercase">Locked</p>
                  </div>
                )}
                
                {/* Progress indicator */}
                {completion > 0 && !isLocked && (
                  <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-art-green rounded-full">
                    <span className="font-mono text-xs font-bold text-white">
                      {completion}/4
                    </span>
                  </div>
                )}
                
                {/* Free badge */}
                {isFree && !hasSubscription && (
                  <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-art-orange rounded-full">
                    <span className="font-mono text-xs font-bold text-white">FREE</span>
                  </div>
                )}
                
                <DashboardCard
                  data={{
                    ...card,
                    description: `Pillar ${index + 1}`
                  }}
                  onClick={() => handleCardClick(card.id)}
                />
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA for non-subscribers */}
        {isSignedIn && !subscription?.hasSubscription && (
          <div className="mt-12 bg-black dark:bg-white rounded-[32px] p-8 text-center">
            <h3 className="font-sans text-2xl font-black text-white dark:text-black mb-2">
              Unlock All 12 Pillars
            </h3>
            <p className="font-serif text-white/80 dark:text-black/80 mb-6">
              You have access to Pillar 1. Upgrade to continue the path.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-full font-mono text-sm font-bold uppercase hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              View Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
