// Lesson content for all 12 Pillars
// This is what billionaires do. Direct. Commanding. No fluff.

export const LESSON_CONTENT: Record<string, Record<number, {
  title: string;
  intro: string;
  sections: { heading: string; content: string }[];
  directive: string;
}>> = {
  'reality-distortion': {
    1: {
      title: 'Vision Architecture',
      intro: "This is what billionaires do. They architect visions that pull capital, talent, and markets toward them. Not the other way around.",
      sections: [
        {
          heading: 'The Vision Stack',
          content: "Three layers. Layer one: the 10-year outcome. What does the world look like when you win? Layer two: the 3-year milestone. What's the proof point? Layer three: the 90-day sprint. What happens right now? Stack them. Know them cold."
        },
        {
          heading: 'Compression',
          content: "If you can't say it in one sentence, you don't have a vision. You have a wish. 'Organize the world's information.' 'Accelerate the transition to sustainable energy.' That's the standard. Compress until it hurts."
        },
        {
          heading: 'Gravity',
          content: "A real vision attracts. It pulls people in. If you have to push and convince and explain, the vision is weak. Strengthen it until people lean forward when you speak."
        }
      ],
      directive: "Write it in one sentence. If it takes two, cut it in half. Do it now."
    },
    2: {
      title: 'Narrative Control',
      intro: "The story you tell becomes the reality others invest in. Control the narrative. Control the outcome.",
      sections: [
        {
          heading: 'Origin Stories',
          content: "Every billionaire has one. Not the real one. The useful one. The garage. The rejection letter. The moment of clarity. Craft it. Make it memorable. Make it repeatable."
        },
        {
          heading: 'Enemy Selection',
          content: "Every great narrative has an antagonist. Amazon vs retail. Tesla vs oil. What are you fighting against? The enemy creates urgency. The enemy creates sides. Pick wisely."
        },
        {
          heading: 'Milestone Framing',
          content: "When you hit a number, frame it. Don't say 'we got 10,000 users.' Say 'we crossed six figures in active users in 90 days.' Same number. Different gravity."
        }
      ],
      directive: "Write the origin story. Three sentences. What happened. What you realized. What you built because of it."
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
          content: "One idea per slide. One number that matters. Headlines that could stand alone. If someone flips through in 30 seconds, they get it. Or they don't."
        },
        {
          heading: 'The Ask',
          content: "Be specific. 'We're raising $5M at a $25M post.' Not 'we're exploring options.' Specificity signals conviction. Vagueness signals weakness."
        }
      ],
      directive: "Build the 10-slide deck. One hour. No excuses. Start now."
    },
    4: {
      title: 'Media Manipulation',
      intro: "Press doesn't find you. You manufacture it. Control the media cycle or it controls you.",
      sections: [
        {
          heading: 'The Press Hook',
          content: "Journalists need stories. Give them one. Tie the announcement to a trend. Tie the funding to a movement. Make it easy for them to write about you."
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
      directive: "Identify three journalists who cover this space. Find their recent work. Note what hooks they respond to. This week."
    }
  },
  'liquidity-allocation': {
    1: {
      title: 'Cash Flow Quadrants',
      intro: "Money moves in four directions. Master all four. Or get crushed by one.",
      sections: [
        {
          heading: 'The Four Quadrants',
          content: "Inflows from operations. Inflows from financing. Outflows to operations. Outflows to investments. Know where every dollar comes from and where it goes. Weekly. Not monthly. Weekly."
        },
        {
          heading: 'Velocity Over Volume',
          content: "A million dollars that turns over four times a year is worth more than four million sitting still. Speed of capital deployment is the hidden metric. Track it."
        },
        {
          heading: 'The Cash Cushion',
          content: "Six months of runway is amateur hour. Eighteen months is professional. Thirty-six months is billionaire. Build the cushion before you need it."
        }
      ],
      directive: "Map the cash flow quadrants for the last 90 days. Where did money come from? Where did it go? Do it today."
    },
    2: {
      title: 'The 40/40/20 Rule',
      intro: "Allocation is not about diversification. It's about intentional concentration.",
      sections: [
        {
          heading: 'The Split',
          content: "40% to the core business. The thing that's working. 40% to asymmetric bets. Things that could 10x. 20% to liquidity. Cash, treasuries, things accessible tomorrow."
        },
        {
          heading: 'Rebalancing Triggers',
          content: "Don't rebalance on schedule. Rebalance on events. A 10x return on a bet? Take profits and reallocate. Core business struggling? Double down or cut. Events. Not calendars."
        },
        {
          heading: 'The Liquidity Trap',
          content: "Too much cash is cowardice. Too little is recklessness. 20% keeps you ready to strike. Not a dollar more. Not a dollar less."
        }
      ],
      directive: "Calculate current allocation across these three buckets. Where overweight? Where underweight? Fix it."
    },
    3: {
      title: 'Debt as a Weapon',
      intro: "Debt is not danger. Debt at the wrong terms is danger. At the right terms, debt is rocket fuel.",
      sections: [
        {
          heading: 'Good Debt vs Bad Debt',
          content: "Good debt: low interest, long duration, used for assets that appreciate or generate cash. Bad debt: high interest, short duration, used for consumption. Know the difference. Act on it."
        },
        {
          heading: 'Leverage Ratios',
          content: "2x leverage on a cash-flowing asset is conservative. 5x is aggressive. 10x is a death wish. Know the number. Stick to it."
        },
        {
          heading: 'The Line of Credit',
          content: "Get the line before you need it. Banks lend umbrellas when it's sunny. When it rains, they want them back. Secure it now."
        }
      ],
      directive: "List all debt. Interest rate, duration, what it's backing. Good debt or bad debt? Get clear."
    },
    4: {
      title: 'Treasury Management',
      intro: "Cash should never sleep. Even idle money should be working.",
      sections: [
        {
          heading: 'Sweep Accounts',
          content: "Cash sitting in checking earns nothing. Sweep accounts move excess cash into money market funds nightly. Same liquidity. Actual yield. Set it up."
        },
        {
          heading: 'T-Bill Ladders',
          content: "Buy 4-week, 8-week, and 12-week T-bills in rotation. Always have maturity coming up. Always have yield locking in. Simple. Effective."
        },
        {
          heading: 'Currency Hedging',
          content: "If you operate internationally, currency moves can wipe out profit. Simple forward contracts lock in rates. Protect the downside."
        }
      ],
      directive: "How much cash is sitting idle right now? Calculate the yield being lost. Fix it this week."
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
          content: "LLCs for flexibility. C-Corps for raising capital. S-Corps for tax pass-through. LPs for investment vehicles. Pick based on purpose. Not convenience."
        },
        {
          heading: 'Jurisdiction Selection',
          content: "Delaware for corporations. Wyoming for LLCs. Nevada for privacy. Each state has different rules. Choose intentionally."
        }
      ],
      directive: "Draw current entity structure. Is it intentional or accidental? If accidental, fix it."
    },
    2: {
      title: 'The Berkshire Model',
      intro: "Buffett built the playbook. Decentralized operations, centralized capital allocation. Study it.",
      sections: [
        {
          heading: 'Decentralized Ops',
          content: "Each subsidiary runs independently. Own CEO, own culture, own P&L. The parent doesn't micromanage. It allocates capital. Period."
        },
        {
          heading: 'Capital Allocation',
          content: "Excess cash flows up. The holding company decides where it goes next. Best return wins. Sentiment doesn't matter. Returns matter."
        },
        {
          heading: 'The Float',
          content: "Berkshire uses insurance float. Premiums collected before claims are paid. Permanent capital. Find the version of float. Customer deposits. Prepaid subscriptions. Money that sits."
        }
      ],
      directive: "What's the version of float? Where can you collect money before delivering value? Find it."
    },
    3: {
      title: 'Inter-Company Agreements',
      intro: "When entities transact with each other, document it. The IRS is watching.",
      sections: [
        {
          heading: 'Management Fees',
          content: "The holding company provides services. Strategy, admin, finance. Charge for it. Document the fee. Make it market rate."
        },
        {
          heading: 'Licensing',
          content: "If one entity owns IP and another uses it, license it. Royalty payments move money between entities. Legally. Documented."
        },
        {
          heading: 'Arms Length Standard',
          content: "Every transaction at market rate. If you wouldn't pay that price to a stranger, don't pay it to yourself. The IRS tests this."
        }
      ],
      directive: "Identify three services the holding company could charge operating companies for. Document the rates."
    },
    4: {
      title: 'Consolidated Reporting',
      intro: "One view of the empire. One dashboard. One truth.",
      sections: [
        {
          heading: 'The Consolidation',
          content: "Each entity has its own books. But there's one consolidated view. Total revenue, total expenses, total assets, total liabilities. One page."
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
      directive: "Build a one-page consolidated view of all entities. Update it weekly. Start now."
    }
  },
  'time-arbitrage': {
    1: {
      title: 'Radical Delegation',
      intro: "If someone else can do it 80% as well, delegate it. Time is for 10x activities only.",
      sections: [
        {
          heading: 'The 80% Rule',
          content: "Perfectionism kills leverage. If someone can do it 80% as well, that's good enough. The 20% improvement isn't worth the time. Let it go."
        },
        {
          heading: 'Outcome vs Task',
          content: "Don't delegate tasks. Delegate outcomes. 'Schedule meetings' is a task. 'Make sure I'm only in meetings that matter' is an outcome. Big difference."
        },
        {
          heading: 'The Delegation Stack',
          content: "Start with personal tasks. Calendar, email, travel. Then operational. Reporting, coordination. Then strategic. Research, analysis. Build the stack over time."
        }
      ],
      directive: "List five things done this week that someone else could do 80% as well. Delegate them. Tomorrow."
    },
    2: {
      title: 'The $10,000/hr Rule',
      intro: "Know the hourly rate. Anything below it, delegate. Anything above it, protect.",
      sections: [
        {
          heading: 'Calculate The Rate',
          content: "Take the annual target. Divide by 2,000 hours. That's the rate. Aiming for $20M/year? That's $10,000/hour. Act like it."
        },
        {
          heading: 'Audit The Time',
          content: "Track a week. Every hour. What actually happened? How much of it was $10,000/hour work? How much was $50/hour work? Be honest."
        },
        {
          heading: 'Protect The High-Value Hours',
          content: "The hours that generate $10,000+ value: major decisions, key relationships, strategic thinking. Block them. Guard them. Never let $50 tasks invade."
        }
      ],
      directive: "Calculate target hourly rate. Audit yesterday. How many hours were worth that rate? Fix the ratio."
    },
    3: {
      title: 'Executive Assistants',
      intro: "A great EA is worth $1M/year in reclaimed time. Hire one. Train them. Protect the relationship.",
      sections: [
        {
          heading: 'The EA Profile',
          content: "High agency. Low ego. Anticipates needs before voiced. Can represent you in any room. This person is rare. Pay for quality."
        },
        {
          heading: 'The EA Playbook',
          content: "Document everything. How the calendar works. How requests are handled. Who gets access. Give them the playbook and let them run."
        },
        {
          heading: 'The EA Relationship',
          content: "This is the most important hire. Weekly 1:1s. Clear feedback. Career growth path. If you lose a great EA, it takes a year to recover."
        }
      ],
      directive: "Write the first three pages of the EA playbook. Calendar preferences. Communication style. Access levels."
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
          content: "Record a 5-minute video instead of a 30-minute meeting. The recipient watches at 2x. 40 minutes saved combined. Do the math."
        },
        {
          heading: 'Documentation Culture',
          content: "If it's not written down, it didn't happen. Meeting notes, decisions, action items. All documented. Anyone can catch up without asking."
        }
      ],
      directive: "Cancel three meetings this week. Replace them with async updates. See what happens."
    }
  },
  'bio-availability': {
    1: {
      title: 'Sleep Architecture',
      intro: "Sleep is the foundation. Without it, everything else falls apart. This is what billionaires do.",
      sections: [
        {
          heading: 'The Non-Negotiable',
          content: "7-8 hours. Non-negotiable. Sleep deprivation is not a badge of honor. It's a liability. The research is clear. Optimize or pay the price."
        },
        {
          heading: 'Sleep Hygiene',
          content: "Dark room. Cool temperature. No screens 60 minutes before. Same time every night. Same time every morning. The body craves consistency."
        },
        {
          heading: 'Track It',
          content: "Oura. Whoop. Apple Watch. Pick one. Track deep sleep, REM, HRV. What gets measured gets managed. Know the numbers."
        }
      ],
      directive: "Track sleep for 7 nights. Note deep sleep and REM percentages. Identify the gap. Fix it."
    },
    2: {
      title: 'Nutrient Timing',
      intro: "Food is fuel. Timing is strategy. This is not about dieting. This is about performance.",
      sections: [
        {
          heading: 'The Eating Window',
          content: "16:8 or 18:6. Restrict the eating window. Let the body rest from digestion. Mental clarity increases. Energy stabilizes."
        },
        {
          heading: 'Protein Priority',
          content: "1 gram per pound of body weight. Every day. Protein builds and repairs. Prioritize it. Every meal."
        },
        {
          heading: 'Strategic Carbs',
          content: "Carbs around activity. Before workouts. After workouts. Not sitting at a desk. Time them for performance, not comfort."
        }
      ],
      directive: "Set the eating window. Track protein intake for 7 days. Hit the target or adjust."
    },
    3: {
      title: 'Hormone Optimization',
      intro: "Hormones run everything. Energy, focus, drive. Optimize them or wonder why nothing works.",
      sections: [
        {
          heading: 'Get Tested',
          content: "Full panel. Testosterone, estrogen, cortisol, thyroid, DHEA. Know the numbers. Can't fix what you don't measure."
        },
        {
          heading: 'Natural Optimization',
          content: "Lift heavy. Sleep deep. Manage stress. Sun exposure. Cold exposure. The basics work. Do them consistently."
        },
        {
          heading: 'When To Intervene',
          content: "If levels are clinically low, work with a specialist. TRT, thyroid support, whatever it takes. Performance matters. Optimize without ego."
        }
      ],
      directive: "Schedule the blood panel. Get the full hormone panel. Know the numbers within 30 days."
    },
    4: {
      title: 'Cognitive Enhancement',
      intro: "The brain is the ultimate asset. Protect it. Enhance it. This is what billionaires do.",
      sections: [
        {
          heading: 'Foundation First',
          content: "Sleep, nutrition, exercise. Before any supplement or nootropic. The foundation has to be solid. No shortcut replaces the basics."
        },
        {
          heading: 'Strategic Stacking',
          content: "Caffeine + L-theanine. Creatine for brain function. Omega-3s for inflammation. Simple stacks with research behind them."
        },
        {
          heading: 'Protect The Asset',
          content: "Limit alcohol. Eliminate processed food. Manage blood sugar. The brain is sensitive. Treat it with respect."
        }
      ],
      directive: "Audit the current stack. What's in? What's out? What's missing? Optimize this week."
    }
  },
  'political-capital': {
    1: {
      title: 'Power Mapping',
      intro: "Know who has power. Know how they use it. Know how to access it. This is what billionaires do.",
      sections: [
        {
          heading: 'The Power Grid',
          content: "Map the players. Who makes decisions? Who influences decisions? Who blocks decisions? Draw the grid. Update it quarterly."
        },
        {
          heading: 'Formal vs Informal',
          content: "Formal power has titles. Informal power has relationships. Both matter. Often informal power matters more. Know the difference."
        },
        {
          heading: 'Access Points',
          content: "Who can get you in the room? Not the decision maker. The person who knows them. Build access points at every level."
        }
      ],
      directive: "Draw the power map for one key relationship or deal. Identify the access points. Work them."
    },
    2: {
      title: 'The Favor Bank',
      intro: "Give before you take. Deposit before you withdraw. This is the currency of influence.",
      sections: [
        {
          heading: 'Deposits First',
          content: "Introductions. Information. Opportunities. Give without expecting return. The favor bank compounds. Deposits today, withdrawals later."
        },
        {
          heading: 'Track The Balance',
          content: "Know who owes you. Know who you owe. Don't keep explicit score. But keep implicit awareness. Balance matters."
        },
        {
          heading: 'Strategic Withdrawals',
          content: "When you ask for something, make it specific. Make it easy to say yes. Don't waste withdrawals on things that don't matter."
        }
      ],
      directive: "Make three deposits this week. No ask attached. Pure value. See what happens."
    },
    3: {
      title: 'Lobbying Basics',
      intro: "Government shapes markets. Markets shape outcomes. Understand the game. Play it.",
      sections: [
        {
          heading: 'Know The System',
          content: "Local, state, federal. Each has different levers. Know which level affects the business. Focus there."
        },
        {
          heading: 'Build Relationships Early',
          content: "Meet officials before you need them. Contribute to causes they care about. Show up at events. Be known before the ask."
        },
        {
          heading: 'Coalitions Over Individuals',
          content: "One voice is easy to ignore. Industry coalitions, trade associations, aligned interests. Numbers create pressure. Build the coalition."
        }
      ],
      directive: "Identify three government relationships that would matter. Start building one this month."
    },
    4: {
      title: 'Crisis Management',
      intro: "Crisis is inevitable. How you respond defines you. This is what separates winners from victims.",
      sections: [
        {
          heading: 'Speed Wins',
          content: "First 24 hours matter most. Fast response controls the narrative. Slow response lets others write the story."
        },
        {
          heading: 'Take Responsibility',
          content: "Own what's ownable. Don't hide. Don't deflect. Accountability builds trust. Excuses destroy it."
        },
        {
          heading: 'Pivot To Future',
          content: "After taking responsibility, move forward. Here's what we're doing. Here's how it won't happen again. Action, not apology loops."
        }
      ],
      directive: "Write the crisis response template now. Before the crisis. Have it ready. Update it quarterly."
    }
  },
  'syndicate': {
    1: {
      title: 'Deal Sourcing',
      intro: "The best deals don't get advertised. They flow through networks. This is what billionaires do.",
      sections: [
        {
          heading: 'Position Yourself',
          content: "Be known for something specific. AI infrastructure. Healthcare rollups. Whatever. Specificity attracts deal flow. Generalists get nothing."
        },
        {
          heading: 'The Referral Engine',
          content: "Every deal you see, ask: who else should see this? Send referrals constantly. The favor bank applies. Deals come back."
        },
        {
          heading: 'Proprietary Channels',
          content: "Operators know operators. Build relationships with founders, not just investors. They see deals before anyone else."
        }
      ],
      directive: "Define the thesis in one sentence. What deals do you want? Get specific. Broadcast it."
    },
    2: {
      title: 'Due Diligence',
      intro: "Every deal looks good in the pitch. Due diligence reveals the truth. Be rigorous.",
      sections: [
        {
          heading: 'The 5 Questions',
          content: "Why this? Why now? Why this team? Why this price? Why will it work? Answer all five. Gaps in logic are gaps in returns."
        },
        {
          heading: 'Reference Checks',
          content: "Not the references they give you. The ones they don't. Former employees. Lost customers. Failed partners. That's where truth lives."
        },
        {
          heading: 'Financial Forensics',
          content: "Cohort analysis. Unit economics. Customer concentration. Cash burn trends. The numbers tell the story. Read them carefully."
        }
      ],
      directive: "Run the 5-question framework on the next deal. Find the gaps. Decide if they're acceptable."
    },
    3: {
      title: 'Cap Table Strategy',
      intro: "The cap table is the battlefield. Structure it wrong, lose everything. Structure it right, win big.",
      sections: [
        {
          heading: 'Control Points',
          content: "Board seats. Protective provisions. Pro-rata rights. These matter more than percentages. Control the governance."
        },
        {
          heading: 'Dilution Math',
          content: "Know what happens at each round. Model the dilution. Understand when ownership becomes irrelevant. Have a walk-away number."
        },
        {
          heading: 'Clean vs Dirty',
          content: "Participating preferred. Ratchets. Cumulative dividends. These structures favor one side. Know what you're signing. Clean terms preserve optionality."
        }
      ],
      directive: "Review the cap table of one current investment. Model the next two rounds. Know the outcome."
    },
    4: {
      title: 'The Exit',
      intro: "Entry matters. Exit matters more. This is where returns are realized. Plan it from day one.",
      sections: [
        {
          heading: 'Exit Pathways',
          content: "Strategic acquisition. Financial buyer. IPO. Secondary sale. Know all four. Know which is most likely. Work backward from there."
        },
        {
          heading: 'Timing Windows',
          content: "Markets have cycles. Company readiness has phases. The window when both align is narrow. Watch for it. Be ready to move."
        },
        {
          heading: 'Negotiation Leverage',
          content: "Multiple bidders. Strong financials. No urgency. This is leverage. Build these conditions. Then negotiate from strength."
        }
      ],
      directive: "For one investment, map the exit pathway. Timeline. Likely buyers. Target price. Get specific."
    }
  },
  'family-office': {
    1: {
      title: 'SFO vs MFO',
      intro: "Single family office or multi-family office. This decision shapes everything. Choose correctly.",
      sections: [
        {
          heading: 'The Threshold',
          content: "$100M minimum for SFO to make sense. Below that, the overhead doesn't justify. MFO gives infrastructure at a fraction of the cost."
        },
        {
          heading: 'Control vs Cost',
          content: "SFO: full control, full cost. MFO: shared services, lower cost, less control. Know what matters more. Decide accordingly."
        },
        {
          heading: 'The Hybrid Model',
          content: "Core team internal. Specialized functions outsourced. Best of both. Lower cost than full SFO. More control than pure MFO."
        }
      ],
      directive: "Calculate current assets under management. Determine which model fits. If SFO makes sense, start planning."
    },
    2: {
      title: 'Hiring the CIO',
      intro: "The Chief Investment Officer runs the money. This is the most important hire. Get it right.",
      sections: [
        {
          heading: 'The Profile',
          content: "Track record that's verifiable. Philosophy aligned with yours. Ego in check. Communication skills. This person becomes your partner."
        },
        {
          heading: 'Compensation Structure',
          content: "Base plus performance. Long vesting. Clawback provisions. Aligned incentives. Structure it so winning together is the only way to win big."
        },
        {
          heading: 'The Interview',
          content: "Ask about their worst investment. Ask about disagreements with past employers. How they handle being wrong tells you everything."
        }
      ],
      directive: "Write the CIO job description. Define the philosophy. Start the search. Or evaluate the current one."
    },
    3: {
      title: 'Investment Policy',
      intro: "The Investment Policy Statement governs everything. Write it once. Follow it always.",
      sections: [
        {
          heading: 'Asset Allocation',
          content: "Target percentages by asset class. Rebalancing triggers. Maximum concentration limits. These rules prevent emotional decisions."
        },
        {
          heading: 'Risk Parameters',
          content: "Maximum drawdown tolerance. Liquidity requirements. Leverage limits. Know the boundaries. Don't cross them."
        },
        {
          heading: 'Approval Process',
          content: "Who approves what? Below $1M, CIO decides. Above $5M, family approval. Document the process. Follow it."
        }
      ],
      directive: "Draft the Investment Policy Statement. Asset allocation. Risk parameters. Approval thresholds. One document."
    },
    4: {
      title: 'Lifestyle Concierge',
      intro: "The family office handles life, not just money. Travel, health, education, security. All of it.",
      sections: [
        {
          heading: 'Travel Management',
          content: "Private aviation. Luxury travel. Security details. Someone handles all of it. Time shouldn't be spent on logistics."
        },
        {
          heading: 'Health Coordination',
          content: "Executive physicals. Specialist access. Medical records management. Concierge medicine. Health is the ultimate asset."
        },
        {
          heading: 'Family Services',
          content: "Education consulting. Estate planning coordination. Security assessments. The family office protects the family. All of it."
        }
      ],
      directive: "List all lifestyle functions currently self-managed. Identify which ones drain time. Outsource them."
    }
  },
  'dynasty-design': {
    1: {
      title: 'Generational Transfer',
      intro: "Wealth that doesn't transfer isn't wealth. It's temporary custody. Build for generations.",
      sections: [
        {
          heading: 'The Structure',
          content: "Dynasty trusts. GRATs. Family LLCs. The vehicles exist. Use them. Consult specialists. Structure it right from the start."
        },
        {
          heading: 'The Timeline',
          content: "Transfer early. Appreciation happens outside the estate. Every year of delay costs. Start the conversation now."
        },
        {
          heading: 'The Tax Efficiency',
          content: "Maximize annual exclusions. Use lifetime exemptions strategically. Work with estate attorneys and tax advisors. Don't leave money to the government."
        }
      ],
      directive: "Schedule a meeting with an estate planning specialist. This month. Review current structures. Optimize."
    },
    2: {
      title: 'Next Gen Preparation',
      intro: "Money without preparation creates problems. Prepare the heirs or lose the wealth.",
      sections: [
        {
          heading: 'Financial Literacy',
          content: "Start early. Age-appropriate education. Real responsibility with real consequences. Allowances become budgets become investments."
        },
        {
          heading: 'Work Ethic',
          content: "External jobs first. Earn outside the family business. Build identity separate from family wealth. Then bring them in."
        },
        {
          heading: 'Governance Participation',
          content: "Family meetings. Investment committee seats. Gradual responsibility increases. Prepare them to govern, not just inherit."
        }
      ],
      directive: "Create a next-gen development plan. Timeline. Milestones. Responsibilities. Make it formal."
    },
    3: {
      title: 'Family Governance',
      intro: "Families that last have rules. Constitutions. Councils. Conflict resolution. Build the system.",
      sections: [
        {
          heading: 'The Family Constitution',
          content: "Values. Mission. Decision-making process. Employment policies. Dispute resolution. All documented. All agreed upon."
        },
        {
          heading: 'Family Council',
          content: "Regular meetings. Rotating leadership. All branches represented. The forum for voice and vote. Structure creates harmony."
        },
        {
          heading: 'Conflict Protocol',
          content: "Disagreements happen. Have a process. Mediation. Arbitration. Clear escalation. Resolve before resentment builds."
        }
      ],
      directive: "Hold the first family governance meeting. Discuss values. Start the constitution. Document it."
    },
    4: {
      title: 'Legacy Definition',
      intro: "What is the legacy beyond money? Impact. Values. Institutions. Define it clearly.",
      sections: [
        {
          heading: 'Beyond Wealth',
          content: "Philanthropy. Institutions. Values that persist. What will the family be known for in 100 years? Define it. Pursue it."
        },
        {
          heading: 'Charitable Vehicles',
          content: "Private foundations. Donor-advised funds. Charitable trusts. Pick the right vehicle. Maximize impact and tax efficiency."
        },
        {
          heading: 'The Story',
          content: "Every family needs a narrative. Where we came from. What we stand for. Where we're going. Tell it. Repeat it. Live it."
        }
      ],
      directive: "Write the family legacy statement. One page. What will the family be known for in 100 years?"
    }
  },
  'sovereign-flags': {
    1: {
      title: 'Jurisdictional Arbitrage',
      intro: "Different countries have different rules. Use them strategically. This is what billionaires do.",
      sections: [
        {
          heading: 'Tax Residency',
          content: "Where you live determines what you owe. Some jurisdictions: zero income tax. Know the rules. Make intentional choices."
        },
        {
          heading: 'Corporate Domicile',
          content: "Where the company is incorporated matters. Delaware. Ireland. Singapore. Each has advantages. Structure for efficiency."
        },
        {
          heading: 'Asset Location',
          content: "Real estate, bank accounts, investments. Spread across stable jurisdictions. Political risk diversification. Don't keep everything in one place."
        }
      ],
      directive: "Map current jurisdictional exposure. Where is residency? Where are entities? Where are assets? Identify gaps."
    },
    2: {
      title: 'Second Citizenship',
      intro: "A second passport is insurance. Options matter. This is about freedom and optionality.",
      sections: [
        {
          heading: 'Investment Programs',
          content: "Portugal. Malta. Caribbean nations. Investment gets residency. Residency becomes citizenship. Know the timelines and costs."
        },
        {
          heading: 'Ancestry Paths',
          content: "Italian. Irish. Polish. Jewish. Many countries grant citizenship by descent. Check the family tree. It might be free."
        },
        {
          heading: 'Naturalization',
          content: "Live somewhere long enough, become a citizen. Some places: 3 years. Some: 10. Know the requirements. Plan the path."
        }
      ],
      directive: "Research ancestry citizenship options. Check two or three potential countries. Start the paperwork if eligible."
    },
    3: {
      title: 'Banking Diversification',
      intro: "Don't keep all money in one system. Bank across borders. Access across crises.",
      sections: [
        {
          heading: 'Multi-Currency Accounts',
          content: "USD. EUR. CHF. SGD. Hold multiple currencies. Hedge against any single currency's collapse."
        },
        {
          heading: 'Jurisdiction Selection',
          content: "Singapore. Switzerland. Channel Islands. Stable banking systems. Strong privacy laws. Diversify across them."
        },
        {
          heading: 'Access Points',
          content: "Online access from anywhere. ATM access globally. Wire capability regardless of location. Plan for access in crisis."
        }
      ],
      directive: "Open one international bank account. Different jurisdiction than home. Get it funded. Have it ready."
    },
    4: {
      title: 'Global Mobility',
      intro: "The ability to move freely is the ultimate freedom. Build it intentionally.",
      sections: [
        {
          heading: 'Visa-Free Access',
          content: "Different passports open different doors. The strongest passports: 180+ countries visa-free. Know what the passport provides."
        },
        {
          heading: 'Residency Backups',
          content: "Golden visas. Long-term resident permits. Have backup residency in at least two stable countries. Plan B and Plan C."
        },
        {
          heading: 'Logistics',
          content: "Property in multiple locations. Vehicles. Staff. Be able to relocate in 48 hours if needed. Plan the logistics."
        }
      ],
      directive: "Identify two backup residency countries. Research the requirements. Start one application this quarter."
    }
  },
  'asymmetric-bets': {
    1: {
      title: 'Bet Sizing',
      intro: "Small bets, big upside. This is the formula. Don't bet what you can't lose.",
      sections: [
        {
          heading: 'The 1% Rule',
          content: "No single bet more than 1-5% of portfolio. Even if it looks like a sure thing. Concentration kills. Diversify the moonshots."
        },
        {
          heading: 'Convexity',
          content: "Look for bets where downside is capped and upside is uncapped. Options. Early-stage equity. Asymmetry is the edge."
        },
        {
          heading: 'Portfolio of Bets',
          content: "Make many small bets. Expect most to fail. Need only one or two to hit big. The math works over time."
        }
      ],
      directive: "Audit current bets. What's the max loss on each? What's the potential upside? Is the ratio asymmetric?"
    },
    2: {
      title: 'Option Theory',
      intro: "Options aren't just derivatives. They're a way of thinking. Buy optionality everywhere.",
      sections: [
        {
          heading: 'Cheap Options',
          content: "Low premium, high potential payoff. Look for them in life, not just markets. A small investment that opens doors."
        },
        {
          heading: 'Time Value',
          content: "Options have expiration. Life options do too. Some opportunities disappear. Move when the option is available."
        },
        {
          heading: 'Strike Price',
          content: "Know what needs to happen for the option to pay off. What's the trigger? Is it likely? Model it."
        }
      ],
      directive: "Identify three 'options' in current life. Small investments that could lead to big outcomes. Make them."
    },
    3: {
      title: 'Venture Allocation',
      intro: "Early-stage investing is the ultimate asymmetric bet. Do it right or don't do it at all.",
      sections: [
        {
          heading: 'Portfolio Construction',
          content: "20-30 bets minimum. Single bets rarely work. The power law applies. One winner covers all losers."
        },
        {
          heading: 'Follow-On Strategy',
          content: "Reserve capital for winners. When something works, double down. Don't spread evenly. Concentrate on proof."
        },
        {
          heading: 'Access to Deals',
          content: "The best deals are oversubscribed. Getting access requires reputation, relationships, and value-add. Build all three."
        }
      ],
      directive: "Set the venture allocation percentage. Build the pipeline of 20+ potential investments. Start deploying."
    },
    4: {
      title: 'Tail Risk Hedging',
      intro: "Protect against the unthinkable. Tail hedges are cheap insurance for catastrophe.",
      sections: [
        {
          heading: 'The Black Swan',
          content: "Events that 'never happen' do happen. 2008. 2020. The next one. Have protection in place before it hits."
        },
        {
          heading: 'Put Options',
          content: "Far out-of-the-money puts. Cheap when markets are calm. Explode in value during crisis. Allocate 1-2% annually."
        },
        {
          heading: 'Alternative Hedges',
          content: "Gold. Crypto. Foreign assets. Uncorrelated holdings. When everything else drops, something should go up."
        }
      ],
      directive: "Review current tail protection. What happens if markets drop 50%? If nothing protects, add hedges."
    }
  },
  'ascendance': {
    1: {
      title: 'Mental Models',
      intro: "The quality of decisions depends on the quality of thinking. Build the model library.",
      sections: [
        {
          heading: 'First Principles',
          content: "Break problems down to fundamental truths. Rebuild from there. Don't reason by analogy. Reason from basics."
        },
        {
          heading: 'Inversion',
          content: "Instead of asking how to succeed, ask how to fail. Then avoid those things. Inversion reveals blind spots."
        },
        {
          heading: 'Second-Order Thinking',
          content: "And then what? Every action has consequences. Those consequences have consequences. Think multiple moves ahead."
        }
      ],
      directive: "Apply first principles to one current problem. Break it down. Rebuild. See what emerges."
    },
    2: {
      title: 'Decision Architecture',
      intro: "Every decision can't be deliberated. Build systems for decisions. Save energy for the ones that matter.",
      sections: [
        {
          heading: 'The Decision Matrix',
          content: "Reversible vs irreversible. High impact vs low impact. Reversible low-impact: decide fast. Irreversible high-impact: deliberate."
        },
        {
          heading: 'Default Settings',
          content: "Pre-decide routine choices. What to eat. What to wear. When to work out. Defaults save decision energy for real decisions."
        },
        {
          heading: 'Veto Power',
          content: "Know what's an automatic no. Have criteria. Don't evaluate things that fail the basic filter. Save the energy."
        }
      ],
      directive: "Create the personal decision matrix. Define what gets auto-approved, auto-rejected, and deeply considered."
    },
    3: {
      title: 'Focus Mastery',
      intro: "Attention is the scarcest resource. Guard it ruthlessly. This is what billionaires do.",
      sections: [
        {
          heading: 'Deep Work Blocks',
          content: "3-4 hours of uninterrupted focus. No email. No phone. No meetings. This is where real work happens. Protect it."
        },
        {
          heading: 'Distraction Elimination',
          content: "Notifications off. Phone in another room. Browser extensions that block. Create an environment where focus is default."
        },
        {
          heading: 'Recovery Rituals',
          content: "Deep work depletes. Recovery restores. Walks. Naps. Meditation. Build recovery into the schedule. Sustainability wins."
        }
      ],
      directive: "Block 3 hours tomorrow. Deep work only. No interruptions. See what happens to output."
    },
    4: {
      title: 'Inner Game',
      intro: "External success without internal alignment is hollow. Master the inner game. It's the foundation.",
      sections: [
        {
          heading: 'Self-Awareness',
          content: "Know the triggers. Know the patterns. Know the stories running in the background. Awareness is the first step to change."
        },
        {
          heading: 'Ego Management',
          content: "Ego served a purpose. It can also destroy. Know when ego is helping and when it's hurting. Manage it."
        },
        {
          heading: 'Purpose Clarity',
          content: "Why any of this? Money is a tool. What's it building toward? Get clear on purpose. Everything else follows."
        }
      ],
      directive: "Write the purpose statement. One paragraph. Why does this matter? What's being built? Get clear."
    }
  }
};

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
