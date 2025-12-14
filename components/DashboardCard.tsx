import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ChevronRight } from 'lucide-react';
import { CardData } from '../types';

interface DashboardCardProps {
  data: CardData;
  onClick: (id: string) => void;
}

const TrendIcon = ({ trend, change }: { trend?: 'up' | 'down' | 'neutral', change?: number }) => {
  if (!trend) return null;

  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';

  return (
    <div className="flex items-center gap-1 text-xs font-mono font-bold text-black bg-white/30 px-2 py-1 rounded-full backdrop-blur-sm">
      {isPositive && <ArrowUpRight className="w-3 h-3" />}
      {!isPositive && !isNeutral && <ArrowDownRight className="w-3 h-3" />}
      {isNeutral && <Minus className="w-3 h-3" />}
      <span>{change ? Math.abs(change) : 0}%</span>
    </div>
  );
};

// Architectural Scribble Components (Thinner, more elegant)
const ScribbleOrange = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none">
    <path d="M10,190 C50,100 150,150 190,10" fill="none" stroke="black" strokeWidth="1" className="sketch-line" />
  </svg>
);
const ScribbleGreen = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none">
    <circle cx="100" cy="100" r="80" fill="none" stroke="black" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="black" strokeWidth="0.5" />
  </svg>
);
const ScribbleBlue = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none">
    <path d="M-20,100 L220,100 M100,-20 L100,220" fill="none" stroke="black" strokeWidth="0.5" />
  </svg>
);
const ScribbleYellow = () => (
  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none">
    <rect x="40" y="40" width="120" height="120" stroke="black" fill="none" strokeWidth="0.5" rx="20" />
  </svg>
);

const DashboardCard: React.FC<DashboardCardProps> = ({ data, onClick }) => {
  const getBgClass = () => {
    switch (data.colorTheme) {
      case 'orange': return 'bg-art-orange';
      case 'green': return 'bg-art-green';
      case 'blue': return 'bg-art-blue';
      case 'yellow': return 'bg-art-yellow';
      default: return 'bg-white';
    }
  };

  const getBarColorClass = () => {
    switch (data.colorTheme) {
      case 'orange': return 'bg-art-orange';
      case 'green': return 'bg-art-green';
      case 'blue': return 'bg-art-blue';
      case 'yellow': return 'bg-art-yellow';
      default: return 'bg-black';
    }
  };

  const renderScribble = () => {
    switch (data.colorTheme) {
      case 'orange': return <ScribbleOrange />;
      case 'green': return <ScribbleGreen />;
      case 'blue': return <ScribbleBlue />;
      case 'yellow': return <ScribbleYellow />;
      default: return null;
    }
  }

  return (
    <div
      onClick={() => onClick(data.id)}
      className={`group relative h-[320px] rounded-[32px] transition-all duration-300 hover:shadow-soft-xl hover:-translate-y-1 cursor-pointer overflow-hidden border border-black/20 ${getBgClass()}`}
    >
      {/* Background Texture */}
      {renderScribble()}

      <div className="relative h-full p-8 flex flex-col justify-between z-10">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h3 className="font-sans font-black text-3xl text-black tracking-tighter uppercase leading-[0.9] mb-2 text-stretch break-words">
              {data.title}
            </h3>
            <p className="font-mono text-[10px] text-black font-bold uppercase tracking-widest opacity-70">
              {data.description}
            </p>
          </div>
          <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Metrics / Visualization */}
        <div className="mt-auto">
          {data.type === 'curriculum' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 flex-grow bg-black/10 rounded-full overflow-hidden">
                  <div className={`h-full w-[20%] ${getBarColorClass() === 'bg-black' ? 'bg-black' : 'bg-black'}`}></div>
                </div>
                <span className="font-mono text-[10px] font-bold">20%</span>
              </div>
              {data.previewMetrics.map((metric, idx) => (
                <div key={idx}>
                  <span className="font-serif text-2xl block">{metric.value}</span>
                  <span className="font-mono text-[10px] uppercase opacity-60">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {data.type === 'list' && (
            <div className="space-y-2">
              {data.listItems?.slice(0, 2).map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-black/10 pb-1">
                  <span className="font-bold text-xs text-black uppercase">{item.name}</span>
                  <span className="font-mono text-[10px]">{item.metric}</span>
                </div>
              ))}
            </div>
          )}

          {(data.type === 'chart' || data.type === 'stats') && (
            <div>
              {data.previewMetrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-black text-4xl tracking-tighter">{metric.value}</span>
                    <TrendIcon trend={metric.trend} change={metric.change} />
                  </div>
                  <span className="font-mono text-[10px] uppercase opacity-60">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
