import { CardData, MarketAsset, ContentItem, CurriculumArea } from './types';

// 12 Dashboard Cards representing the Billionaire's Radar
export const DASHBOARD_CARDS: CardData[] = [
  {
    id: 'reality-distortion',
    title: 'Reality Distortion',
    type: 'curriculum',
    description: 'Vision Engine',
    colorTheme: 'orange',
    previewMetrics: [
      { label: 'Archetype', value: 'Visionary' },
      { label: 'Status', value: 'Active', trend: 'up' },
    ],
  },
  {
    id: 'liquidity-allocation',
    title: 'Liquidity & Allocation',
    type: 'curriculum',
    description: 'Capital Architect',
    colorTheme: 'green',
    previewMetrics: [
      { label: 'Archetype', value: 'Allocator' },
      { label: 'Runway', value: '36mo', trend: 'up' },
    ],
  },
  {
    id: 'holding-co',
    title: 'The Holding Co',
    type: 'curriculum',
    description: 'Systems Builder',
    colorTheme: 'blue',
    previewMetrics: [
      { label: 'Archetype', value: 'Builder' },
      { label: 'Entities', value: '7' },
    ],
  },
  {
    id: 'time-arbitrage',
    title: 'Time Arbitrage',
    type: 'curriculum',
    description: 'Leverage Strategist',
    colorTheme: 'yellow',
    previewMetrics: [
      { label: 'Archetype', value: 'Leverager' },
      { label: 'Leverage', value: '1000x', trend: 'up' },
    ],
  },
  {
    id: 'bio-availability',
    title: 'Bio-Availability',
    type: 'curriculum',
    description: 'Inner Mechanic',
    colorTheme: 'orange',
    previewMetrics: [
      { label: 'Archetype', value: 'Optimizer' },
      { label: 'Energy', value: 'Peak' },
    ],
  },
  {
    id: 'political-capital',
    title: 'Political Capital',
    type: 'curriculum',
    description: 'Power Navigator',
    colorTheme: 'blue',
    previewMetrics: [
      { label: 'Archetype', value: 'Navigator' },
      { label: 'Access', value: 'High' },
    ],
  },
  {
    id: 'syndicate',
    title: 'The Syndicate',
    type: 'curriculum',
    description: 'Dealmaker',
    colorTheme: 'green',
    previewMetrics: [
      { label: 'Archetype', value: 'Dealmaker' },
      { label: 'Flow', value: 'High' },
    ],
  },
  {
    id: 'family-office',
    title: 'Family Office',
    type: 'curriculum',
    description: 'Quiet Empire',
    colorTheme: 'yellow',
    previewMetrics: [
      { label: 'Archetype', value: 'Protector' },
      { label: 'Risk', value: 'Low' },
    ],
  },
  {
    id: 'dynasty-design',
    title: 'Dynasty Design',
    type: 'curriculum',
    description: 'Legacy Steward',
    colorTheme: 'orange',
    previewMetrics: [
      { label: 'Archetype', value: 'Steward' },
      { label: 'Horizon', value: '100yr' },
    ],
  },
  {
    id: 'sovereign-flags',
    title: 'Sovereign Flags',
    type: 'curriculum',
    description: 'Global Operator',
    colorTheme: 'blue',
    previewMetrics: [
      { label: 'Archetype', value: 'Operator' },
      { label: 'Flags', value: '3' },
    ],
  },
  {
    id: 'asymmetric-bets',
    title: 'Asymmetric Bets',
    type: 'curriculum',
    description: 'Contrarian Gambler',
    colorTheme: 'green',
    previewMetrics: [
      { label: 'Archetype', value: 'Contrarian' },
      { label: 'Upside', value: 'Uncapped' },
    ],
  },
  {
    id: 'ascendance',
    title: 'Ascendance',
    type: 'curriculum',
    description: 'Intelligence Engine',
    colorTheme: 'yellow',
    previewMetrics: [
      { label: 'Archetype', value: 'Intellect' },
      { label: 'Clarity', value: '100%' },
    ],
  },
];

