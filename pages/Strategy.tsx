import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight } from 'lucide-react';

interface StrategyCase {
  id: string;
  title: string;
  founder: string;
  company: string;
  industry: string;
  category: 'Founder' | 'Scaler' | 'Owner';
  year: number;
  story: string;
  businessModel: string;
  impact: string;
}

const STRATEGY_CASES: StrategyCase[] = [
  {
    id: '1',
    title: 'Developer-First Payments',
    founder: 'Patrick & John Collison',
    company: 'Stripe',
    industry: 'Fintech',
    category: 'Founder',
    year: 2010,
    story: 'Two brothers frustrated with online payment complexity built a 7-line integration that changed fintech forever.',
    businessModel: 'API-first platform charging 2.9% + 30¢ per transaction. Focus on developer experience over enterprise sales.',
    impact: '$65B+ valuation, processing $1T+ annually for millions of businesses worldwide.',
  },
  {
    id: '2',
    title: 'Aggregation Theory',
    founder: 'Reed Hastings',
    company: 'Netflix',
    industry: 'Media',
    category: 'Scaler',
    year: 2007,
    story: 'From DVD-by-mail to streaming giant. Bet the company on original content when everyone said it was impossible.',
    businessModel: 'Tiered subscription model ($6.99-$22.99/month). Own customer relationship, license content, then produce originals. Ad-supported tier for scale.',
    impact: '$280B+ market cap, 280M+ subscribers, revolutionized entertainment industry.',
  },
  {
    id: '3',
    title: 'Vertical Integration',
    founder: 'Elon Musk',
    company: 'Tesla',
    industry: 'Automotive',
    category: 'Owner',
    year: 2003,
    story: 'Told EVs were impossible. Built batteries, motors, software, charging network, and energy products in-house.',
    businessModel: 'Direct-to-consumer sales. No dealerships. Software updates add value post-purchase. Energy credits subsidize growth.',
    impact: '$1T+ peak valuation, forced entire auto industry to pivot to electric. Most valuable automaker in history.',
  },
  {
    id: '4',
    title: 'Platform Economics',
    founder: 'Brian Chesky',
    company: 'Airbnb',
    industry: 'Hospitality',
    category: 'Founder',
    year: 2008,
    story: 'Rented air mattresses during a conference. Built trust systems that let strangers sleep in each other\'s homes.',
    businessModel: 'Marketplace taking 3% from hosts, 14% from guests. Zero inventory. Community-driven trust.',
    impact: '$85B+ market cap, 8M+ listings, more rooms than all hotel chains combined.',
  },
  {
    id: '5',
    title: 'Freemium Flywheel',
    founder: 'Drew Houston',
    company: 'Dropbox',
    industry: 'SaaS',
    category: 'Scaler',
    year: 2007,
    story: 'Forgot USB drive on bus. Built cloud storage that went viral through referral incentives.',
    businessModel: 'Free 2GB, paid tiers at $11.99/month. Viral referral loop: invite friends, get more storage.',
    impact: '700M users, $2.3B revenue, defined freemium SaaS playbook.',
  },
  {
    id: '6',
    title: 'Customer Obsession',
    founder: 'Jeff Bezos',
    company: 'Amazon',
    industry: 'E-commerce',
    category: 'Owner',
    year: 1994,
    story: 'Started selling books from garage. Reinvested every dollar into infrastructure for 20 years before prioritizing profit.',
    businessModel: 'Marketplace + AWS + Prime subscription. Flywheel: lower prices → more customers → more sellers → lower prices.',
    impact: '$2T+ market cap, 30 years of compounding, redefined retail, cloud computing, and logistics.',
  },
  {
    id: '7',
    title: 'Network Effects',
    founder: 'Mark Zuckerberg',
    company: 'Facebook/Meta',
    industry: 'Social Media',
    category: 'Scaler',
    year: 2004,
    story: 'College dorm project became global communication platform. Prioritized growth over monetization for 5 years.',
    businessModel: 'Free product, advertising revenue. More users = more valuable to advertisers = more revenue to acquire users.',
    impact: '$1.4T+ market cap, 3B+ daily active users across apps, changed how humans communicate.',
  },
  {
    id: '8',
    title: 'Marketplace Liquidity',
    founder: 'Travis Kalanick',
    company: 'Uber',
    industry: 'Transportation',
    category: 'Founder',
    year: 2009,
    story: 'Couldn\'t get a cab in Paris. Built two-sided marketplace solving chicken-and-egg problem with surge pricing.',
    businessModel: 'Take rate of 25-30% per ride. Dynamic pricing balances supply/demand. Driver as contractor, not employee.',
    impact: '$90B valuation, 131M monthly users, created gig economy category.',
  },
  {
    id: '9',
    title: 'Bundling Strategy',
    founder: 'Satya Nadella',
    company: 'Microsoft',
    industry: 'Enterprise Software',
    category: 'Scaler',
    year: 2014,
    story: 'Inherited declining Windows empire. Pivoted to cloud, open source, and subscriptions. "Mobile-first, cloud-first."',
    businessModel: 'Office 365 subscriptions bundled with Azure cloud. Enterprise lock-in through ecosystem.',
    impact: '$3T+ market cap, one of the most valuable companies ever, transformed from legacy to AI leader.',
  },
  {
    id: '10',
    title: 'Hardware + Software',
    founder: 'Steve Jobs',
    company: 'Apple',
    industry: 'Consumer Electronics',
    category: 'Owner',
    year: 1976,
    story: 'Fired from own company, returned to save it from bankruptcy. Built ecosystem of devices, software, and services.',
    businessModel: 'Premium hardware with 40%+ margins. App Store takes 30%. Services (iCloud, Apple Music) recurring revenue.',
    impact: '$3.5T+ market cap, most valuable company ever, redefined computing, music, phones, and retail.',
  },
  {
    id: '11',
    title: 'Content Moat',
    founder: 'Logan Paul & KSI',
    company: 'Prime Hydration',
    industry: 'Consumer Goods',
    category: 'Founder',
    year: 2022,
    story: 'Two YouTubers with 40M+ followers each launched sports drink. Sold $250M in first year through influencer distribution.',
    businessModel: 'Direct-to-consumer + retail. Influencer marketing at scale. Community-driven product development.',
    impact: '$1.2B valuation in 18 months, outselling Gatorade in some markets.',
  },
  {
    id: '12',
    title: 'Vertical SaaS',
    founder: 'Henrique Dubugras',
    company: 'Brex',
    industry: 'Fintech',
    category: 'Founder',
    year: 2017,
    story: 'Dropped out of Stanford at 19. Built corporate card for startups that traditional banks rejected.',
    businessModel: 'Interchange fees (2-3% per transaction) + software subscriptions. No personal guarantee required.',
    impact: '$12B valuation, $200M+ revenue, redefined startup banking.',
  },
  {
    id: '13',
    title: 'Creator Economy',
    founder: 'Tobias Lütke',
    company: 'Shopify',
    industry: 'E-commerce',
    category: 'Scaler',
    year: 2006,
    story: 'Wanted to sell snowboards online. Existing platforms sucked. Built own, then sold the platform.',
    businessModel: 'Subscription ($29-$299/month) + payment processing (2.9% + 30¢). Empower merchants, not compete with them.',
    impact: '$100B+ market cap, powers 10%+ of all US e-commerce, enabled millions of entrepreneurs.',
  },
  {
    id: '14',
    title: 'Data Network Effects',
    founder: 'Jensen Huang',
    company: 'NVIDIA',
    industry: 'Semiconductors',
    category: 'Owner',
    year: 1993,
    story: 'Bet on GPUs for gaming. Pivoted to AI when everyone thought it was a fad. CUDA software created moat.',
    businessModel: 'Sell chips + software ecosystem. More developers using CUDA = more valuable chips = more developers.',
    impact: '$3T+ market cap, 80%+ AI chip market share, the backbone of the AI revolution.',
  },
  {
    id: '15',
    title: 'Compounding Capital',
    founder: 'Warren Buffett',
    company: 'Berkshire Hathaway',
    industry: 'Conglomerate',
    category: 'Owner',
    year: 1965,
    story: 'Bought failing textile mill. Used cash flow to buy insurance companies, then used float to buy businesses.',
    businessModel: 'Acquire undervalued businesses, never sell, reinvest profits. Insurance float provides free capital.',
    impact: '$1T+ market cap, 60 years of 20%+ annual returns, greatest investor of all time.',
  },
];

