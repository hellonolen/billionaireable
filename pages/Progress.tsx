import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { TrendingUp, Target, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SKILL_DATA } from '../constants';

const LEVEL_INFO = {
    Architect: { range: '$1M-$10M', phase: 'Pressure', color: 'orange', skills: ['reality-distortion', 'bio-availability', 'time-arbitrage'] },
    Accumulator: { range: '$10M-$50M', phase: 'Expansion', color: 'green', skills: ['liquidity-allocation', 'holding-co', 'syndicate'] },
    Optimizer: { range: '$50M-$250M', phase: 'Control', color: 'blue', skills: ['political-capital', 'family-office', 'sovereign-flags'] },
    Autonomy: { range: '$250M-$1B', phase: 'Sovereign', color: 'yellow', skills: ['dynasty-design', 'asymmetric-bets', 'ascendance'] },
    Perpetual: { range: '$1B+', phase: 'Permanence', color: 'green', skills: [] }
};

const Progress: React.FC = () => {
    const { progress, getSkillCompletion } = useProgress();
    const navigate = useNavigate();

    const currentLevelInfo = LEVEL_INFO[progress.currentLevel];
    const levels = Object.keys(LEVEL_INFO) as Array<keyof typeof LEVEL_INFO>;
    const currentIndex = levels.indexOf(progress.currentLevel);

    const formatCurrency = (num: number) => {
        if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        return `$${(num / 1000).toFixed(0)}K`;
    };

    const getSkillName = (skillId: string) => {
        const names: Record<string, string> = {
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
        return names[skillId] || skillId;
    };

    return (
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-20 animate-fade-in">

            {/* Header */}
            <div className="mb-16">
                <h1 className="font-serif text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mb-6">
                    PROGRESS
                </h1>
                <p className="font-serif text-2xl text-gray-400">
                    "The path to mastery is measured."
                </p>
            </div>

            {/* Current Level Card */}
            <div className={`bg-art-${currentLevelInfo.color} rounded-[32px] p-12 mb-12 shadow-2xl`}>
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <p className="font-mono text-xs text-white/80 uppercase mb-2">Current Level</p>
                        <h2 className="font-sans text-5xl font-black text-white mb-2">{progress.currentLevel}</h2>
                        <p className="font-serif text-xl text-white/90">{currentLevelInfo.phase}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-xs text-white/80 uppercase mb-2">Net Worth</p>
                        <p className="font-sans text-4xl font-black text-white">{formatCurrency(progress.netWorth)}</p>
                        <p className="font-mono text-sm text-white/80">{currentLevelInfo.range}</p>
                    </div>
                </div>

                {/* Level Progress Bar */}
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-white h-full transition-all duration-500"
                        style={{ width: `${(currentIndex + 1) / levels.length * 100}%` }}
                    />
                </div>
                <p className="font-mono text-xs text-white/80 uppercase mt-3">
                    Level {currentIndex + 1} of {levels.length}
                </p>
            </div>

            {/* Focus Skills for Current Level */}
            <div className="mb-12">
                <h2 className="font-sans text-3xl font-black uppercase mb-6">Focus Skills for {progress.currentLevel}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentLevelInfo.skills.map(skillId => {
                        const completion = getSkillCompletion(skillId);
                        const skillData = SKILL_DATA[skillId];
                        const totalModules = skillData?.modules.length || 4;
                        const percentage = (completion / totalModules) * 100;

                        return (
                            <div
                                key={skillId}
                                onClick={() => navigate('/skills')}
                                className="bg-white rounded-[24px] p-6 shadow-soft-xl border border-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
                            >
                                <h3 className="font-sans text-xl font-bold uppercase mb-4">{getSkillName(skillId)}</h3>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-mono text-xs text-gray-400 uppercase">Progress</span>
                                        <span className="font-mono text-xs font-bold">{completion}/{totalModules}</span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`bg-art-${currentLevelInfo.color} h-full transition-all`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Modules */}
                                <div className="space-y-2">
                                    {skillData?.modules.slice(0, 4).map((module, idx) => (
                                        <div key={module.id} className="flex items-center gap-2">
                                            {completion > idx ? (
                                                <CheckCircle className="w-4 h-4 text-art-green" />
                                            ) : (
                                                <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                            )}
                                            <span className="font-mono text-xs text-gray-600">{module.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* All Levels Roadmap */}
            <div className="mb-12">
                <h2 className="font-sans text-3xl font-black uppercase mb-8">The Path</h2>
                <div className="space-y-6">
                    {levels.map((level, idx) => {
                        const info = LEVEL_INFO[level];
                        const isComplete = idx < currentIndex;
                        const isCurrent = idx === currentIndex;
                        const isLocked = idx > currentIndex;

                        return (
                            <div
                                key={level}
                                className={`rounded-[24px] p-8 border-2 transition-all ${isCurrent ? `border-art-${info.color} bg-art-${info.color}/5` :
                                        isComplete ? 'border-art-green bg-art-green/5' :
                                            'border-gray-200 bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isCurrent ? `bg-art-${info.color}` :
                                                isComplete ? 'bg-art-green' :
                                                    'bg-gray-300'
                                            }`}>
                                            {isComplete ? (
                                                <CheckCircle className="w-8 h-8 text-white" />
                                            ) : isLocked ? (
                                                <Lock className="w-8 h-8 text-white" />
                                            ) : (
                                                <Target className="w-8 h-8 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-sans text-2xl font-black uppercase">{level}</h3>
                                            <p className="font-mono text-sm text-gray-600">{info.phase} • {info.range}</p>
                                        </div>
                                    </div>
                                    {isCurrent && (
                                        <span className="px-6 py-2 bg-black text-white rounded-full font-mono text-xs font-bold uppercase">
                                            Current
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/skills')}
                    className="bg-black text-white p-8 rounded-[24px] font-sans text-xl font-bold uppercase hover:bg-gray-800 transition-all text-left"
                >
                    <TrendingUp className="w-8 h-8 mb-4" />
                    Continue Training
                </button>
                <button
                    onClick={() => navigate('/triangles')}
                    className="bg-white border-2 border-black text-black p-8 rounded-[24px] font-sans text-xl font-bold uppercase hover:bg-gray-50 transition-all text-left"
                >
                    Weekly Check-In
                </button>
                <button
                    onClick={() => navigate('/decisions')}
                    className="bg-white border-2 border-black text-black p-8 rounded-[24px] font-sans text-xl font-bold uppercase hover:bg-gray-50 transition-all text-left"
                >
                    Review Decisions
                </button>
            </div>

        </div>
    );
};

export default Progress;
