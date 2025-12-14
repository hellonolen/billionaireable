import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { DASHBOARD_CARDS, MOCK_MARKETS } from '../constants';
import { CardData } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/skills/${id}`);
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
            <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
              THE PATH
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <p className="font-serif text-2xl text-gray-400">"The second billion is inevitable."</p>
            </div>
          </div>

          <div className="hidden lg:block text-right">
            <p className="font-mono text-xs font-bold uppercase text-gray-300 mb-1">Current Net Worth</p>
            <p className="font-sans text-4xl font-black tracking-tight">$4,200,000,000</p>
          </div>
        </div>

        {/* The Grid - 12 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DASHBOARD_CARDS.map((card: CardData) => (
            <DashboardCard
              key={card.id}
              data={card}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;