const Strategy: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Founder', 'Scaler', 'Owner'];

  const filteredCases = STRATEGY_CASES.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || case_.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20">

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-4">
            STRATEGY
          </h1>
          <p className="font-serif text-2xl text-gray-400 mb-2">
            "Learn from the best. 25 years of proven business models."
          </p>
          <p className="font-mono text-xs text-gray-400 uppercase">
            * All case studies based on publicly available information
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            <div className="bg-art-green rounded-2xl px-6 py-3">
              <p className="font-mono text-xs text-white/80 uppercase mb-1">Case Studies</p>
              <p className="font-sans text-3xl font-black text-white">{STRATEGY_CASES.length}</p>
            </div>
            <div className="bg-black rounded-2xl px-6 py-3">
              <p className="font-mono text-xs text-white/80 uppercase mb-1">Industries</p>
              <p className="font-sans text-3xl font-black text-white">15</p>
            </div>
            <div className="bg-art-blue rounded-2xl px-6 py-3">
              <p className="font-mono text-xs text-white/80 uppercase mb-1">Combined Value</p>
              <p className="font-sans text-3xl font-black text-white">$10T+</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[24px] shadow-soft-xl border border-black/10">
          {/* Category Filters */}
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-mono text-xs font-bold uppercase transition-all ${selectedCategory === cat
                    ? 'bg-art-green text-white'
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
              placeholder="Search founders, companies, industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl font-mono text-sm focus:ring-2 focus:ring-art-green transition-all"
            />
          </div>
        </div>

        {/* Strategy Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((case_) => (
            <div
              key={case_.id}
              onClick={() => navigate(`/strategy/${case_.id}`)}
              className="group bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-black/20 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative"
            >
              {/* Arrow Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-art-green group-hover:text-white transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase ${case_.category === 'Founder' ? 'bg-art-orange text-white' :
                    case_.category === 'Scaler' ? 'bg-art-green text-white' :
                      'bg-art-blue text-white'
                  }`}>
                  {case_.category}
                </span>
                <span className="font-mono text-xs text-gray-400">{case_.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-2xl font-black mb-3 pr-8">
                {case_.title}
              </h3>

              {/* Founder & Company */}
              <div className="mb-6">
                <p className="font-serif text-lg text-gray-700">{case_.founder}</p>
                <p className="font-mono text-xs text-gray-400 uppercase">{case_.company} • {case_.industry}</p>
              </div>

              {/* Story */}
              <div className="mb-4">
                <p className="font-mono text-xs text-gray-400 uppercase mb-2">The Story</p>
                <p className="font-serif text-sm text-gray-700 leading-relaxed">{case_.story}</p>
              </div>

              {/* Business Model */}
              <div className="mb-4">
                <p className="font-mono text-xs text-gray-400 uppercase mb-2">Business Model</p>
                <p className="font-serif text-sm text-gray-700 leading-relaxed">{case_.businessModel}</p>
              </div>

              {/* Impact */}
              <div className="pt-4 border-t border-gray-100">
                <p className="font-mono text-xs text-gray-400 uppercase mb-2">Impact</p>
                <p className="font-sans text-sm font-bold text-black">{case_.impact}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Strategy;