// Detailed Data for all 12 skills
export const SKILL_DATA: Record<string, {
  modules: { id: number; title: string; duration: string; status: 'completed' | 'active' | 'locked' }[];
  network: { name: string; type: string; access: string }[];
  insight: string;
  tools: string[];
}> = {
  'reality-distortion': {
    modules: [
      { id: 1, title: 'Vision Architecture', duration: '15 min', status: 'completed' },
      { id: 2, title: 'Narrative Control', duration: '25 min', status: 'active' },
      { id: 3, title: 'The Pitch Deck', duration: '20 min', status: 'locked' },
      { id: 4, title: 'Media Manipulation', duration: '30 min', status: 'locked' },
    ],
    network: [
      { name: 'TED Curators', type: 'Media', access: 'Intro' },
      { name: 'Top PR Firms', type: 'Communications', access: 'Direct' },
      { name: 'Ghostwriters', type: 'Content', access: 'Direct' },
    ],
    insight: "Reality is negotiable. This skill isn't about lying; it's about projecting a future so compelling that capital, talent, and the market have no choice but to align with it. Steve Jobs didn't just build phones; he distorted reality to make them essential.",
    tools: ['Vision Board Template', 'Press Release Framework', 'Keynote Deck Builder']
  },
  'liquidity-allocation': {
    modules: [
      { id: 1, title: 'Cash Flow Quadrants', duration: '20 min', status: 'completed' },
      { id: 2, title: 'The 40/40/20 Rule', duration: '30 min', status: 'active' },
      { id: 3, title: 'Debt as a Weapon', duration: '25 min', status: 'locked' },
      { id: 4, title: 'Treasury Management', duration: '40 min', status: 'locked' },
    ],
    network: [
      { name: 'Goldman Sachs PWM', type: 'Banking', access: 'Direct' },
      { name: 'J.P. Morgan', type: 'Credit Lines', access: 'Direct' },
      { name: 'Tax Strategists', type: 'Advisory', access: 'Intro' },
    ],
    insight: "Liquidity is oxygen. Allocation is muscle. Most founders die because they run out of air, or they get fat and lazy. This module teaches you how to keep the cash moving and the assets growing, ensuring you never face a runway crunch.",
    tools: ['Cash Flow Forecast', 'Allocation Matrix', 'Debt Service Calculator']
  },
  'holding-co': {
    modules: [
      { id: 1, title: 'Entity Structure 101', duration: '15 min', status: 'completed' },
      { id: 2, title: 'The Berkshire Model', duration: '35 min', status: 'active' },
      { id: 3, title: 'Inter-Company Agreements', duration: '20 min', status: 'locked' },
      { id: 4, title: 'Consolidated Reporting', duration: '30 min', status: 'locked' },
    ],
    network: [
      { name: 'Deloitte Legal', type: 'Corporate Law', access: 'Direct' },
      { name: 'Offshore Counsel', type: 'Structuring', access: 'Intro' },
      { name: 'Audit Partners', type: 'Compliance', access: 'Direct' },
    ],
    insight: "You are not your company. You are the architect of a system of companies. The Holding Company structure allows you to segregate risk, optimize tax, and build a diversified empire that survives any single failure.",
    tools: ['Entity Org Chart', 'Operating Agreement', 'Consolidation Dashboard']
  },
  'time-arbitrage': {
    modules: [
      { id: 1, title: 'Radical Delegation', duration: '15 min', status: 'completed' },
      { id: 2, title: 'The $10,000/hr Rule', duration: '20 min', status: 'active' },
      { id: 3, title: 'Executive Assistants', duration: '25 min', status: 'locked' },
      { id: 4, title: 'Asynchronous Comms', duration: '30 min', status: 'locked' },
    ],
    network: [
      { name: 'Chief of Staff Search', type: 'Recruiting', access: 'Direct' },
      { name: 'Executive VA Agencies', type: 'Staffing', access: 'Direct' },
      { name: 'Productivity Coaches', type: 'Performance', access: 'Intro' },
    ],
    insight: "Time is the only asset you can't buy more of—unless you arbitrage it. By buying other people's time at a lower cost than your output value, you create infinite leverage. Stop doing $100/hr work.",
    tools: ['Delegation Matrix', 'EA Playbook', 'Weekly Review Protocol']
  },
  'bio-availability': {
    modules: [
      { id: 1, title: 'Sleep Architecture', duration: '20 min', status: 'completed' },
      { id: 2, title: 'Nutrient Timing', duration: '25 min', status: 'active' },
      { id: 3, title: 'Hormone Optimization', duration: '30 min', status: 'locked' },
      { id: 4, title: 'Cognitive Enhancers', duration: '15 min', status: 'locked' },
    ],
    network: [
      { name: 'Functional Med Docs', type: 'Health', access: 'Direct' },
      { name: 'Private Chefs', type: 'Nutrition', access: 'Intro' },
      { name: 'Sleep Coaches', type: 'Performance', access: 'Direct' },
    ],
    insight: "Your body is the machine that builds the empire. If the machine breaks, the empire falls. Bio-availability is about maximizing the energy and clarity available to you at any given moment.",
    tools: ['Bloodwork Panel Tracker', 'Supplement Stack', 'Sleep Protocol']
  },
  'political-capital': {
    modules: [
      { id: 1, title: 'Power Mapping', duration: '20 min', status: 'completed' },
      { id: 2, title: 'The Favor Bank', duration: '25 min', status: 'active' },
      { id: 3, title: 'Lobbying Basics', duration: '30 min', status: 'locked' },
      { id: 4, title: 'Crisis Management', duration: '40 min', status: 'locked' },
    ],
    network: [
      { name: 'K Street Lobbyists', type: 'Government', access: 'Intro' },
      { name: 'Crisis PR Firms', type: 'Reputation', access: 'Direct' },
      { name: 'Elite Clubs', type: 'Social', access: 'Intro' },
    ],
    insight: "Business happens in boardrooms; deals happen in backrooms. Political capital is the invisible currency of influence. It's about who owes you a favor, and who will pick up the phone when you call at 2 AM.",
    tools: ['Stakeholder Map', 'Influence Ledger', 'Crisis Response Plan']
  },
  'syndicate': {
    modules: [
      { id: 1, title: 'Deal Sourcing Mastery', duration: '15 min', status: 'completed' },
      { id: 2, title: 'Due Diligence Frameworks', duration: '25 min', status: 'active' },
      { id: 3, title: 'Structuring the Cap Table', duration: '20 min', status: 'locked' },
      { id: 4, title: 'The Art of the Exit', duration: '30 min', status: 'locked' },
    ],
    network: [
      { name: 'Blackstone Group', type: 'Private Equity', access: 'Direct' },
      { name: 'Sequoia Capital', type: 'Venture', access: 'Intro' },
      { name: 'Rothschild & Co', type: 'Advisory', access: 'Direct' },
    ],
    insight: "Most investors chase deals. The Syndicate teaches you to attract them. By positioning yourself as a value-add partner, you move from 'begging for allocation' to 'selecting your partners'. This module focuses on the psychology of the deal as much as the mechanics.",
    tools: ['Deal Memo Template', 'Cap Table Modeler', 'Term Sheet Decoder']
  },
  'family-office': {
    modules: [
      { id: 1, title: 'SFO vs MFO', duration: '20 min', status: 'completed' },
      { id: 2, title: 'Hiring the CIO', duration: '30 min', status: 'active' },
      { id: 3, title: 'Investment Policy', duration: '25 min', status: 'locked' },
      { id: 4, title: 'Lifestyle Systems', duration: '15 min', status: 'locked' },
    ],
    network: [
      { name: 'Family Office Exchange', type: 'Network', access: 'Direct' },
      { name: 'Top CIO Recruiters', type: 'Staffing', access: 'Intro' },
      { name: 'Trust Companies', type: 'Admin', access: 'Direct' },
    ],
    insight: "A Family Office is not just wealth management — it's the operating system billionaires use. It handles everything from tax returns to travel logistics, freeing focus for high-impact decisions.",
    tools: ['Investment Policy Statement', 'Staffing Org Chart', 'Administrative Systems Checklist']
  },
  'dynasty-design': {
    modules: [
      { id: 1, title: 'The 100-Year Plan', duration: '25 min', status: 'completed' },
      { id: 2, title: 'Family Constitution', duration: '35 min', status: 'active' },
      { id: 3, title: 'Heir Preparation', duration: '30 min', status: 'locked' },
      { id: 4, title: 'Philanthropic Legacy', duration: '20 min', status: 'locked' },
    ],
    network: [
      { name: 'Trust & Estate Lawyers', type: 'Legal', access: 'Direct' },
      { name: 'Family Governance', type: 'Advisory', access: 'Intro' },
      { name: 'Philanthropy Advisors', type: 'Impact', access: 'Direct' },
    ],
    insight: "Wealth is easy to lose. Dynasty Design is about ensuring your values and your capital survive for generations. It's about moving from 'rich kid' problems to 'stewardship' solutions.",
    tools: ['Family Constitution Template', 'Trust Structure Map', 'Heir Curriculum']
  },
  'sovereign-flags': {
    modules: [
      { id: 1, title: 'Flag Theory 101', duration: '20 min', status: 'completed' },
      { id: 2, title: 'Second Passports', duration: '30 min', status: 'active' },
      { id: 3, title: 'Tax Residency', duration: '25 min', status: 'locked' },
      { id: 4, title: 'Offshore Banking', duration: '35 min', status: 'locked' },
    ],
    network: [
      { name: 'Henley & Partners', type: 'Citizenship', access: 'Direct' },
      { name: 'Offshore Banks', type: 'Finance', access: 'Intro' },
      { name: 'International Tax Counsel', type: 'Legal', access: 'Direct' },
    ],
    insight: "Don't go where you're tolerated; go where you're celebrated. Sovereign Flags is about diversifying your political risk. If one government turns on you, you have three others ready to welcome you.",
    tools: ['Residency Tracker', 'Passport Index', 'Tax Treaty Matrix']
  },
  'asymmetric-bets': {
    modules: [
      { id: 1, title: 'Power Law Dynamics', duration: '15 min', status: 'completed' },
      { id: 2, title: 'Tail Risk Hedging', duration: '25 min', status: 'active' },
      { id: 3, title: 'Angel Investing', duration: '30 min', status: 'locked' },
      { id: 4, title: 'Crypto & Frontier', duration: '20 min', status: 'locked' },
    ],
    network: [
      { name: 'Seed Funds', type: 'Venture', access: 'Direct' },
      { name: 'Macro Strategists', type: 'Hedge Fund', access: 'Intro' },
      { name: 'Crypto OTC Desks', type: 'Trading', access: 'Direct' },
    ],
    insight: "You don't get rich by being right 51% of the time. You get rich by being right once when the payout is 1000x. Asymmetric bets are about capping your downside while leaving your upside uncapped.",
    tools: ['Kelly Criterion Calculator', 'Portfolio Heatmap', 'Thesis Generator']
  },
  'ascendance': {
    modules: [
      { id: 1, title: 'First Principles', duration: '20 min', status: 'completed' },
      { id: 2, title: 'Mental Models', duration: '30 min', status: 'active' },
      { id: 3, title: 'Decision Hygiene', duration: '25 min', status: 'locked' },
      { id: 4, title: 'Information Diet', duration: '15 min', status: 'locked' },
    ],
    network: [
      { name: 'Think Tanks', type: 'Research', access: 'Intro' },
      { name: 'Mastermind Groups', type: 'Peer', access: 'Direct' },
      { name: 'Executive Coaches', type: 'Performance', access: 'Direct' },
    ],
    insight: "The ultimate leverage is your mind. Ascendance is the practice of upgrading your operating system. Better inputs, better processing, better outputs. It's about seeing the matrix while others are just living in it.",
    tools: ['Decision Journal', 'Reading List', 'Mental Model Deck']
  },
};

