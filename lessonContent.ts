// Lesson content for all 12 Pillars
// This is what billionaires do. Deep. Substantial. Worth $50,000.

export const LESSON_CONTENT: Record<string, Record<number, {
  title: string;
  intro: string;
  sections: { heading: string; content: string }[];
  caseStudy: { name: string; story: string; lesson: string };
  framework: { name: string; steps: string[] };
  exercise: { instruction: string; prompts: string[] };
  directive: string;
}>> = {
  'reality-distortion': {
    1: {
      title: 'Vision Architecture',
      intro: "Every billion-dollar company started as a vision so compelling it bent reality around it. Steve Jobs didn't sell computers—he sold a future where technology was beautiful and personal. Elon Musk doesn't sell cars—he sells the survival of humanity through sustainable energy and multiplanetary existence. Jeff Bezos didn't build a bookstore—he built the everything store, and then the infrastructure that powers the internet. Your vision must be so clear, so inevitable-feeling, that capital has no choice but to flow toward it. This module breaks down exactly how to architect that vision.",
      sections: [
        {
          heading: 'The Vision Stack: Three Layers of Inevitability',
          content: "Layer One: The 10-Year Outcome. This is the world you're creating. Not what your company does—what the world looks like when you win. Amazon's wasn't 'sell books online.' It was 'any product, anywhere, delivered tomorrow.' Tesla's wasn't 'make electric cars.' It was 'the complete transition to sustainable energy.' Your 10-year outcome must be ambitious enough to attract believers, specific enough to guide decisions, and inevitable enough that people fear missing out. Layer Two: The 3-Year Milestone. This is your proof point. The thing that makes the 10-year outcome feel real. For Airbnb, it was reaching more room inventory than any hotel chain. For Uber, it was being in 100 cities. Your 3-year milestone must be measurable, newsworthy, and directly connected to your 10-year outcome. Layer Three: The 90-Day Sprint. This is what happens right now. Every 90 days, you should be able to point to tangible progress that moves you toward the 3-year milestone. Not busy work—evidence. Revenue milestones. User growth. Key hires. Product launches. The 90-day sprint is where vision meets execution."
        },
        {
          heading: 'The Compression Principle',
          content: "If your vision takes more than one sentence to explain, you don't have a vision—you have a wish. 'Organize the world's information and make it universally accessible.' That's Google. Nine words that guided a trillion-dollar company for two decades. 'Accelerate the world's transition to sustainable energy.' That's Tesla. Eight words. 'Give people the power to build community and bring the world closer together.' That's Facebook. Thirteen words. Notice what these have in common: they're not about the company. They're about the world. They use active verbs. They feel inevitable. Now compress yours. Take whatever you've been saying and cut it in half. Then cut it in half again. If it still makes sense and still feels big, you're getting close. The compression isn't about simplification—it's about clarification. When you can say it in one breath, you can say it in an elevator. When you can say it in an elevator, you can say it on CNBC. When you can say it on CNBC, capital flows."
        },
        {
          heading: 'Vision Gravity: The Pull Test',
          content: "A real vision attracts. It pulls people toward it without pushing. You know your vision has gravity when: talented people take pay cuts to join you; investors lean forward in their chairs instead of checking their phones; journalists want to write about you before you have traction; customers evangelize before you have a marketing budget. If you're constantly explaining, convincing, pushing—your vision lacks gravity. The fix isn't better marketing. It's a stronger vision. Steve Jobs didn't convince people the iPhone was the future. He showed them a demo, and reality shifted. The audience gasped. That's gravity. How do you build it? Specificity and confidence. Vague visions repel. 'We're going to change the world' means nothing. 'We're going to put a computer in every pocket that's more powerful than the one that sent Apollo to the moon' creates gravity. Confidence compounds it. If you don't believe it's inevitable, no one else will either."
        },
        {
          heading: "The Anti-Vision: What You're Fighting Against",
          content: "Every compelling vision has a villain. Apple fought against the beige-box, complicated, ugly world of 1990s computing. Tesla fights against fossil fuel dependency and climate destruction. Amazon fought against the friction of retail—the driving, the lines, the limited selection. Your anti-vision gives your vision stakes. It creates urgency. It forces people to choose sides. When Marc Andreessen said 'software is eating the world,' he wasn't just describing a trend—he was issuing a warning. Get on the right side of history, or get eaten. What are you fighting against? Not a competitor—an enemy. Not a company—a paradigm. The status quo. The old way. The thing that's holding everyone back. Name it. Make it visceral. Make people hate it. Then position your vision as the only escape."
        }
      ],
      caseStudy: {
        name: "Elon Musk and the SpaceX Vision",
        story: "In 2001, Elon Musk wanted to inspire humanity about space exploration. His first idea was to land a greenhouse on Mars—a 'green plant on a red planet' as a symbol. He flew to Russia three times to buy refurbished ICBMs, but the Russians kept raising the price. On the flight home from the third failed trip, Musk opened a spreadsheet and started calculating the raw material costs of building a rocket. He realized the aerospace industry had a 1000% markup. That's when SpaceX's real vision crystallized: reduce the cost of space access by a factor of 10, and eventually 100, to make humanity a multiplanetary species. Not 'build rockets.' Not 'compete with Boeing.' Make humans a multiplanetary species. That vision attracted the best rocket engineers in the world to leave stable jobs and work insane hours for less money. It attracted billions in NASA contracts. It attracted investors who believed in the 1000-year mission, not the quarterly returns.",
        lesson: "The vision that attracted everything wasn't about rockets or technology—it was about human survival and expansion. The technical challenges were in service of something larger. That's what made engineers quit Boeing. That's what made NASA write checks. That's what made it real."
      },
      framework: {
        name: "The Vision Architecture Framework",
        steps: [
          "Step 1: Write down what the world looks like when you win. Not your company—the world. 100 words maximum.",
          "Step 2: Identify the villain. What current paradigm or enemy are you destroying? Be specific and visceral.",
          "Step 3: Compress to one sentence. If you can't, your vision isn't clear enough yet.",
          "Step 4: Define your 3-year proof point. What milestone makes the vision feel inevitable?",
          "Step 5: Set your 90-day sprint. What evidence will you create in the next quarter?",
          "Step 6: Test for gravity. Tell three people your vision. Did they lean in or check their phone?"
        ]
      },
      exercise: {
        instruction: "You will complete this exercise before moving forward. Write your answers now.",
        prompts: [
          "In 100 words or less, describe what the world looks like when you win. Not what your company does—what changes in the world.",
          "Name your villain. What paradigm, system, or status quo are you destroying?",
          "Compress your vision to one sentence. Eight to fifteen words. Active verb. About the world, not your company.",
          "What is your 3-year proof point? A specific, measurable milestone that makes your vision feel inevitable.",
          "What will you accomplish in the next 90 days that provides evidence toward that milestone?"
        ]
      },
      directive: "Write your one-sentence vision now. Say it out loud. If it doesn't give you chills, it's not big enough. Rewrite until it does."
    },
    2: {
      title: 'Narrative Control',
      intro: "The story you tell becomes the reality others invest in. Every successful founder is, above all else, a storyteller. Not a liar—a narrator. The facts of your business are raw material. The narrative is what makes those facts mean something. Reid Hoffman didn't pitch LinkedIn as a 'professional social network.' He pitched it as 'the network that will power the next generation of careers.' Same product, different story. The story raised $4.7 million in Series A. This module teaches you to control the narrative before it controls you.",
      sections: [
        {
          heading: 'The Origin Story Architecture',
          content: "Every billionaire has an origin story. Not the real one—the useful one. The garage where Apple started. The dorm room where Facebook began. The rejection letters that fueled Bezos. Your origin story isn't autobiography—it's strategy. It needs three elements: the moment of insight (when you saw what others couldn't), the struggle that proved your commitment (the sacrifice that shows you're all-in), and the mission that emerged (the reason you can't stop, even if you wanted to). Steve Jobs didn't talk about Wozniak doing the real engineering. He talked about the garage, the rebellion against IBM, the belief that computers should be beautiful. That's not lying—it's editing. What moments from your past, arranged correctly, create an origin story that makes investors believe you're the only person who could build this?"
        },
        {
          heading: 'Strategic Enemy Selection',
          content: "Every great narrative has an antagonist. Apple had IBM, then Microsoft. Uber had taxi medallion corruption. Airbnb had overpriced, impersonal hotels. Your enemy isn't your competitor—it's the paradigm your competitor represents. When you attack a paradigm, you're not picking a fight with a company—you're starting a movement. The enemy creates urgency. Without a villain, your story is just a product description. With a villain, it's a crusade. But choose carefully. Your enemy must be big enough to matter, familiar enough to be understood, and vulnerable enough to be defeated. Dropbox didn't attack Microsoft. They attacked USB drives. Small enemy, but universally hated. That worked. What's your enemy? Not 'the old way of doing things.' That's too vague. Name it. Make it specific. Make it something people have complained about at dinner parties."
        },
        {
          heading: 'Milestone Framing: The Art of Making Numbers Sing',
          content: "A number is not a story. '10,000 users' is data. 'We crossed 10,000 users in our first 30 days—faster than Twitter, Facebook, or Instagram at the same stage' is narrative. Every milestone you hit must be framed, not just reported. The frames that work: comparison to giants (faster than, bigger than, more than a comparable company at the same stage), symbolic thresholds (six figures, seven figures, first international market), and impossibility proof (everyone said this couldn't happen, and we just proved it could). When Airbnb hit 10 million nights booked, they didn't just announce it. They framed it as 'more nights than Hilton's entire inventory.' Same number, but now it meant something. What milestones have you hit that you failed to frame? What upcoming milestones can you pre-frame to maximize their impact?"
        },
        {
          heading: 'The Narrative Stack: Internal, External, and Investor',
          content: "You need three versions of your narrative, and they must be aligned but distinct. The internal narrative is for your team—it emphasizes mission, challenges, and the meaning of the work. The external narrative is for customers and press—it emphasizes the problem you're solving and why it matters to them. The investor narrative is for capital—it emphasizes market size, traction, and return potential. Most founders have one narrative and use it for everyone. That's why their fundraising emails sound like press releases and their team meetings sound like investor pitches. Craft all three. Write them down. Know which room you're in. The internal narrative should make people feel like they're part of something historic. The external narrative should make people feel like you understand their problem better than they do. The investor narrative should make people feel like missing this round would be a career-defining mistake."
        }
      ],
      caseStudy: {
        name: "Brian Chesky and the 'Belonging' Reframe",
        story: "In 2011, Airbnb was struggling. Hotels called them illegal. Cities threatened regulation. Investors were nervous. Brian Chesky could have fought on logistics—we're cheaper, we have more inventory. Instead, he reframed the entire narrative. Airbnb wasn't about accommodation. It was about belonging. 'Don't go there. Live there.' The new narrative positioned hotels as cold, impersonal, tourist traps. Airbnb was authentic, local, human. The 'belonging' narrative did three things: it made hosts feel like they were part of a movement (not just landlords), it made guests feel like travelers (not tourists), and it made regulators look like they were opposing human connection (not enforcing housing law). By 2014, Airbnb was valued at $10 billion. Same product. Different story.",
        lesson: "Chesky didn't change what Airbnb did. He changed what it meant. That's narrative control. The product is the product. The story is what makes people care."
      },
      framework: {
        name: "The Narrative Control Framework",
        steps: [
          "Step 1: Write your origin story in three sentences. Insight, struggle, mission.",
          "Step 2: Name your enemy. Not a competitor—a paradigm. Something people already resent.",
          "Step 3: List your last three milestones. Reframe each one with comparison, threshold, or impossibility.",
          "Step 4: Write your internal narrative. What do you tell your team on hard days?",
          "Step 5: Write your external narrative. What do you tell a journalist in 60 seconds?",
          "Step 6: Write your investor narrative. What do you tell a partner at Sequoia in an elevator?"
        ]
      },
      exercise: {
        instruction: "Complete this narrative audit now.",
        prompts: [
          "Write your origin story in exactly three sentences. Moment of insight. Proof of commitment. Emergent mission.",
          "Name your enemy. Be specific. It should be something people complain about.",
          "Take your most recent milestone and reframe it. Use comparison to a giant, a symbolic threshold, or impossibility proof.",
          "In one paragraph, what do you tell your team on the hardest days? This is your internal narrative.",
          "In 60 seconds of speaking, what do you tell a journalist who asks 'what do you do?' This is your external narrative."
        ]
      },
      directive: "Record yourself telling your origin story. Listen to it. If you wouldn't fund you, rewrite it until you would."
    },
    3: {
      title: 'The Pitch Deck',
      intro: "A pitch deck is not a document. It's a weapon. It opens doors, closes rounds, and shapes how the market perceives you. The best pitch decks do not describe your company—they create inevitability. When an investor finishes your deck, they should feel like not investing would be the mistake of their career. This module gives you the exact structure, the exact order, and the exact psychology behind decks that have raised billions.",
      sections: [
        {
          heading: 'The 10-Slide Formula',
          content: "There are exactly 10 slides that matter, in exactly this order. Slide 1: Title. Your name, your one-line vision, your logo. That's it. Slide 2: Problem. The pain point you're solving, made visceral and urgent. Slide 3: Solution. What you've built, shown simply. Not features—transformation. Slide 4: Market Size. TAM, SAM, SOM—but framed as 'this is how big we can get,' not 'this is how big the market is.' Slide 5: Traction. What proves this is working. Users, revenue, growth rate, engagement. Slide 6: Business Model. How you make money. Unit economics if you have them. Slide 7: Team. Why you are the only people who could pull this off. Slide 8: Competition. Not a feature matrix—a positioning map that shows your unique quadrant. Slide 9: Financials. Three-year projection. Be ambitious but defensible. Slide 10: The Ask. How much you're raising, at what valuation, and what you'll do with it. Do not deviate from this order. The psychology is engineered. Problem creates pain, solution creates relief, market creates greed, traction creates FOMO, team creates trust, ask closes."
        },
        {
          heading: 'The One Idea Per Slide Rule',
          content: "Each slide should communicate exactly one idea. Not two. Not three. One. If an investor is flipping through your deck in 60 seconds (they will), each slide must land its message instantly. The test: cover the slide with your hand, then reveal it. Can you understand the point in two seconds? If not, simplify. Headlines should be complete sentences that could stand alone. Not 'Market Size.' Instead: 'The global logistics market is $4.2 trillion and ripe for disruption.' That's a headline. The rest of the slide is evidence for the headline. Most founders put the insight in the body text. Wrong. Put the insight in the headline. Put the proof in the body."
        },
        {
          heading: 'The Traction Slide: Where Deals Die or Close',
          content: "More deals die on the traction slide than any other. If you have traction, this is where you win. If you don't, this is where you lose. Traction is not activity. It's proof of product-market fit. Revenue is the best traction. Paying customers prove demand. If you have revenue, show it. Month-over-month growth is better than absolute numbers. '37% MoM growth for 8 consecutive months' is more compelling than '$100K MRR.' If you don't have revenue, show engagement. Daily active users, session length, retention curves. Cohort analysis is powerful—show that users who signed up 6 months ago are still using the product. If you don't have users, show waitlist. But a waitlist only counts if there's signal—email confirmations, credit card holds, letters of intent from enterprises. If you have nothing, you're not ready to raise. Get traction first."
        },
        {
          heading: 'Visual Hierarchy: Design That Commands Attention',
          content: "Investors judge your taste by your deck. A sloppy deck signals sloppy thinking. A beautiful deck signals attention to detail. The rules: white space is your friend—crowded slides look desperate. Consistent fonts—two maximum, one for headlines, one for body. A color palette—three colors, used consistently. No clip art, ever. Custom graphics or simple icons. High-resolution images. Charts that are immediately readable—if the investor has to squint, you've lost. Your competition slide should not be a feature matrix with checkmarks. That's a cliche. Instead, use a 2x2 positioning map. Put your competitors in three quadrants. Put yourself alone in the fourth. That's visual rhetoric. Apple's decks are minimal. So are Google's. So are Sequoia's. If the best in the world keep it simple, so should you."
        }
      ],
      caseStudy: {
        name: "Airbnb's First Pitch Deck",
        story: "In 2008, Airbnb's founders pitched Sequoia with a 10-slide deck that's now famous. The problem slide didn't talk about accommodation—it talked about how travel had become unaffordable and impersonal. The solution slide showed a simple mockup and one sentence: 'Book rooms with locals, rather than hotels.' The market slide showed $1.9 billion in budget travel spending. But here's what made it work: the traction slide showed real numbers from a single weekend during the Democratic National Convention. They had 600 bookings. In one weekend. For a product that barely worked. That's proof of concept. The ask was $150K for 10%. They got it. The deck was ugly by today's standards. But every slide had one idea. Every headline was a complete sentence. Every number was framed as proof of something larger.",
        lesson: "Airbnb's deck worked because it showed a real problem, a clear solution, and a proof point. They didn't wait for perfect. They showed progress."
      },
      framework: {
        name: "The Pitch Deck Creation Framework",
        steps: [
          "Step 1: Write your 10 headlines first. Each headline should be a complete sentence that could stand alone.",
          "Step 2: For each headline, add exactly one piece of evidence. A number, a visual, a quote.",
          "Step 3: Design in black, white, and one accent color. No exceptions until you master the basics.",
          "Step 4: Show your deck to five people who don't know your business. Can they explain it back to you after seeing it for 60 seconds?",
          "Step 5: Record yourself pitching the deck in 5 minutes. Watch it. Cut everything that doesn't land.",
          "Step 6: Send the deck to three people who will be brutally honest. Incorporate their feedback. Then send to investors."
        ]
      },
      exercise: {
        instruction: "Build your 10-slide deck framework now. Just headlines.",
        prompts: [
          "Slide 1: What is your one-line vision? The sentence that captures everything.",
          "Slide 2: What is the problem, stated in one sentence that creates urgency?",
          "Slide 3: What is your solution, stated as a transformation, not a feature list?",
          "Slide 4: How big is your market? TAM with a source.",
          "Slide 5: What traction do you have? The number that proves people want this."
        ]
      },
      directive: "Create your 10 headlines now. One sentence each. If you can't write compelling headlines, you can't write a compelling deck."
    },
    4: {
      title: 'Media Manipulation',
      intro: "Press doesn't find you. You manufacture it. The founders who think great products get covered on their own merit are the founders who stay unknown. Every TechCrunch feature, every CNBC appearance, every viral tweet is engineered. This module shows you exactly how to manufacture attention, control the narrative, and turn media into a growth engine.",
      sections: [
        {
          heading: 'The Press Hook: What Makes News',
          content: "Journalists don't cover companies. They cover stories. Your job is to give them a story they can't resist. The hooks that work: David vs. Goliath (small startup taking on giant incumbent), First-ever (first to do something, even if you have to define the category narrowly), Trend manifestation (you're the example of a larger movement), Contrarian take (you're proving conventional wisdom wrong), Human drama (founder's personal story of sacrifice, failure, redemption). Most founders pitch their product. That's not news. 'Company launches product' is not a story. 'Ex-Google engineer leaves $400K salary to solve problem that killed his father' is a story. Find your hook before you pitch any journalist."
        },
        {
          heading: 'The Embargo Strategy',
          content: "An embargo is when you give a journalist exclusive access to a story before anyone else, with the agreement that they won't publish until a specific date. Here's why embargoes work: exclusivity creates obligation. A journalist who has exclusive access feels special and is more likely to write favorably. The embargo creates a news cycle—when the embargo lifts, everyone else follows up on the original story. How to execute: identify the single most important outlet for your story. For consumer tech, that's TechCrunch or The Verge. For enterprise, that's Forbes or Business Insider. For finance, that's Bloomberg or WSJ. Email the right journalist (not the tips line) with a one-paragraph hook and an offer of exclusive access under embargo. Give them 48-72 hours of exclusivity. Then, on embargo day, blanket everyone else with the news. They'll all cover it because the top outlet already validated it."
        },
        {
          heading: 'Social Proof Manufacturing',
          content: "Before journalists cover you, they Google you. What do they find? If it's nothing, they won't cover you. You need to manufacture social proof before you need it. Step one: get on podcasts. Any podcast in your space with more than 1,000 listeners. Podcasts are easy to get on and they show up in Google searches. Step two: publish on LinkedIn or Medium. Thoughtful posts about your space that demonstrate expertise. Step three: get quoted in other people's articles. Offer yourself as a source to journalists covering your industry. You become quotable before you're newsworthy. Step four: create your own news. Publish a report. Release data. Take a stand on an industry issue. Create the news, then cover it. By the time a journalist Googles you for your funding announcement, they should find a trail of credibility."
        },
        {
          heading: 'Crisis as Opportunity',
          content: "Every company faces a crisis. Product failure. Bad press. Executive departure. Lawsuit. The founders who survive are the ones who control the crisis narrative. The rules: respond within 4 hours. Silence looks like guilt. Take responsibility immediately, even if it's not entirely your fault. The cover-up is always worse than the crime. Pivot to the future—acknowledge the past, but focus on what you're doing about it. Over-communicate internally before you communicate externally. Your team should never learn about a crisis from the press. Use the crisis to demonstrate character. The way you handle adversity is often more memorable than the adversity itself. Airbnb's response to the 2011 home trashing became a legendary example of crisis management. They launched the Host Guarantee program and turned a near-death moment into proof of their values."
        }
      ],
      caseStudy: {
        name: "Elon Musk's Twitter Strategy",
        story: "Elon Musk has over 150 million Twitter followers. Tesla spends $0 on advertising. That's not a coincidence. Musk uses Twitter as a direct channel to bypass traditional media entirely. When he wants to announce something, he tweets it. When he wants to shape a narrative, he tweets it. When he wants to attack a critic, he tweets it. The media then covers his tweets, giving him free amplification. His strategy: be genuinely interesting (not corporate), be controversial enough to get shared, respond to customers directly (creating viral moments), and mix business with personality. You don't have to be Musk. But you can apply the principle: your social media presence is a media channel you control entirely. Build it before you need it.",
        lesson: "Musk doesn't wait for media coverage. He creates it. He controls the channel, the timing, and the message. That's power."
      },
      framework: {
        name: "The Media Manufacturing Framework",
        steps: [
          "Step 1: Identify your primary hook. David vs. Goliath, First-ever, Trend, Contrarian, or Human drama.",
          "Step 2: Build your press target list. 10 outlets that cover your space, with specific journalist names.",
          "Step 3: Manufacture social proof. Get on 3 podcasts and publish 5 LinkedIn posts in the next 30 days.",
          "Step 4: Create an embargoed news moment. Announce something with an exclusive to your top outlet.",
          "Step 5: Build your owned media. Twitter, LinkedIn, newsletter. Post consistently before you need attention.",
          "Step 6: Prepare your crisis response template. How will you respond if something goes wrong?"
        ]
      },
      exercise: {
        instruction: "Build your media strategy now.",
        prompts: [
          "What is your primary hook? Which of the five types fits your story best?",
          "Name three journalists who cover your space. Find their email addresses.",
          "What can you announce in the next 30 days that's newsworthy?",
          "Write a one-paragraph pitch email for that announcement.",
          "What's your backup if a journalist says no? Who's your second choice?"
        ]
      },
      directive: "Identify the single most important outlet for your next announcement. Find the journalist who covers your space. Write the pitch email. Send it within 48 hours."
    }
  },
  'liquidity-allocation': {
    1: {
      title: 'Cash Flow Quadrants',
      intro: "Money moves in four directions. Master all four or get crushed by one. Most founders understand revenue. Few understand cash flow. Revenue is vanity. Cash flow is survival. This module teaches you to see money the way billionaires see it—not as a number in a bank account, but as a system that must be engineered.",
      sections: [
        {
          heading: 'The Four Quadrants of Cash Movement',
          content: "Quadrant 1: Operational inflows. Money coming in from your core business. Customer payments, contract revenue, recurring subscriptions. This is the engine. Quadrant 2: Financing inflows. Money from investors, loans, or lines of credit. This is fuel, but it's not yours—it comes with strings. Quadrant 3: Operational outflows. Money going out for salaries, rent, software, contractors, marketing. This is the burn. Quadrant 4: Investment outflows. Money you're deploying into assets—equipment, acquisitions, real estate, other companies. This is growth. Most founders track Quadrant 1 and Quadrant 3. Revenue minus expenses equals 'how we're doing.' That's amateur thinking. Billionaires track all four quadrants weekly. They know exactly how long financing inflows will sustain the burn. They know which investments are generating operational inflows and which are dead weight. Track all four. Weekly. Without exception."
        },
        {
          heading: 'Velocity Over Volume: The Speed of Capital',
          content: "A million dollars that turns over four times a year is worth more than four million sitting still. This is velocity—how fast your money moves. Consider two businesses. Business A has $500K in the bank and turns it into revenue once per quarter. Business B has $100K in the bank but turns it into revenue weekly. Business B generates more total revenue despite having less capital. Velocity is the hidden metric. It's why Amazon ran on razor-thin margins—they collected customer payments immediately but paid suppliers 60-90 days later. The cash turned over constantly. It's why real estate investors with low cash reserves outperform wealthy investors who let capital sit. How fast does your money move? From customer acquisition cost to customer payment, how many days? From inventory purchase to sale? From campaign spend to revenue? The faster the cycle, the less capital you need and the higher your returns."
        },
        {
          heading: 'The 40/40/20 Operating Principle',
          content: "When capital comes in—whether from revenue or fundraising—allocate it immediately. 40% to runway extension. This goes into reserves and covers at least 6 months of burn. Non-negotiable. 40% to growth. Marketing, sales, product development. Whatever grows the top line. 20% to optionality. This is for unexpected opportunities, emergency cushion, or strategic bets. Most founders spend first and save what's left. That's backward. Allocate first. Spend what's allocated. When the 40% for growth runs out, it's out. When the 20% for optionality is spent, it's spent. This discipline is why some founders survive downturns and others don't. The 40% runway extension saved Airbnb in 2020. They had two years of runway when COVID hit. Most competitors had six months. Guess who survived."
        },
        {
          heading: 'Reading the Cash Flow Statement',
          content: "If you can't read a cash flow statement, you're flying blind. There are three sections. Operating activities: cash from core business. A positive number here means your business generates cash. A negative number means you're burning. Investing activities: cash spent on long-term assets. Usually negative because you're investing, but watch for desperate asset sales (positive) that signal trouble. Financing activities: cash from investors or debt. Positive during fundraises, negative during repayment. The ratio between operating cash flow and financing cash flow tells you everything. If you're funding operations through financing, you're on borrowed time. If operations fund themselves and financing is for acceleration, you're in a position of strength. Pull your company's cash flow statement. Do you understand every line? If not, you don't understand your business."
        }
      ],
      caseStudy: {
        name: "Amazon's Negative Cash Conversion Cycle",
        story: "Amazon built a trillion-dollar empire on a cash flow trick most founders don't understand. They collect customer payments immediately—credit card charged at purchase. But they pay suppliers 60-90 days later. This means Amazon has customer cash for up to 90 days before they pay for the inventory. At scale, this is worth billions in free float. It's negative working capital—they fund operations with supplier money, not investor money. Bezos didn't focus on profit margins. He focused on cash flow. For years, Wall Street criticized Amazon's lack of profit. But the cash flow statement told a different story: positive operating cash flow, funding reinvestment. Every dollar of profit was reinvested, but the cash cycle kept turning. When the flywheel reached scale, the same mechanics that confused analysts created an unassailable competitive advantage.",
        lesson: "Bezos understood velocity. He didn't care about margin. He cared about how fast cash turned. That's thinking at the billionaire level."
      },
      framework: {
        name: "The Weekly Cash Flow Ritual",
        steps: [
          "Step 1: Every Friday, log your four quadrants. Operational in, financing in, operational out, investment out.",
          "Step 2: Calculate your velocity. How many days from spend to revenue?",
          "Step 3: Apply 40/40/20 to any new capital. Allocate before you spend.",
          "Step 4: Review your cash conversion cycle. Can you collect faster? Pay slower?",
          "Step 5: Calculate your runway in weeks. Not months. Weeks.",
          "Step 6: Identify one action that improves velocity or extends runway. Execute it before next Friday."
        ]
      },
      exercise: {
        instruction: "Complete this cash flow audit now.",
        prompts: [
          "What is your current runway in weeks? Not months—weeks.",
          "What is your cash conversion cycle? Days from spend to revenue?",
          "Of your last major capital inflow, how did you allocate it? What percentage to runway, growth, optionality?",
          "What is one change you could make to collect customer payments faster?",
          "What is one change you could make to extend supplier payment terms?"
        ]
      },
      directive: "Pull your last three months of bank statements. Calculate your true cash flow velocity. Know this number cold."
    },
    2: {
      title: 'The 40/40/20 Rule',
      intro: "Every dollar of profit has three potential destinations: savings, reinvestment, or distribution. Billionaires don't wing this. They have a system. The 40/40/20 rule is that system. This module teaches you to allocate capital like someone who intends to never run out.",
      sections: [
        {
          heading: 'The First 40%: Fortress Building',
          content: "The first 40% of every profit dollar goes to building your fortress. This is reserves, runway extension, and defensive capital. Most founders allocate to reserves last—if anything's left after growth spending and lifestyle, it goes to savings. That's inverted. Reserves are the difference between surviving a crisis and becoming a case study in failure. What counts as fortress capital? First, operating reserves: 6-12 months of burn rate in liquid, accessible accounts. Not investments—cash or equivalents. Second, personal reserves: money that's not in your company, in case your company fails. Third, strategic reserves: capital earmarked for opportunistic moves—acquisitions, talent grabs during downturns, emergency pivots. The 40% is non-negotiable. Before you spend on growth, before you take distributions, the fortress gets funded. This is how you sleep at night. This is how you negotiate from strength. This is how you survive long enough to get lucky."
        },
        {
          heading: 'The Second 40%: Growth Investment',
          content: "The second 40% goes to growth. This is the capital that expands your top line. Marketing spend, sales team expansion, product development, geographic expansion. This is not operating expenses—that's already accounted for in your burn rate. This is above-the-line investment in future revenue. The discipline is essential: when this 40% is spent, it's spent. No dipping into reserves. No emergency fundraise because you overspent on growth. Constrained capital forces prioritization. If you only have $100K to deploy in growth this quarter, you figure out the highest-leverage use of that capital. If you have unlimited runway, you make sloppy decisions. The best founders treat growth capital like it's the last money they'll ever have. Every dollar must prove its return. Track the ROI of every growth dollar. If it's not returning at least 3x, reallocate."
        },
        {
          heading: 'The Final 20%: Optionality',
          content: "The final 20% is for optionality. This is the capital that keeps you flexible. Emergency cushion, unexpected opportunities, strategic experiments, or personal distributions. This is where you take calculated risks that don't fit the growth budget. What does optionality capital fund? Acquisitions that emerge unexpectedly. A key hire who becomes available suddenly. A new product experiment. A personal need that could otherwise distract you. Some founders treat optionality as a slush fund. That's wrong. This capital has a purpose: to keep you nimble. When opportunity knocks—or crisis strikes—this is the capital that lets you respond without disrupting operations or fortress-building. If you don't use it in a given period, it rolls over or joins the fortress. Optionality capital is never wasted on planned expenses. It's reserved for the unplanned."
        },
        {
          heading: 'Implementation: Weekly Allocation Discipline',
          content: "The 40/40/20 rule only works if you implement it as a discipline, not a guideline. Here's the weekly ritual: Every time money comes in—customer payments, investment rounds, loan proceeds—allocate it immediately. Don't let unallocated cash sit in your operating account. It will get spent. Move 40% to your fortress account. Move 40% to your growth budget. Move 20% to your optionality fund. Then operate on what's in each bucket. When the growth budget runs dry, you don't pull from reserves. You wait until the next allocation. This sounds restrictive. It is. That's the point. Discipline creates freedom. When you know your runway is secure, you make better decisions. When your growth budget is constrained, you prioritize ruthlessly. When your optionality fund is intact, you can say yes to unexpected opportunities. Most founders fail because they treat all cash as one pool. Billionaires separate the pools and respect the boundaries."
        }
      ],
      caseStudy: {
        name: "Warren Buffett's Cash Fortress",
        story: "Warren Buffett keeps Berkshire Hathaway's cash reserves above $30 billion at all times. That's not inefficiency—it's strategy. When the 2008 financial crisis hit, Buffett had capital when no one else did. He invested $5 billion in Goldman Sachs at terms so favorable they were essentially a bailout. He bought Burlington Northern Santa Fe railroad. He made billions while competitors scrambled for survival. The fortress wasn't a drag on returns. It was the source of returns. When everyone else was selling, he was buying. When everyone else was desperate for capital, he was the capital provider. 'Be fearful when others are greedy, and greedy when others are fearful.' That aphorism only works if you have the cash to act. Most people are fearful when others are fearful because they don't have the fortress to buy when blood is in the streets.",
        lesson: "Buffett's fortress gave him the power to act when others could only react. That's the purpose of the first 40%: to be the predator, not the prey."
      },
      framework: {
        name: "The 40/40/20 Implementation System",
        steps: [
          "Step 1: Open three separate accounts. Fortress, Growth, Optionality.",
          "Step 2: Set up automatic transfers. Every inflow splits 40/40/20 immediately.",
          "Step 3: Define what each account funds. Write the rules and post them.",
          "Step 4: Track each account separately. Don't net them. Know each balance.",
          "Step 5: Review weekly. Are you violating the boundaries? Why?",
          "Step 6: Recalibrate quarterly. Adjust the percentages only if fundamentals change."
        ]
      },
      exercise: {
        instruction: "Set up your 40/40/20 system now.",
        prompts: [
          "What is your current runway? (Fortress balance / monthly burn)",
          "How much of your last capital inflow went to growth vs. reserves?",
          "What is one growth investment that's not returning 3x? Should you reallocate?",
          "Do you have an optionality fund? If not, what would you use it for if you did?",
          "What automatic transfers can you set up today to enforce 40/40/20?"
        ]
      },
      directive: "Open three bank accounts today. Label them Fortress, Growth, Optionality. Set up automatic allocation from your operating account. This is not advice—it's a command."
    },
    3: {
      title: 'Debt as a Weapon',
      intro: "Billionaires don't avoid debt. They weaponize it. While the middle class fears debt and the poor are crushed by it, the wealthy use debt to multiply returns, accelerate growth, and build empires. This module teaches you to see debt not as a burden but as a tool—and to use it with precision.",
      sections: [
        {
          heading: 'Good Debt vs. Bad Debt: The Billionaire Distinction',
          content: "Debt that funds consumption is a trap. Debt that funds appreciating assets is a lever. Car loans, credit cards, lifestyle debt—these are wealth destroyers. The interest compounds against you. You're paying for yesterday's consumption with tomorrow's earnings. Contrast this with real estate debt, business expansion loans, or margin on investments. These debts fund assets that appreciate or generate income. The asset services the debt and builds equity simultaneously. Billionaires ask one question before taking on debt: will this dollar of debt create more than a dollar of value? If yes, they borrow as much as they can. If no, they pay cash or don't buy. Elon Musk has billions in debt secured against his Tesla shares. The shares appreciate faster than the interest rate. The debt is free money. That's weaponized debt."
        },
        {
          heading: 'The Arbitrage Principle',
          content: "Debt becomes a weapon when you can borrow at a lower rate than your investments return. Borrow at 5%, invest at 15%, and the 10% spread is pure profit—on someone else's capital. This is arbitrage, and it's the foundation of leveraged wealth. Real estate investors understand this intuitively. Borrow at 4% mortgage rate, earn 8% cash-on-cash return plus appreciation. The bank's money funds your wealth building. Private equity funds do this at scale. Borrow against the assets of the companies they buy, use the company's cash flow to pay the debt, keep the equity appreciation. The rules of arbitrage: never borrow at variable rates for fixed-return investments; always have a margin of safety between borrowing cost and expected return; have a plan for servicing debt if returns disappear temporarily. The spread is your weapon. The margin of safety is your defense."
        },
        {
          heading: 'Strategic Leverage: When to 10x Your Bet',
          content: "Leverage multiplies outcomes. 2x leverage means your gains—and losses—double. 10x leverage means they 10x. This is where fortunes are made and lost. When should you leverage aggressively? When you have high conviction and strong asymmetry. High conviction means you've done the work and see something others don't. Strong asymmetry means your upside is much larger than your downside. If you're wrong, you lose X. If you're right, you gain 10X. In that situation, leverage accelerates your path to wealth. When should you avoid leverage? When you're gambling, when you don't understand the asset, or when the downside is ruin. Leverage doesn't change the odds—it changes the stakes. A 50/50 bet is still 50/50 with leverage. But now losing wipes you out. Billionaires leverage when the odds are in their favor and the bet is survivable if it goes wrong. That's strategic leverage. Everything else is gambling."
        },
        {
          heading: 'The Debt Stack: Structuring for Maximum Power',
          content: "Sophisticated operators layer multiple types of debt strategically. The debt stack typically includes: senior secured debt (lowest interest, first claim on assets, most restrictive covenants), subordinated debt (higher interest, second claim, fewer restrictions), mezzanine financing (highest interest, equity-like upside, most flexible). Each layer serves a purpose. Senior debt provides cheap capital for proven assets. Subordinated debt fills gaps without diluting equity. Mezzanine bridges to equity rounds or exits. The skill is matching the right debt to the right purpose. Don't use expensive mezzanine for something that could be financed with cheap senior debt. Don't encumber core assets for speculative bets. Build the stack intentionally. Know what each layer costs, what it funds, and what happens if you can't service it. Most founders use debt reactively—taking whatever's available when cash runs short. Billionaires use debt proactively—structuring capital for maximum leverage and minimum risk."
        }
      ],
      caseStudy: {
        name: "Blackstone's Debt-Fueled Empire",
        story: "Blackstone became the world's largest alternative asset manager using a simple formula: buy companies with mostly debt, improve operations, sell for more than they paid, keep the equity upside. They bought Hilton Hotels for $26 billion in 2007—using $20 billion of debt. When the financial crisis hit, everyone predicted Hilton would bankrupt Blackstone. Instead, they held on, improved operations, and eventually took Hilton public. The original $5.6 billion of equity turned into $14 billion. A 150% return. The debt didn't just increase returns—it multiplied them. With all-equity, the same operational improvements would have returned 40%. With debt, the same improvement returned 150%. That's the weapon. The risk? If Hilton had failed, Blackstone would have lost their equity. They sized the bet to be survivable.",
        lesson: "Blackstone didn't avoid risk. They structured it. The debt amplified returns while the senior lenders bore most of the downside. That's sophisticated debt strategy."
      },
      framework: {
        name: "The Debt Evaluation Framework",
        steps: [
          "Step 1: Calculate the spread. What can you borrow at? What will the capital return?",
          "Step 2: Assess the downside. If the investment returns nothing, can you service the debt?",
          "Step 3: Match debt type to purpose. Cheap senior debt for proven assets. Expensive debt for high-return opportunities.",
          "Step 4: Stress test. What happens if rates rise 3%? If returns are half of projected?",
          "Step 5: Set covenant cushions. Don't run up against debt limits. Leave margin for error.",
          "Step 6: Have an exit. Every debt position should have a repayment plan. Know how you'll get out."
        ]
      },
      exercise: {
        instruction: "Evaluate your current relationship with debt.",
        prompts: [
          "What debt do you currently have? Is it good debt (funding assets) or bad debt (funding consumption)?",
          "What is the interest rate on your most expensive debt? Can you refinance?",
          "What opportunities could you pursue with additional leverage that you're not pursuing now?",
          "What is your debt-to-equity ratio? What should it be?",
          "If you were to add $100K in debt tomorrow, what would you fund with it? What return would you expect?"
        ]
      },
      directive: "Identify one opportunity in your life or business where strategic debt could accelerate your returns. Calculate the spread. If positive, pursue the capital."
    },
    4: {
      title: 'Treasury Management',
      intro: "Your cash shouldn't just sit there. Idle capital is dying capital. Treasury management is the discipline of putting every dollar to work while maintaining liquidity. This module teaches you to think about cash the way CFOs of Fortune 500 companies think about it—as an asset to be optimized, not a balance to be held.",
      sections: [
        {
          heading: 'The Liquidity Ladder',
          content: "Not all cash is equal. Some cash you might need tomorrow. Some you won't touch for a year. The liquidity ladder matches cash duration to yield opportunity. Tier 1: Immediate liquidity. 0-30 days of operating capital in a high-yield savings account or money market fund. 4-5% yield is standard in high-rate environments. Tier 2: Near-term reserves. 1-6 months of operating capital in Treasury bills or short-term bonds. Slightly higher yield, one-day to settle if needed. Tier 3: Strategic reserves. 6-12 months of capital in intermediate-term instruments. Higher yield, but you're not touching this unless there's a crisis. Tier 4: Long-term allocation. Any capital beyond 12 months of runway should be invested for growth—equities, real estate, or business reinvestment. Each tier has a different purpose and a different expected return. The mistake is treating all cash as Tier 1. That's leaving money on the table."
        },
        {
          heading: 'Yield Optimization Without Risk Addiction',
          content: "The temptation is always to chase higher yield. Don't. The purpose of treasury management is optimization, not gambling. Here's the discipline: Tier 1 cash never takes credit risk. Government-backed instruments only. A few basis points of extra yield is not worth the possibility that your operating cash disappears in a bank failure. Tier 2 and Tier 3 can take duration risk (interest rate sensitivity) but not credit risk. Invest in Treasuries, highly-rated municipal bonds, or money market funds with government obligations. Tier 4 is where you can take calculated risk. But even here, diversification matters. Not all your long-term capital in one startup. Not all in crypto. Spread the risk. The goal is to earn on every dollar while sleeping soundly. If your treasury strategy keeps you up at night, you've over-optimized. Scale back until you can forget about it."
        },
        {
          heading: 'Cash Flow Forecasting: The 13-Week Model',
          content: "You can't manage treasury if you can't predict cash needs. The 13-week cash flow forecast is the standard tool. Why 13 weeks? It's a quarter, which matches business planning cycles, but it's also granular enough to catch weekly fluctuations. Build the model: Row 1 is your opening cash balance. Each column is a week. In each week, project cash inflows (customer payments, investment rounds, loan draws) and cash outflows (payroll, rent, vendor payments, one-time expenses). Ending cash for Week 1 becomes opening cash for Week 2. At the end of Week 13, you know exactly when you'll have cash shortfalls and cash surpluses. This is what drives treasury decisions. If Week 8 is tight, you don't invest that cash in Week 1. If Week 13 has a large surplus, you can move cash to Tier 3 or 4 now. Update the model weekly. Compare actual to forecast. Tighten your predictions until you can forecast within 5%."
        },
        {
          heading: 'The Banking Stack',
          content: "Where you bank matters. Most founders have one bank account. That's an amateur setup. The professional stack: Primary operating bank: major national bank with full services. This is where payroll runs, where you receive large payments, where your credit lines are held. High-yield reserve bank: online bank offering top-tier yield on savings. Ally, Marcus, Wealthfront—whoever has the best rate. This is Tier 1 and Tier 2 cash. Brokerage account: for Tier 3 and Tier 4 investments. Fidelity, Schwab, Vanguard. Treasury bills, bond funds, equity investments. International bank: if you do business globally, a bank with international capabilities. HSBC, Citi, or a regional specialist. Each account serves a specific purpose. Your operating bank handles velocity. Your reserve bank handles yield. Your brokerage handles investment. Don't optimize for convenience. Optimize for function."
        }
      ],
      caseStudy: {
        name: "Apple's $200 Billion Treasury",
        story: "Apple holds more cash than most countries' GDPs. At peak, over $200 billion in cash and marketable securities. Why? Optionality. That cash funds R&D without investor permission. It funds acquisitions at any time. It funds stock buybacks that boost returns. It survives any conceivable downturn. Apple's treasury team manages this capital like a hedge fund. They invest in government bonds, corporate debt, money markets—all highly liquid, all preserving capital while earning yield. They have the sophistication of a major investment manager because, at their scale, even small improvements in yield mean billions. The lesson isn't that you need $200 billion. The lesson is that even at scale, the principles are the same: match liquidity to needs, earn yield without taking undue risk, and maintain the optionality to act when opportunity arises.",
        lesson: "Apple doesn't let cash sit. Neither should you. Scale the principles: liquidity ladder, yield optimization, conservative risk profile."
      },
      framework: {
        name: "The Treasury Management Implementation Plan",
        steps: [
          "Step 1: Build your 13-week cash flow forecast. Start today, update weekly.",
          "Step 2: Define your liquidity ladder. How much in Tier 1? Tier 2? Tier 3? Tier 4?",
          "Step 3: Open the accounts. High-yield savings, brokerage, and any needed bank relationships.",
          "Step 4: Move cash to appropriate tiers. Don't leave Tier 3 money earning Tier 1 rates.",
          "Step 5: Set yield targets for each tier. Know what 'good' looks like in the current rate environment.",
          "Step 6: Review monthly. Are you earning what you should? Rebalance as rates or needs change."
        ]
      },
      exercise: {
        instruction: "Audit your current cash position.",
        prompts: [
          "How much cash do you have right now? Where is it held?",
          "What interest rate is that cash earning?",
          "Build a simple 13-week cash flow forecast. What's your lowest point?",
          "How much cash could you move to higher-yield instruments without liquidity risk?",
          "What action can you take this week to start earning more on idle cash?"
        ]
      },
      directive: "Move cash from your primary operating account to a high-yield savings account today. Every day you wait costs money. Literally."
    }
  },
  'holding-co': {
    1: {
      title: 'Entity Architecture',
      intro: "Your business structure is either a shield or a target. The right entity architecture protects assets, minimizes taxes, enables growth, and creates optionality. The wrong structure exposes everything you've built to a single lawsuit, a single creditor, a single failure. This module teaches you to think like the wealthy—who never own anything directly but control everything through layers.",
      sections: [
        {
          heading: 'The Holding Company Principle',
          content: "Billionaires don't own assets. Their holding companies own assets. This distinction is everything. When you own an asset personally, all your assets are exposed to any liability that asset creates. One car accident, one lawsuit, one employee claim—and your home, your savings, your other investments are all at risk. When a holding company owns the asset, only that company's assets are at risk. Your other entities, your personal wealth—protected by the corporate veil. The structure: a top-level holding company that owns stakes in operating companies, real estate entities, and investment vehicles. Each operating company isolates its own risk. The holding company collects dividends and capital gains from its subsidiaries. This is how the wealthy own everything and risk nothing. One lawsuit takes down one entity. The rest survive."
        },
        {
          heading: 'LLCs vs. Corporations: Choosing the Right Entity',
          content: "Limited Liability Companies (LLCs) offer flexibility and pass-through taxation. Profits flow to your personal return without corporate-level tax. Management structure is customizable. Operating agreements can be tailored extensively. LLCs are ideal for real estate, holding investments, and smaller operating businesses. Corporations (C-Corps and S-Corps) offer different advantages. C-Corps are necessary for venture capital—investors won't buy LLC interests. C-Corps allow unlimited shareholders and multiple stock classes. S-Corps limit shareholders but offer pass-through taxation with potential payroll tax savings. The choice depends on your goals. Raising venture capital? C-Corp. Real estate holding? LLC. Operating business you'll own forever? S-Corp or LLC. Want flexibility to do all of the above? Holding company LLC that owns C-Corp operating companies and LLC investment vehicles. Don't choose based on what's cheapest today. Choose based on where you're going."
        },
        {
          heading: 'The Liability Firewall',
          content: "Each entity is a firewall. The goal is to structure so that a breach in one wall doesn't compromise the whole fortress. How to think about it: what are your risks, and how do you isolate them? Operating risks: employees, customers, vendors. Put these in operating companies with appropriate insurance. Real estate risks: injuries on property, environmental claims. Put each property in a separate LLC. Investment risks: concentration, margin calls, market crashes. Separate entity for investment holdings. Personal risks: driving, personal contracts, family matters. Keep personal assets separate from everything. The lawsuit that bankrupts your restaurant LLC cannot touch the real estate LLC that owns the building. The margin call that wipes out your trading account cannot touch your operating business. The divorce that splits your personal assets cannot touch the entities controlled by your trust. Every dollar in the wrong entity is an exposed dollar. Structure accordingly."
        },
        {
          heading: 'Multi-State and Multi-National Structuring',
          content: "Where you incorporate matters. Delaware is the standard for corporations—sophisticated case law, business-friendly courts, predictable outcomes. If you're raising capital, Delaware C-Corp is nearly mandatory. Wyoming and Nevada offer strong asset protection for LLCs. Charging order protection means a creditor who sues you personally cannot seize your LLC interests—they can only wait for distributions. If you're holding assets for protection, consider these states. International structuring adds another layer. A holding company in a tax-friendly jurisdiction can hold international investments efficiently. Ireland, Luxembourg, Singapore, Cayman Islands—each has different advantages for different situations. This is complex and requires legal counsel in each jurisdiction. The principle is simple: entities exist where they're treated best. You can live in California while your corporation is in Delaware, your real estate LLC is in Wyoming, and your international holding company is in Singapore. That's not tax evasion. That's legal optimization."
        }
      ],
      caseStudy: {
        name: "How the Uber Founders Structured Wealth",
        story: "Travis Kalanick and Garrett Camp didn't own Uber shares personally—they owned them through a cascade of trusts and holding companies. When Uber went public and their shares were worth billions, they didn't sell the shares. They borrowed against them. The holding company structure allowed them to pledge shares as collateral for personal loans—accessing liquidity without triggering capital gains. When they did sell, they used Qualified Small Business Stock exclusions, Opportunity Zone investments, and charitable trusts to minimize the tax hit. The entity architecture wasn't an afterthought. It was designed from the early days, anticipating success. By the time the shares were worth billions, the structure was in place. The founders who didn't structure properly paid California's 13.3% plus federal 20%—losing over a third to taxes immediately. Kalanick and Camp? Their effective rate was a fraction of that. Same company, same outcome, wildly different tax bills. That's the power of architecture.",
        lesson: "The time to structure is before you're wealthy. Once the money arrives, options narrow. Build the architecture now."
      },
      framework: {
        name: "The Entity Architecture Framework",
        steps: [
          "Step 1: Inventory your assets. Real estate, investments, operating businesses, personal property.",
          "Step 2: Identify your risks. What could generate liability? Employees? Property? Contracts?",
          "Step 3: Design the structure. Holding company at top, operating companies below, real estate separate, investments separate.",
          "Step 4: Choose jurisdictions. Delaware for corporations, Wyoming for asset-protection LLCs, others as needed.",
          "Step 5: Implement with counsel. Entity formation, operating agreements, ownership documentation.",
          "Step 6: Maintain the walls. Separate bank accounts, documented transactions, annual filings, no commingling."
        ]
      },
      exercise: {
        instruction: "Map your current structure.",
        prompts: [
          "List every asset you own. Where is title held? Your name? A company? A trust?",
          "What liabilities does each asset create? Who could sue you over it?",
          "What assets are exposed because they're held in the wrong place?",
          "If you were sued personally tomorrow, what could a creditor reach?",
          "Draw your ideal structure. Holding company at top, subsidiaries below. What goes where?"
        ]
      },
      directive: "Consult an attorney about your entity structure within 30 days. This is not optional. Every day you operate without proper structure is a day you're exposed."
    },
    2: {
      title: 'Tax Optimization',
      intro: "Billionaires don't pay taxes the way you think they pay taxes. They use entirely legal structures and strategies to defer, minimize, and eliminate tax obligations. This is not cheating—it's understanding the tax code as written and using every provision available. This module exposes the strategies.",
      sections: [
        {
          heading: 'The Buy, Borrow, Die Strategy',
          content: "Here's how billionaires access their wealth without paying capital gains tax: they don't sell. Instead, they borrow against appreciated assets. When Jeff Bezos needs cash, he doesn't sell Amazon stock (which would trigger a $20+ billion capital gains bill). He takes a loan against his shares at 3-5% interest. The interest is tax-deductible against other income. The shares continue appreciating. When he dies, his heirs inherit the shares at the stepped-up basis—the current market value—meaning all the appreciation during his lifetime is never taxed. Ever. Buy. Borrow. Die. Three steps to generational wealth without capital gains tax. This isn't a loophole. It's the tax code as written. You can do it too—at any scale. Borrow against your real estate, your portfolio, your business. Deduct the interest. Never sell. Pass to heirs at stepped-up basis."
        },
        {
          heading: 'Qualified Small Business Stock (QSBS)',
          content: "Section 1202 of the tax code offers a massive benefit for founders: up to $10 million in capital gains, completely tax-free. The requirements: you must hold stock in a qualified small business (under $50 million in assets at issuance), held for more than 5 years, in a C-Corporation engaged in an active trade or business. If you meet the criteria, you can exclude $10 million—or 10 times your basis, whichever is greater—from federal capital gains tax entirely. Combine with state exclusions in California and other states, and the savings can exceed $4 million per founder. The catch: you must structure for QSBS from the beginning. If you started as an LLC and convert later, the clock restarts. If you took too much money before 5 years, you lose the exclusion. If the company is in the wrong industry (hospitality, finance, certain services), you don't qualify. Work with a tax attorney to structure this correctly from day one. The stakes are too high to improvise."
        },
        {
          heading: 'Opportunity Zones: Tax-Free Appreciation',
          content: "Opportunity Zones are designated areas where investments receive extraordinary tax treatment. Invest capital gains into a Qualified Opportunity Zone Fund, and: the original capital gains tax is deferred until 2026 (or when you sell, whichever is earlier); if you hold for 10+ years, all appreciation in the Opportunity Zone investment is tax-free. Example: You sell stock with $1 million in capital gains. Invest that million into an Opportunity Zone Fund. In 2026, you pay tax on the original gain. But if the Opportunity Zone investment grows to $3 million, that $2 million of appreciation is never taxed—if you held for 10 years. This is real. Developers, tech investors, and family offices have poured billions into Opportunity Zones since 2017. The investments range from real estate development to operating businesses to VC funds—all with the same tax advantage. The window is closing (deferral ends 2026), but the 10-year appreciation exclusion remains. If you have capital gains to deploy, Opportunity Zones should be on your list."
        },
        {
          heading: 'Charitable Strategies: Donor-Advised Funds and CRTs',
          content: "Charitable giving isn't just altruism—it's tax strategy. Donor-Advised Funds (DAFs) let you take an immediate tax deduction for a contribution, while distributing the funds to charities over time. Contribute appreciated stock, get the deduction at full market value, avoid capital gains entirely, and direct grants whenever you choose. It's a checking account for charity with tax benefits upfront. Charitable Remainder Trusts (CRTs) go further. You contribute appreciated assets to the trust, receive a partial tax deduction, and the trust pays you income for life (or a term of years). When the trust terminates, the remainder goes to charity. During the trust's life, it can sell the appreciated assets without paying capital gains—reinvesting the full amount. If you're facing a large capital gains event and have charitable intent, a CRT can convert a tax bill into an income stream while benefiting causes you care about. These strategies require significant assets to make sense—typically $500K or more. But at that scale, the savings are substantial. And unlike aggressive tax shelters, these are explicitly encouraged by the tax code."
        }
      ],
      caseStudy: {
        name: "How Mark Zuckerberg Gave Away $45 Billion Tax-Free",
        story: "When Mark Zuckerberg pledged to give away 99% of his Facebook shares—worth $45 billion at the time—he didn't donate to a charity. He created the Chan Zuckerberg Initiative, a Limited Liability Company. Why an LLC instead of a foundation? Flexibility. A foundation must give away 5% of assets annually and cannot make political donations. An LLC can do anything—invest in companies, donate to campaigns, fund lobbying, or give to charity. The tax treatment: Zuckerberg doesn't get an immediate deduction, but when the LLC eventually gives to qualified charities, the contributions are deductible at that time. When the LLC invests and sells assets, it pays capital gains—but can donate the proceeds and avoid net tax. The structure also provides dynasty planning. The LLC can exist indefinitely, passing from generation to generation, with Zuckerberg's values embedded in its governance.",
        lesson: "Zuckerberg's $45 billion pledge wasn't a tax deduction. It was a wealth preservation and control strategy disguised as philanthropy. Sophisticated structuring makes both possible."
      },
      framework: {
        name: "The Tax Optimization Audit",
        steps: [
          "Step 1: Inventory capital gains exposure. What appreciated assets do you hold?",
          "Step 2: Assess QSBS eligibility. Is your company a qualified small business? Have you held for 5 years?",
          "Step 3: Evaluate borrowing capacity. Can you access liquidity through loans rather than sales?",
          "Step 4: Explore Opportunity Zone investments. Do you have gains to deploy into OZ funds?",
          "Step 5: Review charitable intent. Would DAFs or CRTs align with your giving goals?",
          "Step 6: Engage specialists. Tax attorneys and CPAs who specialize in high-net-worth strategies. Not your local accountant."
        ]
      },
      exercise: {
        instruction: "Calculate your tax exposure.",
        prompts: [
          "What appreciated assets do you hold? What would you owe if you sold today?",
          "Does your company qualify for QSBS exclusion? What's missing if not?",
          "What assets could you borrow against instead of selling?",
          "Do you have capital gains that could be deferred through Opportunity Zones?",
          "If you gave $100K to charity, would you donate cash or appreciated securities?"
        ]
      },
      directive: "Identify your largest upcoming taxable event. Call a tax attorney this week and ask what strategies apply."
    },
    3: {
      title: 'Asset Protection',
      intro: "The wealthy don't just build wealth. They protect it. Asset protection is the discipline of structuring ownership so that creditors, lawsuits, and divorces cannot reach what you've built. This is not about hiding assets—it's about legal structures that make claims impractical or impossible. This module teaches you to build a fortress.",
      sections: [
        {
          heading: 'The Layers of Protection',
          content: "True asset protection is layered. No single strategy is sufficient; the combination creates the fortress. Layer 1: Insurance. The first line of defense. Liability insurance, umbrella policies, D&O coverage—these pay claims before your assets are touched. Layer 2: Entity structure. Assets held in properly formed LLCs and corporations are shielded from personal creditors. Personal assets are shielded from entity creditors. Layer 3: State law protection. Retirement accounts, homestead exemptions, and tenancy-by-the-entirety (for married couples) vary by state but can protect substantial assets. Layer 4: Trust structures. Irrevocable trusts, domestic asset protection trusts, and offshore trusts provide the highest level of protection—but must be established before claims arise. Layer 5: Geographic diversification. Assets in multiple jurisdictions are harder to seize than assets concentrated in one place. A judgment in California doesn't automatically reach assets in Wyoming or the Cayman Islands. Each layer stops different threats. Insurance stops routine claims. Entities stop business liabilities. Trusts stop personal creditors. Diversification stops aggressive enforcement. Build all five."
        },
        {
          heading: 'The Charging Order Protection',
          content: "When a creditor gets a judgment against you personally, they try to seize your assets. If you own LLC interests, some states offer 'charging order protection.' The creditor cannot take your LLC interest or force a sale. They can only wait for distributions—and if the LLC doesn't distribute, they get nothing. Meanwhile, in some states, the creditor may still owe tax on their share of the LLC's income—even though they received nothing. This is called a 'phantom income' situation, and it often forces creditors to settle for pennies on the dollar. Wyoming and Nevada offer the strongest charging order protection—extending it even to single-member LLCs. Delaware offers protection for multi-member LLCs but not single-member. California offers almost no protection. Where you form your LLC matters. A Wyoming LLC holding real estate gets better protection than the same LLC formed in California. This is legal optimization, and it's why the wealthy form entities in specific jurisdictions regardless of where they live."
        },
        {
          heading: 'Domestic Asset Protection Trusts',
          content: "A Domestic Asset Protection Trust (DAPT) is an irrevocable trust that you create, fund, and can still benefit from—but creditors cannot reach. It sounds too good to be true, and there are limitations, but in the right states, it works. Seventeen states allow DAPTs, with Nevada, Delaware, and South Dakota offering the strongest protections. You transfer assets to the trust, name yourself as a beneficiary, and after a waiting period (typically 2-4 years), those assets are protected from future creditors. The key word is 'future.' A DAPT does not protect against claims that existed when you funded it—that's fraudulent transfer. You must establish the trust and wait the statutory period before claims arise. For doctors, business owners, real estate investors, and others facing high liability risk, a DAPT funded with excess wealth can provide significant peace of mind. Work with an attorney experienced in DAPT structuring—the rules are technical and vary by state."
        },
        {
          heading: 'International Structures: The Ultimate Firewall',
          content: "Assets held in foreign jurisdictions add a layer of protection that domestic structures cannot match. A U.S. creditor must domesticate their judgment in a foreign country—often a slow, expensive, or impossible process. Cook Islands trusts are the most famous asset protection tool. Cook Islands courts do not recognize U.S. judgments and have a short statute of limitations for fraudulent transfer claims. A properly structured Cook Islands trust is essentially unreachable by U.S. creditors. Nevis LLCs offer similar protection with lower costs. Swiss bank accounts add privacy (though not secrecy—U.S. citizens must report foreign accounts). Singapore and Dubai provide stable jurisdictions for holding international assets. The warnings: international structures must be reported to the IRS. FBAR and FATCA filings are required. The goal is not to hide assets—it's to make them impractical to seize. And international structures must be established well before any claims arise. These are defensive moves, not reactive ones. For substantial wealth, international diversification is standard practice among the ultra-wealthy. It's not about paranoia—it's about prudent planning."
        }
      ],
      caseStudy: {
        name: "O.J. Simpson's Protected Pension",
        story: "After the 1997 civil judgment against O.J. Simpson for $33.5 million in wrongful death damages, creditors tried to seize everything. They got little. Why? Simpson's NFL pension—worth millions—was protected under ERISA. Federal law shields qualified retirement plans from creditors, even judgment creditors. His home in Florida was protected by Florida's unlimited homestead exemption. Creditors couldn't touch it. He moved his memorabilia and personal property strategically, staying one step ahead. The Goldman and Brown families, despite a massive judgment, collected only a fraction. Simpson's assets weren't hidden—they were held in structures that creditors couldn't reach. This isn't an endorsement of Simpson. It's a lesson: the law protects those who understand it. Retirement accounts, homestead exemptions, and proper entity structures provide legal shields that even large judgments cannot pierce.",
        lesson: "Simpson didn't hide assets. He held them in protected forms. The law provides these protections—but only if you structure for them in advance."
      },
      framework: {
        name: "The Asset Protection Audit",
        steps: [
          "Step 1: Inventory exposed assets. What do you own that a creditor could seize?",
          "Step 2: Maximize insurance. Umbrella policy, professional liability, D&O—what gaps exist?",
          "Step 3: Review entity structure. Are assets in protective jurisdictions? Is corporate form respected?",
          "Step 4: Assess state law protections. Retirement accounts, homestead, tenancy-by-the-entirety.",
          "Step 5: Consider trust structures. Would a DAPT make sense for excess wealth?",
          "Step 6: Evaluate international options. For significant wealth, is geographic diversification appropriate?"
        ]
      },
      exercise: {
        instruction: "Conduct your asset protection audit.",
        prompts: [
          "List every asset worth more than $10,000. How is each titled?",
          "What is your current liability insurance coverage? Is it adequate for your net worth?",
          "Which of your assets are held in LLCs? Are those LLCs in protective jurisdictions?",
          "Do you maximize retirement account contributions? These are protected from creditors.",
          "What assets are exposed that could be restructured into protective entities?"
        ]
      },
      directive: "Review your umbrella insurance coverage today. For every $1 million in net worth, you should have at least $1 million in umbrella coverage. If you're underinsured, fix it this week."
    },
    4: {
      title: 'Exit Architecture',
      intro: "Every asset you build should be structured for an exit. Not because you're planning to leave—but because optionality is power. The right exit architecture means you can sell, merge, IPO, or pass to heirs with maximum value and minimum friction. This module teaches you to build for the exit from day one.",
      sections: [
        {
          heading: 'Clean Cap Tables and Documentation',
          content: "Nothing kills deals faster than messy capitalization. If you can't produce a clean cap table in 24 hours, you're not ready to exit. What a clean cap table includes: every share issued, to whom, at what price, on what date; every option grant with strike price, vesting schedule, and exercise status; every convertible note and SAFE with terms and conversion triggers; every warrant, advisor share, and special arrangement. The cap table must tie perfectly to the stock ledger. The stock ledger must tie perfectly to the corporate minutes. The minutes must tie perfectly to the Board resolutions authorizing the issuances. One discrepancy and due diligence grinds to a halt. Buyers start wondering what else is wrong. Beyond the cap table: all contracts must be findable and organized; IP assignments from every employee and contractor must be on file; all tax filings current; all employee records compliant. This seems like housekeeping. It's not. It's the difference between a smooth exit and a collapsed deal."
        },
        {
          heading: 'Tax-Efficient Sale Structures',
          content: "How you sell matters as much as what you sell. A stock sale and an asset sale of the same business can have wildly different tax outcomes. In a stock sale, shareholders sell their shares. The buyer gets the company—including all liabilities. Sellers typically get capital gains treatment. In an asset sale, the company sells its assets. The buyer gets clean assets without historical liabilities. But the company pays tax on the sale, then shareholders pay tax again on distribution. Double taxation. The structures that optimize: Installment sales spread the gain over multiple years, potentially keeping you in lower tax brackets. Seller financing lets you recognize gain as you receive payment. Equity rollovers let you defer tax by taking stock in the acquirer. Earnouts tie payment to future performance—deferring tax and aligning incentives. 1031 exchanges (for real estate) let you defer gain indefinitely by reinvesting in like-kind property. Every major exit should have a tax structure designed before terms are finalized. The legal fees for optimization are trivial compared to the tax savings."
        },
        {
          heading: 'M&A vs. IPO: Choosing Your Path',
          content: "The two primary exits for significant companies are acquisition (M&A) and initial public offering (IPO). Each has different requirements and implications. M&A is faster, more certain, and provides immediate liquidity. You negotiate with one buyer (or a few), agree on price and terms, and close in 60-180 days. The trade-off: you give up control. The buyer's plans may differ from yours. Earnouts tie you to outcomes you may not control. IPO provides liquidity while maintaining control. You sell a portion of shares to the public, gain a currency for acquisitions, and can sell more over time. The trade-offs: 18-24 month preparation process, ongoing public company compliance costs, quarterly earnings pressure, and lock-up periods preventing immediate sale. The choice depends on your goals, the company's scale, and market conditions. Companies below $100M revenue rarely IPO successfully. Companies with strategic value to acquirers often get premium M&A prices. Build with optionality. Structure so you can go either direction as the opportunity arises."
        },
        {
          heading: 'Generational Transfer: Building a Dynasty',
          content: "Not every exit is a sale. For family businesses and long-term holders, transferring wealth to the next generation is the exit. The strategies: Gift tax exclusions allow $17,000 per person per year (2023) to pass gift-tax-free. Over time, substantial wealth transfers occur within exclusions. Grantor Retained Annuity Trusts (GRATs) let you transfer appreciating assets while retaining an annuity stream, potentially moving appreciation to heirs tax-free. Intentionally Defective Grantor Trusts (IDGTs) freeze estate values while allowing the trust to grow for beneficiaries. Family Limited Partnerships (FLPs) centralize control while transferring limited partnership interests at discounted values. The key: estate planning is a lifetime practice, not a deathbed exercise. The earlier you begin transferring wealth, the more effective the strategies. Warren Buffett's children will inherit billions—but much of his wealth was transferred through trusts and structures decades ago, minimizing estate tax exposure. Build the dynasty structure now. Fund it annually. By the time you exit, the machinery is already in place."
        }
      ],
      caseStudy: {
        name: "WhatsApp's $19 Billion Exit",
        story: "When Facebook acquired WhatsApp for $19 billion in 2014, it was the largest acquisition of a venture-backed company in history. The founders, Jan Koum and Brian Acton, walked away with billions—and they did it tax-efficiently. WhatsApp was structured as a Delaware C-Corp. The founders' shares qualified for QSBS treatment, excluding significant gains from federal tax. The transaction was structured as a stock deal—Facebook paid with cash and Facebook shares. The stock portion qualified for tax-free treatment as a reorganization. The founders received Facebook shares (worth more than the WhatsApp shares they exchanged) without triggering immediate tax. When they eventually sold Facebook shares, they used charitable trusts and other structures to minimize impact. Total tax rate? A fraction of the headline rate. Same $19 billion, radically different after-tax outcomes compared to a poorly structured sale.",
        lesson: "WhatsApp's exit was designed for tax efficiency from the beginning. QSBS structuring, stock-for-stock deal, and post-exit planning combined to preserve billions."
      },
      framework: {
        name: "The Exit Readiness Assessment",
        steps: [
          "Step 1: Produce your cap table. Can you do it in 24 hours? Is it perfectly clean?",
          "Step 2: Organize all documentation. Contracts, IP assignments, employment records, tax filings.",
          "Step 3: Identify tax optimization opportunities. QSBS, installment sale, equity rollover.",
          "Step 4: Assess M&A vs. IPO readiness. What are your options given current scale?",
          "Step 5: Review estate planning structures. GRATs, IDGTs, FLPs—what's in place?",
          "Step 6: Conduct a mock due diligence. What would a buyer find? Fix issues before they're exposed."
        ]
      },
      exercise: {
        instruction: "Assess your exit readiness.",
        prompts: [
          "Can you produce a complete, accurate cap table in 24 hours?",
          "Are all IP assignments from employees and contractors documented and signed?",
          "Does your company qualify for QSBS treatment? What's missing if not?",
          "If you sold tomorrow, what would your tax bill be? Have you modeled it?",
          "What estate planning structures are in place? When were they last reviewed?"
        ]
      },
      directive: "Run a mock due diligence on your company. Create the data room a buyer would request. Find every gap. Fix them before you need to sell."
    }
  },
  'time-arbitrage': {
    1: {
      title: 'The Time Value Equation',
      intro: "Time is the only asset you can't create more of. Billionaires don't manage time—they arbitrage it. They buy other people's time at a discount and sell their own time at a premium. They eliminate time waste ruthlessly. They structure their days so every hour compounds. This module teaches you to think about time not as a constraint but as a currency to be optimized.",
      sections: [
        {
          heading: 'Buying Time: The Delegation Multiplier',
          content: "Every hour you spend on something someone else could do is an hour you can't spend on something only you can do. The math is simple: if your time is worth $500/hour and you can hire someone at $50/hour to do the same task, you're losing $450 every hour you don't delegate. But delegation isn't just about cost—it's about leverage. When you delegate effectively, you're not just freeing up one hour. You're creating a system that runs without you. The best operators delegate everything except: decisions only they can make, relationships only they can build, and work that only they can do. Everything else gets systematized and delegated. The question isn't 'can someone else do this?' It's 'what's the lowest-cost person who can do this well enough?'"
        },
        {
          heading: 'Selling Time: The Premium Positioning',
          content: "Your time is worth what someone will pay for it. Most people price their time based on what they think they're worth. Billionaires price their time based on the value they create. If a decision you make saves a company $10 million, your hour is worth a fraction of that $10 million—not your hourly rate. This is why consultants charge $5,000/hour. Not because they're 100x better than a $50/hour employee. Because the decisions they make are worth 100x more. Position your time accordingly. If you're making strategic decisions, price like a strategist. If you're building relationships, price like a relationship builder. If you're solving problems no one else can solve, price like the only person who can solve them. Your calendar should reflect scarcity. If you're always available, you're not valuable enough."
        },
        {
          heading: 'Time Arbitrage: The Compound Effect',
          content: "Time arbitrage is buying time at a low rate and investing it in activities that generate high returns. Spend one hour learning a skill that saves you 10 hours per year. That's a 10x return. Spend one hour building a system that runs without you. That's infinite return. Spend one hour on a relationship that opens doors for years. That's compound return. The wealthy don't just work hard. They work on the right things. They identify the 20% of activities that generate 80% of results, and they eliminate or delegate the rest. They batch similar tasks. They eliminate meetings that don't require decisions. They automate everything that can be automated. They structure their days so high-leverage activities happen when they have peak energy. Time arbitrage isn't about being busy. It's about being strategic."
        },
        {
          heading: 'The Time Audit: Finding the Leaks',
          content: "You can't optimize what you don't measure. Track your time for one week. Every 15 minutes, log what you did. At the end of the week, categorize: high-leverage (only you can do, high impact), medium-leverage (you can do, but others could too), low-leverage (anyone could do), and waste (shouldn't be done at all). Most people find 30-40% of their time is waste or low-leverage. That's 12-16 hours per week that could be delegated, automated, or eliminated. The wealthy audit their time monthly. They ask: what am I doing that I shouldn't be? What am I doing that someone else could do? What am I not doing that only I can do? Then they restructure. They don't try to do more. They do less, better. They focus on the activities that compound. They eliminate everything else."
        }
      ],
      caseStudy: {
        name: "Warren Buffett's Calendar",
        story: "Warren Buffett's calendar is famously empty. He doesn't take meetings unless they're essential. He doesn't read emails. He doesn't attend conferences. He spends his days reading, thinking, and making decisions. When he does meet with someone, it's because that meeting will lead to a decision worth millions or billions. He's not being antisocial—he's being strategic. Every hour he spends in a non-essential meeting is an hour he can't spend reading an annual report that might reveal a $10 billion opportunity. His time is so valuable that he structures his entire life to protect it. The result: he's made more money per hour worked than almost anyone in history. Not because he works more hours. Because he works on the right things.",
        lesson: "Buffett doesn't manage time. He protects it. He eliminates everything that doesn't require his unique judgment. That's the model."
      },
      framework: {
        name: "The Time Arbitrage Framework",
        steps: [
          "Step 1: Track your time for one week. Log every 15-minute block. No exceptions.",
          "Step 2: Categorize every activity: high-leverage, medium-leverage, low-leverage, or waste.",
          "Step 3: Calculate the cost. What's your time worth? Multiply by hours spent in low-leverage activities.",
          "Step 4: Identify what to delegate. List every task someone else could do at 20% of your hourly rate.",
          "Step 5: Identify what to eliminate. List every activity that shouldn't be done at all.",
          "Step 6: Restructure your calendar. Block time for high-leverage work. Delegate or eliminate the rest."
        ]
      },
      exercise: {
        instruction: "Complete this time audit exercise now.",
        prompts: [
          "Track your time for the next 7 days. Log every 15-minute block. What percentage is high-leverage?",
          "What are the top 3 activities you do that someone else could do for less than 20% of your hourly rate?",
          "What are the top 3 activities you do that shouldn't be done at all?",
          "If you had 10 extra hours per week from delegation and elimination, what would you do with them?",
          "What is one system you could build this week that would save you 5+ hours per month?"
        ]
      },
      directive: "Start tracking your time today. Log every 15 minutes for the next 7 days. No excuses. You can't optimize what you don't measure."
    },
    2: {
      title: 'Energy Management',
      intro: "Time management is a myth. You can't manage time—it passes at the same rate for everyone. What you can manage is energy. The wealthy don't try to work more hours. They work better hours. They structure their days around energy cycles, not task lists. This module teaches you to optimize energy, not time.",
      sections: [
        {
          heading: 'The Energy Cycle: Peak, Recovery, Maintenance',
          content: "Your energy isn't constant. It cycles. You have peak hours when you're sharp, creative, and decisive. You have recovery hours when you need rest, reflection, or low-stakes work. You have maintenance hours when you're functional but not exceptional. The wealthy identify their cycles and structure accordingly. Peak hours are for decisions, creativity, and high-stakes work. Recovery hours are for reading, thinking, and relationship-building. Maintenance hours are for routine tasks, emails, and administrative work. Most people do the opposite. They check email in the morning when they should be making decisions. They try to be creative in the afternoon when they should be recovering. They waste peak hours on low-leverage tasks. Know your cycle. Track your energy for two weeks. When are you sharpest? When do you need rest? Then structure your calendar to match."
        },
        {
          heading: 'Decision Fatigue: The Hidden Cost',
          content: "Every decision you make depletes mental energy. The wealthy minimize decision fatigue by eliminating choices. They wear the same clothes. They eat the same breakfast. They automate routine decisions. Mark Zuckerberg wears gray t-shirts. Steve Jobs wore black turtlenecks. Not because they lack style—because they eliminated a decision. Every decision you don't make is energy preserved for decisions that matter. Automate what you can. Systematize what you can't automate. Delegate decisions that don't require your judgment. Reserve your decision-making capacity for the choices that create or destroy value. The average person makes 35,000 decisions per day. Most are trivial. The wealthy make fewer decisions, but each one matters more."
        },
        {
          heading: 'The Recovery Protocol',
          content: "Peak performance requires recovery. The wealthy don't work until they collapse. They work in sprints, then recover. They take breaks between high-intensity work. They protect sleep. They exercise. They disconnect. Recovery isn't laziness—it's strategy. A rested mind makes better decisions. A recovered body sustains peak performance longer. The wealthy treat recovery as seriously as work. They schedule it. They protect it. They optimize it. Sleep is non-negotiable. Exercise is non-negotiable. Downtime is non-negotiable. Not because they're soft. Because they understand that sustainable performance beats unsustainable intensity every time."
        },
        {
          heading: 'Energy Multipliers: The Compound Activities',
          content: "Some activities multiply your energy. Exercise increases mental clarity. Meditation reduces stress and improves focus. Learning new skills creates confidence and capability. Relationships provide support and opportunities. The wealthy don't just work. They invest in activities that make their work better. They exercise not to look good, but to think clearly. They read not to be informed, but to make better decisions. They build relationships not to be social, but to create leverage. Every hour invested in energy multipliers pays dividends in peak performance. Identify your multipliers. Schedule them. Protect them. They're not optional—they're essential."
        }
      ],
      caseStudy: {
        name: "Elon Musk's Work Schedule",
        story: "Elon Musk works 80-100 hours per week, but he doesn't work randomly. He works in focused blocks. He eliminates distractions. He makes decisions quickly. He delegates everything except the highest-leverage work. He structures his days around what only he can do. When he's at Tesla, he's making production decisions. When he's at SpaceX, he's solving engineering problems. When he's on Twitter, he's managing narrative. He doesn't waste energy on low-leverage tasks. He doesn't attend meetings that don't require his input. He doesn't read emails that don't need his response. His energy goes to decisions that move companies forward. The result: he runs multiple billion-dollar companies simultaneously. Not by working more hours than everyone else. By working on the right things with maximum energy.",
        lesson: "Musk doesn't manage time. He manages energy. He works when he's sharp. He delegates when he's not. He eliminates everything that doesn't require his unique capability."
      },
      framework: {
        name: "The Energy Optimization Framework",
        steps: [
          "Step 1: Track your energy for two weeks. Rate yourself 1-10 every hour. When are you at peak?",
          "Step 2: Identify your peak hours. Block them for high-leverage work. Protect them.",
          "Step 3: Eliminate decision fatigue. Automate routine choices. Systematize recurring decisions.",
          "Step 4: Schedule recovery. Block time for rest, exercise, and disconnection. Non-negotiable.",
          "Step 5: Identify your energy multipliers. Exercise, meditation, learning, relationships. Schedule them.",
          "Step 6: Restructure your calendar. Match activities to energy levels. Peak for decisions. Recovery for rest."
        ]
      },
      exercise: {
        instruction: "Complete this energy audit.",
        prompts: [
          "Rate your energy level (1-10) every hour for one day. When are you at peak?",
          "What decisions do you make daily that could be automated or systematized?",
          "What is your recovery protocol? How do you recharge? Is it scheduled?",
          "What are your energy multipliers? Exercise, meditation, learning? How often do you do them?",
          "If you restructured your day to match your energy cycle, what would change?"
        ]
      },
      directive: "Block your peak hours for high-leverage work starting tomorrow. No meetings. No email. No distractions. Just the work that only you can do."
    },
    3: {
      title: 'System Building',
      intro: "The wealthy don't work in their business. They work on their business. They build systems that run without them. They create processes that scale. They document what works so it can be replicated. This module teaches you to systematize everything that can be systematized.",
      sections: [
        {
          heading: 'The System Hierarchy',
          content: "Not all systems are equal. Level 1 systems are personal—they help you work better. Morning routines, decision frameworks, communication templates. Level 2 systems are team-based—they help your team work better. Onboarding processes, meeting structures, feedback loops. Level 3 systems are organizational—they help the entire organization work better. Hiring processes, performance reviews, strategic planning cycles. Level 4 systems are market-facing—they help customers experience consistency. Sales processes, customer service protocols, product delivery systems. The wealthy build systems at all levels, but they start with Level 1. You can't systematize others until you've systematized yourself. Build your personal systems first. Then scale what works."
        },
        {
          heading: 'Documentation: The Knowledge Transfer',
          content: "If it's not documented, it's not a system. It's a habit. Habits die with the person. Systems survive. The wealthy document everything that works. They create playbooks. They write procedures. They record processes. When something works, they capture it. When something fails, they document why. This creates institutional knowledge. It allows delegation. It enables scaling. Documentation doesn't have to be elaborate. It can be a checklist. A flowchart. A video. A template. The format doesn't matter. What matters is that someone else can follow it and get the same result. Document your systems. Make them accessible. Update them when they change. This is how you scale yourself."
        },
        {
          heading: 'Automation: The Force Multiplier',
          content: "Automation is systematization at scale. Every repetitive task should be automated. Email responses. Invoice generation. Report creation. Data entry. The wealthy automate everything that can be automated. They use software. They use scripts. They use tools. They invest in automation upfront to save time forever. The question isn't 'can this be automated?' It's 'should this be automated?' If a task happens more than once per week, automate it. If it takes more than 5 minutes, automate it. If it's prone to human error, automate it. Automation isn't about replacing people. It's about freeing people to do work that requires judgment, creativity, and relationship-building."
        },
        {
          heading: 'The System Audit',
          content: "Systems degrade over time. What worked last year might not work this year. The wealthy audit their systems regularly. They ask: is this still the best way? Is this still necessary? Can this be improved? They measure system performance. They track outcomes. They iterate. A system that doesn't improve is a system that's dying. Audit your systems quarterly. Identify what's working. Identify what's broken. Identify what's missing. Then fix, improve, or build. Systems aren't set-and-forget. They're living things that require maintenance and evolution."
        }
      ],
      caseStudy: {
        name: "McDonald's System",
        story: "McDonald's doesn't sell hamburgers. It sells systems. Every McDonald's location follows the same playbook. The same recipes. The same processes. The same training. The result: consistency at scale. A Big Mac in Tokyo tastes the same as a Big Mac in New York. That's not because the employees are better. It's because the system is better. Ray Kroc didn't invent the hamburger. He systematized it. He documented every process. He trained every employee. He created a system that could be replicated infinitely. The system is the product. The hamburger is just the output. The wealthy think the same way. They don't just do things. They build systems that do things. They create processes that can be taught, replicated, and scaled.",
        lesson: "Kroc didn't build a restaurant. He built a system. The system is what scaled. The system is what created value. Build systems, not just products."
      },
      framework: {
        name: "The System Building Framework",
        steps: [
          "Step 1: Identify repetitive tasks. What do you do more than once per week?",
          "Step 2: Document the current process. Write down exactly how you do it now.",
          "Step 3: Identify improvements. What could be better? Faster? More reliable?",
          "Step 4: Create the system. Write the playbook. Build the template. Record the process.",
          "Step 5: Test the system. Have someone else follow it. Does it work?",
          "Step 6: Deploy and iterate. Use the system. Measure results. Improve continuously."
        ]
      },
      exercise: {
        instruction: "Build one system this week.",
        prompts: [
          "What is one task you do weekly that could be systematized?",
          "Document the current process. Write down every step.",
          "What could be improved? What's slow? What's error-prone?",
          "Create the improved system. Write the playbook or build the template.",
          "Who could you delegate this to once it's systematized?"
        ]
      },
      directive: "Document one system this week. Write the playbook. Create the template. Then delegate it. That's how you scale."
    },
    4: {
      title: 'Leverage and Scale',
      intro: "The final module integrates time arbitrage, energy management, and system building into a complete leverage strategy. You'll learn to work less while achieving more. To scale yourself beyond your personal capacity. To create systems that compound your impact.",
      sections: [
        {
          heading: 'The Leverage Stack',
          content: "Leverage comes in layers. Time leverage: buying other people's time. Capital leverage: using other people's money. System leverage: creating processes that work without you. Network leverage: accessing other people's relationships. The wealthy stack all four. They don't just work hard. They work smart. They don't just build businesses. They build systems. They don't just make money. They create leverage. The goal isn't to work more. It's to work less while achieving more. To create value that compounds. To build systems that scale. To generate returns that multiply. That's leverage. That's how you become billionaireable."
        },
        {
          heading: 'Scaling Yourself',
          content: "You have 24 hours per day. That's fixed. But your impact doesn't have to be. The wealthy scale themselves through leverage. They delegate. They automate. They systematize. They build teams. They create products. They write books. They speak. They consult. They invest. Every activity that doesn't require their personal presence is leverage. Every system that runs without them is leverage. Every relationship that opens doors is leverage. Scale yourself by identifying what only you can do, then eliminating or delegating everything else. Focus on the activities that compound. Build systems that multiply your impact. Create leverage in every dimension."
        },
        {
          heading: 'The Compound Effect',
          content: "Small improvements compound. A 1% improvement per day compounds to 37x over a year. The wealthy don't try to make massive changes. They make consistent improvements. They optimize their time. They optimize their energy. They optimize their systems. They optimize their leverage. Each optimization compounds. Time saved today creates more time tomorrow. Energy preserved today creates more energy tomorrow. Systems built today create more systems tomorrow. Leverage created today creates more leverage tomorrow. The compound effect is the secret. Not massive action. Consistent optimization. Not working harder. Working smarter. Not doing more. Doing better."
        },
        {
          heading: 'Your Leverage Plan',
          content: "Create your leverage plan. What will you delegate? What will you automate? What systems will you build? What relationships will you cultivate? What products will you create? What investments will you make? The wealthy don't wing it. They plan their leverage. They identify opportunities. They build systems. They create multipliers. They stack leverage in every dimension. Then they execute. They don't wait for permission. They don't wait for perfect. They start. They iterate. They compound. That's the path. That's how you become billionaireable."
        }
      ],
      caseStudy: {
        name: "Richard Branson's Leverage Stack",
        story: "Richard Branson doesn't run 400 companies. He doesn't try to. He builds systems. He hires operators. He creates brands. He leverages his name, his network, and his capital. Virgin isn't one company. It's a system. A brand. A platform. Branson doesn't manage day-to-day operations. He makes strategic decisions. He builds relationships. He creates opportunities. He leverages his time, his capital, and his network to create value at scale. The result: 400 companies, billions in revenue, and a lifestyle that includes island-hopping and space travel. Not because he works 400 times harder. Because he created 400 times more leverage.",
        lesson: "Branson doesn't work in his businesses. He works on his businesses. He creates leverage. He builds systems. He scales himself. That's the model."
      },
      framework: {
        name: "The Complete Leverage Framework",
        steps: [
          "Step 1: Audit your current leverage. What are you doing that someone else could do?",
          "Step 2: Identify leverage opportunities. Time, capital, systems, networks—where can you create more?",
          "Step 3: Build your leverage plan. What will you delegate? Automate? Systematize?",
          "Step 4: Execute. Start with the highest-impact leverage opportunity.",
          "Step 5: Measure. Track time saved, impact created, value generated.",
          "Step 6: Compound. Use the leverage you created to create more leverage."
        ]
      },
      exercise: {
        instruction: "Create your complete leverage plan.",
        prompts: [
          "What are the top 5 activities you do that someone else could do?",
          "What systems could you build this quarter that would save 10+ hours per week?",
          "What relationships could you cultivate that would open doors?",
          "What products or content could you create that would scale your impact?",
          "What is your 90-day leverage plan? What will you delegate, automate, or systematize?"
        ]
      },
      directive: "Create your leverage plan today. Identify one activity to delegate, one system to build, one relationship to cultivate. Start executing this week."
    }
  },
  'bio-availability': {
    1: {
      title: 'Longevity Optimization',
      intro: "The wealthy don't just accumulate wealth. They accumulate time. They optimize their biology to extend their productive years, maintain peak performance, and outlive their competitors. This isn't vanity. It's strategy. A 10-year extension of peak performance is worth billions. This module teaches you to think about your body as an asset to be optimized.",
      sections: [
        {
          heading: 'The Longevity Equation',
          content: "Longevity isn't just about living longer. It's about living better longer. The wealthy optimize for healthspan, not just lifespan. They want to maintain peak cognitive function, physical capability, and energy levels into their 80s, 90s, and beyond. This requires a different approach than conventional health advice. It requires biohacking. It requires optimization. It requires treating your body like a high-performance machine. The wealthy don't wait for problems. They prevent them. They don't react to symptoms. They optimize systems. They don't follow generic advice. They personalize everything. Your biology is unique. Your optimization should be too."
        },
        {
          heading: 'The Biohacking Stack',
          content: "Biohacking is the practice of changing your environment and biology to improve performance. The wealthy use a stack: nutrition optimization (keto, intermittent fasting, personalized diets), supplementation (targeted vitamins, nootropics, peptides), exercise protocols (high-intensity interval training, resistance training, recovery), sleep optimization (temperature, light, timing), stress management (meditation, breathing, therapy), and advanced interventions (hormone optimization, stem cells, genetic testing). They don't do everything. They do what works for them. They test. They measure. They optimize. They treat their body like a lab. Every intervention is an experiment. Every result is data. They iterate until they find what works."
        },
        {
          heading: 'The Performance Protocol',
          content: "Peak performance requires peak biology. The wealthy structure their days around biological optimization. They wake at the same time. They eat at optimal windows. They exercise when their body is primed. They work when their brain is sharp. They recover when their body needs it. They don't fight their biology. They work with it. They optimize their circadian rhythms. They optimize their hormone cycles. They optimize their energy systems. The result: sustained peak performance. Not just for a day. For decades. The wealthy don't burn out. They optimize. They don't collapse. They recover. They don't decline. They maintain."
        },
        {
          heading: 'The Longevity Investment',
          content: "Optimizing your biology is an investment, not an expense. Every dollar spent on health optimization pays dividends in extended productive years. A 10-year extension of peak performance at $1 million per year is worth $10 million. The wealthy invest in their biology like they invest in their businesses. They hire coaches. They get testing. They use advanced interventions. They don't wait for problems. They prevent them. They don't accept decline. They optimize. Your biology is your most valuable asset. Treat it accordingly."
        }
      ],
      caseStudy: {
        name: "Bryan Johnson's Blueprint",
        story: "Bryan Johnson, founder of Braintree, spends $2 million per year optimizing his biology. He tracks 70+ biomarkers. He follows a strict protocol. He uses advanced interventions. The result: at 46, he has the biological age of someone in their 30s. His goal isn't just to live longer. It's to maintain peak performance for decades. He's not waiting for decline. He's preventing it. He's not accepting aging. He's optimizing it. His investment in biology is an investment in productive years. Every year he extends his peak performance is worth millions in continued business value.",
        lesson: "Johnson doesn't accept biological decline. He optimizes against it. He invests in his biology like he invests in his businesses. That's the model."
      },
      framework: {
        name: "The Bio-Optimization Framework",
        steps: [
          "Step 1: Get baseline testing. Full blood panel, hormone levels, genetic testing, biological age markers.",
          "Step 2: Identify optimization opportunities. Where are you below optimal? What's declining?",
          "Step 3: Design your protocol. Nutrition, exercise, sleep, supplementation, interventions.",
          "Step 4: Implement and measure. Track biomarkers monthly. Adjust based on data.",
          "Step 5: Optimize continuously. What's working? What's not? Iterate.",
          "Step 6: Scale what works. Double down on interventions that move the needle."
        ]
      },
      exercise: {
        instruction: "Assess your current bio-optimization.",
        prompts: [
          "When was your last comprehensive health check? What did it reveal?",
          "What is your current exercise protocol? Is it optimized for longevity?",
          "What is your sleep quality? Are you tracking it?",
          "What supplements or interventions are you using? Why?",
          "What is one bio-optimization you could implement this month?"
        ]
      },
      directive: "Schedule comprehensive health testing this month. Get baseline biomarkers. Know where you stand. Then optimize."
    },
    2: {
      title: 'Cognitive Enhancement',
      intro: "Your brain is your most valuable asset. The wealthy don't just protect it. They optimize it. They enhance cognitive function. They improve memory. They increase focus. They extend mental performance. This module teaches you to think about your brain as a system to be optimized.",
      sections: [
        {
          heading: 'The Cognitive Stack',
          content: "Cognitive enhancement requires a stack. Sleep optimization (7-9 hours, consistent timing, optimal temperature), nutrition (brain-healthy fats, antioxidants, nootropics), exercise (cardio for neurogenesis, strength for cognitive function), stress management (meditation, breathing, therapy), and cognitive training (learning, puzzles, challenges). The wealthy don't just do one thing. They stack interventions. They optimize sleep. They optimize nutrition. They optimize exercise. They optimize stress. They optimize learning. The result: sustained cognitive performance. Not just for a day. For decades."
        },
        {
          heading: 'Nootropics: The Smart Drugs',
          content: "Nootropics are substances that enhance cognitive function. The wealthy use them strategically. Caffeine for focus. L-theanine for calm focus. Modafinil for sustained attention. Piracetam for memory. Lion's mane for neurogenesis. They don't abuse them. They optimize them. They test. They measure. They find what works. They use the minimum effective dose. They cycle to avoid tolerance. They combine for synergy. Nootropics aren't magic. They're tools. Used correctly, they enhance performance. Used incorrectly, they create dependency. The wealthy use them like they use everything else: strategically, measured, optimized."
        },
        {
          heading: 'The Learning Protocol',
          content: "The brain is like a muscle. Use it or lose it. The wealthy never stop learning. They read daily. They take courses. They learn new skills. They challenge themselves. They don't just consume information. They apply it. They don't just learn. They teach. Teaching is the highest form of learning. The wealthy structure learning into their days. They block time for reading. They schedule courses. They join masterminds. They hire coaches. They invest in their cognitive development like they invest in their businesses. The result: they stay sharp. They stay relevant. They stay ahead."
        },
        {
          heading: 'The Focus Protocol',
          content: "Deep work requires deep focus. The wealthy structure their days for focus. They eliminate distractions. They block time for deep work. They use focus techniques. They optimize their environment. They don't multitask. They single-task. They don't check email constantly. They batch it. They don't attend unnecessary meetings. They protect their focus time. The result: they produce more in less time. They make better decisions. They create more value. Focus is a skill. It requires practice. It requires optimization. The wealthy treat it accordingly."
        }
      ],
      caseStudy: {
        name: "Elon Musk's Learning Protocol",
        story: "Elon Musk taught himself rocket science by reading textbooks. When he started SpaceX, he didn't have an aerospace engineering degree. He learned. He read. He asked questions. He hired experts. He learned from them. He never stopped learning. Today, he's one of the most knowledgeable people in multiple industries. Not because he's naturally smarter. Because he never stops learning. He reads constantly. He asks questions constantly. He challenges assumptions constantly. His learning protocol is his competitive advantage.",
        lesson: "Musk doesn't accept knowledge limits. He learns. He reads. He questions. He never stops. That's cognitive optimization."
      },
      framework: {
        name: "The Cognitive Enhancement Framework",
        steps: [
          "Step 1: Optimize sleep. 7-9 hours, consistent timing, optimal environment.",
          "Step 2: Optimize nutrition. Brain-healthy fats, antioxidants, nootropics.",
          "Step 3: Exercise for cognition. Cardio for neurogenesis, strength for function.",
          "Step 4: Manage stress. Meditation, breathing, therapy.",
          "Step 5: Learn daily. Read, take courses, challenge yourself.",
          "Step 6: Protect focus. Eliminate distractions, block time, single-task."
        ]
      },
      exercise: {
        instruction: "Assess your cognitive optimization.",
        prompts: [
          "What is your current sleep quality? Are you tracking it?",
          "What is your learning protocol? How much do you read daily?",
          "What nootropics or supplements are you using? Why?",
          "What is your focus protocol? How do you protect deep work time?",
          "What is one cognitive enhancement you could implement this month?"
        ]
      },
      directive: "Block 2 hours daily for deep work starting tomorrow. No email. No meetings. No distractions. Just focus. That's cognitive optimization."
    },
    3: {
      title: 'Energy Systems',
      intro: "Energy is the foundation of everything. Without energy, you can't think clearly. You can't make decisions. You can't create value. The wealthy optimize their energy systems. They don't just manage energy. They create it. This module teaches you to think about energy as a system to be optimized.",
      sections: [
        {
          heading: 'The Energy Stack',
          content: "Energy comes from multiple systems. Mitochondrial function (the powerhouses of cells), hormone optimization (testosterone, growth hormone, thyroid), nutrition (macros, micros, timing), exercise (strength, cardio, recovery), and sleep (quality, quantity, timing). The wealthy optimize all of them. They don't just eat well. They optimize nutrition. They don't just exercise. They optimize training. They don't just sleep. They optimize recovery. They treat energy as a system. They measure it. They optimize it. They compound it."
        },
        {
          heading: 'Mitochondrial Optimization',
          content: "Mitochondria are the powerhouses of your cells. They produce energy. The wealthy optimize mitochondrial function. They use targeted supplements (CoQ10, PQQ, NAD+). They practice intermittent fasting (which stimulates mitochondrial biogenesis). They do cold exposure (which improves mitochondrial efficiency). They optimize exercise (which creates more mitochondria). They don't just accept declining energy. They optimize the systems that create it. The result: sustained high energy. Not just for a day. For decades."
        },
        {
          heading: 'Hormone Optimization',
          content: "Hormones drive energy. Testosterone, growth hormone, thyroid hormones—they all affect energy levels. The wealthy optimize their hormones. They get tested. They identify deficiencies. They optimize. They don't accept decline. They prevent it. They don't wait for problems. They optimize systems. Hormone optimization isn't just about feeling better. It's about performing better. It's about maintaining peak performance. It's about extending productive years."
        },
        {
          heading: 'The Energy Protocol',
          content: "The wealthy structure their days around energy optimization. They wake at optimal times. They eat at optimal windows. They exercise when energy is high. They work when focus is peak. They recover when energy is low. They don't fight their energy cycles. They work with them. They optimize them. The result: sustained high performance. Not through willpower. Through optimization."
        }
      ],
      caseStudy: {
        name: "Tim Ferriss's Biohacking",
        story: "Tim Ferriss experiments constantly with biohacking. He tests protocols. He measures results. He optimizes. He's documented his experiments in books, podcasts, and courses. He doesn't just follow advice. He tests it. He doesn't just accept norms. He challenges them. His energy optimization is his competitive advantage. He maintains high performance across multiple projects. Not through brute force. Through optimization.",
        lesson: "Ferriss doesn't accept energy decline. He optimizes against it. He tests. He measures. He iterates. That's the model."
      },
      framework: {
        name: "The Energy Optimization Framework",
        steps: [
          "Step 1: Get hormone testing. Testosterone, growth hormone, thyroid, cortisol.",
          "Step 2: Optimize mitochondrial function. Supplements, fasting, cold exposure, exercise.",
          "Step 3: Optimize nutrition. Macros, micros, timing.",
          "Step 4: Optimize exercise. Strength, cardio, recovery.",
          "Step 5: Optimize sleep. Quality, quantity, timing.",
          "Step 6: Measure and iterate. Track energy levels. Adjust protocol."
        ]
      },
      exercise: {
        instruction: "Assess your energy systems.",
        prompts: [
          "What is your current energy level? Rate it 1-10. What affects it?",
          "When was your last hormone test? What did it reveal?",
          "What is your exercise protocol? Is it optimized for energy?",
          "What is your sleep quality? Are you tracking it?",
          "What is one energy optimization you could implement this month?"
        ]
      },
      directive: "Get hormone testing this month. Know your baseline. Then optimize. Your energy is your foundation."
    },
    4: {
      title: 'Longevity Strategy',
      intro: "The final module integrates all bio-optimization into a complete longevity strategy. You'll learn to think about your biology as an asset to be optimized, not a constraint to be managed. To extend your productive years. To maintain peak performance. To outlive your competitors.",
      sections: [
        {
          heading: 'The Longevity Stack',
          content: "Longevity requires a stack. Nutrition optimization, exercise protocols, sleep optimization, stress management, hormone optimization, cognitive enhancement, and advanced interventions. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results. The goal isn't just to live longer. It's to live better longer. To maintain peak performance. To extend productive years. To create more value. That's longevity optimization."
        },
        {
          heading: 'The Investment Mindset',
          content: "Optimizing your biology is an investment. Every dollar spent on health optimization pays dividends in extended productive years. A 10-year extension of peak performance is worth millions. The wealthy invest in their biology like they invest in their businesses. They hire coaches. They get testing. They use advanced interventions. They don't wait for problems. They prevent them. They don't accept decline. They optimize. Your biology is your most valuable asset. Treat it accordingly."
        },
        {
          heading: 'The Measurement Protocol',
          content: "You can't optimize what you don't measure. The wealthy track everything. Sleep quality. Energy levels. Cognitive function. Hormone levels. Biological age. They don't guess. They measure. They don't assume. They test. They don't hope. They optimize. Measurement is the foundation of optimization. Track your biomarkers. Track your performance. Track your results. Then optimize based on data."
        },
        {
          heading: 'Your Longevity Plan',
          content: "Create your longevity plan. What will you optimize? Nutrition? Exercise? Sleep? Hormones? Cognition? What testing will you get? What interventions will you use? What protocols will you follow? The wealthy don't wing it. They plan. They test. They optimize. They compound. That's the path. That's how you extend your productive years. That's how you maintain peak performance. That's how you become billionaireable."
        }
      ],
      caseStudy: {
        name: "Peter Thiel's Longevity Investments",
        story: "Peter Thiel invests heavily in longevity companies. He's not just interested in living longer. He's interested in maintaining peak performance. He invests in companies working on aging reversal, life extension, and performance optimization. He's not waiting for the future. He's building it. He's not accepting decline. He's optimizing against it. His investment in longevity is an investment in productive years. Every year he extends his peak performance is worth millions in continued business value.",
        lesson: "Thiel doesn't accept biological limits. He invests in overcoming them. He optimizes. He compounds. That's the model."
      },
      framework: {
        name: "The Complete Longevity Framework",
        steps: [
          "Step 1: Get comprehensive testing. Hormones, biomarkers, biological age, genetic testing.",
          "Step 2: Design your optimization stack. Nutrition, exercise, sleep, stress, hormones, cognition.",
          "Step 3: Implement your protocol. Start with highest-impact interventions.",
          "Step 4: Measure results. Track biomarkers monthly. Adjust based on data.",
          "Step 5: Optimize continuously. What's working? What's not? Iterate.",
          "Step 6: Scale what works. Double down on interventions that move the needle."
        ]
      },
      exercise: {
        instruction: "Create your longevity plan.",
        prompts: [
          "What is your current biological age? When did you last test?",
          "What is your optimization stack? Nutrition, exercise, sleep, stress, hormones?",
          "What testing will you get this quarter? Hormones? Biomarkers? Genetic?",
          "What interventions will you implement? Supplements? Protocols? Advanced?",
          "What is your 90-day longevity plan? What will you optimize?"
        ]
      },
      directive: "Create your longevity plan today. Get testing. Design your stack. Start optimizing. Your biology is your foundation."
    }
  },
  'political-capital': {
    1: {
      title: 'Influence Architecture',
      intro: "The wealthy don't just have money. They have influence. They understand that political capital—the ability to shape policy, access decision-makers, and navigate regulatory environments—is as valuable as financial capital. This module teaches you to think about influence as an asset to be built.",
      sections: [
        {
          heading: 'The Influence Stack',
          content: "Influence comes from multiple sources. Relationships with decision-makers, expertise in policy areas, financial contributions, media presence, and strategic positioning. The wealthy don't rely on one source. They build a stack. They cultivate relationships. They develop expertise. They make strategic contributions. They build media presence. They position strategically. They don't just have influence. They create it. They don't just access power. They build it."
        },
        {
          heading: 'Relationship Building at Scale',
          content: "Political capital starts with relationships. The wealthy don't just network. They build relationships. They don't just meet people. They create value for them. They don't just ask for favors. They provide value first. They understand that relationships are investments. They cultivate them over time. They maintain them consistently. They leverage them strategically. The result: access to decision-makers. Influence over policy. Ability to navigate regulatory environments. That's political capital."
        },
        {
          heading: 'The Policy Expertise Play',
          content: "Influence requires expertise. The wealthy don't just have opinions. They have expertise. They understand policy. They understand regulation. They understand how systems work. They develop deep knowledge in areas that matter to them. They become the go-to expert. They provide value to decision-makers. They don't just lobby. They inform. They don't just ask. They contribute. Expertise creates influence. Influence creates access. Access creates opportunity."
        },
        {
          heading: 'Strategic Positioning',
          content: "Influence requires positioning. The wealthy don't just show up. They position strategically. They align with causes that matter. They support candidates who share their values. They build coalitions. They create movements. They don't just have influence. They use it strategically. They don't just access power. They shape it. Strategic positioning creates influence. Influence creates access. Access creates opportunity."
        }
      ],
      caseStudy: {
        name: "Koch Brothers' Political Network",
        story: "The Koch brothers built one of the most influential political networks in America. They didn't just donate money. They built institutions. They funded think tanks. They supported candidates. They built coalitions. They created movements. They didn't just have influence. They created it. They didn't just access power. They shaped it. Their political capital enabled them to shape policy, navigate regulation, and create opportunities. That's political capital at scale.",
        lesson: "The Kochs didn't just donate. They built. They created institutions. They shaped movements. That's how you build political capital."
      },
      framework: {
        name: "The Political Capital Framework",
        steps: [
          "Step 1: Identify your policy interests. What areas matter to you?",
          "Step 2: Develop expertise. Become the go-to expert in your areas.",
          "Step 3: Build relationships. Cultivate connections with decision-makers.",
          "Step 4: Make strategic contributions. Support causes and candidates that align.",
          "Step 5: Build media presence. Become a voice in your areas.",
          "Step 6: Position strategically. Align with movements. Build coalitions."
        ]
      },
      exercise: {
        instruction: "Assess your political capital.",
        prompts: [
          "What are your policy interests? What areas matter to you?",
          "What expertise do you have? What expertise do you need?",
          "What relationships do you have with decision-makers?",
          "What strategic contributions have you made?",
          "What is your 90-day plan to build political capital?"
        ]
      },
      directive: "Identify one policy area that matters to you. Develop expertise. Build relationships. Start building political capital today."
    },
    2: {
      title: 'Regulatory Navigation',
      intro: "Regulation is either a barrier or an advantage. The wealthy don't just comply with regulation. They navigate it. They shape it. They use it as a competitive advantage. This module teaches you to think about regulation as a system to be mastered.",
      sections: [
        {
          heading: 'Understanding the Regulatory Landscape',
          content: "Every industry has regulation. The wealthy understand it deeply. They know the rules. They know the regulators. They know how to navigate. They don't just comply. They optimize. They don't just follow rules. They shape them. They understand that regulation is a system. They master it. They use it. They turn it into advantage."
        },
        {
          heading: 'The Regulatory Advantage',
          content: "Regulation creates barriers. Barriers create advantages. The wealthy use regulation as a competitive moat. They understand that compliance is expensive. They make it expensive for competitors. They understand that regulation creates barriers to entry. They use those barriers. They don't just navigate regulation. They leverage it. They don't just comply. They optimize. They turn regulation into advantage."
        },
        {
          heading: 'Building Regulatory Relationships',
          content: "Regulatory navigation requires relationships. The wealthy build relationships with regulators. They don't just comply. They engage. They don't just follow rules. They shape them. They understand that regulators are people. They build relationships. They provide value. They create influence. They don't just navigate regulation. They shape it."
        },
        {
          heading: 'The Compliance Advantage',
          content: "Compliance is expensive. The wealthy make it an advantage. They invest in compliance. They build systems. They create processes. They don't just comply. They excel. They don't just meet standards. They exceed them. They turn compliance into competitive advantage. They use regulation as a moat. They make it expensive for competitors. They create barriers. They build advantages."
        }
      ],
      caseStudy: {
        name: "Goldman Sachs' Regulatory Mastery",
        story: "Goldman Sachs doesn't just comply with financial regulation. They master it. They hire former regulators. They build relationships. They shape policy. They understand that regulation is a system. They master it. They use it. They turn it into advantage. Their regulatory expertise is a competitive moat. It's expensive for competitors to replicate. It creates barriers. It builds advantages.",
        lesson: "Goldman doesn't just comply. They master. They build relationships. They shape policy. That's regulatory navigation."
      },
      framework: {
        name: "The Regulatory Navigation Framework",
        steps: [
          "Step 1: Understand your regulatory landscape. Know the rules. Know the regulators.",
          "Step 2: Build relationships. Engage with regulators. Provide value.",
          "Step 3: Invest in compliance. Build systems. Create processes.",
          "Step 4: Shape policy. Engage in rulemaking. Provide input.",
          "Step 5: Use regulation as advantage. Make compliance expensive for competitors.",
          "Step 6: Monitor and adapt. Stay ahead of changes. Optimize continuously."
        ]
      },
      exercise: {
        instruction: "Assess your regulatory navigation.",
        prompts: [
          "What regulations affect your business? Do you understand them deeply?",
          "What relationships do you have with regulators?",
          "What is your compliance system? Is it an advantage?",
          "How do you stay ahead of regulatory changes?",
          "What is your 90-day plan to improve regulatory navigation?"
        ]
      },
      directive: "Map your regulatory landscape. Identify key regulations. Build relationships with regulators. Start mastering regulation today."
    },
    3: {
      title: 'Policy Shaping',
      intro: "The wealthy don't just follow policy. They shape it. They understand that policy creates opportunity. They engage in rulemaking. They provide input. They build coalitions. They create movements. This module teaches you to think about policy as a system to be shaped.",
      sections: [
        {
          heading: 'The Policy Process',
          content: "Policy is made through a process. The wealthy understand it. They engage early. They provide input. They build coalitions. They create movements. They don't just react to policy. They shape it. They don't just follow rules. They write them. They understand that policy is a system. They master it. They use it. They turn it into opportunity."
        },
        {
          heading: 'Building Coalitions',
          content: "Policy shaping requires coalitions. The wealthy don't just advocate alone. They build coalitions. They align with others. They create movements. They understand that influence multiplies. They don't just have influence. They create it. They don't just access power. They shape it. Coalitions create influence. Influence creates access. Access creates opportunity."
        },
        {
          heading: 'The Strategic Contribution',
          content: "Policy shaping requires contribution. The wealthy don't just ask. They contribute. They provide expertise. They provide resources. They provide value. They understand that contribution creates influence. They don't just have influence. They earn it. They don't just access power. They build it. Contribution creates influence. Influence creates access. Access creates opportunity."
        },
        {
          heading: 'The Long Game',
          content: "Policy shaping is a long game. The wealthy don't just engage for one issue. They build relationships. They develop expertise. They create influence. They understand that policy is a system. They master it over time. They don't just shape policy. They build the capacity to shape it. They invest in the long game. They compound influence. They create opportunity."
        }
      ],
      caseStudy: {
        name: "Tech Industry's Policy Influence",
        story: "The tech industry didn't just accept regulation. They shaped it. They built relationships. They provided expertise. They created coalitions. They shaped policy to their advantage. They didn't just comply. They optimized. They didn't just follow rules. They wrote them. Their policy influence created opportunity. It created advantage. It created value.",
        lesson: "The tech industry didn't just accept policy. They shaped it. They built relationships. They created coalitions. That's policy shaping."
      },
      framework: {
        name: "The Policy Shaping Framework",
        steps: [
          "Step 1: Identify policy opportunities. What policies matter to you?",
          "Step 2: Develop expertise. Become the go-to expert.",
          "Step 3: Build coalitions. Align with others. Create movements.",
          "Step 4: Engage early. Provide input. Shape the process.",
          "Step 5: Make strategic contributions. Provide value. Build influence.",
          "Step 6: Play the long game. Build relationships. Compound influence."
        ]
      },
      exercise: {
        instruction: "Assess your policy shaping capacity.",
        prompts: [
          "What policies matter to you? What opportunities exist?",
          "What expertise do you have? What expertise do you need?",
          "What coalitions could you build? Who would you align with?",
          "How do you engage in policy? What's your process?",
          "What is your 90-day plan to improve policy shaping?"
        ]
      },
      directive: "Identify one policy opportunity. Develop expertise. Build a coalition. Start shaping policy today."
    },
    4: {
      title: 'Influence at Scale',
      intro: "The final module integrates all political capital building into a complete influence strategy. You'll learn to think about influence as an asset to be built, not a constraint to be managed. To shape policy. To navigate regulation. To create opportunity.",
      sections: [
        {
          heading: 'The Complete Influence Stack',
          content: "Influence requires a stack. Relationships, expertise, contributions, media presence, and strategic positioning. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results. The goal isn't just to have influence. It's to use it strategically. To shape policy. To navigate regulation. To create opportunity. That's political capital at scale."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building political capital is an investment. Every relationship cultivated, every expertise developed, every contribution made pays dividends in influence. The wealthy invest in political capital like they invest in businesses. They build relationships. They develop expertise. They make contributions. They don't just have influence. They create it. They don't just access power. They build it. Political capital is an asset. Treat it accordingly."
        },
        {
          heading: 'The Compound Effect',
          content: "Political capital compounds. Every relationship builds on previous relationships. Every expertise creates more expertise. Every contribution builds more influence. The wealthy don't just build political capital. They compound it. They invest consistently. They build systematically. They optimize continuously. They compound influence. They create opportunity. They build advantage."
        },
        {
          heading: 'Your Influence Plan',
          content: "Create your influence plan. What relationships will you build? What expertise will you develop? What contributions will you make? What media presence will you create? What strategic positioning will you take? The wealthy don't wing it. They plan. They build. They optimize. They compound. That's the path. That's how you build political capital. That's how you create influence. That's how you become billionaireable."
        }
      ],
      caseStudy: {
        name: "George Soros' Political Network",
        story: "George Soros built one of the most influential political networks in the world. He didn't just donate money. He built institutions. He funded movements. He created influence. He didn't just have political capital. He created it. He didn't just access power. He shaped it. His political capital enabled him to shape policy, navigate regulation, and create opportunity at a global scale.",
        lesson: "Soros didn't just donate. He built. He created institutions. He shaped movements. That's political capital at scale."
      },
      framework: {
        name: "The Complete Political Capital Framework",
        steps: [
          "Step 1: Map your influence goals. What do you want to influence?",
          "Step 2: Build your stack. Relationships, expertise, contributions, media, positioning.",
          "Step 3: Develop expertise. Become the go-to expert in your areas.",
          "Step 4: Build relationships. Cultivate connections with decision-makers.",
          "Step 5: Make strategic contributions. Support causes and candidates.",
          "Step 6: Compound influence. Build systematically. Optimize continuously."
        ]
      },
      exercise: {
        instruction: "Create your complete influence plan.",
        prompts: [
          "What are your influence goals? What do you want to shape?",
          "What is your influence stack? Relationships, expertise, contributions?",
          "What relationships will you build this quarter?",
          "What expertise will you develop? What contributions will you make?",
          "What is your 90-day plan to build political capital?"
        ]
      },
      directive: "Create your influence plan today. Identify one relationship to build, one expertise to develop, one contribution to make. Start building political capital this week."
    }
  },
  'syndicate': {
    1: {
      title: 'Deal Flow Architecture',
      intro: "The wealthy don't find deals. They create deal flow. They build networks that bring opportunities to them. They position themselves as the capital provider of choice. They structure deals that others can't. This module teaches you to think about deal flow as a system to be built.",
      sections: [
        {
          heading: 'The Deal Flow Stack',
          content: "Deal flow comes from multiple sources. Direct relationships with entrepreneurs, partnerships with other investors, proprietary sourcing channels, and strategic positioning. The wealthy don't rely on one source. They build a stack. They cultivate relationships. They build partnerships. They create channels. They position strategically. They don't just find deals. They create deal flow."
        },
        {
          heading: 'Building the Network',
          content: "Deal flow requires a network. The wealthy don't just network. They build relationships. They don't just meet people. They create value for them. They understand that relationships are investments. They cultivate them over time. They maintain them consistently. They leverage them strategically. The result: access to the best deals. Opportunities others don't see. Deals that create value."
        },
        {
          heading: 'The Proprietary Advantage',
          content: "The best deals are proprietary. The wealthy don't just compete for public deals. They create proprietary opportunities. They build relationships that bring deals to them first. They position themselves as the capital provider of choice. They structure deals that others can't. They don't just find deals. They create them."
        },
        {
          heading: 'The Syndicate Structure',
          content: "Syndication multiplies capital and risk. The wealthy don't just invest alone. They syndicate. They bring in other investors. They share risk. They multiply capital. They create leverage. They don't just invest. They structure. They don't just take risk. They share it. Syndication creates opportunity. Opportunity creates value."
        }
      ],
      caseStudy: {
        name: "Y Combinator's Deal Flow",
        story: "Y Combinator doesn't just find startups. They create them. They run a program. They provide capital. They provide mentorship. They provide network. They create deal flow. They don't just invest. They build. They don't just find deals. They create them. Their deal flow is proprietary. It's systematic. It's scalable.",
        lesson: "Y Combinator doesn't just find deals. They create them. They build systems. They create networks. That's deal flow architecture."
      },
      framework: {
        name: "The Deal Flow Framework",
        steps: [
          "Step 1: Build your network. Cultivate relationships with entrepreneurs and investors.",
          "Step 2: Create proprietary channels. Build systems that bring deals to you.",
          "Step 3: Position strategically. Become the capital provider of choice.",
          "Step 4: Structure deals. Create opportunities others can't.",
          "Step 5: Syndicate. Multiply capital. Share risk.",
          "Step 6: Compound. Use deals to create more deals."
        ]
      },
      exercise: {
        instruction: "Assess your deal flow.",
        prompts: [
          "What is your current deal flow? How many opportunities do you see monthly?",
          "What relationships do you have with entrepreneurs?",
          "What partnerships do you have with other investors?",
          "What proprietary channels have you built?",
          "What is your 90-day plan to improve deal flow?"
        ]
      },
      directive: "Identify one relationship to build, one channel to create, one partnership to form. Start building deal flow today."
    },
    2: {
      title: 'Deal Structuring',
      intro: "The wealthy don't just invest. They structure. They create deals that others can't. They optimize terms. They minimize risk. They maximize returns. This module teaches you to think about deals as structures to be optimized.",
      sections: [
        {
          heading: 'The Term Sheet',
          content: "Every deal has terms. The wealthy optimize them. They don't just accept standard terms. They negotiate. They structure. They optimize. They understand that terms create value. They don't just invest. They structure. They don't just take risk. They optimize it."
        },
        {
          heading: 'Risk Mitigation',
          content: "Every deal has risk. The wealthy don't just accept it. They mitigate it. They structure deals to minimize downside. They use convertible notes. They use SAFEs. They use preferred stock. They don't just invest. They protect. They don't just take risk. They manage it."
        },
        {
          heading: 'The Value Creation',
          content: "The best deals create value. The wealthy don't just invest capital. They create value. They provide expertise. They provide network. They provide resources. They don't just invest. They build. They don't just provide capital. They create value."
        },
        {
          heading: 'The Exit Strategy',
          content: "Every deal needs an exit. The wealthy don't just invest. They plan exits. They structure deals with exit options. They understand that exits create returns. They don't just invest. They plan. They don't just hope. They structure."
        }
      ],
      caseStudy: {
        name: "Sequoia's Deal Structure",
        story: "Sequoia doesn't just invest. They structure. They negotiate terms. They optimize deals. They create value. They don't just provide capital. They provide expertise. They provide network. They provide resources. Their deal structure creates value. It minimizes risk. It maximizes returns.",
        lesson: "Sequoia doesn't just invest. They structure. They optimize. They create value. That's deal structuring."
      },
      framework: {
        name: "The Deal Structuring Framework",
        steps: [
          "Step 1: Understand the deal. What are you investing in?",
          "Step 2: Assess risk. What could go wrong?",
          "Step 3: Structure terms. Optimize for your position.",
          "Step 4: Mitigate risk. Use structures that protect downside.",
          "Step 5: Create value. Provide more than capital.",
          "Step 6: Plan exit. Structure for returns."
        ]
      },
      exercise: {
        instruction: "Assess your deal structuring.",
        prompts: [
          "What is your current deal structure? What terms do you negotiate?",
          "How do you mitigate risk? What structures do you use?",
          "What value do you create beyond capital?",
          "How do you plan exits? What's your strategy?",
          "What is your 90-day plan to improve deal structuring?"
        ]
      },
      directive: "Review your last deal. How could you have structured it better? Apply those lessons to your next deal."
    },
    3: {
      title: 'Portfolio Construction',
      intro: "The wealthy don't just make investments. They build portfolios. They diversify. They optimize. They compound. This module teaches you to think about investments as a portfolio to be constructed.",
      sections: [
        {
          heading: 'The Portfolio Stack',
          content: "Portfolios require a stack. Diversification across sectors, stages, and geographies. Risk management through position sizing. Value creation through active involvement. The wealthy don't just invest. They construct. They don't just take risk. They optimize it."
        },
        {
          heading: 'Diversification Strategy',
          content: "Diversification reduces risk. The wealthy don't just invest in one thing. They diversify. They spread risk. They optimize returns. They don't just invest. They construct. They don't just take risk. They manage it."
        },
        {
          heading: 'Position Sizing',
          content: "Position sizing manages risk. The wealthy don't just invest equal amounts. They size positions based on risk and opportunity. They don't just invest. They optimize. They don't just take risk. They manage it."
        },
        {
          heading: 'The Compound Effect',
          content: "Portfolios compound. The wealthy don't just make investments. They build portfolios. They compound returns. They optimize continuously. They don't just invest. They construct. They don't just hope. They optimize."
        }
      ],
      caseStudy: {
        name: "Andreessen Horowitz's Portfolio",
        story: "Andreessen Horowitz doesn't just make investments. They build portfolios. They diversify. They optimize. They compound. They don't just invest. They construct. They don't just take risk. They manage it. Their portfolio construction creates value. It minimizes risk. It maximizes returns.",
        lesson: "Andreessen Horowitz doesn't just invest. They construct. They optimize. They compound. That's portfolio construction."
      },
      framework: {
        name: "The Portfolio Construction Framework",
        steps: [
          "Step 1: Define your strategy. What are you investing in?",
          "Step 2: Diversify. Spread risk across sectors, stages, geographies.",
          "Step 3: Size positions. Optimize based on risk and opportunity.",
          "Step 4: Create value. Be active. Provide more than capital.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use returns to create more returns."
        ]
      },
      exercise: {
        instruction: "Assess your portfolio.",
        prompts: [
          "What is your current portfolio? How is it diversified?",
          "How do you size positions? What's your strategy?",
          "What value do you create? How active are you?",
          "How do you monitor performance? What metrics matter?",
          "What is your 90-day plan to improve portfolio construction?"
        ]
      },
      directive: "Review your portfolio. How is it diversified? How could you optimize it? Make one change this week."
    },
    4: {
      title: 'Syndicate Mastery',
      intro: "The final module integrates all syndicate building into a complete investment strategy. You'll learn to think about syndication as a system to be mastered. To create deal flow. To structure deals. To build portfolios.",
      sections: [
        {
          heading: 'The Complete Syndicate Stack',
          content: "Syndication requires a stack. Deal flow, deal structuring, portfolio construction, and value creation. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building a syndicate is an investment. Every relationship built, every deal structured, every portfolio constructed pays dividends. The wealthy invest in syndication like they invest in businesses. They build systems. They optimize continuously. They compound returns."
        },
        {
          heading: 'The Compound Effect',
          content: "Syndication compounds. Every deal creates more deals. Every relationship creates more relationships. Every portfolio creates more portfolios. The wealthy don't just build syndicates. They compound them."
        },
        {
          heading: 'Your Syndicate Plan',
          content: "Create your syndicate plan. What deal flow will you build? What deals will you structure? What portfolio will you construct? The wealthy don't wing it. They plan. They build. They optimize. They compound."
        }
      ],
      caseStudy: {
        name: "AngelList's Syndicate Platform",
        story: "AngelList didn't just create a platform. They built a syndicate system. They created deal flow. They structured deals. They built portfolios. They don't just invest. They systematize. They don't just create value. They scale it.",
        lesson: "AngelList didn't just build a platform. They built a system. They created deal flow. They structured deals. That's syndicate mastery."
      },
      framework: {
        name: "The Complete Syndicate Framework",
        steps: [
          "Step 1: Build deal flow. Create networks. Build channels.",
          "Step 2: Structure deals. Optimize terms. Mitigate risk.",
          "Step 3: Construct portfolios. Diversify. Optimize.",
          "Step 4: Create value. Be active. Provide more than capital.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use returns to create more returns."
        ]
      },
      exercise: {
        instruction: "Create your complete syndicate plan.",
        prompts: [
          "What is your deal flow strategy? How will you create it?",
          "What is your deal structuring approach? How will you optimize?",
          "What is your portfolio construction strategy? How will you diversify?",
          "What value will you create? How will you be active?",
          "What is your 90-day plan to build your syndicate?"
        ]
      },
      directive: "Create your syndicate plan today. Identify one deal flow channel to build, one deal to structure, one portfolio to construct. Start building your syndicate this week."
    }
  },
  'family-office': {
    1: {
      title: 'Wealth Architecture',
      intro: "Family offices don't just manage wealth. They architect it. They structure assets. They optimize taxes. They create systems. This module teaches you to think about wealth as architecture to be designed.",
      sections: [
        {
          heading: 'The Family Office Stack',
          content: "Family offices require a stack. Asset management, tax optimization, estate planning, and operational systems. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results."
        },
        {
          heading: 'Asset Structuring',
          content: "Wealth requires structure. The wealthy don't just hold assets. They structure them. They optimize ownership. They minimize taxes. They create systems. They don't just have wealth. They architect it."
        },
        {
          heading: 'Tax Optimization',
          content: "Taxes are the largest expense. The wealthy don't just pay them. They optimize them. They structure assets. They use strategies. They minimize liability. They don't just have wealth. They optimize it."
        },
        {
          heading: 'Operational Systems',
          content: "Wealth requires systems. The wealthy don't just manage assets. They systematize management. They create processes. They build teams. They don't just have wealth. They operate it."
        }
      ],
      caseStudy: {
        name: "The Rockefeller Family Office",
        story: "The Rockefeller family office doesn't just manage wealth. It architects it. It structures assets. It optimizes taxes. It creates systems. It doesn't just have wealth. It operates it. That's family office architecture.",
        lesson: "The Rockefellers don't just have wealth. They architect it. They structure it. They optimize it. That's family office mastery."
      },
      framework: {
        name: "The Family Office Framework",
        steps: [
          "Step 1: Structure assets. Optimize ownership. Minimize taxes.",
          "Step 2: Build systems. Create processes. Build teams.",
          "Step 3: Optimize taxes. Use strategies. Minimize liability.",
          "Step 4: Plan estates. Structure transfers. Optimize succession.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to create more systems."
        ]
      },
      exercise: {
        instruction: "Assess your wealth architecture.",
        prompts: [
          "How are your assets structured? Are they optimized?",
          "What tax strategies are you using? Are they optimal?",
          "What systems do you have? Are they scalable?",
          "What is your estate plan? Is it structured?",
          "What is your 90-day plan to improve wealth architecture?"
        ]
      },
      directive: "Review your asset structure. How could you optimize it? Make one change this week."
    },
    2: {
      title: 'Investment Management',
      intro: "Family offices don't just invest. They manage investments. They optimize portfolios. They create value. This module teaches you to think about investments as systems to be managed.",
      sections: [
        {
          heading: 'The Investment Stack',
          content: "Investment management requires a stack. Portfolio construction, risk management, value creation, and performance optimization. The wealthy don't do one thing. They do all of them."
        },
        {
          heading: 'Portfolio Optimization',
          content: "Portfolios require optimization. The wealthy don't just invest. They optimize. They construct portfolios. They manage risk. They create value. They don't just invest. They manage."
        },
        {
          heading: 'Risk Management',
          content: "Risk requires management. The wealthy don't just take risk. They manage it. They diversify. They hedge. They optimize. They don't just invest. They protect."
        },
        {
          heading: 'Performance Optimization',
          content: "Performance requires optimization. The wealthy don't just hope for returns. They optimize for them. They track performance. They adjust strategy. They compound returns. They don't just invest. They optimize."
        }
      ],
      caseStudy: {
        name: "The Walton Family Office",
        story: "The Walton family office doesn't just invest. It manages investments. It optimizes portfolios. It creates value. It doesn't just have wealth. It operates it.",
        lesson: "The Waltons don't just invest. They manage. They optimize. They compound. That's investment management."
      },
      framework: {
        name: "The Investment Management Framework",
        steps: [
          "Step 1: Construct portfolio. Diversify. Optimize.",
          "Step 2: Manage risk. Diversify. Hedge.",
          "Step 3: Create value. Be active. Provide expertise.",
          "Step 4: Optimize performance. Track. Adjust. Compound.",
          "Step 5: Monitor continuously. Measure. Iterate.",
          "Step 6: Scale systems. Automate. Compound."
        ]
      },
      exercise: {
        instruction: "Assess your investment management.",
        prompts: [
          "How is your portfolio constructed? Is it optimized?",
          "How do you manage risk? What strategies do you use?",
          "What value do you create? How active are you?",
          "How do you track performance? What metrics matter?",
          "What is your 90-day plan to improve investment management?"
        ]
      },
      directive: "Review your investment management. How could you optimize it? Make one change this week."
    },
    3: {
      title: 'Estate Planning',
      intro: "Family offices don't just plan estates. They structure them. They optimize transfers. They create dynasties. This module teaches you to think about estates as structures to be designed.",
      sections: [
        {
          heading: 'The Estate Stack',
          content: "Estate planning requires a stack. Trust structures, tax optimization, succession planning, and dynasty design. The wealthy don't do one thing. They do all of them."
        },
        {
          heading: 'Trust Structures',
          content: "Estates require structures. The wealthy don't just transfer assets. They structure transfers. They use trusts. They optimize taxes. They create systems. They don't just plan estates. They architect them."
        },
        {
          heading: 'Tax Optimization',
          content: "Estate taxes are massive. The wealthy don't just pay them. They optimize them. They structure transfers. They use strategies. They minimize liability. They don't just plan estates. They optimize them."
        },
        {
          heading: 'Succession Planning',
          content: "Succession requires planning. The wealthy don't just hope for smooth transitions. They plan them. They structure transfers. They train successors. They create systems. They don't just plan estates. They operate them."
        }
      ],
      caseStudy: {
        name: "The Du Pont Family Office",
        story: "The Du Pont family office doesn't just plan estates. It structures them. It optimizes transfers. It creates dynasties. It doesn't just have wealth. It preserves it.",
        lesson: "The Du Ponts don't just plan estates. They structure them. They optimize them. They create dynasties. That's estate planning."
      },
      framework: {
        name: "The Estate Planning Framework",
        steps: [
          "Step 1: Structure trusts. Optimize ownership. Minimize taxes.",
          "Step 2: Optimize transfers. Use strategies. Minimize liability.",
          "Step 3: Plan succession. Train successors. Create systems.",
          "Step 4: Design dynasty. Structure for generations.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to preserve wealth."
        ]
      },
      exercise: {
        instruction: "Assess your estate planning.",
        prompts: [
          "What is your estate structure? Is it optimized?",
          "What tax strategies are you using? Are they optimal?",
          "What is your succession plan? Is it structured?",
          "What is your dynasty design? Is it scalable?",
          "What is your 90-day plan to improve estate planning?"
        ]
      },
      directive: "Review your estate plan. How could you optimize it? Make one change this week."
    },
    4: {
      title: 'Family Office Mastery',
      intro: "The final module integrates all family office building into a complete wealth management strategy. You'll learn to think about family offices as systems to be mastered. To architect wealth. To manage investments. To plan estates.",
      sections: [
        {
          heading: 'The Complete Family Office Stack',
          content: "Family offices require a complete stack. Wealth architecture, investment management, estate planning, and operational systems. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building a family office is an investment. Every system built, every structure created, every strategy implemented pays dividends. The wealthy invest in family offices like they invest in businesses. They build systems. They optimize continuously. They compound returns."
        },
        {
          heading: 'The Compound Effect',
          content: "Family offices compound. Every system creates more systems. Every structure creates more structures. Every strategy creates more strategies. The wealthy don't just build family offices. They compound them."
        },
        {
          heading: 'Your Family Office Plan',
          content: "Create your family office plan. What wealth will you architect? What investments will you manage? What estates will you plan? The wealthy don't wing it. They plan. They build. They optimize. They compound."
        }
      ],
      caseStudy: {
        name: "The Bezos Family Office",
        story: "The Bezos family office doesn't just manage wealth. It architects it. It structures assets. It optimizes taxes. It creates systems. It doesn't just have wealth. It operates it.",
        lesson: "The Bezos family doesn't just have wealth. They architect it. They structure it. They optimize it. That's family office mastery."
      },
      framework: {
        name: "The Complete Family Office Framework",
        steps: [
          "Step 1: Architect wealth. Structure assets. Optimize taxes.",
          "Step 2: Manage investments. Optimize portfolios. Create value.",
          "Step 3: Plan estates. Structure transfers. Optimize succession.",
          "Step 4: Build systems. Create processes. Build teams.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to create more systems."
        ]
      },
      exercise: {
        instruction: "Create your complete family office plan.",
        prompts: [
          "What is your wealth architecture? How will you structure it?",
          "What is your investment management strategy? How will you optimize?",
          "What is your estate plan? How will you structure it?",
          "What systems will you build? How will you scale them?",
          "What is your 90-day plan to build your family office?"
        ]
      },
      directive: "Create your family office plan today. Identify one structure to create, one system to build, one strategy to implement. Start building your family office this week."
    }
  },
  'dynasty-design': {
    1: {
      title: 'Generational Architecture',
      intro: "Dynasties don't just happen. They're designed. The wealthy don't just pass wealth. They architect generational systems. They structure transfers. They optimize taxes. They create legacies. This module teaches you to think about dynasties as architecture to be designed.",
      sections: [
        {
          heading: 'The Dynasty Stack',
          content: "Dynasties require a stack. Trust structures, tax optimization, succession planning, and legacy systems. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results across generations."
        },
        {
          heading: 'Trust Architecture',
          content: "Dynasties require trust structures. The wealthy don't just transfer assets. They structure transfers through trusts. They optimize ownership. They minimize taxes. They create systems that preserve wealth across generations. They don't just pass wealth. They architect it."
        },
        {
          heading: 'Tax Optimization Across Generations',
          content: "Generational wealth requires tax optimization. The wealthy don't just pay estate taxes. They optimize them. They use strategies like GRATs, IDGTs, and family limited partnerships. They structure transfers to minimize tax liability across generations. They don't just pass wealth. They optimize it."
        },
        {
          heading: 'Succession Systems',
          content: "Dynasties require succession systems. The wealthy don't just hope for smooth transitions. They plan them. They train successors. They create systems. They structure governance. They don't just pass wealth. They operate it."
        }
      ],
      caseStudy: {
        name: "The Rothschild Dynasty",
        story: "The Rothschild family didn't just accumulate wealth. They designed a dynasty. They structured trusts. They optimized taxes. They created succession systems. They built a legacy that has lasted for generations. They don't just have wealth. They operate it across centuries.",
        lesson: "The Rothschilds didn't just pass wealth. They designed a dynasty. They structured it. They optimized it. They created systems. That's generational architecture."
      },
      framework: {
        name: "The Dynasty Design Framework",
        steps: [
          "Step 1: Structure trusts. Optimize ownership. Minimize taxes.",
          "Step 2: Optimize transfers. Use strategies. Minimize liability.",
          "Step 3: Plan succession. Train successors. Create systems.",
          "Step 4: Design governance. Structure decision-making. Create accountability.",
          "Step 5: Build legacy. Create values. Preserve culture.",
          "Step 6: Compound. Use systems to preserve wealth across generations."
        ]
      },
      exercise: {
        instruction: "Assess your dynasty design.",
        prompts: [
          "What is your current estate structure? Is it designed for generations?",
          "What tax strategies are you using? Are they optimal for generational transfer?",
          "What is your succession plan? Is it structured?",
          "What governance systems do you have? Are they scalable?",
          "What is your 90-day plan to improve dynasty design?"
        ]
      },
      directive: "Review your estate structure. How could you design it for generations? Make one change this week."
    },
    2: {
      title: 'Legacy Systems',
      intro: "Dynasties don't just preserve wealth. They create legacy. They build systems. They preserve culture. They create values. This module teaches you to think about legacy as systems to be built.",
      sections: [
        {
          heading: 'The Legacy Stack',
          content: "Legacy requires a stack. Values systems, cultural preservation, educational programs, and philanthropic structures. The wealthy don't do one thing. They do all of them. They build systems that preserve and transmit values across generations."
        },
        {
          heading: 'Values Architecture',
          content: "Dynasties require values. The wealthy don't just hope values are transmitted. They architect them. They document values. They create systems. They build culture. They don't just pass wealth. They pass values."
        },
        {
          heading: 'Educational Systems',
          content: "Dynasties require education. The wealthy don't just hope successors learn. They structure education. They create programs. They build systems. They don't just pass wealth. They pass knowledge."
        },
        {
          heading: 'Philanthropic Structures',
          content: "Dynasties require purpose. The wealthy don't just accumulate wealth. They create philanthropic structures. They build foundations. They create impact. They don't just pass wealth. They pass purpose."
        }
      ],
      caseStudy: {
        name: "The Gates Foundation",
        story: "The Gates Foundation doesn't just give money. It creates legacy. It builds systems. It creates impact. It structures philanthropy for generations. It doesn't just have wealth. It operates it for purpose.",
        lesson: "The Gates Foundation doesn't just give. It structures. It builds systems. It creates legacy. That's legacy systems."
      },
      framework: {
        name: "The Legacy Systems Framework",
        steps: [
          "Step 1: Document values. Create systems. Build culture.",
          "Step 2: Structure education. Create programs. Build knowledge.",
          "Step 3: Design philanthropy. Create foundations. Build impact.",
          "Step 4: Preserve culture. Create systems. Build tradition.",
          "Step 5: Monitor and optimize. Track impact. Adjust strategy.",
          "Step 6: Compound. Use systems to preserve legacy across generations."
        ]
      },
      exercise: {
        instruction: "Assess your legacy systems.",
        prompts: [
          "What values do you want to transmit? How will you structure them?",
          "What educational systems do you have? Are they structured?",
          "What philanthropic structures do you have? Are they scalable?",
          "What cultural preservation systems do you have? Are they effective?",
          "What is your 90-day plan to improve legacy systems?"
        ]
      },
      directive: "Document your values. Create one system to transmit them. Start building legacy today."
    },
    3: {
      title: 'Governance Architecture',
      intro: "Dynasties don't just manage wealth. They govern it. They structure decision-making. They create accountability. They build systems. This module teaches you to think about governance as architecture to be designed.",
      sections: [
        {
          heading: 'The Governance Stack',
          content: "Governance requires a stack. Decision-making structures, accountability systems, conflict resolution, and performance management. The wealthy don't do one thing. They do all of them. They build systems that enable effective governance across generations."
        },
        {
          heading: 'Decision-Making Structures',
          content: "Dynasties require decision-making. The wealthy don't just hope decisions are made well. They structure them. They create processes. They build systems. They don't just manage wealth. They govern it."
        },
        {
          heading: 'Accountability Systems',
          content: "Dynasties require accountability. The wealthy don't just hope successors are accountable. They structure it. They create systems. They build processes. They don't just pass wealth. They govern it."
        },
        {
          heading: 'Conflict Resolution',
          content: "Dynasties face conflict. The wealthy don't just hope conflicts resolve. They structure resolution. They create processes. They build systems. They don't just manage wealth. They govern it."
        }
      ],
      caseStudy: {
        name: "The Mars Family Governance",
        story: "The Mars family doesn't just manage wealth. It governs it. It structures decision-making. It creates accountability. It builds systems. It doesn't just have wealth. It operates it across generations.",
        lesson: "The Mars family doesn't just manage. It governs. It structures. It creates systems. That's governance architecture."
      },
      framework: {
        name: "The Governance Architecture Framework",
        steps: [
          "Step 1: Structure decision-making. Create processes. Build systems.",
          "Step 2: Create accountability. Structure reporting. Build processes.",
          "Step 3: Design conflict resolution. Create processes. Build systems.",
          "Step 4: Build performance management. Structure evaluation. Create systems.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to enable governance across generations."
        ]
      },
      exercise: {
        instruction: "Assess your governance architecture.",
        prompts: [
          "What decision-making structures do you have? Are they effective?",
          "What accountability systems do you have? Are they structured?",
          "What conflict resolution processes do you have? Are they effective?",
          "What performance management systems do you have? Are they scalable?",
          "What is your 90-day plan to improve governance architecture?"
        ]
      },
      directive: "Design one governance structure. Create one process. Start building governance today."
    },
    4: {
      title: 'Dynasty Mastery',
      intro: "The final module integrates all dynasty building into a complete generational strategy. You'll learn to think about dynasties as systems to be mastered. To architect wealth. To build legacy. To govern across generations.",
      sections: [
        {
          heading: 'The Complete Dynasty Stack',
          content: "Dynasties require a complete stack. Generational architecture, legacy systems, governance architecture, and operational excellence. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results across generations."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building a dynasty is an investment. Every structure created, every system built, every strategy implemented pays dividends across generations. The wealthy invest in dynasties like they invest in businesses. They build systems. They optimize continuously. They compound returns."
        },
        {
          heading: 'The Compound Effect',
          content: "Dynasties compound. Every structure creates more structures. Every system creates more systems. Every strategy creates more strategies. The wealthy don't just build dynasties. They compound them across generations."
        },
        {
          heading: 'Your Dynasty Plan',
          content: "Create your dynasty plan. What wealth will you architect? What legacy will you build? What governance will you create? The wealthy don't wing it. They plan. They build. They optimize. They compound across generations."
        }
      ],
      caseStudy: {
        name: "The Rockefeller Dynasty",
        story: "The Rockefeller dynasty doesn't just preserve wealth. It operates it. It structures assets. It builds legacy. It creates governance. It doesn't just have wealth. It operates it across generations.",
        lesson: "The Rockefellers don't just have wealth. They operate it. They structure it. They build legacy. That's dynasty mastery."
      },
      framework: {
        name: "The Complete Dynasty Framework",
        steps: [
          "Step 1: Architect generational wealth. Structure assets. Optimize taxes.",
          "Step 2: Build legacy systems. Create values. Preserve culture.",
          "Step 3: Design governance. Structure decision-making. Create accountability.",
          "Step 4: Build operational systems. Create processes. Build teams.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to preserve wealth across generations."
        ]
      },
      exercise: {
        instruction: "Create your complete dynasty plan.",
        prompts: [
          "What is your generational architecture? How will you structure it?",
          "What legacy systems will you build? How will you preserve values?",
          "What governance will you create? How will you structure decision-making?",
          "What operational systems will you build? How will you scale them?",
          "What is your 90-day plan to build your dynasty?"
        ]
      },
      directive: "Create your dynasty plan today. Identify one structure to create, one system to build, one legacy to preserve. Start building your dynasty this week."
    }
  },
  'sovereign-flags': {
    1: {
      title: 'Geographic Optimization',
      intro: "The wealthy don't just live in one place. They optimize geography. They structure residency. They optimize taxes. They create optionality. This module teaches you to think about geography as a system to be optimized.",
      sections: [
        {
          heading: 'The Geographic Stack',
          content: "Geographic optimization requires a stack. Residency planning, tax optimization, asset location, and operational flexibility. The wealthy don't do one thing. They do all of them. They optimize geography to maximize opportunity and minimize constraint."
        },
        {
          heading: 'Residency Architecture',
          content: "Residency is a choice. The wealthy don't just live where they're born. They optimize residency. They structure it. They create optionality. They don't just have residency. They architect it."
        },
        {
          heading: 'Tax Optimization Through Geography',
          content: "Geography affects taxes. The wealthy don't just pay taxes where they live. They optimize geography. They structure residency. They locate assets. They minimize tax liability. They don't just pay taxes. They optimize them."
        },
        {
          heading: 'Operational Flexibility',
          content: "Geography creates opportunity. The wealthy don't just operate in one place. They optimize geography. They create flexibility. They build optionality. They don't just have location. They optimize it."
        }
      ],
      caseStudy: {
        name: "Eduardo Saverin's Singapore Move",
        story: "Eduardo Saverin didn't just move to Singapore. He optimized geography. He structured residency. He optimized taxes. He created optionality. He didn't just have location. He architected it.",
        lesson: "Saverin didn't just move. He optimized. He structured. He created optionality. That's geographic optimization."
      },
      framework: {
        name: "The Geographic Optimization Framework",
        steps: [
          "Step 1: Assess current geography. What are the constraints?",
          "Step 2: Identify optimization opportunities. What geographies offer advantage?",
          "Step 3: Structure residency. Optimize taxes. Create optionality.",
          "Step 4: Locate assets strategically. Optimize ownership. Minimize taxes.",
          "Step 5: Build operational flexibility. Create optionality. Maximize opportunity.",
          "Step 6: Monitor and optimize. Track performance. Adjust strategy."
        ]
      },
      exercise: {
        instruction: "Assess your geographic optimization.",
        prompts: [
          "What is your current residency? Is it optimized?",
          "What tax advantages could you gain through geographic optimization?",
          "What operational flexibility do you have? Could you optimize it?",
          "What geographic opportunities exist? What constraints?",
          "What is your 90-day plan to improve geographic optimization?"
        ]
      },
      directive: "Assess your geography. Identify one optimization opportunity. Start exploring it today."
    },
    2: {
      title: 'Citizenship Strategy',
      intro: "Citizenship is an asset. The wealthy don't just have one. They optimize citizenship. They structure it. They create optionality. This module teaches you to think about citizenship as a system to be optimized.",
      sections: [
        {
          heading: 'The Citizenship Stack',
          content: "Citizenship optimization requires a stack. Multiple citizenships, residency options, visa strategies, and travel flexibility. The wealthy don't do one thing. They do all of them. They optimize citizenship to maximize opportunity and minimize constraint."
        },
        {
          heading: 'Multiple Citizenships',
          content: "Multiple citizenships create optionality. The wealthy don't just have one citizenship. They optimize citizenship. They structure it. They create options. They don't just have citizenship. They architect it."
        },
        {
          heading: 'Visa Strategies',
          content: "Visas create access. The wealthy don't just hope for access. They optimize visas. They structure applications. They create options. They don't just have access. They architect it."
        },
        {
          heading: 'Travel Flexibility',
          content: "Travel flexibility creates opportunity. The wealthy don't just travel. They optimize travel. They structure it. They create options. They don't just have mobility. They architect it."
        }
      ],
      caseStudy: {
        name: "Peter Thiel's New Zealand Citizenship",
        story: "Peter Thiel didn't just get New Zealand citizenship. He optimized citizenship. He structured it. He created optionality. He didn't just have citizenship. He architected it.",
        lesson: "Thiel didn't just get citizenship. He optimized it. He structured it. He created optionality. That's citizenship strategy."
      },
      framework: {
        name: "The Citizenship Strategy Framework",
        steps: [
          "Step 1: Assess current citizenship. What are the constraints?",
          "Step 2: Identify optimization opportunities. What citizenships offer advantage?",
          "Step 3: Structure applications. Optimize timing. Create options.",
          "Step 4: Build visa strategies. Create access. Maximize opportunity.",
          "Step 5: Optimize travel. Create flexibility. Maximize mobility.",
          "Step 6: Monitor and optimize. Track performance. Adjust strategy."
        ]
      },
      exercise: {
        instruction: "Assess your citizenship strategy.",
        prompts: [
          "What is your current citizenship? Is it optimized?",
          "What additional citizenships could you pursue? What advantages?",
          "What visa strategies do you have? Could you optimize them?",
          "What travel flexibility do you have? Could you improve it?",
          "What is your 90-day plan to improve citizenship strategy?"
        ]
      },
      directive: "Assess your citizenship. Identify one optimization opportunity. Start exploring it today."
    },
    3: {
      title: 'Asset Location',
      intro: "Assets don't just exist. They're located. The wealthy don't just hold assets. They optimize location. They structure ownership. They minimize taxes. This module teaches you to think about asset location as a system to be optimized.",
      sections: [
        {
          heading: 'The Asset Location Stack',
          content: "Asset location optimization requires a stack. Geographic diversification, tax optimization, regulatory advantage, and operational flexibility. The wealthy don't do one thing. They do all of them. They optimize asset location to maximize returns and minimize risk."
        },
        {
          heading: 'Geographic Diversification',
          content: "Assets require diversification. The wealthy don't just hold assets in one place. They diversify geographically. They spread risk. They optimize returns. They don't just have assets. They locate them strategically."
        },
        {
          heading: 'Tax Optimization Through Location',
          content: "Location affects taxes. The wealthy don't just pay taxes on assets. They optimize location. They structure ownership. They minimize liability. They don't just have assets. They optimize them."
        },
        {
          heading: 'Regulatory Advantage',
          content: "Location affects regulation. The wealthy don't just accept regulation. They optimize location. They structure assets. They create advantage. They don't just have assets. They optimize them."
        }
      ],
      caseStudy: {
        name: "Offshore Asset Structures",
        story: "The wealthy don't just hold assets offshore. They optimize location. They structure ownership. They minimize taxes. They create advantage. They don't just have assets. They optimize them.",
        lesson: "Offshore structures don't just hide assets. They optimize them. They structure them. They create advantage. That's asset location."
      },
      framework: {
        name: "The Asset Location Framework",
        steps: [
          "Step 1: Assess current asset location. What are the constraints?",
          "Step 2: Identify optimization opportunities. What locations offer advantage?",
          "Step 3: Structure ownership. Optimize taxes. Create advantage.",
          "Step 4: Diversify geographically. Spread risk. Optimize returns.",
          "Step 5: Build regulatory advantage. Structure assets. Create opportunity.",
          "Step 6: Monitor and optimize. Track performance. Adjust strategy."
        ]
      },
      exercise: {
        instruction: "Assess your asset location.",
        prompts: [
          "Where are your assets located? Is it optimized?",
          "What tax advantages could you gain through asset location?",
          "What regulatory advantages exist? Could you optimize them?",
          "What geographic diversification do you have? Could you improve it?",
          "What is your 90-day plan to improve asset location?"
        ]
      },
      directive: "Review your asset locations. Identify one optimization opportunity. Start exploring it today."
    },
    4: {
      title: 'Sovereign Flags Mastery',
      intro: "The final module integrates all geographic optimization into a complete sovereign strategy. You'll learn to think about geography as a system to be mastered. To optimize residency. To structure citizenship. To locate assets.",
      sections: [
        {
          heading: 'The Complete Sovereign Stack',
          content: "Sovereign optimization requires a complete stack. Geographic optimization, citizenship strategy, asset location, and operational flexibility. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building sovereign optionality is an investment. Every structure created, every citizenship obtained, every asset located pays dividends in flexibility and opportunity. The wealthy invest in sovereign optimization like they invest in businesses. They build systems. They optimize continuously. They compound returns."
        },
        {
          heading: 'The Compound Effect',
          content: "Sovereign optimization compounds. Every structure creates more structures. Every citizenship creates more options. Every asset location creates more opportunity. The wealthy don't just build sovereign optionality. They compound it."
        },
        {
          heading: 'Your Sovereign Plan',
          content: "Create your sovereign plan. What geography will you optimize? What citizenship will you pursue? What assets will you locate? The wealthy don't wing it. They plan. They build. They optimize. They compound."
        }
      ],
      caseStudy: {
        name: "Global Nomad Structures",
        story: "Global nomads don't just travel. They optimize geography. They structure residency. They optimize citizenship. They locate assets. They don't just have mobility. They architect it.",
        lesson: "Global nomads don't just travel. They optimize. They structure. They create optionality. That's sovereign flags mastery."
      },
      framework: {
        name: "The Complete Sovereign Framework",
        steps: [
          "Step 1: Optimize geography. Structure residency. Create optionality.",
          "Step 2: Pursue citizenship. Structure applications. Create options.",
          "Step 3: Locate assets. Optimize ownership. Minimize taxes.",
          "Step 4: Build flexibility. Create optionality. Maximize opportunity.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to create more optionality."
        ]
      },
      exercise: {
        instruction: "Create your complete sovereign plan.",
        prompts: [
          "What geography will you optimize? How will you structure residency?",
          "What citizenship will you pursue? What advantages will it provide?",
          "What assets will you locate? How will you optimize ownership?",
          "What flexibility will you build? How will you create optionality?",
          "What is your 90-day plan to build sovereign optionality?"
        ]
      },
      directive: "Create your sovereign plan today. Identify one geography to optimize, one citizenship to pursue, one asset to relocate. Start building sovereign optionality this week."
    }
  },
  'asymmetric-bets': {
    1: {
      title: 'The Asymmetry Principle',
      intro: "The wealthy don't just take risks. They take asymmetric risks. They structure bets where the upside massively outweighs the downside. They create optionality. They maximize returns while minimizing risk. This module teaches you to think about bets as structures to be optimized.",
      sections: [
        {
          heading: 'The Asymmetry Stack',
          content: "Asymmetric bets require a stack. Risk assessment, upside maximization, downside protection, and optionality creation. The wealthy don't do one thing. They do all of them. They structure bets to maximize asymmetry."
        },
        {
          heading: 'Upside Maximization',
          content: "Asymmetric bets maximize upside. The wealthy don't just take risks. They structure them. They create optionality. They maximize potential returns. They don't just bet. They optimize bets."
        },
        {
          heading: 'Downside Protection',
          content: "Asymmetric bets protect downside. The wealthy don't just take risks. They structure them. They limit losses. They create protection. They don't just bet. They optimize bets."
        },
        {
          heading: 'Optionality Creation',
          content: "Asymmetric bets create optionality. The wealthy don't just take risks. They structure them. They create options. They maximize flexibility. They don't just bet. They optimize bets."
        }
      ],
      caseStudy: {
        name: "Peter Thiel's PayPal Bet",
        story: "Peter Thiel didn't just invest in PayPal. He made an asymmetric bet. He structured it. He maximized upside. He protected downside. He created optionality. He didn't just bet. He optimized the bet.",
        lesson: "Thiel didn't just invest. He structured. He optimized. He created asymmetry. That's the asymmetry principle."
      },
      framework: {
        name: "The Asymmetry Framework",
        steps: [
          "Step 1: Assess risk. What's the downside?",
          "Step 2: Maximize upside. What's the potential?",
          "Step 3: Protect downside. How do you limit losses?",
          "Step 4: Create optionality. What options does this create?",
          "Step 5: Structure the bet. Optimize for asymmetry.",
          "Step 6: Monitor and adjust. Track performance. Optimize continuously."
        ]
      },
      exercise: {
        instruction: "Assess your asymmetric bets.",
        prompts: [
          "What asymmetric bets have you made? What was the asymmetry?",
          "What bets are you considering? How could you structure them for asymmetry?",
          "What downside protection do you have? Could you improve it?",
          "What optionality do your bets create? Could you maximize it?",
          "What is your 90-day plan to improve asymmetric betting?"
        ]
      },
      directive: "Identify one bet you're considering. Structure it for asymmetry. Maximize upside. Protect downside. Create optionality."
    },
    2: {
      title: 'Portfolio Asymmetry',
      intro: "Portfolios don't just diversify. They create asymmetry. The wealthy don't just spread risk. They structure portfolios for asymmetric returns. They optimize allocation. They maximize upside. This module teaches you to think about portfolios as structures to be optimized for asymmetry.",
      sections: [
        {
          heading: 'The Asymmetric Portfolio Stack',
          content: "Asymmetric portfolios require a stack. Core holdings for stability, satellite positions for upside, optionality positions for flexibility, and protection strategies for downside. The wealthy don't do one thing. They do all of them. They structure portfolios for maximum asymmetry."
        },
        {
          heading: 'Core and Satellite',
          content: "Portfolios require structure. The wealthy don't just diversify. They structure portfolios with core holdings for stability and satellite positions for upside. They don't just invest. They optimize for asymmetry."
        },
        {
          heading: 'Optionality Positions',
          content: "Portfolios require optionality. The wealthy don't just hold positions. They structure optionality. They create options. They maximize flexibility. They don't just invest. They optimize for asymmetry."
        },
        {
          heading: 'Protection Strategies',
          content: "Portfolios require protection. The wealthy don't just take risk. They structure protection. They limit downside. They create safety. They don't just invest. They optimize for asymmetry."
        }
      ],
      caseStudy: {
        name: "Ray Dalio's All Weather Portfolio",
        story: "Ray Dalio doesn't just diversify. He structures for asymmetry. He creates all-weather portfolios. He optimizes for upside while protecting downside. He doesn't just invest. He optimizes for asymmetry.",
        lesson: "Dalio doesn't just diversify. He structures. He optimizes. He creates asymmetry. That's portfolio asymmetry."
      },
      framework: {
        name: "The Portfolio Asymmetry Framework",
        steps: [
          "Step 1: Structure core. Create stability. Build foundation.",
          "Step 2: Add satellites. Maximize upside. Create opportunity.",
          "Step 3: Create optionality. Build flexibility. Maximize options.",
          "Step 4: Protect downside. Limit losses. Create safety.",
          "Step 5: Optimize allocation. Maximize asymmetry.",
          "Step 6: Monitor and adjust. Track performance. Optimize continuously."
        ]
      },
      exercise: {
        instruction: "Assess your portfolio asymmetry.",
        prompts: [
          "How is your portfolio structured? Is it optimized for asymmetry?",
          "What core holdings do you have? Are they stable?",
          "What satellite positions do you have? Do they maximize upside?",
          "What optionality positions do you have? Do they create flexibility?",
          "What is your 90-day plan to improve portfolio asymmetry?"
        ]
      },
      directive: "Review your portfolio. Restructure one position for asymmetry. Maximize upside. Protect downside."
    },
    3: {
      title: 'Venture Asymmetry',
      intro: "Venture investing is inherently asymmetric. The wealthy don't just invest in startups. They structure for maximum asymmetry. They optimize terms. They maximize upside. They protect downside. This module teaches you to think about venture investing as asymmetric structures to be optimized.",
      sections: [
        {
          heading: 'The Venture Asymmetry Stack',
          content: "Venture asymmetry requires a stack. Deal sourcing, term optimization, portfolio construction, and exit strategy. The wealthy don't do one thing. They do all of them. They structure venture investments for maximum asymmetry."
        },
        {
          heading: 'Deal Sourcing',
          content: "Venture requires deal flow. The wealthy don't just find deals. They create deal flow. They build networks. They position strategically. They don't just invest. They optimize for asymmetry."
        },
        {
          heading: 'Term Optimization',
          content: "Venture requires term optimization. The wealthy don't just accept terms. They negotiate. They structure. They optimize. They don't just invest. They optimize for asymmetry."
        },
        {
          heading: 'Portfolio Construction',
          content: "Venture requires portfolio construction. The wealthy don't just make investments. They construct portfolios. They diversify. They optimize. They don't just invest. They optimize for asymmetry."
        }
      ],
      caseStudy: {
        name: "Y Combinator's Asymmetric Model",
        story: "Y Combinator doesn't just invest. It structures for asymmetry. It creates deal flow. It optimizes terms. It constructs portfolios. It doesn't just invest. It optimizes for asymmetry.",
        lesson: "Y Combinator doesn't just invest. It structures. It optimizes. It creates asymmetry. That's venture asymmetry."
      },
      framework: {
        name: "The Venture Asymmetry Framework",
        steps: [
          "Step 1: Create deal flow. Build networks. Position strategically.",
          "Step 2: Optimize terms. Negotiate. Structure. Maximize upside.",
          "Step 3: Construct portfolio. Diversify. Optimize allocation.",
          "Step 4: Protect downside. Structure protection. Limit losses.",
          "Step 5: Plan exits. Structure for returns. Maximize upside.",
          "Step 6: Monitor and optimize. Track performance. Adjust strategy."
        ]
      },
      exercise: {
        instruction: "Assess your venture asymmetry.",
        prompts: [
          "What is your venture deal flow? Is it optimized?",
          "How do you optimize terms? What structures do you use?",
          "How is your venture portfolio constructed? Is it diversified?",
          "What downside protection do you have? Could you improve it?",
          "What is your 90-day plan to improve venture asymmetry?"
        ]
      },
      directive: "Review your venture strategy. Identify one deal to structure for asymmetry. Optimize terms. Maximize upside."
    },
    4: {
      title: 'Asymmetric Mastery',
      intro: "The final module integrates all asymmetric betting into a complete strategy. You'll learn to think about bets as structures to be mastered. To maximize upside. To protect downside. To create optionality.",
      sections: [
        {
          heading: 'The Complete Asymmetry Stack',
          content: "Asymmetric mastery requires a complete stack. Risk assessment, upside maximization, downside protection, optionality creation, and portfolio optimization. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound results."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building asymmetric strategies is an investment. Every structure created, every bet optimized, every portfolio constructed pays dividends in returns. The wealthy invest in asymmetry like they invest in businesses. They build systems. They optimize continuously. They compound returns."
        },
        {
          heading: 'The Compound Effect',
          content: "Asymmetric strategies compound. Every structure creates more structures. Every bet creates more bets. Every portfolio creates more portfolios. The wealthy don't just build asymmetric strategies. They compound them."
        },
        {
          heading: 'Your Asymmetric Plan',
          content: "Create your asymmetric plan. What bets will you structure? What portfolios will you construct? What optionality will you create? The wealthy don't wing it. They plan. They build. They optimize. They compound."
        }
      ],
      caseStudy: {
        name: "Warren Buffett's Asymmetric Strategy",
        story: "Warren Buffett doesn't just invest. He structures for asymmetry. He maximizes upside. He protects downside. He creates optionality. He doesn't just invest. He optimizes for asymmetry.",
        lesson: "Buffett doesn't just invest. He structures. He optimizes. He creates asymmetry. That's asymmetric mastery."
      },
      framework: {
        name: "The Complete Asymmetry Framework",
        steps: [
          "Step 1: Assess risk. Identify opportunities. Maximize upside.",
          "Step 2: Protect downside. Structure protection. Limit losses.",
          "Step 3: Create optionality. Build flexibility. Maximize options.",
          "Step 4: Construct portfolios. Optimize allocation. Maximize asymmetry.",
          "Step 5: Monitor and optimize. Track performance. Adjust strategy.",
          "Step 6: Compound. Use systems to create more asymmetry."
        ]
      },
      exercise: {
        instruction: "Create your complete asymmetric plan.",
        prompts: [
          "What asymmetric bets will you structure? How will you optimize them?",
          "What portfolios will you construct? How will you maximize asymmetry?",
          "What optionality will you create? How will you build flexibility?",
          "What downside protection will you build? How will you limit losses?",
          "What is your 90-day plan to build asymmetric strategies?"
        ]
      },
      directive: "Create your asymmetric plan today. Identify one bet to structure, one portfolio to optimize, one optionality to create. Start building asymmetric strategies this week."
    }
  },
  'ascendance': {
    1: {
      title: 'The Ascendance Mindset',
      intro: "Ascendance isn't just about wealth. It's about elevation. The wealthy don't just accumulate. They ascend. They elevate their thinking. They elevate their actions. They elevate their impact. This module teaches you to think about ascendance as a mindset to be cultivated.",
      sections: [
        {
          heading: 'The Ascendance Stack',
          content: "Ascendance requires a stack. Mindset elevation, action optimization, impact maximization, and legacy creation. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound elevation."
        },
        {
          heading: 'Mindset Elevation',
          content: "Ascendance starts with mindset. The wealthy don't just think. They elevate thinking. They challenge assumptions. They expand perspectives. They don't just have thoughts. They cultivate elevation."
        },
        {
          heading: 'Action Optimization',
          content: "Ascendance requires action. The wealthy don't just act. They optimize action. They focus on high-leverage activities. They eliminate waste. They don't just do things. They optimize them."
        },
        {
          heading: 'Impact Maximization',
          content: "Ascendance creates impact. The wealthy don't just create value. They maximize impact. They scale systems. They compound results. They don't just have impact. They optimize it."
        }
      ],
      caseStudy: {
        name: "Elon Musk's Ascendance",
        story: "Elon Musk doesn't just build companies. He ascends. He elevates thinking. He optimizes action. He maximizes impact. He doesn't just create value. He creates elevation.",
        lesson: "Musk doesn't just build. He ascends. He elevates. He optimizes. That's the ascendance mindset."
      },
      framework: {
        name: "The Ascendance Mindset Framework",
        steps: [
          "Step 1: Elevate mindset. Challenge assumptions. Expand perspectives.",
          "Step 2: Optimize action. Focus on high-leverage. Eliminate waste.",
          "Step 3: Maximize impact. Scale systems. Compound results.",
          "Step 4: Create legacy. Build systems. Preserve values.",
          "Step 5: Monitor and optimize. Track elevation. Adjust strategy.",
          "Step 6: Compound. Use systems to create more elevation."
        ]
      },
      exercise: {
        instruction: "Assess your ascendance mindset.",
        prompts: [
          "How do you elevate your thinking? What assumptions do you challenge?",
          "How do you optimize your actions? What high-leverage activities do you focus on?",
          "How do you maximize your impact? What systems do you scale?",
          "What legacy are you creating? How are you preserving values?",
          "What is your 90-day plan to improve ascendance mindset?"
        ]
      },
      directive: "Identify one assumption to challenge, one action to optimize, one impact to maximize. Start elevating today."
    },
    2: {
      title: 'Systematic Elevation',
      intro: "Ascendance isn't random. It's systematic. The wealthy don't just hope to ascend. They build systems. They create processes. They optimize continuously. This module teaches you to think about ascendance as systems to be built.",
      sections: [
        {
          heading: 'The Elevation Stack',
          content: "Systematic elevation requires a stack. Learning systems, optimization processes, impact scaling, and legacy building. The wealthy don't do one thing. They do all of them. They build systems that enable continuous elevation."
        },
        {
          heading: 'Learning Systems',
          content: "Elevation requires learning. The wealthy don't just learn. They systematize learning. They create processes. They build systems. They don't just acquire knowledge. They optimize acquisition."
        },
        {
          heading: 'Optimization Processes',
          content: "Elevation requires optimization. The wealthy don't just optimize. They systematize optimization. They create processes. They build systems. They don't just improve. They optimize improvement."
        },
        {
          heading: 'Impact Scaling',
          content: "Elevation requires scaling. The wealthy don't just scale. They systematize scaling. They create processes. They build systems. They don't just grow. They optimize growth."
        }
      ],
      caseStudy: {
        name: "Jeff Bezos' Systematic Approach",
        story: "Jeff Bezos doesn't just build. He systematizes. He creates processes. He builds systems. He doesn't just ascend. He systematizes ascendance.",
        lesson: "Bezos doesn't just build. He systematizes. He creates processes. He builds systems. That's systematic elevation."
      },
      framework: {
        name: "The Systematic Elevation Framework",
        steps: [
          "Step 1: Build learning systems. Create processes. Optimize acquisition.",
          "Step 2: Create optimization processes. Systematize improvement.",
          "Step 3: Build impact scaling. Systematize growth.",
          "Step 4: Create legacy systems. Preserve values. Build culture.",
          "Step 5: Monitor and optimize. Track elevation. Adjust strategy.",
          "Step 6: Compound. Use systems to create more elevation."
        ]
      },
      exercise: {
        instruction: "Assess your systematic elevation.",
        prompts: [
          "What learning systems do you have? Are they optimized?",
          "What optimization processes do you have? Are they systematic?",
          "What impact scaling systems do you have? Are they effective?",
          "What legacy systems do you have? Are they preserving values?",
          "What is your 90-day plan to improve systematic elevation?"
        ]
      },
      directive: "Build one learning system. Create one optimization process. Start systematizing elevation today."
    },
    3: {
      title: 'Legacy Ascendance',
      intro: "True ascendance creates legacy. The wealthy don't just accumulate. They create legacy. They build systems that outlive them. They preserve values. They create impact. This module teaches you to think about legacy as ascendance to be achieved.",
      sections: [
        {
          heading: 'The Legacy Stack',
          content: "Legacy ascendance requires a stack. Value preservation, culture building, impact scaling, and system creation. The wealthy don't do one thing. They do all of them. They build legacy that enables continuous ascendance."
        },
        {
          heading: 'Value Preservation',
          content: "Legacy requires values. The wealthy don't just have values. They preserve them. They document them. They systematize them. They don't just have values. They architect them."
        },
        {
          heading: 'Culture Building',
          content: "Legacy requires culture. The wealthy don't just have culture. They build it. They create systems. They preserve traditions. They don't just have culture. They architect it."
        },
        {
          heading: 'Impact Scaling',
          content: "Legacy requires impact. The wealthy don't just have impact. They scale it. They create systems. They compound results. They don't just have impact. They architect it."
        }
      ],
      caseStudy: {
        name: "The Gates Foundation Legacy",
        story: "The Gates Foundation doesn't just give money. It creates legacy. It builds systems. It scales impact. It doesn't just have impact. It architects it.",
        lesson: "The Gates Foundation doesn't just give. It creates legacy. It builds systems. It scales impact. That's legacy ascendance."
      },
      framework: {
        name: "The Legacy Ascendance Framework",
        steps: [
          "Step 1: Preserve values. Document them. Systematize them.",
          "Step 2: Build culture. Create systems. Preserve traditions.",
          "Step 3: Scale impact. Create systems. Compound results.",
          "Step 4: Create systems. Build processes. Enable continuity.",
          "Step 5: Monitor and optimize. Track legacy. Adjust strategy.",
          "Step 6: Compound. Use systems to create more legacy."
        ]
      },
      exercise: {
        instruction: "Assess your legacy ascendance.",
        prompts: [
          "What values are you preserving? How are you systematizing them?",
          "What culture are you building? How are you preserving it?",
          "What impact are you scaling? How are you systematizing it?",
          "What systems are you creating? How are they enabling continuity?",
          "What is your 90-day plan to improve legacy ascendance?"
        ]
      },
      directive: "Document your values. Create one system to preserve them. Start building legacy today."
    },
    4: {
      title: 'Complete Ascendance',
      intro: "The final module integrates all ascendance building into a complete elevation strategy. You'll learn to think about ascendance as a system to be mastered. To elevate mindset. To systematize elevation. To create legacy.",
      sections: [
        {
          heading: 'The Complete Ascendance Stack',
          content: "Complete ascendance requires a complete stack. Mindset elevation, systematic processes, legacy creation, and impact scaling. The wealthy don't do one thing. They do all of them. They stack interventions. They optimize systems. They compound elevation."
        },
        {
          heading: 'The Investment Mindset',
          content: "Building ascendance is an investment. Every system built, every process created, every legacy established pays dividends in elevation. The wealthy invest in ascendance like they invest in businesses. They build systems. They optimize continuously. They compound elevation."
        },
        {
          heading: 'The Compound Effect',
          content: "Ascendance compounds. Every system creates more systems. Every process creates more processes. Every legacy creates more legacy. The wealthy don't just build ascendance. They compound it."
        },
        {
          heading: 'Your Ascendance Plan',
          content: "Create your ascendance plan. What mindset will you elevate? What systems will you build? What legacy will you create? The wealthy don't wing it. They plan. They build. They optimize. They compound."
        }
      ],
      caseStudy: {
        name: "The Complete Ascendance Model",
        story: "The most successful operators don't just accumulate. They ascend. They elevate mindset. They systematize processes. They create legacy. They don't just have wealth. They operate elevation.",
        lesson: "True ascendance doesn't just accumulate. It elevates. It systematizes. It creates legacy. That's complete ascendance."
      },
      framework: {
        name: "The Complete Ascendance Framework",
        steps: [
          "Step 1: Elevate mindset. Challenge assumptions. Expand perspectives.",
          "Step 2: Systematize processes. Create systems. Optimize continuously.",
          "Step 3: Create legacy. Preserve values. Build culture.",
          "Step 4: Scale impact. Create systems. Compound results.",
          "Step 5: Monitor and optimize. Track elevation. Adjust strategy.",
          "Step 6: Compound. Use systems to create more elevation."
        ]
      },
      exercise: {
        instruction: "Create your complete ascendance plan.",
        prompts: [
          "What mindset will you elevate? How will you challenge assumptions?",
          "What systems will you build? How will you systematize processes?",
          "What legacy will you create? How will you preserve values?",
          "What impact will you scale? How will you compound results?",
          "What is your 90-day plan to achieve complete ascendance?"
        ]
      },
      directive: "Create your ascendance plan today. Identify one mindset to elevate, one system to build, one legacy to create. Start ascending this week."
    }
  }
};

export const PILLAR_NAMES: Record<string, string> = {
  'reality-distortion': 'Reality Distortion',
  'liquidity-allocation': 'Liquidity Allocation',
  'holding-co': 'Holding Company',
  'time-arbitrage': 'Time Arbitrage',
  'bio-availability': 'Bio-Availability',
  'political-capital': 'Political Capital',
  'syndicate': 'Syndicate',
  'family-office': 'Family Office',
  'dynasty-design': 'Dynasty Design',
  'sovereign-flags': 'Sovereign Flags',
  'asymmetric-bets': 'Asymmetric Bets',
  'ascendance': 'Ascendance'
};
