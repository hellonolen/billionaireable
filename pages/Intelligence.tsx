import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import CardModal from '../components/CardModal';
import { CardData } from '../types';
import { INTELLIGENCE_CONTENT } from '../constants';
import { Radio, Play, ShieldCheck, Database } from 'lucide-react';
import { FEATURE_FLAGS } from '../constants';

const Intelligence: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  // Map INTELLIGENCE_CONTENT to CardData format
  const intelligenceCards: CardData[] = INTELLIGENCE_CONTENT.map(item => ({
    id: item.id,
    title: item.title,
    type: 'curriculum',
    description: item.guest, // Using guest name as description/subtitle
    colorTheme: item.thumbnailColor?.replace('bg-art-', '') as any || 'blue',
    previewMetrics: [
      { label: 'Category', value: item.category },
      { label: 'Duration', value: item.duration }
    ]
  }));

  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
            INTELLIGENCE
          </h1>
          <p className="font-serif text-2xl text-gray-400">
            "Knowledge is power. Intelligence is leverage."
          </p>
          {FEATURE_FLAGS.REMEDIATION_PHASE_4 && (
            <div className="mt-6 flex items-center gap-4 p-3 bg-art-blue/5 border border-art-blue/20 rounded-2xl w-fit">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-art-blue flex items-center justify-center text-white border-2 border-white dark:border-gray-950">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white border-2 border-white dark:border-gray-950">
                  <Database className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-art-blue font-bold">Directive Status: Grounded</p>
                <p className="font-serif text-xs text-gray-500">AI is synchronized with your latest Life Context & Sovereign Directives.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-art-orange text-white px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 shadow-xl">
            <Play className="w-4 h-4" />
            Start New Session
          </button>
        </div>
      </div>

      {/* Intelligence Content Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans text-3xl font-black uppercase">Strategic Briefings</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="font-mono text-xs font-bold uppercase text-red-500">Live Feed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {intelligenceCards.map((card) => (
            <div key={card.id} className="h-full">
              <DashboardCard
                data={card}
                onClick={() => setSelectedCard(card)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default Intelligence;