// Helper to generate generic lessons for structure demonstration
const generateLessons = (count: number, topic: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `l-${Math.random()}`,
    title: `${topic}: Part ${i + 1}`,
    duration: `${10 + Math.floor(Math.random() * 20)} min`,
    isCompleted: false
  }));
};

// The 12 Core Areas of the Billionaire Curriculum (Legacy Structure - Keeping for reference if needed)
export const BILLIONAIRE_PATH: Record<string, CurriculumArea> = {
  'reality-distortion': {
    id: 'reality-distortion',
    title: 'Reality Distortion',
    description: 'A billion-dollar vision attracts capital, talent, media; essential for IPO-level growth.',
    colorTheme: 'orange',
    trainings: [
      {
        id: 'rd1', title: 'Belief & Audacity', description: 'Why It Works: Belief, audacity, conviction, clarity, momentum.',
        topics: [
          { id: 'rd-t1', title: 'Visionary Framework', lessons: generateLessons(5, 'Vision') },
          { id: 'rd-t2', title: 'Audacity Calibration', lessons: generateLessons(5, 'Audacity') },
          { id: 'rd-t3', title: 'Conviction Building', lessons: generateLessons(5, 'Conviction') },
          { id: 'rd-t4', title: 'Clarity of Purpose', lessons: generateLessons(5, 'Clarity') },
          { id: 'rd-t5', title: 'Momentum Generation', lessons: generateLessons(5, 'Momentum') },
        ]
      }
    ]
  },
  // ... (Other legacy paths can remain or be removed if fully replaced by SKILL_DATA)
};

