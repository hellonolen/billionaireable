import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Globe, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_MARKETS } from '../constants';

const Markets: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Indexes', 'Stocks', 'Crypto', 'Commodities', 'Forex', 'Bonds'];

  const filteredMarkets = MOCK_MARKETS.filter(asset => {
    const matchesFilter = filter === 'All' || asset.category === filter;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Live Ticker Marquee */}
      <div className="bg-black text-white overflow-hidden py-4 border-b border-white/10 shadow-soft-xl mb-12 relative z-10">
        <div className="whitespace-nowrap animate-marquee flex gap-12 items-center">
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

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-20">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-4">
              MARKETS
            </h1>
            <p className="font-serif text-xl text-gray-500 max-w-2xl">
              "The market is a device for transferring money from the impatient to the patient." — Warren Buffett
            </p>
          </div>

          {/* Global Market Status */}
          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-soft-xl border border-black/10">
              <p className="font-mono text-xs text-gray-400 uppercase mb-1">Market Sentiment</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-art-green animate-pulse"></div>
                <span className="font-bold text-lg">Risk On</span>
              </div>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-soft-xl border border-black/10">
              <p className="font-mono text-xs text-gray-400 uppercase mb-1">VIX Volatility</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">13.45</span>
                <span className="text-art-green text-xs font-bold">-1.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[24px] shadow-soft-xl border border-black/10">

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all whitespace-nowrap ${filter === cat
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets (e.g. BTC, NVDA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl font-mono text-sm focus:ring-2 focus:ring-black transition-all"
            />
          </div>
        </div>

        {/* Market Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMarkets.map((asset) => {
            const isPositive = asset.changePercent >= 0;
            return (
              <div key={asset.symbol} className="group bg-white rounded-[24px] p-6 shadow-soft-xl border border-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.category === 'Crypto' ? 'bg-orange-100 text-orange-600' :
                      asset.category === 'Stocks' ? 'bg-blue-100 text-blue-600' :
                        asset.category === 'Indexes' ? 'bg-gray-100 text-gray-600' :
                          'bg-green-100 text-green-600'
                      }`}>
                      {asset.category === 'Crypto' ? <DollarSign className="w-5 h-5" /> :
                        asset.category === 'Stocks' ? <BarChart3 className="w-5 h-5" /> :
                          <Globe className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-none">{asset.symbol}</h3>
                      <p className="font-mono text-[10px] text-gray-400 uppercase mt-1">{asset.name}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg font-mono text-xs font-bold ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(asset.changePercent).toFixed(2)}%
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-xs text-gray-400 uppercase mb-1">Price</p>
                    <p className="font-sans text-3xl font-bold tracking-tight">
                      {asset.category === 'Forex' ? '' : '$'}
                      {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </p>
                  </div>
                  <div className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <p className="font-mono text-xs opacity-60 uppercase mb-1">Change</p>
                    <p className="font-mono text-sm font-bold">
                      {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Mini Chart Placeholder */}
                <div className="mt-6 h-16 w-full bg-gray-50 rounded-xl overflow-hidden relative">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path
                      d={`M0,${isPositive ? '64' : '0'} C20,${isPositive ? '40' : '20'} 50,${isPositive ? '50' : '10'} 100,${isPositive ? '10' : '64'} L100,64 L0,64 Z`}
                      fill={isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                    />
                    <path
                      d={`M0,${isPositive ? '64' : '0'} C20,${isPositive ? '40' : '20'} 50,${isPositive ? '50' : '10'} 100,${isPositive ? '10' : '64'}`}
                      fill="none"
                      stroke={isPositive ? '#22c55e' : '#ef4444'}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Markets;