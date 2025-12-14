import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, Target, TrendingUp, Zap } from 'lucide-react';

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
    impact: '$95B valuation, processing $640B annually for millions of businesses worldwide.',
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
    businessModel: 'Subscription model ($15.49/month). Own customer relationship, license content, then produce originals.',
    impact: '$150B market cap, 230M subscribers, revolutionized entertainment industry.',
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
    impact: '$800B peak valuation, forced entire auto industry to pivot to electric.',
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
    impact: '$75B valuation, 7M listings, more rooms than all hotel chains combined.',
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
    impact: '$1.7T market cap, 30 years of compounding, redefined retail and cloud computing.',
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
    impact: '$800B market cap, 3B daily active users, changed how humans communicate.',
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
    impact: '$2.8T market cap, surpassed Apple, transformed from legacy to growth company.',
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
    impact: '$3T market cap, most valuable company ever, redefined multiple industries.',
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
    impact: '$100B market cap, powers 10% of all US e-commerce, enabled millions of entrepreneurs.',
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
    impact: '$1.2T market cap, 80%+ AI chip market share, enabling AI revolution.',
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
    impact: '$780B market cap, 60 years of 20% annual returns, greatest investor of all time.',
  },
];

const StrategyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const caseStudy = STRATEGY_CASES.find(c => c.id === id);
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-black mb-4">Case Study Not Found</h1>
          <button 
            onClick={() => navigate('/strategy')}
            className="text-art-orange hover:underline"
          >
            Return to Strategy
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = () => {
    switch (caseStudy.category) {
      case 'Founder': return 'bg-art-orange';
      case 'Scaler': return 'bg-art-green';
      case 'Owner': return 'bg-art-blue';
    }
  };

  return (
    <div className="min-h-screen bg-art-offwhite dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/strategy')}
          className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Back to Strategy</span>
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase text-white ${getCategoryColor()}`}>
              {caseStudy.category}
            </span>
            <span className="font-mono text-sm text-gray-400">{caseStudy.year}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter mb-4">
            {caseStudy.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-serif text-2xl text-gray-600 dark:text-gray-300">{caseStudy.founder}</p>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <p className="font-mono text-sm text-gray-400 uppercase">{caseStudy.company}</p>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <p className="font-mono text-sm text-gray-400 uppercase">{caseStudy.industry}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* The Story */}
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-art-orange/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-art-orange" />
              </div>
              <h2 className="font-sans text-xl font-black uppercase tracking-tight dark:text-white">The Origin Story</h2>
            </div>
            <p className="font-serif text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {caseStudy.story}
            </p>
          </div>

          {/* Business Model */}
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-art-green/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-art-green" />
              </div>
              <h2 className="font-sans text-xl font-black uppercase tracking-tight dark:text-white">The Business Model</h2>
            </div>
            <p className="font-serif text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {caseStudy.businessModel}
            </p>
          </div>

          {/* Impact */}
          <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 shadow-soft-xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-art-blue/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-art-blue" />
              </div>
              <h2 className="font-sans text-xl font-black uppercase tracking-tight dark:text-white">The Impact</h2>
            </div>
            <p className="font-serif text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {caseStudy.impact}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-black dark:bg-white rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-art-yellow" />
              </div>
              <h2 className="font-sans text-xl font-black uppercase tracking-tight text-white dark:text-black">Key Takeaway</h2>
            </div>
            <p className="font-serif text-xl text-white/80 dark:text-black/80 leading-relaxed italic">
              "{caseStudy.category === 'Founder' 
                ? 'Build something people want so badly they\'ll tell others about it.' 
                : caseStudy.category === 'Scaler' 
                ? 'Growth comes from systems, not heroics. Build the machine that builds the machine.'
                : 'Own the asset. Control the outcome. Compound forever.'}"
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          {parseInt(id || '1') > 1 && (
            <button
              onClick={() => navigate(`/strategy/${parseInt(id || '1') - 1}`)}
              className="flex items-center gap-2 text-gray-500 hover:text-art-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-sm uppercase">Previous Case</span>
            </button>
          )}
          <div className="flex-grow" />
          {parseInt(id || '1') < STRATEGY_CASES.length && (
            <button
              onClick={() => navigate(`/strategy/${parseInt(id || '1') + 1}`)}
              className="flex items-center gap-2 text-gray-500 hover:text-art-orange transition-colors"
            >
              <span className="font-mono text-sm uppercase">Next Case</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyDetail;

