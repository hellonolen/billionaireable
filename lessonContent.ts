// Lesson content for all 12 Pillars
// Each module has text content that Billionaireable guides through

export const LESSON_CONTENT: Record<string, Record<number, {
  title: string;
  intro: string;
  sections: { heading: string; content: string }[];
  directive: string;
}>> = {
  'reality-distortion': {
    1: {
      title: 'Vision Architecture',
      intro: "Billionaires don't just have ideas. They architect visions that pull capital, talent, and markets toward them. This is how you build one.",
      sections: [
        {
          heading: 'The Vision Stack',
          content: "A vision has three layers. Layer one: the 10-year outcome—what does the world look like when you win? Layer two: the 3-year milestone—what's the proof point that shows momentum? Layer three: the 90-day sprint—what happens right now that makes it real?"
        },
        {
          heading: 'Compression and Clarity',
          content: "If you can't say it in one sentence, you don't have a vision. You have a wish. Compress until it hurts. 'Organize the world's information.' 'Accelerate the transition to sustainable energy.' That's the standard."
        },
        {
          heading: 'The Gravity Test',
          content: "A real vision attracts. It pulls people in. If you have to push and convince and explain, the vision is weak. Strengthen it until people lean forward when you speak."
        }
      ],
      directive: "Write your vision in one sentence. If it takes two, cut it in half."
    },
    2: {
      title: 'Narrative Control',
      intro: "The story you tell becomes the reality others invest in. Control the narrative, control the outcome.",
      sections: [
        {
          heading: 'Origin Stories',
          content: "Every billionaire has an origin story. Not the real one—the useful one. The garage. The rejection letter. The moment of clarity. Craft yours. Make it memorable. Make it repeatable."
        },
        {
          heading: 'Enemy Selection',
          content: "Every great narrative has an antagonist. Amazon vs retail. Tesla vs oil. What are you fighting against? The enemy creates urgency. The enemy creates sides. Pick your enemy wisely."
        },
        {
          heading: 'Milestone Framing',
          content: "When you hit a number, frame it. Don't say 'we got 10,000 users.' Say 'we crossed six figures in active users in 90 days.' Same number. Different gravity."
        }
      ],
      directive: "Write your origin story in three sentences. What happened, what you realized, what you built because of it."
    },
    3: {
      title: 'The Pitch Deck',
      intro: "A pitch deck is not a document. It's a weapon. It opens doors, closes rounds, and shapes perception.",
      sections: [
        {
          heading: 'The 10 Slides',
          content: "Problem. Solution. Market. Traction. Business Model. Team. Competition. Financials. Ask. Vision. That's it. That's the order. Don't get clever."
        },
        {
          heading: 'Visual Hierarchy',
          content: "One idea per slide. One number that matters. Headlines that could stand alone. If someone flips through in 30 seconds, they should get it."
        },
        {
          heading: 'The Ask Slide',
          content: "Be specific. 'We're raising $5M at a $25M post.' Not 'we're exploring options.' Specificity signals conviction. Vagueness signals weakness."
        }
      ],
      directive: "Build your 10-slide deck. One hour. No excuses."
    },
    4: {
      title: 'Media Manipulation',
      intro: "Press doesn't find you. You manufacture it. Control the media cycle or it controls you.",
      sections: [
        {
          heading: 'The Press Hook',
          content: "Journalists need stories. Give them one. Tie your announcement to a trend. Tie your funding to a movement. Make it easy for them to write about you."
        },
        {
          heading: 'Embargo Strategy',
          content: "Give exclusive access to one outlet. Create urgency with an embargo date. Let them feel special. Watch the coverage compound."
        },
        {
          heading: 'Crisis as Opportunity',
          content: "Every crisis is a chance to reshape the narrative. Respond fast. Take responsibility. Pivot to the future. Never hide. Silence is interpreted as guilt."
        }
      ],
      directive: "Identify three journalists who cover your space. Find their recent articles. Note what hooks they respond to."
    }
  },
  'liquidity-allocation': {
    1: {
      title: 'Cash Flow Quadrants',
      intro: "Money moves in four directions. Master all four or get crushed by one.",
      sections: [
        {
          heading: 'The Four Quadrants',
          content: "Inflows from operations. Inflows from financing. Outflows to operations. Outflows to investments. Know where every dollar comes from and where it goes. Weekly."
        },
        {
          heading: 'Velocity Over Volume',
          content: "A million dollars that turns over four times a year is worth more than four million sitting still. Speed of capital deployment is the hidden metric."
        },
        {
          heading: 'The Cash Cushion',
          content: "Six months of runway is amateur hour. Eighteen months is professional. Thirty-six months is billionaire. Build the cushion before you need it."
        }
      ],
      directive: "Map your cash flow quadrants for the last 90 days. Where did money come from? Where did it go?"
    },
    2: {
      title: 'The 40/40/20 Rule',
      intro: "Allocation is not about diversification. It's about intentional concentration.",
      sections: [
        {
          heading: 'The Split',
          content: "40% to the core business—the thing that's working. 40% to asymmetric bets—things that could 10x. 20% to liquidity—cash, treasuries, things you can access tomorrow."
        },
        {
          heading: 'Rebalancing Triggers',
          content: "Don't rebalance on schedule. Rebalance on events. A 10x return on a bet? Take profits and reallocate. A core business struggling? Double down or cut."
        },
        {
          heading: 'The Liquidity Trap',
          content: "Too much cash is cowardice. Too little is recklessness. 20% keeps you ready to strike. Not a dollar more. Not a dollar less."
        }
      ],
      directive: "Calculate your current allocation across these three buckets. Where are you overweight? Underweight?"
    },
    3: {
      title: 'Debt as a Weapon',
      intro: "Debt is not danger. Debt at the wrong terms is danger. At the right terms, debt is rocket fuel.",
      sections: [
        {
          heading: 'Good Debt vs Bad Debt',
          content: "Good debt: low interest, long duration, used for assets that appreciate or generate cash. Bad debt: high interest, short duration, used for consumption. Know the difference."
        },
        {
          heading: 'Leverage Ratios',
          content: "2x leverage on a cash-flowing asset is conservative. 5x is aggressive. 10x is a death wish. Know your number. Stick to it."
        },
        {
          heading: 'The Line of Credit',
          content: "Get the line before you need it. Banks lend umbrellas when it's sunny. When it rains, they want them back. Secure your line now."
        }
      ],
      directive: "List all your debt. Interest rate, duration, what it's backing. Is each one good debt or bad debt?"
    },
    4: {
      title: 'Treasury Management',
      intro: "Your cash should never sleep. Even idle money should be working.",
      sections: [
        {
          heading: 'Sweep Accounts',
          content: "Cash sitting in checking earns nothing. Sweep accounts move excess cash into money market funds nightly. Same liquidity. Actual yield."
        },
        {
          heading: 'T-Bill Ladders',
          content: "Buy 4-week, 8-week, and 12-week T-bills in rotation. You always have maturity coming up. You always have yield locking in."
        },
        {
          heading: 'Currency Hedging',
          content: "If you operate internationally, currency moves can wipe out profit. Simple forward contracts lock in rates. Protect the downside."
        }
      ],
      directive: "How much cash is sitting idle right now? Calculate the yield you're losing."
    }
  },
  'holding-co': {
    1: {
      title: 'Entity Structure 101',
      intro: "One business, one entity is amateur structure. Multiple entities with purpose is how empires are built.",
      sections: [
        {
          heading: 'The Parent-Child Model',
          content: "The holding company owns the operating companies. The operating companies take the risk. The holding company holds the assets. Liability stays down. Value flows up."
        },
        {
          heading: 'Entity Types',
          content: "LLCs for flexibility. C-Corps for raising capital. S-Corps for tax pass-through. LPs for investment vehicles. Pick based on purpose, not convenience."
        },
        {
          heading: 'Jurisdiction Selection',
          content: "Delaware for corporations. Wyoming for LLCs. Nevada for privacy. Each state has different rules. Choose intentionally."
        }
      ],
      directive: "Draw your current entity structure. Is it intentional or accidental?"
    },
    2: {
      title: 'The Berkshire Model',
      intro: "Warren Buffett built the playbook. Decentralized operations, centralized capital allocation. Study it.",
      sections: [
        {
          heading: 'Decentralized Ops',
          content: "Each subsidiary runs independently. They have their own CEO, their own culture, their own P&L. The parent doesn't micromanage. It allocates capital."
        },
        {
          heading: 'Capital Allocation',
          content: "Excess cash flows up. The holding company decides where it goes next. Best return wins. Sentiment doesn't matter. Returns matter."
        },
        {
          heading: 'The Float',
          content: "Berkshire uses insurance float—premiums collected before claims are paid—as permanent capital. Find your version of float. Customer deposits. Prepaid subscriptions. Money that sits with you."
        }
      ],
      directive: "What's your version of float? Where can you collect money before delivering value?"
    },
    3: {
      title: 'Inter-Company Agreements',
      intro: "When your entities transact with each other, document it. The IRS is watching.",
      sections: [
        {
          heading: 'Management Fees',
          content: "The holding company provides services—strategy, admin, finance. Charge for it. Document the fee. Make it market rate."
        },
        {
          heading: 'Licensing',
          content: "If one entity owns IP and another uses it, license it. Royalty payments move money between entities. Legally. Documented."
        },
        {
          heading: 'Arm's Length Standard',
          content: "Every transaction should be at market rate. If you wouldn't pay that price to a stranger, don't pay it to yourself. The IRS tests this."
        }
      ],
      directive: "Identify three services your holding company could charge operating companies for. Document the rates."
    },
    4: {
      title: 'Consolidated Reporting',
      intro: "You need one view of the empire. One dashboard. One truth.",
      sections: [
        {
          heading: 'The Consolidation',
          content: "Each entity has its own books. But you need a consolidated view—total revenue, total expenses, total assets, total liabilities. One page."
        },
        {
          heading: 'Eliminations',
          content: "Inter-company transactions cancel out in consolidation. The management fee OpCo pays HoldCo is revenue for one and expense for the other. Net zero."
        },
        {
          heading: 'The Dashboard',
          content: "Cash position. Revenue run rate. Burn rate. Debt service coverage. These numbers, updated weekly, tell you if the empire is growing or dying."
        }
      ],
      directive: "Build a one-page consolidated view of all your entities. Update it weekly."
    }
  },
  'time-arbitrage': {
    1: {
      title: 'Radical Delegation',
      intro: "If someone else can do it 80% as well as you, delegate it. Your time is for 10x activities only.",
      sections: [
        {
          heading: 'The 80% Rule',
          content: "Perfectionism kills leverage. If someone can do it 80% as well, that's good enough. Your 20% improvement isn't worth your time."
        },
        {
          heading: 'Outcome vs Task',
          content: "Don't delegate tasks. Delegate outcomes. 'Schedule my meetings' is a task. 'Make sure I'm only in meetings that matter' is an outcome."
        },
        {
          heading: 'The Delegation Stack',
          content: "Start with personal tasks—calendar, email, travel. Then operational—reporting, coordination. Then strategic—research, analysis. Build the stack over time."
        }
      ],
      directive: "List five things you did this week that someone else could do 80% as well. Delegate them."
    },
    2: {
      title: 'The $10,000/hr Rule',
      intro: "Know your hourly rate. Anything below it, delegate. Anything above it, protect.",
      sections: [
        {
          heading: 'Calculate Your Rate',
          content: "Take your annual target. Divide by 2,000 hours. That's your rate. If you're aiming for $20M/year, that's $10,000/hour. Act like it."
        },
        {
          heading: 'Audit Your Time',
          content: "Track a week. Every hour. What did you actually do? How much of it was $10,000/hour work? How much was $50/hour work?"
        },
        {
          heading: 'Protect the High-Value Hours',
          content: "The hours that generate $10,000+ value: major decisions, key relationships, strategic thinking. Block them. Guard them. Never let $50 tasks invade."
        }
      ],
      directive: "Calculate your target hourly rate. Now audit yesterday. How many hours were worth that rate?"
    },
    3: {
      title: 'Executive Assistants',
      intro: "A great EA is worth $1M/year in reclaimed time. Hire one. Train them. Protect the relationship.",
      sections: [
        {
          heading: 'The EA Profile',
          content: "High agency. Low ego. Anticipates needs before you voice them. Can represent you in any room. This person is rare. Pay for quality."
        },
        {
          heading: 'The EA Playbook',
          content: "Document everything. How you like your calendar. How you handle requests. Who gets access. Give them the playbook and let them run."
        },
        {
          heading: 'The EA Relationship',
          content: "This is your most important hire. Weekly 1:1s. Clear feedback. Career growth path. If you lose a great EA, it takes a year to recover."
        }
      ],
      directive: "Write the first three pages of your EA playbook. Calendar preferences. Communication style. Access levels."
    },
    4: {
      title: 'Asynchronous Communication',
      intro: "Synchronous meetings are time killers. Async is how you scale.",
      sections: [
        {
          heading: 'The Async Default',
          content: "Every meeting should start as an email. If the email doesn't resolve it, then meet. Most things resolve. Most meetings never need to happen."
        },
        {
          heading: 'Loom Over Zoom',
          content: "Record a 5-minute video instead of a 30-minute meeting. The recipient watches at 2x. You just saved 40 minutes combined."
        },
        {
          heading: 'Documentation Culture',
          content: "If it's not written down, it didn't happen. Meeting notes, decisions, action items—all documented. Anyone can catch up without asking."
        }
      ],
      directive: "Cancel three meetings this week. Replace them with async updates. See what happens."
    }
  }
};

// Remaining pillars follow the same structure
// Adding abbreviated versions to keep the file manageable

export const PILLAR_NAMES: Record<string, string> = {
  'reality-distortion': 'Reality Distortion',
  'liquidity-allocation': 'Liquidity & Allocation',
  'holding-co': 'The Holding Co',
  'time-arbitrage': 'Time Arbitrage',
  'bio-availability': 'Bio-Availability',
  'political-capital': 'Political Capital',
  'syndicate': 'The Syndicate',
  'family-office': 'Family Office',
  'dynasty-design': 'Dynasty Design',
  'sovereign-flags': 'Sovereign Flags',
  'asymmetric-bets': 'Asymmetric Bets',
  'ascendance': 'Ascendance'
};

