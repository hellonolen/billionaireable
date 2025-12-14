import React from 'react';
import { TrendingUp, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Levels: React.FC = () => {
    const navigate = useNavigate();
    const currentLevel = 2; // Optimizer
    const currentProgress = 35; // 35% through Optimizer stage

    const levels = [
        {
            id: 1,
            name: 'Accumulator',
            range: '$1M - $10M',
            threshold: 0,
            description: 'Building the foundation',
            milestones: [
                { label: 'First $1M liquid', skillId: 'liquidity-allocation' },
                { label: 'Positive cash flow', skillId: 'liquidity-allocation' },
                { label: 'Emergency fund 12mo', skillId: 'family-office' }
            ],
        },
        {
            id: 2,
            name: 'Optimizer',
            range: '$10M - $50M',
            threshold: 20,
            description: 'Engineering efficiency',
            milestones: [
                { label: 'Sub-10% tax rate', skillId: 'sovereign-flags' },
                { label: 'First entity structure', skillId: 'holding-co' },
                { label: 'Automated systems', skillId: 'time-arbitrage' }
            ],
        },
        {
            id: 3,
            name: 'Architect',
            range: '$50M - $250M',
            threshold: 40,
            description: 'Building the dynasty',
            milestones: [
                { label: 'Family office operational', skillId: 'family-office' },
                { label: 'Multi-jurisdictional setup', skillId: 'sovereign-flags' },
                { label: 'Dynasty trusts', skillId: 'dynasty-design' }
            ],
        },
        {
            id: 4,
            name: 'Sovereign',
            range: '$250M - $1B',
            threshold: 60,
            description: 'Achieving freedom',
            milestones: [
                { label: 'Tier A passport', skillId: 'sovereign-flags' },
                { label: '3+ residencies', skillId: 'sovereign-flags' },
                { label: 'Global mobility', skillId: 'sovereign-flags' }
            ],
        },
        {
            id: 5,
            name: 'Immortal',
            range: '$1B+',
            threshold: 80,
            description: 'Transcending mortality',
            milestones: [
                { label: 'Legacy foundation', skillId: 'dynasty-design' },
                { label: '100-year plan', skillId: 'dynasty-design' },
                { label: 'Perpetual systems', skillId: 'holding-co' }
            ],
        },
    ];

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                        LEVELS
                    </h1>
                    <p className="font-serif text-2xl text-gray-400">"Measure progress, not perfection."</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-3 rounded-full shadow-soft-xl">
                    <Award className="w-5 h-5 text-art-orange" />
                    <span className="font-mono text-sm font-bold uppercase tracking-widest text-black">
                        Level {currentLevel}
                    </span>
                </div>
            </div>

            {/* Current Status */}
            <div className="mb-12 bg-white rounded-[32px] p-12 shadow-soft-xl border border-gray-100">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-serif text-5xl font-black text-black mb-2">
                                {levels[currentLevel - 1].name}
                            </h2>
                            <p className="font-serif text-xl text-gray-600">
                                {levels[currentLevel - 1].description}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-xs text-gray-400 uppercase mb-1">Net Worth Range</p>
                            <p className="font-sans text-3xl font-bold">{levels[currentLevel - 1].range}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-gray-400 uppercase">Progress to Next Level</span>
                            <span className="font-mono text-sm font-bold">{currentProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-4">
                            <div
                                className="bg-art-orange h-4 rounded-full transition-all duration-1000"
                                style={{ width: `${currentProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Current Milestones */}
                    <div>
                        <p className="font-mono text-xs text-gray-400 uppercase mb-3">Key Milestones (Click to Train)</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {levels[currentLevel - 1].milestones.map((milestone, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(`/skill/${milestone.skillId}`)}
                                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                                >
                                    <Target className="w-4 h-4 text-art-orange" />
                                    <span className="font-mono text-sm flex-1">{milestone.label}</span>
                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* All Levels Timeline */}
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>
                <div
                    className="absolute left-8 top-0 w-1 bg-art-orange transition-all duration-1000"
                    style={{ height: `${currentProgress}%` }}
                ></div>

                <div className="space-y-8">
                    {levels.map((level) => {
                        const isComplete = level.id < currentLevel;
                        const isCurrent = level.id === currentLevel;
                        const isPending = level.id > currentLevel;

                        return (
                            <div key={level.id} className="relative pl-20">
                                {/* Level Marker */}
                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-4 flex items-center justify-center font-mono text-sm font-bold ${isComplete ? 'bg-art-orange border-art-orange text-white' :
                                    isCurrent ? 'bg-white border-art-orange text-art-orange' :
                                        'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    {level.id}
                                </div>

                                {/* Level Card */}
                                <div className={`bg-white rounded-[32px] p-8 shadow-soft-xl border transition-all ${isCurrent ? 'border-art-orange shadow-2xl scale-105' : 'border-gray-100'
                                    }`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-sans text-3xl font-bold uppercase mb-2">{level.name}</h3>
                                            <p className="font-serif text-lg text-gray-600 mb-2">{level.description}</p>
                                            <p className="font-mono text-sm text-gray-400">{level.range}</p>
                                        </div>
                                        {isCurrent && (
                                            <span className="bg-art-orange text-white px-4 py-2 rounded-full font-mono text-xs font-bold uppercase">
                                                Current
                                            </span>
                                        )}
                                        {isComplete && (
                                            <TrendingUp className="w-8 h-8 text-art-green" />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {level.milestones.map((milestone, i) => (
                                            <div
                                                key={i}
                                                onClick={() => navigate(`/skill/${milestone.skillId}`)}
                                                className="flex items-center gap-2 text-sm cursor-pointer hover:text-art-blue transition-colors"
                                            >
                                                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-art-green' : 'bg-gray-300'}`}></div>
                                                <span className={isComplete ? 'line-through text-gray-400' : ''}>{milestone.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default Levels;