export const MOCK_MARKETS: MarketAsset[] = [
  // Indexes
  { symbol: 'ES1!', name: 'S&P 500 Futures', price: 5480.50, change: 12.25, changePercent: 0.22, category: 'Indexes' },
  { symbol: 'NQ1!', name: 'NASDAQ Futures', price: 19240.00, change: 85.50, changePercent: 0.45, category: 'Indexes' },
  { symbol: 'RTY1!', name: 'Russell 2000', price: 2088.30, change: 18.20, changePercent: 0.88, category: 'Indexes' },
  { symbol: 'YM1!', name: 'Dow Jones Futures', price: 39850.00, change: -45.00, changePercent: -0.11, category: 'Indexes' },
  { symbol: 'VIX', name: 'Volatility Index', price: 13.45, change: -0.25, changePercent: -1.80, category: 'Indexes' },
  { symbol: 'DXY', name: 'US Dollar Index', price: 104.25, change: 0.15, changePercent: 0.14, category: 'Indexes' },

  // Bonds
  { symbol: 'US10Y', name: '10Y Treasury', price: 4.42, change: -0.02, changePercent: -0.45, category: 'Bonds' },
  { symbol: 'US02Y', name: '2Y Treasury', price: 4.85, change: 0.01, changePercent: 0.21, category: 'Bonds' },
  { symbol: 'TLT', name: '20Y+ Treasury ETF', price: 92.50, change: 0.45, changePercent: 0.49, category: 'Bonds' },

  // Crypto
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 68450.00, change: 1200.00, changePercent: 1.78, category: 'Crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum', price: 3850.00, change: 92.00, changePercent: 2.45, category: 'Crypto' },
  { symbol: 'SOLUSD', name: 'Solana', price: 145.20, change: 5.50, changePercent: 3.94, category: 'Crypto' },
  { symbol: 'XRPUSD', name: 'XRP', price: 0.62, change: -0.01, changePercent: -1.50, category: 'Crypto' },

  // Commodities
  { symbol: 'CL1!', name: 'Crude Oil', price: 78.40, change: 1.20, changePercent: 1.55, category: 'Commodities' },
  { symbol: 'GC1!', name: 'Gold Futures', price: 2185.40, change: 4.50, changePercent: 0.21, category: 'Commodities' },
  { symbol: 'SI1!', name: 'Silver Futures', price: 25.85, change: 0.35, changePercent: 1.37, category: 'Commodities' },
  { symbol: 'HG1!', name: 'Copper Futures', price: 4.12, change: 0.08, changePercent: 1.98, category: 'Commodities' },
  { symbol: 'NG1!', name: 'Natural Gas', price: 1.85, change: -0.05, changePercent: -2.60, category: 'Commodities' },

  // Forex
  { symbol: 'EURUSD', name: 'Euro/USD', price: 1.0845, change: 0.0015, changePercent: 0.14, category: 'Forex' },
  { symbol: 'USDJPY', name: 'USD/Yen', price: 151.20, change: 0.45, changePercent: 0.30, category: 'Forex' },
  { symbol: 'GBPUSD', name: 'Pound/USD', price: 1.2650, change: 0.0020, changePercent: 0.16, category: 'Forex' },
  { symbol: 'USDCHF', name: 'USD/Swiss Franc', price: 0.9050, change: 0.0010, changePercent: 0.11, category: 'Forex' },
  { symbol: 'AUDUSD', name: 'Aus Dollar/USD', price: 0.6540, change: -0.0030, changePercent: -0.46, category: 'Forex' },

  // Stocks
  { symbol: 'NVDA', name: 'NVIDIA', price: 950.00, change: 15.00, changePercent: 1.60, category: 'Stocks' },
  { symbol: 'AAPL', name: 'Apple', price: 178.25, change: 1.25, changePercent: 0.70, category: 'Stocks' },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: 3.80, changePercent: 0.92, category: 'Stocks' },
  { symbol: 'GOOGL', name: 'Alphabet', price: 142.50, change: 2.10, changePercent: 1.50, category: 'Stocks' },
  { symbol: 'AMZN', name: 'Amazon', price: 175.00, change: -1.50, changePercent: -0.85, category: 'Stocks' },
  { symbol: 'TSLA', name: 'Tesla', price: 175.50, change: 5.50, changePercent: 3.20, category: 'Stocks' },
  { symbol: 'META', name: 'Meta Platforms', price: 495.00, change: 8.20, changePercent: 1.68, category: 'Stocks' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 410.20, change: 2.50, changePercent: 0.61, category: 'Stocks' },
];

export const INTELLIGENCE_CONTENT: ContentItem[] = [
  { id: '1', title: 'The Art of the Exit', guest: 'Marc Andreessen', duration: '18 min', category: 'Strategy', thumbnailColor: 'bg-art-orange' },
  { id: '2', title: 'Designing 100 Year Legacies', guest: 'Laurene Powell Jobs', duration: '22 min', category: 'Legacy', thumbnailColor: 'bg-art-blue' },
  { id: '3', title: 'Risk Asymmetry', guest: 'George Soros', duration: '15 min', category: 'Investing', thumbnailColor: 'bg-art-green' },
  { id: '4', title: 'Creative Destruction', guest: 'Elon Musk', duration: '25 min', category: 'Innovation', thumbnailColor: 'bg-art-yellow' },
  { id: '5', title: 'The Family Office Stack', guest: 'Jared Kushner', duration: '12 min', category: 'Operations', thumbnailColor: 'bg-art-orange', locked: true },
  { id: '6', title: 'Art as an Asset Class', guest: 'Larry Gagosian', duration: '20 min', category: 'Alternative', thumbnailColor: 'bg-art-blue', locked: true },
];

export const STUDIO_CONTENT = INTELLIGENCE_CONTENT;